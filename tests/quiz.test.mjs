import test from 'node:test';
import assert from 'node:assert/strict';
import {questions, topics, roundQuestionIds, startAttempt, recordAnswer, resultsFor, roundProgress, apprenticeRank, loadQuizProgress, saveQuizProgress, recordRoundProgress, skillsFor} from '../quiz-data.mjs';

const wrongAnswer = question => Array.isArray(question.correct) ? [question.correct[0]] : (question.correct+1)%question.choices.length;
const correctRound = topic => Object.fromEntries(questions.filter(question => question.topic === topic).map(question => [question.id,question.correct]));

test('apprentice levels count different passed quizzes in any order through beginner completion', () => {
  let scores = topics.map(() => null);
  for (const [index,topic] of [3,1,0,2].entries()) {
    const answers = correctRound(topic);
    const first = questions.find(question => question.topic === topic);
    answers[first.id] = wrongAnswer(first);
    scores = recordRoundProgress(scores,topic,answers);
    const rank = apprenticeRank(scores);
    assert.deepEqual(rank,{level:index+1,title:`Fiber Apprentice ${['I','II','III','IV'][index]}`,complete:index === 3});
    if (index === 0) assert.deepEqual(scores,[null,null,null,4]);
  }
});

test('practice can earn a level, without duplicating or removing an earned level', () => {
  const answers = correctRound(0);
  const first = questions[0], second = questions[1];
  answers[first.id] = wrongAnswer(first);
  answers[second.id] = wrongAnswer(second);
  let scores = topics.map(() => null);
  assert.equal(recordRoundProgress(scores,0,{[first.id]:first.correct}),scores);
  scores = recordRoundProgress(scores,0,answers);
  assert.deepEqual(apprenticeRank(scores),{level:0,title:'Fiber Learner',complete:false});
  const practiced = {...answers,[first.id]:first.correct};
  scores = recordRoundProgress(scores,0,practiced);
  assert.equal(apprenticeRank(scores).level,1);
  scores = recordRoundProgress(scores,0,correctRound(0));
  assert.equal(apprenticeRank(scores).level,1);
  assert.deepEqual(recordRoundProgress(scores,0,answers),[5,null,null,null]);
});

test('saved quiz results survive loading again and invalid or unavailable storage stays usable', () => {
  const values = new Map();
  const storage = {getItem:key => values.get(key) ?? null,setItem:(key,value) => values.set(key,value)};
  assert.deepEqual(loadQuizProgress(storage),{scores:[null,null,null,null],canSave:true});
  const scores = [4,null,2,5];
  assert.equal(saveQuizProgress(storage,scores),true);
  assert.deepEqual(loadQuizProgress(storage),{scores,canSave:true});
  assert.equal(apprenticeRank(loadQuizProgress(storage).scores).level,2);
  assert.deepEqual(loadQuizProgress({getItem:() => '{bad json'}).scores,[null,null,null,null]);
  assert.deepEqual(loadQuizProgress({getItem:() => '{"scores":[6,"5",-1,4]}'}).scores,[null,null,null,4]);
  const blocked = {getItem:() => {throw Error('blocked');},setItem:() => {throw Error('blocked');}};
  assert.deepEqual(loadQuizProgress(blocked),{scores:[null,null,null,null],canSave:false});
  assert.equal(saveQuizProgress(blocked,scores),false);
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

test('visual selections score the observed lane, connection, mapped port and added span, locking the first answer', () => {
  for(const [id,correct,wrong] of [['loose-connection',1,0],['match-port',27,26],['tx-rx',1,0],['all-lanes',2,3],['passive-loop',1,2]]) {
    const initial=startAttempt([id]);
    const passed=recordAnswer(initial,id,correct);
    assert.equal(resultsFor(passed).correct,1,id);
    const missed=recordAnswer(initial,id,wrong);
    assert.equal(recordAnswer(missed,id,correct),missed);
    assert.equal(resultsFor(missed).correct,0,id);
  }
});

test('skills recap uses only observed answers and flags a skill when one related check was missed', () => {
  assert.deepEqual(skillsFor(0,{}),{checked:[],review:[]});
  const answers={'no-light':0,'dirt-blocks':1,'bend-cause':0};
  assert.deepEqual(skillsFor(0,answers),{checked:['Read the signal'],review:['Interpret a change']});
  assert.deepEqual(skillsFor(1,answers),{checked:[],review:[]});
});

test('retrying a missed visual question updates the skills recap while keeping the original result', () => {
  const original=recordAnswer(startAttempt(['all-lanes']),'all-lanes',0);
  const retry=recordAnswer(startAttempt(['all-lanes']),'all-lanes',2);
  assert.deepEqual(skillsFor(2,original.answers).review,['Check every lane']);
  assert.deepEqual(skillsFor(2,{...original.answers,...retry.answers}),{checked:['Check every lane'],review:[]});
  assert.equal(resultsFor(original).correct,0);
});
