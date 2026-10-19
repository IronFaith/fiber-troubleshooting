import {loadPatchDraft,savePatchDraft,clearPatchDraft,recordPatchAnswer} from '../patch-practice-data.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,drawRoundIds,startAttempt,recordAnswer,roundProgress,validRoundIds} from '../quiz-data.mjs';
import {loadExam,saveExam,clearExam,sessionKey} from '../quiz-session.mjs';
const storage=()=>{
  const values=new Map();
  return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
};
const initial=()=>({round:0,ids:drawRoundIds(0),attempt:startAttempt(),index:0,retry:false,roundAnswers:{},firstScore:0,draftChoices:[],countEvent:{id:'11111111-1111-4111-8111-111111111111',kind:'exam',at:1234}});

test('exam reload preserves submitted answers, locked feedback, pending selections and the counting identity',()=>{
  const saved=storage(), state=initial();
  state.attempt=recordAnswer(state.attempt,'no-light',1);
  state.roundAnswers={...state.attempt.answers};
  saveExam(saved,state);
  let restored=loadExam(saved);
  assert.equal(restored.index,0);
  assert.deepEqual(restored.countEvent,state.countEvent);
  assert.equal(recordAnswer(restored.attempt,'no-light',0),restored.attempt);
  state.index=1; state.draftChoices=[0,3]; saveExam(saved,state);
  restored=loadExam(saved);
  assert.deepEqual(restored.draftChoices,[0,3]);
  assert.deepEqual(restored.attempt.answers,{'no-light':1});
  clearExam(saved); assert.equal(loadExam(saved),null);
  const patch={index:0,answers:recordPatchAnswer({},'lc-left','lc','right'),selected:'lc',countEvent:state.countEvent};
  savePatchDraft(saved,patch);
  assert.deepEqual(loadPatchDraft(saved),patch);
  assert.equal(recordPatchAnswer(loadPatchDraft(saved).answers,'lc-left','lc','left')['lc-left'].slot,'right');
  clearPatchDraft(saved);assert.equal(loadPatchDraft(saved),null);
});

test('a resumed short retry keeps its original full exam and original score',()=>{
  const saved=storage(), state=initial();
  state.roundAnswers=Object.fromEntries(state.ids.map(id=>[id,questions.find(q=>q.id===id).correct]));
  state.roundAnswers['no-light']=1;
  state.retry=true; state.firstScore=4; state.countEvent=null;
  state.attempt=recordAnswer(startAttempt(['no-light']),'no-light',0);
  saveExam(saved,state);
  const restored=loadExam(saved);
  assert.equal(restored.firstScore,4);
  assert.deepEqual(restored.attempt.ids,['no-light']);
  assert.equal(roundProgress(0,restored.roundAnswers,restored.ids).correct,5);
});

test('stale, malformed and unavailable draft storage cannot break an exam',()=>{
  const saved=storage(), state=initial();
  for(const bad of [{...state,index:5},{...state,ids:['removed']},{...state,index:2},{...state,round:8}]) {
    saveExam(saved,bad); assert.equal(loadExam(saved),null);
  }
  saved.setItem(sessionKey,'{'); assert.equal(loadExam(saved),null);
  const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');},removeItem(){throw Error('blocked');}};
  assert.equal(loadExam(blocked),null); assert.equal(saveExam(blocked,state),false); assert.doesNotThrow(()=>clearExam(blocked));
  assert.equal(loadPatchDraft(blocked),null);assert.equal(savePatchDraft(blocked,{}),false);
  savePatchDraft(saved,{index:2,answers:{}});assert.equal(loadPatchDraft(saved),null);
  assert.doesNotThrow(()=>clearPatchDraft(blocked));
});

test('alternate LLDP scenarios retain five distinct exam slots and score the selected mix',()=>{
  const selected=new Set();
  for(let topic=0;topic<6;topic++) {
    const ids=drawRoundIds(topic,()=>0.999);
    assert.equal(validRoundIds(topic,ids),true);
    ids.forEach(id=>selected.add(id));
    const answers=Object.fromEntries(ids.map(id=>[id,questions.find(q=>q.id===id).correct]));
    const result=roundProgress(topic,answers,ids);
    assert.equal(result.correct,5); assert.equal(result.passed,true);
    assert.equal(validRoundIds(topic,[...ids.slice(0,4),ids[0]]),false);
    const question=questions.find(q=>q.id===ids[0]);
    answers[question.id]=Array.isArray(question.correct)?[question.correct[0]]:(question.correct+1)%question.choices.length;
    assert.equal(roundProgress(topic,answers,ids).correct,4);
  }
  for(const id of ['lldp-purpose','lldp-wrong-port','lldp-wrong-device','lldp-missing']) assert.ok(selected.has(id));
});
