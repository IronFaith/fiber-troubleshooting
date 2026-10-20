import test from 'node:test';
import assert from 'node:assert/strict';
import {chapters,coursePosition,courseDestination,learningEntry,lessonNavigation} from '../course.mjs';
import {examDestination} from '../quiz-data.mjs';

test('explicit chapter and lesson links override the remembered chapter', () => {
  chapters.forEach((chapter,index) => {
    for (const anchor of [`stage-${index+1}`, ...chapter.sections]) {
      assert.deepEqual(coursePosition(`#${anchor}`, 'patching'), {index,anchor});
    }
  });
});

test('returning to Learn resumes a valid chapter and safely defaults to the first', () => {
  assert.deepEqual(coursePosition('', 'devices'), {index:1,anchor:'position'});
  assert.deepEqual(coursePosition('#old-section', 'patching'), {index:1,anchor:'fim-path'});
  assert.deepEqual(coursePosition('', 'invalid'), {index:0,anchor:'stage-1'});
  assert.deepEqual(coursePosition(), {index:0,anchor:'stage-1'});
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
  assert.deepEqual(coursePosition('#readings', 'lldp-neighbors'), {index:2,anchor:'readings'});
  assert.deepEqual(coursePosition('', 'chapter-3'), {index:1,anchor:'fim-path'});
  assert.equal(learningEntry({getItem:()=> 'lldp-neighbors'}).href,'./learn.html#lldp-neighbors');
  assert.equal(learningEntry({getItem:()=> 'devices'}).action,'Continue learning');
  assert.equal(learningEntry({getItem:()=> 'unknown'}).action,'Start learning');
  assert.equal(learningEntry().action,'Start learning');
});

test('old chapter links retain their subject while the combined case opens after its prerequisites',()=>{
  assert.deepEqual(coursePosition('#chapter-1','connected-case'),{index:0,anchor:'optics'});
  assert.deepEqual(coursePosition('#chapter-2','connected-case'),{index:1,anchor:'position'});
  assert.deepEqual(coursePosition('#chapter-3','connected-case'),{index:1,anchor:'fim-path'});
  assert.deepEqual(coursePosition('#connected-case','optics'),{index:4,anchor:'connected-case'});
  assert.deepEqual(coursePosition('#stage-5','optics'),{index:4,anchor:'stage-5'});
  assert.equal(learningEntry({getItem:()=> 'chapter-3'}).href,'./learn.html#fim-path');
});

test('lesson navigation crosses stage boundaries and hands off to the matching existing exams',()=>{
  assert.deepEqual(lessonNavigation('optics'),{previous:null,next:'path'});
  assert.deepEqual(lessonNavigation('mmc-fanout'),{previous:'viewpoint',next:'position'});
  assert.deepEqual(lessonNavigation('position'),{previous:'mmc-fanout',next:'ports'});
  assert.deepEqual(lessonNavigation('connected-case'),{previous:'change-evidence',next:null});
  assert.deepEqual(lessonNavigation('missing'),{previous:null,next:null});
  assert.equal(examDestination('#exam-understand-light'),2);
  assert.equal(examDestination('#exam-loopbacks'),6);
  assert.equal(examDestination('#exam-read-evidence'),4);
  for(const hash of ['','#beginner','#intermediate','#unknown'])assert.equal(examDestination(hash),null);
});
