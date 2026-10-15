import test from 'node:test';
import assert from 'node:assert/strict';
import {questions, startAttempt, recordAnswer, resultsFor} from '../quiz-data.mjs';

test('first answers count once, and invalid or repeated submissions cannot change the score', () => {
  let attempt = startAttempt();
  attempt = recordAnswer(attempt,'optic-purpose',1);
  attempt = recordAnswer(attempt,'optic-purpose',0);
  attempt = recordAnswer(attempt,'tx-rx',9);
  attempt = recordAnswer(attempt,'not-a-question',0);
  assert.deepEqual(resultsFor(attempt),{total:20,answered:1,correct:0,missed:['optic-purpose'],complete:false});
});

test('finishing a full check reports first-try score and the exact topics to revisit', () => {
  let attempt = startAttempt();
  for (const question of questions) attempt = recordAnswer(attempt,question.id,question.id === 'no-light' ? 1 : question.correct);
  assert.deepEqual(resultsFor(attempt),{total:20,answered:20,correct:19,missed:['no-light'],complete:true});
});

test('retrying missed questions starts a fresh short attempt without changing the original result', () => {
  let original = startAttempt();
  original = recordAnswer(original,'optic-purpose',1);
  original = recordAnswer(original,'tx-rx',1);
  original = recordAnswer(original,'polarity',2);
  let retry = startAttempt(resultsFor(original).missed);
  assert.deepEqual(retry.ids,['optic-purpose','polarity']);
  assert.equal(resultsFor(retry).answered,0);
  retry = recordAnswer(retry,'optic-purpose',0);
  assert.equal(resultsFor(retry).complete,false);
  retry = recordAnswer(retry,'polarity',0);
  assert.deepEqual(resultsFor(retry),{total:2,answered:2,correct:2,missed:[],complete:true});
  assert.equal(resultsFor(original).correct,1);
});
