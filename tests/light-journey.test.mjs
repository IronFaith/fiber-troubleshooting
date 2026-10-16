import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyFrame} from '../loop-lesson.mjs';

test('a frame queued before Play cannot move the journey into a negative step',()=> {
  assert.deepEqual(journeyFrame(0,-2),{elapsed:0,index:0});
  assert.deepEqual(journeyFrame(3590,-2),{elapsed:3590,index:0});
  assert.deepEqual(journeyFrame(3590,16),{elapsed:3606,index:1});
  assert.deepEqual(journeyFrame(17990,16),{elapsed:18000,index:4});
});
