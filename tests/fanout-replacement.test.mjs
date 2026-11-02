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
  const messages=['Fanout replacement','Simulation activities',"Find its connection record","Find the device port and leg serial. Follow the record to its MMC, CAS and passive port.","Show example: trace the connection","Connection records","Find the port, then read the leg serial.","Example device ports","Device port","Leg serial","3 example ports shown. The path follows the highlighted leg.","Find its MMC and CAS port","Selected connection path","Follow the boxes to the matching CAS and port.","Leg serial → MMC head serial → CAS and port","Fictional records. Serial formats are examples only.","Show the full active/passive build","Passive port","This MMC holds the 12 legs to replace.",'Active leg list','Passive MMC list','Find this leg','Find this MMC','View leg list','View MMC list','Match the same MMC serial in both lists.','Fanout replacement | Fiber Optics Fundamentals','← Back to simulations','Fully patched example','Active and passive block diagram','192 legs ÷ 12 legs per MMC = 16 MMCs','Counts show patched / required. Each P shows 16/16 MMCs in this example.','Legs patched','MMCs patched','Passive','192 legs','12 legs per MMC','16 MMCs',"Fictional example · 12 LC legs","Replace one MMC and all 12 legs. Keep every connection matched.","Find the damaged leg","Show example: leg to MMC","Open the device pair. Match the MMC serial in the active leg list (A) and passive list (P).","Save all 12 connections","Save the MMC location and port, plus all 12 leg destinations. Match the installed labels.","Replace and update","Replace the fanout using the approved procedure, then update its MMC and 12 leg records.","Replacement reminders",'Check every link','Practice checking the map','See the mapping example','Check mapping for leg 7','Leg 7 checked. Legs remaining: 5.','12 remaining','Finish checklist','Restart this simulation','Head checked','Checklist complete','Head · SN.4827.0619'];
  for(const language of ['es','fr','ar']){
    for(const message of messages) assert.notEqual(translate(message,language),message,language+': '+message);
    assert.ok(translate('Head · SN.4827.0619',language).includes('SN.4827.0619'));
    assert.ok(translate('Leg 7 checked. Legs remaining: 5.',language).includes('7'));
    assert.ok(translate('Leg 7 checked. Legs remaining: 5.',language).includes('5'));
  }
});
