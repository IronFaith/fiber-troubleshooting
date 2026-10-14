import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes, startNode, destination, currentNode, answerQuestion, goBack, restoreHistory } from '../flow.mjs';
const follow = (answers, mode = 'direct') => answers.reduce((history, answer) => answerQuestion(history, answer, mode), []);
const at = (answers, mode = 'direct') => currentNode(follow(answers, mode), mode);

test('local loops progress through reachable passives without requiring the remote optic', () => {
  assert.equal(at([]), 'start');
  assert.equal(at([], 'passive'), 'passiveLoop');
  assert.equal(at(['no']), 'clean');
  assert.equal(at(['no','no','yes']), 'badOptic');
  assert.equal(at(['no','no','no']), 'testFault');
  assert.equal(at(['yes']), 'nextPassive');
  assert.equal(at(['yes','no']), 'reconnect');
  assert.equal(at(['yes','yes']), 'passiveLoop');
  assert.equal(at(['yes','yes','yes']), 'nextPassive');
  assert.equal(at(['yes','no','yes']), 'done');
  assert.equal(at(['yes','no','no','no']), 'remoteCheck');
  assert.equal(at(['yes','no','no','no'], 'passive'), 'remoteCheck');
  assert.equal(nodes[at(['yes','no','no','no'])].success, false);
  assert.equal(at(['no'], 'passive'), 'isolate');
  assert.equal(at(['no','yes'], 'passive'), 'patchCheck');
  assert.equal(at(['no','yes','no'], 'passive'), 'patchFault');
  assert.equal(at(['no','yes','yes'], 'passive'), 'nextPassive');
  assert.equal(at(['no','no','no','yes'], 'passive'), 'badOptic');
});

test('fiber routes repeat, preserve mode on refresh, and discard downstream choices when edited', () => {
  // Local loop passes; live link still fails, so trace only accessible fiber.
  const local = ['yes','no','no','yes'];
  const path = [...local,'yes','no','no','yes','yes','yes'];
  assert.equal(at(local), 'vfl');
  assert.equal(at(path), 'recheck');
  assert.equal(at([...path,'yes']), 'done');
  assert.equal(at([...path,'no']), 'lossAccess');
  assert.equal(at([...path,'no','no']), 'remoteCheck');
  assert.equal(at([...path,'no','yes','no']), 'lossFault');
  assert.equal(at([...path,'no','yes','yes']), 'remainingFault');
  assert.equal(at([...local,'no','no','no']), 'fiberFault');
  assert.equal(at([...local,'no','yes','no']), 'routeFault');
  const saved = follow(path, 'passive');
  assert.deepEqual(restoreHistory(JSON.parse(JSON.stringify(saved)), 'passive'), saved);
  assert.deepEqual(restoreHistory(saved, 'direct'), []);
  const changed = answerQuestion(goBack(saved, 0), 'no', 'passive');
  assert.equal(currentNode(changed, 'passive'), 'isolate');
  assert.equal(changed.length, 1);
  assert.deepEqual(restoreHistory([...changed, {id:'vfl',answer:'yes'}], 'passive'), changed);
  assert.deepEqual(restoreHistory(null), []);
  assert.deepEqual(restoreHistory([{id:'start',answer:'yes'}, {id:'bothEnds',answer:'yes'}]), [{id:'start',answer:'yes'}]);
  assert.deepEqual(goBack([]), []);
  assert.throws(() => answerQuestion([], 'maybe'));
  const complete = follow([...path,'yes']);
  assert.equal(answerQuestion(complete, 'yes'), complete);
});

test('both loop modes have usable branches and every question can reach a result', () => {
  const all = new Set();
  for (const mode of ['direct','passive']) {
    const paths = new Map([[startNode(mode), []]]);
    const queue = [startNode(mode)];
    while (queue.length) {
      const id = queue.shift();
      all.add(id);
      if (nodes[id].terminal) continue;
      for (const answer of ['yes','no']) {
        const history = answerQuestion(paths.get(id), answer, mode);
        const next = currentNode(history, mode);
        assert.ok(nodes[next], `${mode}: ${id} ${answer} resolves`);
        if (!paths.has(next)) { paths.set(next, history); queue.push(next); }
      }
    }
    const canFinish = new Set([...paths.keys()].filter(id => nodes[id].terminal));
    let count;
    do {
      count = canFinish.size;
      for (const id of paths.keys()) {
        if (!nodes[id].terminal && ['yes','no'].some(answer => canFinish.has(destination(id,answer,mode)))) canFinish.add(id);
      }
    } while (canFinish.size !== count);
    assert.equal(canFinish.size, paths.size);
  }
  assert.equal(all.size, Object.keys(nodes).length);
});
