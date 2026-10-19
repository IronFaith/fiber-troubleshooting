import test from 'node:test';
import assert from 'node:assert/strict';
import {chapters,coursePosition,courseDestination,learningEntry} from '../course.mjs';

test('explicit chapter and lesson links override the remembered chapter', () => {
  chapters.forEach((chapter,index) => {
    for (const anchor of [`chapter-${index+1}`, ...chapter.sections]) {
      assert.deepEqual(coursePosition(`#${anchor}`, 'patching'), {index,anchor});
    }
  });
});

test('returning to Learn resumes a valid chapter and safely defaults to the first', () => {
  assert.deepEqual(coursePosition('', 'devices'), {index:1,anchor:'chapter-2'});
  assert.deepEqual(coursePosition('#old-section', 'patching'), {index:2,anchor:'chapter-3'});
  assert.deepEqual(coursePosition('', 'invalid'), {index:0,anchor:'chapter-1'});
  assert.deepEqual(coursePosition(), {index:0,anchor:'chapter-1'});
});

test('legacy course links stay in the course while hands-on practice stays separate', () => {
  assert.equal(courseDestination('/fiber-troubleshooting/devices.html'), '#chapter-2');
  assert.equal(courseDestination('/patching.html'), '#chapter-3');
  assert.equal(courseDestination('/patching.html', '#rack-path'), '#rack-path');
  assert.equal(courseDestination('/learn.html', '#compare-loops'), '#compare-loops');
  assert.equal(courseDestination('/patching.html', '#patch-practice'), null);
  assert.equal(courseDestination('/simulations.html'), null);
  assert.equal(courseDestination('/quiz.html'), null);
});


test('exact topic bookmarks resume while explicit links and old chapter bookmarks remain valid', () => {
  assert.deepEqual(coursePosition('', 'lldp-neighbors'), {index:1,anchor:'lldp-neighbors'});
  assert.deepEqual(coursePosition('#readings', 'lldp-neighbors'), {index:0,anchor:'readings'});
  assert.deepEqual(coursePosition('', 'chapter-3'), {index:2,anchor:'chapter-3'});
  assert.equal(learningEntry({getItem:()=> 'lldp-neighbors'}).href,'./learn.html#lldp-neighbors');
  assert.equal(learningEntry({getItem:()=> 'devices'}).action,'Continue learning');
  assert.equal(learningEntry({getItem:()=> 'unknown'}).action,'Start learning');
  assert.equal(learningEntry().action,'Start learning');
});
