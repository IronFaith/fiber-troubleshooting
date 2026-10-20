import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,identityLabels,restoreCaseHistory,recordedContinuity} from '../troubleshoot-state.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const mapped=s=>Object.keys(identityLabels).reduce((v,key)=>changeCase(v,{type:'identity',key,value:true}),s);
const trace=(s,from,to,strand,result)=>apply(s,{type:'vfl-point-checks'},{type:'trace',from,to},{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
const loop=(s,point,result,side)=>apply(s,{type:'place',kind:point===0||point===s.count+1?'lc':'mmc',point},{type:'loop-side',value:side},{type:'ready',value:true},{type:'record',result});

test('an earlier same-strand VFL pass advances to inspection of the added section in either direction',()=>{
  for(const [from,near,far] of [[0,1,2],[3,2,1]]) {
    let s=trace(trace(mapped(createCase()),from,near,'rx','seen'),from,far,'rx','dark');
    let a=assessment(s);
    assert.deepEqual([a.from,a.to],[1,2]);
    assert.equal(a.diagnostic.step,'inspection');
    assert.equal(a.sourceEvidence.to,near);
    assert.equal(a.sourceEvidence.strand,'rx');
    assert.ok(!a.causes.some(c=>c.id==='optic'));
    s=changeCase(s,{type:'comparison',key:a.observation.key,step:'inspection',value:'clear'});
    assert.equal(assessment(s).diagnostic.step,'substitute');
    assert.equal(assessment(restoreCaseHistory(structuredClone(s),s)).diagnostic.step,'substitute','reload keeps the inspection supported by earlier continuity');
    let failedReference=trace(mapped(createCase()),from,far,'rx','dark');
    failedReference=changeCase(failedReference,{type:'comparison',key:a.observation.key,step:'source',value:'fail'});
    failedReference=trace(failedReference,from,near,'rx','seen');
    assert.equal(assessment(failedReference).diagnostic.step,'source','an explicitly failed reference overrides earlier continuity');
    s=trace(changeCase(s,{type:'retest'}),from,far,'rx','dark');
    assert.equal(assessment(s).sourceEvidence,undefined,'prior rounds cannot validate this source');
    const other=trace(trace(mapped(createCase()),from,near,'tx','seen'),from,far,'rx','dark');
    assert.equal(assessment(other).sourceEvidence,undefined,'another strand is not evidence for this LC attachment');
  }
});

test('an adjacent failed passive loop advances to VFL from the tested end instead of repeating the same loop',()=>{
  for(const [from,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) {
    const s=loop(loop(loop(createCase(),from,'pass',side),near,'pass',side),far,'dark',side);
    const a=assessment(s);
    assert.deepEqual([a.from,a.to],[1,2]);
    assert.equal(a.suggestion.tool,'vfl');
    assert.equal(a.suggestion.point,far);
    assert.equal(a.suggestion.side??'local',side);
    assert.ok(!a.causes.some(c=>c.id==='optic'));
  }
});

test('a farther loop pass cannot silently erase a nearer failure from the same optic',()=>{
  for(const [from,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) {
    let s=loop(loop(loop(createCase(),from,'pass',side),near,'dark',side),far,'pass',side);
    const a=assessment(s);
    assert.equal(a.issue,'conflict');
    assert.equal(a.tone,'suspect');
    assert.equal(a.suggestion.point,near);
    assert.equal(a.suggestion.side??'local',side);
    assert.ok(a.causes.some(c=>c.id==='loop-setup'));
    assert.notEqual(a.complete,true);
    const conflicting=recordedContinuity(s).spans.filter(span=>side==='local'?span.point<=far:span.point>far);
    assert.ok(conflicting.every(span=>Object.values(span.lanes).every(lane=>lane.issue&&!lane.ir)),'conflicting coverage cannot animate as confirmed');
    s=loop(s,near,'pass',side);
    assert.equal(assessment(s).tone,'pass');
  }
});
