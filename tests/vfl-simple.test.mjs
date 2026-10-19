import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,traceKey,assessment,vflProgress,caseHistory,restoreCaseHistory,nextCheckActions} from '../troubleshoot-state.mjs';
import {vflEndpoint} from '../troubleshoot-visuals.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const record=(s,result)=>apply(s,{type:'ready',value:true},{type:'record',result});

test('placing a VFL previews light immediately and strand switching never invents observations',()=>{
  let s=changeCase(createCase(),{type:'trace',from:0,to:1});
  assert.equal(vflEndpoint(s,{preview:true}).emitting,true);
  assert.equal(vflEndpoint(s,{preview:true}).mode,'expected');
  s=changeCase(s,{type:'strand',value:'rx'});
  assert.equal(vflEndpoint(s,{preview:true}).outputStrand,'rx');
  assert.deepEqual(s.traces,{});
  s=record(s,'swapped');
  assert.equal(vflEndpoint(s,{preview:true}).outputStrand,'tx');
  assert.equal(vflEndpoint(s,{preview:true}).mode,'observation');
  s=record(s,'dark');
  assert.equal(vflEndpoint(s,{preview:true}).emitting,false);
  s=changeCase(s,{type:'strand',value:'tx'});
  assert.equal(vflEndpoint(s,{preview:true}).mode,'expected');
  assert.equal(vflEndpoint(s,{preview:true}).emitting,true);
});

test('light follows the first physical opening automatically, including the loose head and reverse LC end',()=>{
  let s=changeCase(createCase(),{type:'trace',from:0,to:2});
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:false});
  let light=vflEndpoint(s,{preview:true});
  assert.equal(light.point,1);
  assert.equal(light.kind,'head');
  assert.equal(light.emitting,true);
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:true});
  light=vflEndpoint(s,{preview:true});
  assert.equal(light.point,2);
  assert.equal(light.kind,'port');
  s=changeCase(s,{type:'trace',from:3,to:0});
  assert.equal(vflEndpoint(s,{preview:true})?.kind,'lc');
  assert.equal(vflEndpoint(s,{preview:true})?.emitting,true);
});

test('loose-head checks survive seating the same MMC so both strands can be compared before and after the connection',()=>{
  let s=apply(createCase(),{type:'trace',from:0,to:1},{type:'patch',point:1,side:'rear',connected:false});
  s=record(s,'seen');
  s=record(changeCase(s,{type:'strand',value:'rx'}),'dark');
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:true});
  assert.deepEqual(s.traces,{'1:tx:head':'seen','1:rx:head':'dark'});
  assert.equal(s.traces[traceKey(s)],undefined);
  s=record(s,'dark');
  assert.equal(s.traces['1:rx'],'dark');
  assert.equal(s.traces['1:tx:head'],'seen');
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:true,port:20});
  assert.deepEqual(s.traces,{});
});

test('weak VFL observations persist per strand, emit visible light and remain suspect in either direction',()=>{
  for(const [from,to] of [[0,1],[3,2]]) {
    let s=changeCase(createCase(),{type:'trace',from,to});
    s=record(s,'seen');
    s=record(changeCase(s,{type:'strand',value:'rx'}),'weak');
    assert.equal(s.traces[traceKey(s)],'weak');
    assert.equal(vflEndpoint(s,{preview:true}).result,'weak');
    assert.equal(vflEndpoint(s,{preview:true}).emitting,true);
    assert.equal(vflEndpoint(s,{preview:true}).outputStrand,'rx');
    const lanes=vflProgress(s).points[0].lanes;
    assert.equal(lanes.tx.result,'seen');
    assert.equal(lanes.rx.result,'weak');
    assert.equal(lanes.rx.segment,'suspect');
    assert.equal(caseHistory(restoreCaseHistory(s,s)).filter(e=>e.current&&e.result==='weak').length,1);
    assert.deepEqual(changeCase(s,{type:'normalize'}).traces,s.traces);
  }
});

test('weak light guides a same-strand head check without treating brightness as a loss measurement or a pass',()=>{
  for(const [from,to] of [[0,1],[3,2]]) {
    let s=record(changeCase(createCase(),{type:'trace',from,to}),'weak');
    let finding=assessment(s);
    assert.equal(finding.tone,'suspect');
    assert.match(finding.title,/weak light/);
    assert.match(finding.why,/not a loss measurement/);
    assert.deepEqual([finding.check.from,finding.check.to,finding.check.strand,finding.check.head],[from,to,'tx',true]);
    const atHead=apply(s,...nextCheckActions(s));
    const headPass=assessment(record(atHead,'seen'));
    assert.match(headPass.next,/both mating ends/);
    assert.equal(headPass.check.head,false,'do not repeat a head check already recorded');
    s=record(atHead,'weak');
    finding=assessment(s);
    assert.match(finding.next,/reference lead/);
    assert.equal(finding.check.head,true);
    s=record(changeCase(s,{type:'strand',value:'rx'}),'swapped');
    assert.match(assessment(s).title,/conflict/,'weak visible light still identifies its reported output channel');
  }
});
