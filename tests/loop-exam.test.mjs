import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,roundQuestionIds,drawRoundIds,validRoundIds,roundProgress,recordRoundProgress,loadQuizProgress,saveQuizProgress,apprenticeRank,startAttempt,recordAnswer} from '../quiz-data.mjs';
import {loadExam,saveExam} from '../quiz-session.mjs';
import {translate} from '../locale.mjs';

const storage=()=>{const values=new Map();return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};};
const answersFor=()=>Object.fromEntries(roundQuestionIds(6).map(id=>[id,questions.find(q=>q.id===id).correct]));

test('the loop exam grades five distinct skills, requires four correct and has translated feedback',()=>{
  const ids=drawRoundIds(6,()=>.5);
  assert.equal(ids.length,5);
  assert.equal(validRoundIds(6,ids),true);
  const answers=answersFor();
  assert.equal(roundProgress(6,answers).passed,true);
  assert.equal(roundProgress(6,answers).nextRound,null);
  for(const id of ids.slice(0,2)) {
    const q=questions.find(q=>q.id===id);
    answers[id]=Array.isArray(q.correct)?[]:(q.correct+1)%q.choices.length;
    assert.equal(roundProgress(6,answers).passed,id===ids[0]);
  }
  for(const q of questions.filter(q=>q.topic===6)) {
    assert.match(q.lesson,/^learn\.html#(loopbacks|compare-loops)$/);
    for(const lang of ['es','fr','ar']) for(const text of [q.prompt,q.skill,q.explanation,q.reveal,...q.choices])
      assert.notEqual(translate(text,lang),text,`${lang}: ${text}`);
  }
});

test('loop badge progress saves separately, keeps its best full attempt and preserves Apprentice levels',()=>{
  const saved=storage(),beginner=[4,5,4,5],applied=[4,3];
  saveQuizProgress(saved,beginner);saveQuizProgress(saved,applied,'intermediate');
  assert.deepEqual(loadQuizProgress(saved,'loop').scores,[null]);
  let scores=recordRoundProgress([null],6,answersFor());
  assert.deepEqual(scores,[5]);
  assert.equal(saveQuizProgress(saved,scores,'loop'),true);
  assert.deepEqual(loadQuizProgress(saved,'loop').scores,[5]);
  assert.deepEqual(loadQuizProgress(saved).scores,beginner);
  assert.deepEqual(loadQuizProgress(saved,'intermediate').scores,applied);
  assert.equal(apprenticeRank(loadQuizProgress(saved).scores).title,'Fiber Apprentice IV');
  assert.deepEqual(recordRoundProgress([2],6,answersFor(),{practice:true}),[2]);
  const lower=answersFor(),first=questions.find(q=>q.id===roundQuestionIds(6)[0]);
  lower[first.id]=[];
  assert.deepEqual(recordRoundProgress(scores,6,lower),[5]);
  assert.deepEqual(recordRoundProgress(scores,6,{}),scores);
  assert.deepEqual(loadQuizProgress({getItem:()=>{throw Error();}},'loop'),{scores:[null],canSave:false});
});

test('a loop exam resumes the same order, locked answers and pending selections',()=>{
  const saved=storage(),ids=roundQuestionIds(6);
  [ids[0],ids[1]]=[ids[1],ids[0]];
  const q=questions.find(q=>q.id===ids[0]);
  const attempt=recordAnswer(startAttempt(ids),q.id,q.correct);
  saveExam(saved,{round:6,ids,attempt,index:1,retry:false,roundAnswers:attempt.answers,firstScore:0,draftChoices:[0],countEvent:null});
  const resumed=loadExam(saved);
  assert.equal(resumed.round,6);
  assert.deepEqual(resumed.ids,ids);
  assert.deepEqual(resumed.attempt.answers,attempt.answers);
  assert.deepEqual(resumed.draftChoices,[0]);
  assert.equal(recordAnswer(resumed.attempt,q.id,0),resumed.attempt);
});
