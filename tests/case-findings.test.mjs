import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,assessment,identityLabels} from '../troubleshoot-state.mjs';
import {translate} from '../locale.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const loop=(s,point,result,side='local')=>apply(s,{type:'place',kind:point===0||point===s.count+1?'lc':'mmc',point},{type:'loop-side',value:side},{type:'ready',value:true},{type:'record',result});
const trace=(s,from,to,strand,result)=>apply(s,{type:'vfl-point-checks'},{type:'trace',from,to},{type:'strand',value:strand},{type:'ready',value:true},{type:'record',result});
const mapped=s=>Object.keys(identityLabels).reduce((v,key)=>changeCase(v,{type:'identity',key,value:true}),s);
const failedService=s=>apply(s,{type:'normalize'},{type:'service',value:'bad'});

test('a failed live-link check retains the isolated loop failure from either end',()=>{
  for(const [source,near,far,side] of [[0,1,2,'local'],[3,2,1,'remote']]) {
    const s=failedService(loop(loop(loop(createCase(),source,'pass',side),near,'pass',side),far,'dark',side));
    const a=assessment(s);
    assert.deepEqual([a.from,a.to],[1,2]);
    assert.equal(a.tone,'suspect');
    assert.ok(a.causes.some(c=>c.id==='contacts'));
    assert.ok(!a.causes.some(c=>c.id==='optic'),'a failed added section does not blame the passed source optic');
    assert.notEqual(a.complete,true);
  }
});

test('a dark strand narrows causes using reference, identity and inspection evidence',()=>{
  let s=trace(trace(trace(createCase(),0,1,'rx','seen'),0,2,'tx','seen'),0,2,'rx','dark');
  let a=assessment(s);
  assert.deepEqual([a.from,a.to],[1,2]);
  assert.ok(a.causes.some(c=>c.id==='fiber'));
  assert.ok(!a.causes.some(c=>c.id==='optic'),'VFL does not test the disconnected optic');
  s=changeCase(s,{type:'comparison',key:'0>2:rx',step:'source',value:'fail'});
  assert.deepEqual(assessment(s).causes.map(c=>c.id),['vfl-setup']);
  s=mapped(changeCase(s,{type:'comparison',key:'0>2:rx',step:'source',value:'pass'}));
  s=changeCase(s,{type:'comparison',key:'0>2:rx',step:'inspection',value:'damage'});
  assert.deepEqual(assessment(s).causes.map(c=>c.id),['damage']);
  for(const c of [...a.causes,...assessment(s).causes]) for(const lang of ['es','fr','ar']) assert.notEqual(translate(c.label,lang),c.label);
  s=changeCase(s,{type:'retest'});
  assert.deepEqual(assessment(s).causes,[],'earlier damage is not current-round evidence');
});

test('failed service checks follow missing evidence instead of restarting completed VFL checks',()=>{
  let s=failedService(loop(loop(loop(createCase(),0,'pass'),1,'pass'),2,'pass'));
  assert.equal(assessment(s).needsIdentity,true);
  s=mapped(s);
  assert.equal(s.service,'bad','checking identity alone does not repair or erase a failed live-link check');
  assert.deepEqual(assessment(s).suggestion,{point:3,tool:'loop',side:'remote'});
  s=loop(s,3,'pass','remote');
  s=trace(trace(s,0,3,'tx','seen'),0,3,'rx','seen');
  s=failedService(s);
  const a=assessment(s);
  assert.equal(a.suggestion,undefined);
  assert.equal(a.check,undefined);
  assert.deepEqual(a.causes.map(c=>c.id),['loss','configuration']);
  assert.notEqual(a.complete,true,'passing optics and visible continuity do not prove live service');
});
