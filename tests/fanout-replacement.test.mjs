import test from 'node:test';
import assert from 'node:assert/strict';
import {newFanoutReplacement,changeFanoutReplacement,canCompleteFanout} from '../fanout-replacement-state.mjs';
import {translate} from '../locale.mjs';

test('checklist accepts any order but completes only after the head and all legs are checked',()=>{
  for(const headFirst of [true,false]) {
    let state=newFanoutReplacement();
    assert.equal(changeFanoutReplacement(state,{type:'complete'}),state);
    if(headFirst) state=changeFanoutReplacement(state,{type:'verifyHead'});
    for(let leg=12;leg>=1;leg--) {
      assert.equal(canCompleteFanout(state),false);
      state=changeFanoutReplacement(state,{type:'verifyLeg',leg});
    }
    if(!headFirst) {
      assert.equal(canCompleteFanout(state),false);
      state=changeFanoutReplacement(state,{type:'verifyHead'});
    }
    assert.equal(canCompleteFanout(state),true);
    state=changeFanoutReplacement(state,{type:'complete'});
    assert.equal(state.completed,true);
    assert.equal(canCompleteFanout(state),false);
    assert.equal(changeFanoutReplacement(state,{type:'verifyLeg',leg:7}),state);
  }
});

test('checks preserve leg identity, reject invalid legs and restart independently',()=>{
  const initial=newFanoutReplacement();
  let state=changeFanoutReplacement(initial,{type:'verifyLeg',leg:7});
  for(const leg of [0,13,NaN,1.5]) assert.equal(changeFanoutReplacement(state,{type:'verifyLeg',leg}),state);
  state=changeFanoutReplacement(state,{type:'verifyLeg',leg:7});
  assert.deepEqual(state.legsVerified.map((checked,index)=>checked?index+1:null).filter(Boolean),[7]);
  const restarted=newFanoutReplacement();
  assert.equal(restarted.headVerified,false);
  assert.equal(restarted.legsVerified.filter(Boolean).length,0);
  assert.equal(initial.legsVerified.filter(Boolean).length,0);
});

test('fanout instructions and checklist feedback translate without changing identifiers',()=>{
  const messages=['Fanout replacement','Simulation activities','Find the MMC','Save and match the map','Replace under the approved procedure','Update and verify the record','Check every link','Practice checking the map','See the mapping example','Check mapping for leg 7','Leg 7 checked. Legs remaining: 5.','12 remaining','Finish checklist','Restart this simulation','Head checked','Checklist complete','Head · DEMO-FANOUT-001'];
  for(const language of ['es','fr','ar']){
    for(const message of messages) assert.notEqual(translate(message,language),message,language+': '+message);
    assert.ok(translate('Head · DEMO-FANOUT-001',language).includes('DEMO-FANOUT-001'));
    assert.ok(translate('Leg 7 checked. Legs remaining: 5.',language).includes('7'));
    assert.ok(translate('Leg 7 checked. Legs remaining: 5.',language).includes('5'));
  }
});
