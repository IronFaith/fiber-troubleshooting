import test from 'node:test';
import assert from 'node:assert/strict';
import {patchTasks,targetSlot,placementCorrect,recordPatchAnswer,patchResult,loadPatchBest,savePatchBest} from '../patch-practice-data.mjs';

test('LC destinations follow the 1/5 mapping through a flip, and MMC requires its mapped port',()=> {
  for(const [ethernet,flipped,expected] of [[1,false,'left'],[5,false,'right'],[1,true,'right'],[5,true,'left']]) {
    const task={kind:'lc',optic:25,ethernet,flipped};
    assert.equal(targetSlot(task),expected);
    assert.equal(placementCorrect(task,'lc',expected),true);
    assert.equal(placementCorrect(task,'lc',expected==='left' ? 'right' : 'left'),false);
    assert.equal(placementCorrect(task,'mmc',expected),false);
  }
  for(const task of patchTasks.filter(item=>item.kind==='mmc')) {
    assert.equal(placementCorrect(task,'mmc',String(task.port)),true);
    assert.equal(placementCorrect(task,'mmc',String(task.port-1)),false);
    assert.equal(placementCorrect(task,'lc',String(task.port)),false);
  }
});

test('five-question patching quiz counts only the first valid placement and needs 4/5 to pass',()=> {
  let answers={};
  assert.equal(recordPatchAnswer(answers,'unknown','lc','left'),answers);
  assert.equal(recordPatchAnswer(answers,'lc-left','lc','outside'),answers);
  assert.equal(recordPatchAnswer(answers,'mmc-top','mmc','33'),answers);
  answers=recordPatchAnswer(answers,'lc-left','mmc','left');
  assert.equal(recordPatchAnswer(answers,'lc-left','lc','left'),answers);
  for(const task of patchTasks.slice(1,4)) answers=recordPatchAnswer(answers,task.id,task.kind,targetSlot(task));
  assert.equal(patchResult(answers).complete,false);
  assert.equal(patchResult(answers).passed,false);
  const last=patchTasks[4];
  answers=recordPatchAnswer(answers,last.id,last.kind,targetSlot(last));
  const result=patchResult(answers);
  assert.equal(result.complete,true);
  assert.equal(result.correct,4);
  assert.equal(result.passed,true);
  assert.deepEqual(result.missed.map(task=>task.id),['lc-left']);
  assert.equal(patchResult({...answers,[last.id]:{connector:'mmc',slot:'1'}}).passed,false);
});

test('best patching score persists without lowering a previous result and tolerates blocked storage',()=> {
  const values=new Map(), storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  assert.deepEqual(loadPatchBest(storage),{best:null,canSave:true});
  assert.deepEqual(savePatchBest(storage,4),{best:4,canSave:true});
  assert.deepEqual(savePatchBest(storage,2),{best:4,canSave:true});
  assert.deepEqual(loadPatchBest(storage),{best:4,canSave:true});
  assert.deepEqual(savePatchBest(storage,6),{best:4,canSave:false});
  assert.equal(loadPatchBest({getItem:()=>'{bad'}).best,null);
  assert.equal(loadPatchBest({getItem:()=>'-1'}).best,null);
  assert.equal(loadPatchBest({getItem:()=> '"5"'}).best,null);
  assert.deepEqual(loadPatchBest(undefined),{best:null,canSave:false});
  assert.deepEqual(savePatchBest(undefined,3),{best:3,canSave:false});
});
