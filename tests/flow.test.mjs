import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes, currentNode, answerQuestion, goBack, restoreHistory } from '../flow.mjs';

function follow(answers) {
  return answers.reduce((history, answer) => answerQuestion(history, answer), []);
}
const toOpticTest = ['no', 'no', 'no'];
const toVfl = [...toOpticTest, 'yes'];

test('optic tests gate fiber tracing; each fiber segment can repeat before recovery or loss testing', () => {
  assert.equal(currentNode(follow(['yes', 'yes'])), 'done');
  assert.equal(currentNode(follow(['no', 'yes'])), 'verify');
  assert.equal(currentNode(follow(['no', 'no', 'yes'])), 'verify');
  assert.equal(currentNode(follow(toOpticTest)), 'opticTest');
  assert.equal(currentNode(follow([...toOpticTest, 'no', 'yes'])), 'badOptic');
  assert.equal(currentNode(follow([...toOpticTest, 'no', 'no'])), 'opticUnresolved');
  assert.equal(currentNode(follow(toVfl)), 'vfl');
  // Pass first segment, trace another, find a misport, correct it, then finish tracing.
  const traced = [...toVfl, 'yes', 'no', 'no', 'yes', 'yes', 'yes'];
  assert.equal(currentNode(follow(traced)), 'mapping');
  assert.equal(currentNode(follow([...traced, 'no'])), 'mismatch');
  assert.equal(currentNode(follow([...traced, 'yes', 'yes', 'yes'])), 'done');
  assert.equal(currentNode(follow([...traced, 'yes', 'no', 'no'])), 'excessLoss');
  assert.equal(currentNode(follow([...traced, 'yes', 'no', 'yes'])), 'unresolved');
  assert.equal(currentNode(follow([...toVfl, 'no', 'no', 'no'])), 'fiberUnresolved');
  assert.equal(currentNode(follow([...toVfl, 'no', 'no', 'yes'])), 'segments');
  assert.equal(currentNode(follow([...toVfl, 'no', 'yes', 'no'])), 'routeUnresolved');
});

test('editing the optic decision discards downstream fiber checks; segment loops survive refresh', () => {
  const loop = follow([...toVfl, 'yes', 'no', 'yes', 'yes']);
  assert.equal(currentNode(loop), 'mapping');
  assert.deepEqual(restoreHistory(JSON.parse(JSON.stringify(loop))), loop);
  const changed = answerQuestion(goBack(loop, 3), 'no');
  assert.equal(currentNode(changed), 'opticCompare');
  assert.equal(changed.length, 4);
  assert.deepEqual(restoreHistory([...changed, { id: 'vfl', answer: 'yes' }]), changed);
  assert.deepEqual(restoreHistory([{ id: 'done', answer: 'yes' }]), []);
  assert.deepEqual(restoreHistory(null), []);
  assert.deepEqual(goBack([]), []);
  assert.throws(() => answerQuestion([], 'maybe'));
  const complete = follow(['yes', 'yes']);
  assert.equal(currentNode(goBack(complete)), 'verify');
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
