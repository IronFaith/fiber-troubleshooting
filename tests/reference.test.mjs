import test from 'node:test';
import assert from 'node:assert/strict';
import {referenceTerms,searchReference} from '../reference-data.mjs';
import {chapters,coursePosition} from '../course.mjs';

test('reference search finds everyday names, acronym expansions and the site no-light value',()=>{
  for(const [query,id] of [['  TRANSCEIVER  ','optic'],['visual fault locator','vfl'],['ferrite','ferrule'],['-40','no-light'],['−40','no-light'],['swapped pair','polarity'],['head','mmc']]) {
    assert.ok(searchReference(query).some(term=>term.id===id),query);
  }
});

test('reference category and query combine, with blank and unmatched searches handled',()=>{
  assert.equal(searchReference('  ').length,referenceTerms.length);
  assert.deepEqual(searchReference('TX','Light & readings').map(term=>term.id),['tx']);
  assert.deepEqual(searchReference('TX','Hardware'),[]);
  assert.deepEqual(searchReference('<script>'),[]);
  assert.ok(searchReference('','Hardware').every(term=>term.group==='Hardware'));
});

test('every reference opens its lesson even when another chapter was saved',()=>{
  referenceTerms.forEach(term=>{
    const index=chapters.findIndex(chapter=>chapter.sections.includes(term.anchor));
    assert.notEqual(index,-1,term.label);
    assert.deepEqual(coursePosition(`#${term.anchor}`,'patching'),{index,anchor:term.anchor});
  });
});
