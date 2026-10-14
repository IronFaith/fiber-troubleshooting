import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes, currentNode, answerQuestion, goBack, restoreHistory } from '../flow.mjs';

function follow(answers) {
  return answers.reduce((history, answer) => answerQuestion(history, answer), []);
}

test('low RX isolates source, connection, fiber, or receiver evidence before final recovery', () => {
  assert.equal(currentNode(follow(['no', 'no'])), 'sourceHandoff');
  const afterCleaning = ['yes', 'yes', 'no', 'yes', 'yes'];
  assert.equal(currentNode(follow(afterCleaning)), 'verify');
  assert.equal(currentNode(follow([...afterCleaning, 'yes'])), 'done');
  assert.equal(currentNode(follow([...afterCleaning, 'no'])), 'unresolved');
  assert.equal(currentNode(follow(['yes', 'yes', 'no', 'no'])), 'connectorHandoff');
  const meterPath = ['yes', 'yes', 'yes', 'no', 'yes'];
  assert.equal(currentNode(follow([...meterPath, 'yes'])), 'swapAvailable');
  assert.equal(currentNode(follow([...meterPath, 'no', 'yes'])), 'highPowerHandoff');
  assert.equal(currentNode(follow([...meterPath, 'no', 'no', 'yes'])), 'vflAvailable');
  assert.equal(currentNode(follow([...meterPath, 'yes', 'yes', 'no'])), 'receiverHandoff');
  assert.equal(currentNode(follow([...meterPath, 'yes', 'yes', 'yes', 'yes'])), 'done');
  assert.equal(currentNode(follow(['yes', 'yes', 'yes', 'no', 'no', 'yes', 'yes'])), 'patchAvailable');
});

test('changing an earlier answer removes its abandoned branch and refresh only restores a valid path', () => {
  const complete = follow(['yes', 'yes', 'no', 'yes', 'yes', 'yes']);
  assert.equal(currentNode(goBack(complete)), 'verify');
  const changed = answerQuestion(goBack(complete, 1), 'no');
  assert.equal(currentNode(changed), 'routeFix');
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
