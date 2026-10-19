import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,vflProgress,nextCheckActions} from '../troubleshoot-state.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const record=(s,strand,result)=>apply(s,{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
function opening(s,from,to,head=false) {
  const direction=Math.sign(to-from),incoming=direction>0?'rear':'front',outgoing=direction>0?'front':'rear';
  s=changeCase(s,{type:'trace',from,to});
  for(let p=from+direction;p!==to;p+=direction)s=apply(s,{type:'patch',point:p,side:incoming,connected:true},{type:'patch',point:p,side:outgoing,connected:true});
  return apply(s,{type:'patch',point:to,side:incoming,connected:!head},{type:'patch',point:to,side:outgoing,connected:false});
}
const pair=s=>record(record(s,'tx','seen'),'rx','seen');

test('one passing VFL strand never clears the other fiber or identifies a ferrule as the cause',()=>{
  for(const [from,to] of [[0,1],[3,2]]) for(const dark of ['tx','rx']) {
    const good=dark==='tx'?'rx':'tx';
    const s=record(record(opening(createCase(),from,to),good,'seen'),dark,'dark');
    const issue=assessment(s).isolation;
    assert.equal(issue.kind,'fiber-contacts');
    assert.equal(issue.strand,dark);
    assert.deepEqual([issue.from,issue.to],[Math.min(from,to),Math.max(from,to)]);
    const lanes=vflProgress(s).points[0].lanes;
    assert.equal(lanes[good].segment,'vfl');
    assert.equal(lanes[good].isolation,null);
    assert.equal(lanes[dark].isolation.kind,'fiber-contacts');
    assert.equal(assessment(s).check.strand,dark);
    assert.equal(assessment(s).check.head,true);
    assert.equal(assessment(s).complete,undefined);
  }
});

test('the suspect channel narrows from the added section to the MMC / CAS contact only after a head pass',()=>{
  for(const [from,near,far] of [[0,1,2],[3,2,1]]) {
    let s=pair(opening(createCase(),from,near));
    s=record(record(opening(s,from,far),'tx','seen'),'rx','dark');
    let issue=assessment(s).isolation;
    assert.deepEqual([issue.kind,issue.from,issue.to],['fiber-contacts',Math.min(near,far),Math.max(near,far)]);
    s=apply(s,...nextCheckActions(s));
    const headDark=record(s,'rx','dark');
    assert.equal(assessment(headDark).isolation.kind,'fiber-contacts','a dark loose head has not implicated the bypassed CAS contact');
    s=record(s,'rx','seen');
    issue=assessment(s).isolation;
    assert.deepEqual([issue.kind,issue.from,issue.to,issue.strand],['mmc-cas-contact',far,far,'rx']);
    let point=vflProgress(s).points.find(p=>p.point===far);
    assert.equal(point.lanes.rx.segment,'vfl','incoming fiber remains continuity confirmed');
    assert.equal(point.lanes.rx.isolation.kind,'mmc-cas-contact');
    assert.equal(point.lanes.tx.isolation,null);
    assert.deepEqual(assessment(changeCase(s,{type:'normalize'})).isolation,issue);
    s=apply(s,...nextCheckActions(s));
    s=record(s,'rx','seen');
    point=vflProgress(s).points.find(p=>p.point===far);
    assert.equal(point.lanes.rx.isolation,null,'a recorded through-CAS pass clears that failed observation');
  }
});

test('inconsistent observations and opposite-source evidence cannot falsely isolate a connector',()=>{
  let s=record(opening(createCase(),0,1),'rx','dark');
  s=record(opening(s,0,2),'rx','seen');
  assert.equal(assessment(s).isolation.kind,'recheck');
  assert.equal(vflProgress(s).points[0].lanes.rx.isolation.kind,'recheck');
  const reverse=changeCase(s,{type:'trace',from:3,to:2});
  assert.ok(vflProgress(reverse).points.every(p=>Object.values(p.lanes).every(l=>l.isolation===null)));
  const retest=changeCase(s,{type:'retest'});
  assert.ok(vflProgress(retest).points.every(p=>Object.values(p.lanes).every(l=>l.isolation===null)));
});
