import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,traceKey} from '../troubleshoot-state.mjs';
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
