import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,pathCoverage} from '../troubleshoot-state.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const loop=(s,point,result)=>apply(s,{type:'select',point},{type:'tool',tool:'loop'},{type:'ready',value:true},{type:'record',result});
const trace=(s,from,to,strand,result)=>apply(s,{type:'trace',from,to},{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
const normal=s=>changeCase(s,{type:'normalize'});

test('normalized coverage grows from the tested optic through passed loops, leaving onward fiber unverified',()=>{
  let s=normal(loop(createCase(),0,'pass'));
  assert.equal(pathCoverage(s).optic,'pass');
  assert.equal(pathCoverage(s).txThrough,0);
  assert.equal(pathCoverage(s).spans[0].lanes.tx.status,'unknown');
  s=normal(loop(s,1,'pass'));
  assert.equal(pathCoverage(s).txThrough,1);
  assert.deepEqual(pathCoverage(s).spans.map(p=>[p.lanes.tx.status,p.lanes.rx.status]),[['loop','loop'],['unknown','unknown'],['unknown','unknown']]);
  s=normal(loop(s,2,'dark'));
  assert.equal(pathCoverage(s).txThrough,1);
  assert.deepEqual(pathCoverage(s).spans.map(p=>p.lanes.tx.status),['loop','suspect','unknown']);
  assert.deepEqual(pathCoverage(JSON.parse(JSON.stringify(s))),pathCoverage(s),'saved cases derive the same coverage');
  s=normal(loop(s,2,'pass'));
  assert.equal(pathCoverage(s).txThrough,2);
  assert.equal(s.service,'unknown','coverage does not claim the restored live link is verified');
});

test('VFL coverage keeps strands, loose heads and suspect connections distinct from an optical loop pass',()=>{
  let s=normal(trace(loop(createCase(),0,'pass'),0,1,'tx','seen'));
  assert.equal(pathCoverage(s).optic,'pass');
  assert.equal(pathCoverage(s).txThrough,0,'VFL continuity alone must not draw a passed IR route');
  assert.deepEqual(pathCoverage(s).spans.map(p=>[p.lanes.tx.status,p.lanes.rx.status]),[['vfl','unknown'],['unknown','unknown'],['unknown','unknown']]);
  s=normal(trace(s,0,1,'rx','dark'));
  assert.equal(pathCoverage(s).spans[0].lanes.tx.status,'vfl');
  assert.equal(pathCoverage(s).spans[0].lanes.rx.status,'suspect');
  s=apply(s,{type:'trace',from:0,to:1},{type:'strand',value:'rx'},{type:'patch',point:1,side:'rear',connected:false},{type:'ready',value:true},{type:'record',result:'seen'});
  s=normal(s);
  assert.equal(pathCoverage(s).points[1].head.rx,'seen');
  assert.equal(pathCoverage(s).points[1].port.rx,'dark');
  assert.equal(pathCoverage(s).points[1].issue,true);
  assert.equal(pathCoverage(s).spans[0].lanes.rx.status,'vfl','light reaches the head; the cassette connection is suspect');
  s=normal(trace(s,0,1,'rx','seen'));
  assert.equal(pathCoverage(s).points[1].issue,false);
  const reverse=normal(trace(trace(createCase(),2,1,'rx','seen'),2,0,'rx','dark'));
  assert.deepEqual(pathCoverage(reverse).spans.map(p=>[p.lanes.tx.status,p.lanes.rx.status]),[['unknown','suspect'],['unknown','vfl'],['unknown','unknown']]);
  const reverseOptic=normal(trace(loop(createCase(),0,'pass'),1,0,'rx','dark'));
  assert.equal(pathCoverage(reverseOptic).optic,'pass','VFL on disconnected fiber does not mark the optic as failed');
  assert.equal(pathCoverage(reverseOptic).points[0].issue,false);
  const mixed=normal(trace(loop(createCase(),1,'pass'),0,1,'rx','dark'));
  assert.deepEqual([pathCoverage(mixed).spans[0].lanes.tx.status,pathCoverage(mixed).spans[0].lanes.rx.status],['loop','suspect']);
});

test('unplugging pauses the confirmed route while retesting or changing ports clears current coverage',()=>{
  let s=normal(loop(loop(createCase(),0,'pass'),2,'pass'));
  const evidence=s.loops;
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:false});
  assert.equal(pathCoverage(s).txThrough,0);
  assert.deepEqual(s.loops,evidence,'opening a connection preserves recorded coverage');
  s=normal(s);
  assert.equal(pathCoverage(s).txThrough,2);
  const retest=changeCase(s,{type:'retest'});
  assert.equal(pathCoverage(retest).optic,'unknown');
  assert.equal(pathCoverage(retest).txThrough,0);
  assert.equal(pathCoverage(retest).spans[0].lanes.tx.status,'unknown');
  const repatched=changeCase(s,{type:'port',point:1,value:25});
  assert.equal(pathCoverage(repatched).optic,'unknown');
  assert.equal(pathCoverage(createCase()).txThrough,0);
});
