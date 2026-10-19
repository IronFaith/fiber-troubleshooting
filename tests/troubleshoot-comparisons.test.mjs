import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,identityLabels,identityConfirmed,comparisonGuide,caseHistory,restoreCaseHistory,pathCoverage} from '../troubleshoot-state.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const record=(s,result)=>apply(s,{type:'ready',value:true},{type:'record',result});
const mapped=s=>Object.keys(identityLabels).reduce((v,key)=>changeCase(v,{type:'identity',key,value:true}),s);
const compare=(s,step,value,key='2>1:rx:head')=>changeCase(s,{type:'comparison',key,step,value});
function splitPair() {
  let s=apply(createCase(),{type:'trace',from:2,to:1},{type:'patch',point:1,side:'front',connected:false});
  s=record(s,'seen');
  return record(changeCase(s,{type:'strand',value:'rx'}),'dark');
}

test('path identity is explicit, survives Normalize, and resets after a mapping change or repair',()=>{
  let s=record(apply(createCase(),{type:'place',kind:'lc',point:0}),'pass');
  assert.equal(identityConfirmed(s),false);
  s=mapped(s);
  const coverage=pathCoverage(s);
  s=changeCase(s,{type:'normalize'});
  assert.equal(identityConfirmed(s),true);
  assert.deepEqual(pathCoverage(s),coverage);
  s=changeCase(s,{type:'identity',key:'fanout',value:false});
  assert.equal(identityConfirmed(s),false);
  assert.equal(s.loops[0],'pass','unverified identity does not erase a physical pass');
  assert.equal(caseHistory(s).filter(e=>e.kind==='identity'&&e.key==='fanout'&&e.current)[0].result,'unchecked');
  assert.deepEqual(restoreCaseHistory(structuredClone(s),JSON.parse(JSON.stringify(s))).identity,s.identity);
  assert.equal(identityConfirmed(restoreCaseHistory(createCase(),{})),false,'legacy cases never get automatic check-offs');
  for(const action of [{type:'retest'},{type:'port',point:1,value:25},{type:'patch',point:1,side:'rear',connected:true,port:25}]) {
    const updated=changeCase(mapped(s),action);
    assert.equal(identityConfirmed(updated),false);
    assert.ok(updated.history.some(e=>e.kind==='identity'),'prior identity observations remain reviewable');
  }
});

test('one dark channel at a loose MMC head accumulates actionable comparison evidence',()=>{
  let s=splitPair();
  let a=assessment(s);
  assert.match(a.title,/Strand B is dark/);
  assert.match(a.scope,/receiving CAS 1 mating connection is bypassed/);
  assert.equal(a.check,null,'adjacent endpoints do not invent an earlier viewing point');
  assert.equal(a.diagnostic.step,'source');
  s=compare(s,'source','fail');
  assert.match(assessment(s).comparisonFinding,/reference is also dark/);
  assert.equal(compare(s,'substitute','light'),s,'cannot skip the reference check');
  s=compare(s,'source','pass');
  assert.equal(assessment(s).needsIdentity,true);
  s=mapped(s);
  assert.equal(assessment(s).diagnostic.step,'inspection');
  s=compare(s,'inspection','clear');
  assert.equal(assessment(s).diagnostic.step,'substitute');
  const before=structuredClone(s.traces);
  s=compare(s,'substitute','light');
  assert.match(assessment(s).comparisonFinding,/does not prove a damaged ferrule/);
  assert.deepEqual(s.traces,before,'a reference or spare is not a pass for the original route');
  assert.equal(assessment(s).complete,undefined);
  assert.equal(caseHistory(s).filter(e=>e.kind==='comparison'&&e.current).length,3);
  assert.equal(comparisonGuide(s,'2>1:tx:head'),null,'successful A does not inherit B comparisons');
  s=changeCase(s,{type:'normalize'});
  assert.match(assessment(s).comparisonFinding,/replacement passes/);
  const withCasFailure={...s,traces:{'2>1:rx':'dark',...s.traces}};
  assert.match(assessment(withCasFailure).comparisonFinding,/replacement passes/,'an earlier through-CAS failure must not hide the loose-head investigation');
  const restored=restoreCaseHistory(structuredClone(s),JSON.parse(JSON.stringify(s)));
  assert.deepEqual(restored.comparisons,s.comparisons);
  assert.deepEqual(caseHistory(restored),caseHistory(s));
});

test('comparison outcomes remain scoped and stale evidence cannot clear a fault',()=>{
  const prepared=compare(mapped(compare(splitPair(),'source','pass')),'inspection','clear');
  const stillDark=compare(prepared,'substitute','dark');
  assert.match(assessment(stillDark).next,/original assembly is not cleared/);
  assert.match(assessment(compare(prepared,'substitute','unavailable')).next,/optical loss test/);
  const damaged=compare(mapped(compare(splitPair(),'source','pass')),'inspection','damage');
  assert.match(assessment(damaged).comparisonFinding,/Visible damage/);
  assert.equal(compare(damaged,'substitute','light'),damaged,'repair and retest follow observed damage');
  let s=record(apply(prepared,{type:'trace',from:2,to:1},{type:'strand',value:'rx'}),'dark');
  assert.equal(s.comparisons['2>1:rx:head'],undefined,'a fresh original observation starts fresh comparisons');
  s=changeCase(prepared,{type:'retest'});
  assert.deepEqual(s.comparisons,{});
  assert.ok(caseHistory(s).filter(e=>e.kind==='comparison').every(e=>!e.current));
  const changed=changeCase(prepared,{type:'patch',point:1,side:'front',connected:false,port:13});
  assert.deepEqual(changed.comparisons,{});
  const unchecked=changeCase(prepared,{type:'identity',key:'channels',value:false});
  assert.deepEqual(unchecked.comparisons,{});
  const other=record(apply(prepared,{type:'trace',from:1,to:2},{type:'strand',value:'rx'}),'dark');
  assert.equal(comparisonGuide(other,'2:rx').diagnostic.step,'source','reverse direction needs its own reference check');
  const invalid=restoreCaseHistory(splitPair(),{comparisons:{'2>1:rx:head':{source:'made-up',substitute:'light'}},identity:{optic:'true'},history:[{kind:'comparison',key:'bad~source',result:'pass',round:1}]});
  assert.deepEqual(invalid.comparisons,{});
  assert.equal(identityConfirmed(invalid),false);
});
