import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {randomUUID} from 'node:crypto';
import {createSiteCounter,createLearningClock} from '../site-counter.mjs';
import worker, {CourseCounter} from '../counter/worker.mjs';

const event = kind => ({id:randomUUID(),kind,at:Date.now()});
function storageFor(db) {
  return {
    sql:{exec(query,...args) {
      const statement = db.prepare(query);
      const rows = statement.columns().length ? statement.all(...args) : (statement.run(...args),[]);
      return {toArray:() => rows};
    }},
    transactionSync(callback) {
      db.exec('BEGIN');
      try { const result=callback(); db.exec('COMMIT'); return result; }
      catch(error) { db.exec('ROLLBACK'); throw error; }
    }
  };
}

test('visits survive navigation; only complete full exam attempts count, with duplicate-safe retry', async () => {
  const values=new Map(), received=new Set(); let visits=0,exams=0,fail=false,time=Date.now();
  const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  const fetchImpl=async (url,options) => {
    if(options.body) {
      const value=JSON.parse(options.body);
      if(!received.has(value.id)) { received.add(value.id); if(value.kind==='visit') visits++; else exams++; }
    }
    if(fail) { fail=false; throw new Error('Response lost after server accepted it'); }
    return Response.json({visits,exams});
  };
  const setup=()=>createSiteCounter({endpoint:'https://counter.test',storage,fetchImpl,now:()=>time,newId:randomUUID});
  let client=setup(); await client.visit(); client=setup(); await client.visit();
  assert.equal(visits,1,'changing lessons or refreshing is not another visit');
  client.startExam(); assert.equal(exams,0,'starting or abandoning does not count');
  const attempt=client.startExam(); fail=true;
  assert.equal(await client.completeExam(attempt),null);
  await Promise.all([client.completeExam(attempt),client.completeExam(attempt)]);
  await client.completeExam(attempt); assert.equal(exams,1);
  await client.completeExam(client.startExam(),{practice:true}); assert.equal(exams,1);
  await client.completeExam(client.startExam()); assert.equal(exams,2,'a full retake counts');
  time+=86400001; await setup().visit(); assert.equal(visits,2,'a day-old tab starts a fresh visit');
  const unavailable=createSiteCounter({endpoint:'https://counter.test',storage:{getItem(){throw Error();},setItem(){throw Error();}},fetchImpl:async()=>{throw Error();},newId:randomUUID});
  assert.equal(await unavailable.visit(),null,'blocked storage or service never blocks the course');
});

test('SQLite counter keeps atomic totals across duplicate events and object restarts', async () => {
  const db=new DatabaseSync(':memory:');
  try {
    const storage=storageFor(db); let counter=new CourseCounter({storage});
    const post=value=>counter.fetch(new Request('https://counter.test/',{method:'POST',body:JSON.stringify(value)}));
    const first=event('visit');
    await Promise.all([post(first),post(first),...Array.from({length:8},()=>post(event('exam')))]);
    counter=new CourseCounter({storage});
    const result=await (await counter.fetch(new Request('https://counter.test/'))).json();
    assert.equal(result.visits,1); assert.equal(result.exams,8); assert.ok(result.since);
    assert.equal((await post({...first,kind:'exam'})).status,409);
    assert.equal(counter.totals().exams,8);
    // Expiring duplicate IDs never erases all-time totals.
    db.prepare('UPDATE events SET recorded=?').run(Date.now()-15*86400000);
    await post(event('visit'));
    assert.equal(counter.totals().visits,2); assert.equal(counter.totals().exams,8);
    assert.equal(db.prepare('SELECT count(*) AS n FROM events').get().n,1);
  } finally { db.close(); }
});

test('public API accepts only bounded, valid events from the configured course origin', async () => {
  const db=new DatabaseSync(':memory:');
  try {
    const counter=new CourseCounter({storage:storageFor(db)}); let allowed=true;
    const env={ALLOWED_ORIGIN:'https://ironfaith.github.io',COUNTER:{getByName:()=>counter},REQUEST_LIMIT:{limit:async()=>({success:allowed})}};
    const send=(value,options={})=>worker.fetch(new Request('https://counter.test/events',{
      method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,'Content-Type':'application/json',...options.headers},
      body:JSON.stringify(value)
    }),env);
    const first=event('visit');
    assert.equal((await send(first)).status,200);
    assert.equal((await send(first)).headers.get('Access-Control-Allow-Origin'),env.ALLOWED_ORIGIN);
    assert.equal((await send(event('exam'),{headers:{Origin:'https://elsewhere.test'}})).status,403);
    assert.equal((await send({...event('exam'),kind:'score'})).status,400);
    assert.equal((await send({...event('exam'),at:Date.now()-2*86400000})).status,400);
    assert.equal((await send({...event('exam'),score:5})).status,400);
    assert.equal((await send({data:'x'.repeat(300)})).status,413);
    assert.equal((await worker.fetch(new Request('https://counter.test/events'),env)).status,405);
    allowed=false; assert.equal((await send(event('exam'))).status,429); allowed=true;
    const totals=await (await worker.fetch(new Request('https://counter.test/stats'),env)).json();
    assert.equal(totals.visits,1); assert.equal(totals.exams,0,'rejected writes do not change totals');
  } finally { db.close(); }
});

test('learning time pauses in the background and after idle time, then resumes without counting the gap', () => {
  let time=0;
  const clock=createLearningClock({now:()=>time,active:false});
  time=60000; assert.equal(clock.takeSeconds(),0);
  clock.setActive(true);
  time+=30500; assert.equal(clock.takeSeconds(),30);
  time+=30500; clock.setActive(false); assert.equal(clock.takeSeconds(),31);
  time+=600000; assert.equal(clock.takeSeconds(),0);
  clock.setActive(true);
  time+=600000; assert.equal(clock.takeSeconds(),120,'idle or sleeping tabs stop at two minutes');
  clock.interact(); assert.equal(clock.takeSeconds(),0,'returning activity does not backfill the idle gap');
  time+=45000; clock.interact(); time+=45000;
  assert.equal(clock.takeSeconds(),90,'reading between interactions counts');
  assert.equal(clock.takeSeconds(),0,'flushing twice cannot repeat time');
});

test('learning time preserves existing totals and retries across navigation without double counting', async () => {
  const db=new DatabaseSync(':memory:');
  try {
    db.exec("CREATE TABLE totals (id INTEGER PRIMARY KEY, visits INTEGER NOT NULL, exams INTEGER NOT NULL, since TEXT); INSERT INTO totals VALUES (1,17,8,'2026-10-17')");
    const serverStorage=storageFor(db); let counter=new CourseCounter({storage:serverStorage});
    const values=new Map(), storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
    let loseResponse=true;
    const fetchImpl=async (url,options) => {
      assert.equal(options.keepalive,true,'navigation flushes can finish after leaving the page');
      const response=await counter.fetch(new Request('https://counter.test/',options));
      if(loseResponse) { loseResponse=false; throw Error('Response lost after write'); }
      return response;
    };
    const setup=()=>createSiteCounter({endpoint:'https://counter.test',storage,fetchImpl,newId:randomUUID});
    await setup().recordTime(60);
    counter=new CourseCounter({storage:serverStorage});
    const nextPage=setup(); await nextPage.recordTime(30); await nextPage.recordTime();
    assert.deepEqual({...counter.totals()},{visits:17,exams:8,since:'2026-10-17',learningSeconds:90});
    await nextPage.recordTime(0); await nextPage.recordTime(-10);
    assert.equal(counter.totals().learningSeconds,90);
  } finally { db.close(); }
});

test('the API accepts bounded seconds only on learning-time events', async () => {
  const db=new DatabaseSync(':memory:');
  try {
    const counter=new CourseCounter({storage:storageFor(db)});
    const env={ALLOWED_ORIGIN:'https://ironfaith.github.io',COUNTER:{getByName:()=>counter}};
    const send=value=>worker.fetch(new Request('https://counter.test/events',{method:'POST',
      headers:{Origin:env.ALLOWED_ORIGIN,'Content-Type':'application/json'},body:JSON.stringify(value)}),env);
    for(const seconds of [0,-1,121,1.5,'60',null])
      assert.equal((await send({...event('time'),seconds})).status,400);
    assert.equal((await send(event('time'))).status,400);
    assert.equal((await send({...event('exam'),seconds:60})).status,400);
    const minute={...event('time'),seconds:60};
    assert.equal((await send(minute)).status,200); await send(minute);
    await send({...event('time'),seconds:120});
    assert.equal(counter.totals().learningSeconds,180);
    assert.equal(counter.totals().visits,0); assert.equal(counter.totals().exams,0);
  } finally { db.close(); }
});
