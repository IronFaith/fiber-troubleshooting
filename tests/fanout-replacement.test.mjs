import test from 'node:test';
import assert from 'node:assert/strict';
import {newFanoutReplacement,changeFanoutReplacement,canPatchFanout} from '../fanout-replacement-state.mjs';
import {translate} from '../locale.mjs';

test('replacement stays blocked until the old leader and every follower are cleared',()=>{
  let state=newFanoutReplacement();
  assert.equal(canPatchFanout(state),false);
  assert.equal(changeFanoutReplacement(state,{type:'patchNew'}).newLeaderPatched,false);
  state=changeFanoutReplacement(state,{type:'clearLeader'});
  assert.equal(canPatchFanout(state),false);
  for(let leg=1;leg<12;leg++) state=changeFanoutReplacement(state,{type:'clearFollower',leg});
  assert.equal(state.followers.filter(Boolean).length,1);
  assert.equal(changeFanoutReplacement(state,{type:'patchNew'}).newLeaderPatched,false);
  state=changeFanoutReplacement(state,{type:'clearFollower',leg:12});
  assert.equal(canPatchFanout(state),true);
  state=changeFanoutReplacement(state,{type:'patchNew'});
  assert.equal(state.newLeaderPatched,true);
  assert.equal(canPatchFanout(state),false);
});

test('training actions preserve follower identity and restarting creates a clean independent attempt',()=>{
  const initial=newFanoutReplacement();
  assert.equal(changeFanoutReplacement(initial,{type:'clearFollower',leg:7}),initial);
  let state=changeFanoutReplacement(initial,{type:'clearLeader'});
  for(const leg of [0,13,NaN,1.5]) assert.equal(changeFanoutReplacement(state,{type:'clearFollower',leg}),state);
  state=changeFanoutReplacement(state,{type:'clearFollower',leg:7});
  state=changeFanoutReplacement(state,{type:'clearFollower',leg:7});
  assert.deepEqual(state.followers.map((patched,index)=>patched?null:index+1).filter(Boolean),[7]);
  const restarted=newFanoutReplacement();
  assert.equal(restarted.leaderCleared,false);
  assert.equal(restarted.followers.filter(Boolean).length,12);
  assert.equal(initial.followers.filter(Boolean).length,12);
});

test('fanout instructions and removal feedback translate without changing identifiers',()=>{
  const messages=['Fanout replacement','Simulation activities','Find the MMC','Save and match the map','Unpatch the old bundle','Patch the new bundle','Check every link','Clear the MMC AND every leg before adding the new MMC.','Practice unpatching','See the mapping example','Unpatch old follower leg 7','Leg 7 cleared. Old followers remaining: 5.','12 remaining','Patch replacement leader','Restart this simulation','Unpatched','New leader patched','Old leader · S747885346FWL'];
  for(const language of ['es','fr','ar']){
    for(const message of messages) assert.notEqual(translate(message,language),message,`${language}: ${message}`);
    assert.ok(translate('Old leader · S747885346FWL',language).includes('S747885346FWL'));
    assert.ok(translate('Leg 7 cleared. Old followers remaining: 5.',language).includes('7'));
    assert.ok(translate('Leg 7 cleared. Old followers remaining: 5.',language).includes('5'));
  }
});
