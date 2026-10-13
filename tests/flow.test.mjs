import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes, currentNode, answerQuestion, goBack, restoreHistory } from '../flow.mjs';

function follow(answers) {
  return answers.reduce((history, answer) => answerQuestion(history, answer), []);
}

test('recovery requires final verification; unsuccessful and unavailable checks reach the right next action', () => {
  assert.equal(currentNode(follow(['yes', 'yes', 'yes'])), 'verify');
  assert.equal(currentNode(follow(['yes', 'yes', 'yes', 'yes'])), 'done');
  assert.equal(currentNode(follow(['yes', 'yes', 'yes', 'no'])), 'handoff');
  assert.equal(currentNode(follow(['no'])), 'hold');
  assert.equal(currentNode(follow(['yes', 'no', 'yes', 'no'])), 'damaged');
  assert.equal(currentNode(follow(['yes', 'yes', 'no', 'no', 'no'])), 'txHandoff');
  assert.equal(currentNode(follow(['yes', 'yes', 'no', 'yes', 'no', 'yes'])), 'path');
  assert.equal(currentNode(follow(['yes', 'yes', 'no', 'yes', 'yes', 'no', 'yes', 'no'])), 'localHandoff');
});

test('changing an earlier answer removes its abandoned branch and refresh only restores a valid path', () => {
  const complete = follow(['yes', 'yes', 'yes', 'yes']);
  assert.equal(currentNode(goBack(complete)), 'verify');
  const changed = answerQuestion(goBack(complete, 1), 'no');
  assert.equal(currentNode(changed), 'cleanable');
  assert.equal(changed.length, 2);
  assert.deepEqual(restoreHistory(JSON.parse(JSON.stringify(changed))), changed);
  assert.deepEqual(restoreHistory([{ id: 'done', answer: 'yes' }]), []);
  assert.deepEqual(restoreHistory([...changed, { id: 'verify', answer: 'yes' }]), changed);
  assert.deepEqual(restoreHistory(null), []);
  assert.deepEqual(goBack([]), []);
  assert.throws(() => answerQuestion([], 'maybe'));
  assert.equal(answerQuestion(complete, 'yes'), complete);
});

test('every visible Yes/No branch is usable, and every reachable question has a way to an outcome', () => {
  const paths = new Map([['start', []]]);
  const queue = ['start'];
  while (queue.length) {
    const id = queue.shift();
    const node = nodes[id];
    if (node.terminal) continue;
    for (const answer of ['yes', 'no']) {
      const history = answerQuestion(paths.get(id), answer);
      const next = currentNode(history);
      assert.ok(nodes[next], `${id}: ${answer} has a destination`);
      if (!paths.has(next)) { paths.set(next, history); queue.push(next); }
    }
  }
  assert.equal(paths.size, Object.keys(nodes).length);
  const canFinish = new Set(Object.keys(nodes).filter(id => nodes[id].terminal));
  let previous;
  do {
    previous = canFinish.size;
    for (const [id, node] of Object.entries(nodes)) {
      if (canFinish.has(node.yes) || canFinish.has(node.no)) canFinish.add(id);
    }
  } while (canFinish.size !== previous);
  assert.equal(canFinish.size, paths.size);
});
