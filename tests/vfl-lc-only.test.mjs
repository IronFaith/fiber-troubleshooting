import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,canPlaceTool,traceFrom,nextCheckActions,caseHistory,restoreCaseHistory} from '../troubleshoot-state.mjs';
const apply=(s,...actions)=>actions.reduce(changeCase,s);
const observe=(s,result)=>apply(s,{type:'ready',value:true},{type:'record',result});

test('VFL attaches only to reachable LC legs, never a cassette or MMC',()=>{
  const initial=createCase();
  for(const point of [1,2]) {
    assert.equal(canPlaceTool(initial,'vfl',point),false);
    assert.equal(changeCase(initial,{type:'place',kind:'vfl',point,atSource:true}),initial);
    assert.equal(changeCase(initial,{type:'trace',from:point,to:0}),initial);
  }
  for(const point of [0,3]) {
    const s=changeCase(initial,{type:'place',kind:'vfl',point});
    assert.equal(traceFrom(s),point);
    assert.equal(s.selected,point===0?1:2);
    assert.deepEqual(s.traces,{});
  }
  assert.equal(canPlaceTool(changeCase(initial,{type:'reach',value:2}),'vfl',3),false);
});

test('cassette checks and next steps keep the VFL on the same LC leg from either end',()=>{
  for(const [from,to,incoming] of [[0,1,'rear'],[3,2,'front']]) {
    let s=changeCase(createCase(),{type:'trace',from,to});
    s=observe(s,'seen');
    s=observe(changeCase(s,{type:'strand',value:'rx'}),'dark');
    s=apply(s,...nextCheckActions(s));
    assert.equal(traceFrom(s),from);
    assert.equal(s.patches[to][incoming],false,'MMC is an observation point, not a VFL source');
    s=observe(s,'seen');
    s=apply(s,...nextCheckActions(s));
    assert.equal(traceFrom(s),from);
    assert.equal(s.patches[to][incoming],true);
    assert.equal(changeCase(s,{type:'trace',from:to,to:from}),s);
  }
});

test('old passive-source traces remain history without being reused as current LC evidence',()=>{
  const raw={...createCase(),tool:'vfl',vflFrom:1,selected:2,ready:true,traces:{'2:tx':'seen','1:rx':'dark'},
    history:[{kind:'vfl',key:'2:tx',result:'seen',round:1,ports:[12,12]},
      {kind:'vfl',key:'1:rx',result:'dark',round:1,ports:[12,12]}]};
  const s=restoreCaseHistory(structuredClone(raw),raw);
  assert.deepEqual(s.traces,{'1:rx':'dark'});
  assert.equal(s.tool,'link');
  assert.equal(s.ready,false);
  assert.deepEqual(caseHistory(s).map(e=>e.current),[false,true]);
});
