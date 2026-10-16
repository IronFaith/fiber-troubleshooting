import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,simulatedLoop,simulatedTrace,simulatedReadings,assessment} from '../troubleshoot-state.mjs';
const record = (s,point,result,tool='loop') => [
  {type:'select',point},{type:'tool',tool},{type:'ready',value:true},{type:'record',result}
].reduce(changeCase,s);

test('loops bracket added fiber while TX, polarity and VFL retain their distinct meanings', () => {
  let s = createCase(true);
  assert.equal(simulatedLoop(s,0),'pass');
  assert.equal(simulatedLoop(s,1),'pass');
  assert.equal(simulatedLoop(s,2),'dark');
  assert.deepEqual(simulatedReadings(s),{tx:'good',rx:'good',farRx:'dark'});
  assert.equal(simulatedTrace(s,2,'tx'),'dark');
  assert.equal(simulatedTrace(s,2,'rx'),'seen');
  s = changeCase(s,{type:'fault',value:{kind:'misport'}});
  assert.deepEqual(simulatedReadings(s),{tx:'good',rx:'good',farRx:'dark'});
  assert.equal(simulatedTrace(s,2,'tx'),'wrong');
  s = changeCase(s,{type:'fault',value:{kind:'polarity',at:1}});
  assert.equal(simulatedLoop(s,2),'pass');
  assert.equal(simulatedReadings(s).tx,'good');
  assert.equal(simulatedReadings(s).rx,'dark');
  assert.equal(simulatedTrace(s,1,'tx'),'swapped');
  s = changeCase(s,{type:'fault',value:{kind:'dirty',severity:'weak'}});
  assert.equal(simulatedLoop(s,2),'weak');
  assert.equal(simulatedTrace(s,1,'tx'),'seen');
  s = changeCase(s,{type:'fault',value:{kind:'optic_tx'}});
  assert.equal(simulatedLoop(s,0),'dark');
  assert.equal(simulatedTrace(s,1,'tx'),'seen');
  assert.equal(simulatedReadings(s).tx,'dark');
});

test('real observations require a prepared test and isolate only the evidence-supported section', () => {
  let s = changeCase(createCase(),{type:'tool',tool:'loop'});
  assert.equal(changeCase(s,{type:'record',result:'pass'}),s);
  assert.deepEqual(s.loops,{});
  s = record(s,0,'pass');
  s = record(s,1,'pass');
  s = record(s,2,'dark');
  assert.equal(assessment(s).from,1);
  assert.equal(assessment(s).to,2);
  s = record(s,2,'seen','vfl');
  assert.equal(assessment(s).tone,'trace');
  assert.equal(assessment(s).lastPass,1);
  assert.match(assessment(s).why,/does not prove acceptable IR loss/);
  s = record(s,2,'wrong','vfl');
  assert.equal(assessment(s).tone,'suspect');
  assert.match(assessment(s).next,/FIM/);
});

test('changed topology and contradictory retests discard stale results; inaccessible tests cannot be selected', () => {
  let s = record(record(createCase(),0,'pass'),2,'pass');
  s = record(s,0,'dark');
  assert.deepEqual(s.loops,{0:'dark'});
  s = record(s,1,'pass');
  assert.deepEqual(s.loops,{1:'pass'});
  s = changeCase(s,{type:'port',value:32});
  assert.deepEqual(s.loops,{});
  assert.equal(s.ports[0],32);
  s = changeCase(s,{type:'reach',value:0});
  s = changeCase(s,{type:'select',point:2});
  assert.equal(s.selected,0);
  assert.equal(changeCase(s,{type:'tool',tool:'vfl'}),s);
  assert.equal(changeCase(s,{type:'port',value:12}),s);
  const simulation = record(createCase(true),2,'pass');
  assert.equal(simulation.loops[2],'dark');
  assert.deepEqual(changeCase(simulation,{type:'fault',value:{kind:'none'}}).loops,{});
  assert.deepEqual(createCase().loops,{});
});

test('placing a dragged tool accepts only matching reachable hardware and never supplies a result', () => {
  let s=createCase();
  const place=(kind,point)=>changeCase(s,{type:'place',kind,point});
  assert.equal(place('mmc',0),s);
  assert.equal(place('lc',1),s);
  assert.equal(place('vfl',0),s);
  assert.equal(place('mmc',3),s);
  s=place('lc',0);
  assert.equal(s.tool,'loop');
  assert.deepEqual(s.loops,{});
  assert.equal(s.ready,false);
  s=record(s,0,'pass');
  s=place('mmc',1);
  assert.equal(s.selected,1);
  assert.deepEqual(s.loops,{0:'pass'});
  s=place('vfl',2);
  assert.equal(s.tool,'vfl');
  assert.deepEqual(s.traces,{});
  s=changeCase(s,{type:'reach',value:1});
  assert.equal(place('vfl',2),s);
});

test('an unknown fault is narrowed by observations, checking a skipped passive before tracing a broad span', () => {
  let s=record(record(createCase(),0,'pass'),2,'dark');
  assert.deepEqual(assessment(s).suggestion,{point:1,tool:'loop'});
  s=record(s,1,'pass');
  assert.deepEqual([assessment(s).from,assessment(s).to],[1,2]);
  assert.deepEqual(assessment(s).suggestion,{point:2,tool:'vfl'});
  assert.equal(s.simulated,false);
});

test('restored-link observations distinguish local loop success from a resolved link and reset on the next test', () => {
  let s=record(record(record(createCase(),0,'pass'),1,'pass'),2,'pass');
  s=changeCase(s,{type:'tool',tool:'link'});
  s=changeCase(s,{type:'service',value:'bad'});
  assert.equal(s.service,'bad');
  assert.equal(assessment(s).tone,'suspect');
  assert.deepEqual(assessment(s).suggestion,{point:1,tool:'vfl'});
  s=changeCase(s,{type:'service',value:'good'});
  assert.equal(assessment(s).complete,true);
  s=changeCase(s,{type:'place',kind:'mmc',point:1});
  assert.equal(s.service,'unknown');
  assert.notEqual(assessment(s).complete,true);
  assert.equal(changeCase(createCase(),{type:'service',value:'good'}).service,'unknown');
});
