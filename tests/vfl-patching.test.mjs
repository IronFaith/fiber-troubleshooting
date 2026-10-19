import test from 'node:test';
import assert from 'node:assert/strict';
import {createCase,changeCase,traceKey,assessment} from '../troubleshoot-state.mjs';
import {vflEndpoint} from '../troubleshoot-visuals.mjs';

const apply=(s,...actions)=>actions.reduce(changeCase,s);
const observe=s=>apply(s,{type:'ready',value:true},{type:'record',result:'seen'});

test('unplugging the incoming MMC moves the observation to its loose head; reconnecting requires a fresh result',()=>{
  let s=apply(createCase(),{type:'trace',from:0,to:1},{type:'patch',point:1,side:'rear',connected:false});
  assert.equal(vflEndpoint(s).incomingSeated,false);
  assert.equal(vflEndpoint(s).emitting,false);
  s=observe(s);
  assert.equal(vflEndpoint(s).emitting,true);
  assert.match(traceKey(s),/:head$/);
  s=changeCase(s,{type:'patch',point:1,side:'rear',connected:true});
  assert.equal(vflEndpoint(s).incomingSeated,true);
  assert.equal(vflEndpoint(s).emitting,false);
  assert.deepEqual(s.traces,{'1:tx:head':'seen'});
  s=changeCase(s,{type:'normalize'});
  assert.deepEqual(s.patches,{});
});

test('an open intermediate connector stops a forward or reverse trace and prevents claiming light beyond it',()=>{
  for(const [from,to,side] of [[0,2,'front'],[2,0,'rear']]) {
    let s=apply(createCase(),{type:'trace',from,to},{type:'patch',point:1,side,connected:false});
    assert.equal(vflEndpoint(s).point,1);
    assert.equal(vflEndpoint(s).blocked,true);
    assert.deepEqual(observe(s).traces,{});
    s=changeCase(s,{type:'trace',from,to:1});
    assert.equal(vflEndpoint(s).blocked,false);
    s=observe(s);
    assert.equal(vflEndpoint(s).emitting,true);
    s=apply(s,{type:'patch',point:1,side,connected:true},{type:'trace',from,to});
    assert.equal(to===0?vflEndpoint(s)===null:vflEndpoint(s).point===2,true);
  }
});

test('patching a different numbered port preserves the FIM target and invalidates only affected evidence',()=>{
  let s=createCase();
  for(const point of [0,1,2]) s=apply(s,{type:'select',point},{type:'tool',tool:'loop'},{type:'ready',value:true},{type:'record',result:'pass'});
  s=observe(changeCase(s,{type:'trace',from:0,to:2}));
  s=changeCase(s,{type:'patch',point:2,side:'rear',connected:true,port:25});
  assert.equal(vflEndpoint(s).port,25);
  assert.equal(s.ports[1],12);
  assert.deepEqual(s.loops,{0:'pass',1:'pass'});
  assert.deepEqual(s.traces,{});
  assert.equal(changeCase(s,{type:'patch',point:3,side:'rear',connected:false}),s);
  s=observe(s);
  assert.equal(vflEndpoint(s).emitting,true);
  const normalized=changeCase(s,{type:'normalize'});
  assert.equal(assessment(s).tone,'suspect');
  assert.deepEqual(normalized.traces,{});
  assert.deepEqual(normalized.loops,{0:'pass',1:'pass'});
  s=changeCase(s,{type:'patch',point:2,side:'front',connected:true});
  assert.equal(vflEndpoint(s).closed,true);
  assert.deepEqual(observe(s).traces,s.traces); // Closed endpoint rejects a new record but keeps the earlier observation.
  assert.equal(s.traces['0>2:tx'],'seen');
});
