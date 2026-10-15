import test from 'node:test';
import assert from 'node:assert/strict';
import {questions, topics, roundQuestionIds, startAttempt, recordAnswer, resultsFor, roundProgress, rookieRank} from '../quiz-data.mjs';

const wrongAnswer = question => Array.isArray(question.correct) ? [question.correct[0]] : (question.correct+1)%question.choices.length;
const correctRound = topic => Object.fromEntries(questions.filter(question => question.topic === topic).map(question => [question.id,question.correct]));

test('rookie stripes require passing complete rounds in order, through beginner completion', () => {
  assert.equal(rookieRank(0,1,correctRound(1)).level,0);
  let level = 0;
  for (const [topic,numeral] of ['I','II','III','IV'].entries()) {
    const answers = correctRound(topic);
    const first = questions.find(question => question.topic === topic);
    answers[first.id] = wrongAnswer(first);
    const rank = rookieRank(level,topic,answers);
    assert.deepEqual(rank,{level:topic+1,title:`Fiber Rookie ${numeral}`,complete:topic === 3});
    level = rank.level;
  }
});

test('practice can earn a stripe, without duplicating or removing an earned stripe', () => {
  const answers = correctRound(0);
  const first = questions[0], second = questions[1];
  answers[first.id] = wrongAnswer(first);
  answers[second.id] = wrongAnswer(second);
  assert.deepEqual(rookieRank(0,0,answers),{level:0,title:'Fiber Rookie',complete:false});
  assert.equal(rookieRank(0,0,{[first.id]:first.correct}).level,0);
  const practiced = {...answers,[first.id]:first.correct};
  assert.equal(rookieRank(0,0,practiced).level,1);
  assert.equal(rookieRank(1,0,practiced).level,1);
  assert.equal(rookieRank(1,0,answers).level,1);
  assert.deepEqual(rookieRank(4,3,{}),{level:4,title:'Fiber Rookie IV',complete:true});
});

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
    const choice = ['no-light','no-light-cause'].includes(id) ? wrongAnswer(question) : question.correct;
    original = recordAnswer(original,id,choice);
  }
  const initial = resultsFor(original);
  assert.equal(initial.correct,3);
  let retry = startAttempt(initial.missed);
  assert.deepEqual(retry.ids,['no-light','no-light-cause']);
  retry = recordAnswer(retry,'no-light',0);
  retry = recordAnswer(retry,'no-light-cause',[0]);
  const progress = roundProgress(0,{...original.answers,...retry.answers});
  assert.equal(progress.correct,4);
  assert.equal(progress.passed,true);
  assert.deepEqual(progress.missed,['no-light-cause']);
  assert.equal(resultsFor(original).correct,3);
  assert.equal(resultsFor(retry).total,2);
});

test('multiple answers score one point only for all correct causes and no incorrect ones', () => {
  const question = questions.find(item => item.id === 'no-light-cause');
  for (const [answer,score] of [[question.correct.toReversed(),1],[question.correct.slice(1),0],[[...question.correct,2],0],[[2],0]]) {
    const attempt = recordAnswer(startAttempt([question.id]),question.id,answer);
    assert.equal(resultsFor(attempt).correct,score);
    assert.equal(resultsFor(attempt).complete,true);
  }
});

test('multiple answers require a valid selection and lock a copy of the submitted choices', () => {
  const id = 'no-light-cause';
  const initial = startAttempt([id]);
  for (const answer of [[],0,[0,99],[-1],[0,'1'],[0,1.5]]) assert.equal(recordAnswer(initial,id,answer),initial);
  const selections = [4,3,1,0,0];
  const submitted = recordAnswer(initial,id,selections);
  selections.length = 0;
  assert.deepEqual(submitted.answers[id],[0,1,3,4]);
  assert.equal(recordAnswer(submitted,id,[2]),submitted);
  assert.equal(resultsFor(submitted).correct,1);
  assert.deepEqual(startAttempt([id]).answers,{});
});
