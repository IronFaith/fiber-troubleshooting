import test from 'node:test';
import assert from 'node:assert/strict';
import {questions, topics, roundQuestionIds, startAttempt, recordAnswer, resultsFor, roundProgress} from '../quiz-data.mjs';

test('the beginner attempt has five questions and counts only the first valid answer', () => {
  let attempt = startAttempt();
  assert.equal(attempt.ids[0],'no-light');
  attempt = recordAnswer(attempt,'no-light',1);
  attempt = recordAnswer(attempt,'no-light',0);
  attempt = recordAnswer(attempt,'no-light-cause',9);
  attempt = recordAnswer(attempt,'tx-rx',1);
  assert.deepEqual(resultsFor(attempt),{total:5,answered:1,correct:0,missed:['no-light'],complete:false});
});

test('each five-question round offers continuation at four correct answers, only after completion', () => {
  for (let topic=0;topic<topics.length;topic++) {
    const ids = roundQuestionIds(topic);
    assert.equal(ids.length,5);
    let attempt = startAttempt(ids);
    for (const id of ids.slice(0,4)) attempt = recordAnswer(attempt,id,questions.find(question => question.id === id).correct);
    assert.equal(roundProgress(topic,attempt.answers).passed,false);
    const last = questions.find(question => question.id === ids[4]);
    attempt = recordAnswer(attempt,last.id,(last.correct+1)%last.choices.length);
    const result = roundProgress(topic,attempt.answers);
    assert.equal(result.correct,4);
    assert.equal(result.passed,true);
    assert.equal(result.nextRound,topic === topics.length-1 ? null : topic+1);
    const first = questions.find(question => question.id === ids[0]);
    const below = roundProgress(topic,{...attempt.answers,[first.id]:(first.correct+1)%first.choices.length});
    assert.equal(below.correct,3);
    assert.equal(below.passed,false);
    assert.equal(below.nextRound,null);
  }
});

test('a short retry builds round progress without changing the original first-answer score', () => {
  let original = startAttempt();
  for (const id of original.ids) {
    const question = questions.find(item => item.id === id);
    const choice = ['no-light','no-light-cause'].includes(id) ? (question.correct+1)%question.choices.length : question.correct;
    original = recordAnswer(original,id,choice);
  }
  const initial = resultsFor(original);
  assert.equal(initial.correct,3);
  let retry = startAttempt(initial.missed);
  assert.deepEqual(retry.ids,['no-light','no-light-cause']);
  retry = recordAnswer(retry,'no-light',0);
  retry = recordAnswer(retry,'no-light-cause',0);
  const progress = roundProgress(0,{...original.answers,...retry.answers});
  assert.equal(progress.correct,4);
  assert.equal(progress.passed,true);
  assert.deepEqual(progress.missed,['no-light-cause']);
  assert.equal(resultsFor(original).correct,3);
  assert.equal(resultsFor(retry).total,2);
});
