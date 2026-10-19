import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,traceStop,nextCheckActions,vflProgress} from '../troubleshoot-state.mjs';

const apply=(s,...actions)=>actions.reduce(changeCase,s);
const observe=(s,strand,result='seen')=>apply(s,{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
function opening(s,from,to,head=false) {
  const dir=Math.sign(to-from),incoming=dir>0?'rear':'front',outgoing=dir>0?'front':'rear';
  s=changeCase(s,{type:'trace',from,to});
  for(let p=from+dir;p!==to;p+=dir) s=apply(s,{type:'patch',point:p,side:incoming,connected:true},{type:'patch',point:p,side:outgoing,connected:true});
  return apply(s,{type:'patch',point:to,side:incoming,connected:!head},{type:'patch',point:to,side:outgoing,connected:false});
}
const pair=s=>observe(observe(s,'tx'),'rx');

test('revisiting an earlier VFL opening keeps recorded onward evidence in both directions',()=>{
  for(const [from,near,far] of [[0,1,2],[3,2,1]]) {
    let s=pair(opening(createCase(),from,near));
    s=pair(opening(s,from,far));
    const recorded={...s.traces};
    s=opening(s,from,near,true);
    assert.deepEqual(s.traces,recorded,'unplugging for observation does not erase later measurements');
    s=changeCase(s,{type:'trace',from,to:far});
    assert.equal(traceStop(s).point,near,'physical light still stops at the open head');
    assert.equal(traceStop(s).blocked,true);
    assert.deepEqual(observe(s,'rx','dark').traces,recorded,'cannot measure beyond an open connection');
    const normalized=changeCase(s,{type:'normalize'});
    assert.deepEqual(normalized.traces,recorded);
    assert.deepEqual(changeCase(s,{type:'patch',point:near,side:from===0?'rear':'front',connected:true,port:20}).traces,{},'changing the route invalidates affected evidence');
    assert.deepEqual(changeCase(s,{type:'retest'}).traces,{});
  }
});

test('VFL guidance advances beyond completed points and isolates a later failed strand',()=>{
  for(const [from,near,far,end] of [[0,1,2,3],[3,2,1,0]]) {
    let s=pair(opening(createCase(),from,near));
    s=pair(opening(s,from,far));
    s=observe(opening(s,from,near),'tx');
    assert.equal(assessment(s).check.to,end,'reviewing an earlier pass must not send the technician through completed checks again');
    s=observe(opening(s,from,far),'rx','dark');
    assert.deepEqual([assessment(s).from,assessment(s).to],[Math.min(near,far),Math.max(near,far)]);
    assert.equal(assessment(s).check.head,true);
    assert.equal(assessment(s).check.strand,'rx');
    s=apply(s,...nextCheckActions(s));
    s=observe(s,'rx');
    assert.deepEqual([assessment(s).from,assessment(s).to],[far,far],'light at the loose head narrows the failure to its CAS connection');
    assert.match(assessment(s).title,/MMC \/ CAS connection/);
  }
});

test('recorded VFL path separates strands, source ends, head-only checks and through-CAS results',()=>{
  for(const [from,near,far,other] of [[0,1,2,3],[3,2,1,0]]) {
    let s=pair(opening(createCase(),from,near));
    s=observe(observe(opening(s,from,far),'tx'),'rx','dark');
    let progress=vflProgress(s);
    assert.deepEqual(progress.points.map(p=>p.point),[near,far,other]);
    assert.deepEqual(progress.points.map(p=>[p.lanes.tx.segment,p.lanes.rx.segment]),[['vfl','vfl'],['vfl','suspect'],['unknown','unknown']]);
    assert.equal(progress.points[1].lanes.tx.result,'seen');
    assert.equal(progress.points[1].lanes.rx.result,'dark');
    s=observe(opening(s,from,far,true),'rx');
    progress=vflProgress(s);
    assert.equal(progress.points[1].lanes.rx.segment,'vfl','light at the incoming head confirms continuity up to that connection');
    assert.equal(progress.points[1].lanes.rx.head,'seen');
    assert.equal(progress.points[1].lanes.rx.through,'dark','head continuity does not clear the failed CAS observation');
    assert.equal(progress.points[1].lanes.rx.result,'dark');
    const opposite=vflProgress(changeCase(s,{type:'trace',from:other,to:far}));
    assert.ok(opposite.points.every(p=>Object.values(p.lanes).every(l=>l.segment==='unknown'&&l.result===undefined)),'do not reuse evidence from the opposite source');
    assert.deepEqual(vflProgress(changeCase(s,{type:'normalize'})),progress);
    const headOnly=vflProgress(observe(opening(createCase(),from,near,true),'tx'));
    assert.equal(headOnly.points[0].lanes.tx.headOnly,true);
    assert.equal(headOnly.points[0].lanes.tx.through,undefined);
    assert.equal(headOnly.points[0].lanes.rx.result,undefined);
    const swapped=vflProgress(observe(opening(createCase(),from,near),'tx','swapped'));
    assert.equal(swapped.points[0].lanes.tx.segment,'suspect');
    assert.equal(swapped.points[0].lanes.tx.result,'swapped');
  }
});
