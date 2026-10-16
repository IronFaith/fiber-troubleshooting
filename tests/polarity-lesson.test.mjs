import test from 'node:test';
import assert from 'node:assert/strict';
import {polarityExample} from '../polarity-lesson.mjs';

test('swapping a duplex pair changes both service destinations without changing transmitter roles',()=>{
  const correct=polarityExample(),swapped=polarityExample({swapped:true});
  assert.deepEqual([correct.localTxTo,correct.remoteTxTo,correct.receiversLit],['remote-rx','local-rx',true]);
  assert.deepEqual([swapped.localTxTo,swapped.remoteTxTo,swapped.receiversLit],['remote-tx','local-tx',false]);
  assert.deepEqual(polarityExample().mapping,correct.mapping);
});

test('VFL follows each strand of the same map and swapping the source does not repair polarity',()=>{
  for(const swapped of [false,true]) {
    const a=polarityExample({swapped,strand:'a'}),b=polarityExample({swapped,strand:'b'});
    assert.equal(a.vfl.to,swapped?'b':'a');
    assert.equal(b.vfl.to,swapped?'a':'b');
    assert.equal(a.vfl.matches,!swapped);
    assert.equal(b.vfl.matches,!swapped);
    assert.deepEqual(a.mapping,b.mapping);
  }
});
