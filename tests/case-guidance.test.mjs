import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,identityLabels,caseHistory,restoreCaseHistory} from '../troubleshoot-state.mjs';
import {caseGuidance,retestFindingActions} from '../case-guidance.mjs';
import {translate} from '../locale.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const mapped=s=>Object.keys(identityLabels).reduce((v,key)=>changeCase(v,{type:'identity',key,value:true}),s);
const trace=(s,from,to,strand,result)=>apply(s,{type:'vfl-point-checks'},{type:'trace',from,to},{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
const loop=(s,point,result,side)=>apply(s,{type:'place',kind:point===0||point===s.count+1?'lc':'mmc',point},{type:'loop-side',value:side},{type:'ready',value:true},{type:'record',result});

test('an unavailable reference stays unresolved and cannot stand in for a passing source check',()=>{
  let s=trace(mapped(createCase()),0,1,'rx','dark');
  const original={...s.traces};
  s=changeCase(s,{type:'comparison',key:'1:rx',step:'source',value:'unavailable'});
  assert.equal(s.comparisons['1:rx']?.source,'unavailable');
  assert.deepEqual(s.traces,original);
  assert.equal(assessment(s).diagnostic.step,'source');
  assert.equal(caseGuidance(s).heading,'Get the next test arranged');
  assert.equal(caseGuidance(s).steps[0],assessment(s).next);
  assert.notEqual(assessment(s).complete,true);
  assert.ok(assessment(s).causes.some(c=>c.id==='vfl-setup'));
  assert.equal(changeCase(s,{type:'comparison',key:'1:rx',step:'inspection',value:'clear'}),s);
  const restored=restoreCaseHistory(structuredClone(s),s);
  assert.equal(restored.comparisons['1:rx'].source,'unavailable');
  s=changeCase(s,{type:'comparison',key:'1:rx',step:'source',value:'pass'});
  assert.equal(assessment(s).diagnostic.step,'inspection');
});

test('findings expose the bounded section, tested source and strand with usable inspection steps',()=>{
  for(const [from,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) {
    let s=trace(trace(mapped(createCase()),from,near,'rx','seen'),from,far,'rx','dark');
    const guide=caseGuidance(s);
    assert.equal(guide.area,'CAS 1 ↔ CAS 2');
    assert.equal(guide.source,side==='local'?'Local optic':'Remote optic');
    assert.equal(guide.strand,'B');
    assert.equal(guide.heading,'Inspect this section');
    assert.equal(guide.steps.length,3);
    assert.ok(guide.tools.length>0);
    for(const lang of ['es','fr','ar']) for(const value of [guide.heading,guide.unavailable,...guide.steps,...guide.tools,...guide.outcomes.flat()])
      assert.notEqual(translate(value,lang),value,`${lang}: ${value}`);
    const otherStrand=trace(trace(mapped(createCase()),from,near,'tx','seen'),from,far,'rx','dark');
    assert.equal(assessment(otherStrand).sourceEvidence,undefined,'a passing neighboring strand does not validate B');
    assert.equal(assessment(otherStrand).check.to,near);
    assert.equal(assessment(otherStrand).check.strand,'rx','the unchecked B strand must be tested at the earlier point');
    s=loop(loop(loop(createCase(),from,'pass',side),near,'pass',side),far,'dark',side);
    assert.equal(caseGuidance(s).area,'CAS 1 ↔ CAS 2');
    assert.equal(caseGuidance(s).source,side==='local'?'Local optic':'Remote optic');
  }
});

test('after a change, retest returns to the failed source and strand while keeping only historical evidence',()=>{
  for(const [from,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) {
    const before=trace(trace(mapped(createCase()),from,near,'rx','seen'),from,far,'rx','dark');
    let s=apply(before,...retestFindingActions(before));
    assert.equal(s.round,before.round+1);
    assert.equal(s.vflFrom,from);
    assert.equal(s.selected,far);
    assert.equal(s.strand,'rx');
    assert.equal(s.ready,false);
    assert.deepEqual(s.traces,{});
    assert.ok(caseHistory(s).every(row=>!row.current));
    assert.equal(caseHistory(s).length,caseHistory(before).length);
    const loops=loop(loop(loop(createCase(),from,'pass',side),near,'pass',side),far,'dark',side);
    s=apply(loops,...retestFindingActions(loops));
    assert.equal(s.tool,'loop');assert.equal(s.loopSide,side);assert.equal(s.selected,far);
    assert.deepEqual(s.loops,{});assert.deepEqual(s.remoteLoops,{});
    assert.equal(s.service,'unknown');
    const multiple=loop(loop(loop(createCase(),from,'pass',side),near,'dark',side),far,'dark',side);
    s=apply(multiple,...retestFindingActions(multiple));
    assert.equal(s.selected,near,'retest the first failing boundary from the tested source');
  }
  const conflict=loop(loop(loop(createCase(),0,'pass','local'),1,'dark','local'),2,'pass','local');
  assert.deepEqual(retestFindingActions(conflict),[],'disagreements prompt a repeat check rather than a silent repair reset');
});

test('combined loops and VFL expose the failing strand and the supporting results together',()=>{
  for(const [from,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) for(const bad of ['tx','rx']) {
    const good=bad==='tx'?'rx':'tx';
    let s=loop(loop(loop(createCase(),from,'pass',side),near,'pass',side),far,'dark',side);
    s=trace(trace(s,from,near,'tx','seen'),from,near,'rx','seen');
    s=trace(trace(s,from,far,bad,'dark'),from,far,good,'seen');
    const guide=caseGuidance(s);
    assert.equal(guide.area,'CAS 1 ↔ CAS 2');
    assert.equal(guide.strand,bad==='tx'?'A':'B');
    assert.equal(assessment(s).isolation.kind,'fiber-contacts');
    assert.deepEqual(guide.evidence.filter(r=>r.kind==='loop').map(r=>[r.point,r.result]),[[from,'pass'],[near,'pass'],[far,'dark']]);
    assert.deepEqual(guide.evidence.filter(r=>r.kind==='vfl').map(r=>[r.point,r.lanes.tx,r.lanes.rx]),[[near,'seen','seen'],[far,bad==='tx'?'dark':'seen',bad==='rx'?'dark':'seen']]);
    assert.ok(!assessment(s).causes.some(c=>['optic','damage'].includes(c.id)),'a dark channel does not establish optic or ferrule damage');
    assert.equal(caseGuidance(mapped(s)).heading,'Inspect this section');
    const newRound=changeCase(s,{type:'retest'});
    assert.deepEqual(caseGuidance(newRound).evidence,[],'the summary must not reuse previous-round results');
  }
});
