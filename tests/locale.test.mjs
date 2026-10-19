import test from 'node:test';
import assert from 'node:assert/strict';
import {translate,translateLines,readLanguage,saveLanguage,languageKey} from '../locale.mjs';
import {searchReference} from '../reference-data.mjs';

test('Spanish translates findings and composed diagram labels while preserving technical values',()=>{
  assert.equal(translate('Loop · Local optic','es'),'Loopback · Óptico local');
  assert.equal(translate('↳ Next loop passes','es'),'↳ El siguiente loopback pasa');
  assert.equal(translate('CAS 2 · Port 12','es'),'CAS 2 · Puerto 12');
  assert.equal(translate('1 current check · Round 3','es'),'1 comprobación actual · Ronda 3');
  assert.equal(translate('“I’m B”','es'),'«Soy B»');
  for(const id of ['QNO5.5C.16f.17.30','S747885346FWL','25/5','RX −40 dBm','TX +0.25 dBm']) assert.equal(translate(id,'es'),id);
  assert.equal(translate('Question 1 of 5','es'),'Pregunta 1 de 5');
  assert.equal(translate('Expected at CAS · A','es'),'Esperado en CAS · A');
  assert.equal(translate('✓ Seated in the correct port. 25/1 means optic 25, position 1. With the tab above, that is the left side.','es'),'✓ Asentado en el puerto correcto. 25/1 indica óptico 25, posición 1. Con la pestaña arriba, queda a la izquierda.');
  const finding='Strand B is dark; the other has light';
  assert.equal(translate(finding,'es'),'La fibra B está sin luz; la otra tiene luz');
  assert.equal(translate(finding,'en'),finding);
  assert.equal(translateLines('FIBER OBSERVATIONS — entered manually\nLoop · Local optic','es'),'OBSERVACIONES DE FIBRA — ingresadas manualmente\nLoopback · Óptico local');
  assert.equal(translate('Direct loop passes. TX returns to local RX. The external fiber and remote device are outside this test.','es'),'Loopback directo aprobado. TX regresa a RX local. La fibra externa y el dispositivo remoto quedan fuera de esta prueba.');
});

test('language preference persists independently and works when storage is unavailable',()=>{
  const values=new Map([['fiber-progress','keep'],['fiber-workbench-v1','keep case']]);
  const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  assert.equal(readLanguage(storage),'en');
  assert.equal(saveLanguage(storage,'es'),true);
  assert.equal(readLanguage(storage),'es');
  assert.equal(readLanguage(storage,'?lang=en'),'en');
  assert.equal(saveLanguage(storage,'invalid'),false);
  assert.deepEqual([...values],[['fiber-progress','keep'],['fiber-workbench-v1','keep case'],[languageKey,'es']]);
  const blocked={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};
  assert.equal(readLanguage(blocked),'en');assert.equal(saveLanguage(blocked,'es'),false);
});

test('Spanish glossary search accepts accents, plain spelling and English equipment terms',()=>{
  for(const [query,id] of [['optico','optic'],['óptico','optic'],['ferula','ferrule'],['polaridad','polarity'],['vecino','lldp'],['localizador visual','vfl'],['ramal','follower'],['transceiver','optic']])
    assert.ok(searchReference(query,'','es').some(term=>term.id===id),query);
  assert.deepEqual(searchReference('TX','Hardware','es'),[]);
  assert.deepEqual(searchReference('férula','Hardware','es').map(term=>term.id),['ferrule']);
});
