import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {randomUUID} from 'node:crypto';
import {createSiteCounter} from '../site-counter.mjs';
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
