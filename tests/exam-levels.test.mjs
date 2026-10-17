import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,roundsForLevel,roundQuestionIds,startAttempt,recordAnswer,resultsFor,roundProgress,loadQuizProgress,saveQuizProgress,recordRoundProgress,apprenticeRank} from '../quiz-data.mjs';
const complete=(topic,miss=0)=>{
  let attempt=startAttempt(roundQuestionIds(topic));
  for(const [index,id] of attempt.ids.entries()) {
    const q=questions.find(q=>q.id===id);
    const wrong=Array.isArray(q.correct)?[q.correct[0]]:(q.correct+1)%q.choices.length;
    attempt=recordAnswer(attempt,id,index<miss?wrong:q.correct);
  }
  return attempt;
};

test('level progress preserves existing beginner scores and levels independently of Intermediate',()=>{
  const values=new Map([['fiber-quiz-progress-v1',JSON.stringify({scores:[4,5,null,4]})]]);
  const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
  assert.deepEqual(loadQuizProgress(storage).scores,[4,5,null,4]);
  assert.deepEqual(loadQuizProgress(storage,'intermediate').scores,[null,null]);
  const scores=recordRoundProgress([null,null],5,complete(5).answers);
  assert.deepEqual(scores,[null,5]);
  saveQuizProgress(storage,scores,'intermediate');
  assert.deepEqual(loadQuizProgress(storage,'intermediate').scores,[null,5]);
  assert.deepEqual(loadQuizProgress(storage).scores,[4,5,null,4]);
  assert.equal(apprenticeRank(loadQuizProgress(storage).scores).level,3);
  assert.deepEqual(loadQuizProgress({getItem(){throw Error('blocked');}},'intermediate'),{scores:[null,null],canSave:false});
});

test('each applied exam has five scored scenarios and continuation stays within its level',()=>{
  for(const topic of roundsForLevel('intermediate')) {
    const attempt=complete(topic,1), progress=roundProgress(topic,attempt.answers);
    assert.equal(attempt.ids.length,5);
    assert.equal(progress.correct,4);
    assert.equal(progress.passed,true);
    assert.equal(progress.nextRound,topic===4?5:null);
    const last=attempt.ids.at(-1);
    const partial={...attempt.answers}; delete partial[last];
    assert.equal(roundProgress(topic,partial).passed,false);
    assert.equal(resultsFor(attempt).complete,true);
  }
  assert.equal(roundProgress(3,complete(3).answers).nextRound,null);
});

test('Intermediate practice can correct missed reasoning without replacing the saved complete-attempt score',()=>{
  const first=complete(4,2);
  let scores=recordRoundProgress([null,null],4,first.answers);
  assert.deepEqual(scores,[3,null]);
  const result=resultsFor(first);
  let retry=startAttempt(result.missed);
  for(const id of retry.ids) retry=recordAnswer(retry,id,questions.find(q=>q.id===id).correct);
  const practiced={...first.answers,...retry.answers};
  assert.equal(roundProgress(4,practiced).correct,5);
  assert.equal(recordRoundProgress(scores,4,practiced,{practice:true}),scores);
  assert.equal(resultsFor(first).correct,3);
  scores=recordRoundProgress(scores,4,complete(4).answers);
  assert.deepEqual(scores,[5,null]);
  assert.deepEqual(recordRoundProgress(scores,4,first.answers),scores);
});
