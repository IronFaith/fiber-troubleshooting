import test from 'node:test';
import assert from 'node:assert/strict';
import {translate,translateLines,readLanguage,saveLanguage,languageKey,languageDirection,formatBidi} from '../locale.mjs';
import {searchReference} from '../reference-data.mjs';
import {connectedCaseQuestions} from '../connected-case.mjs';

test('new-case actions and recorded VFL path labels translate in all learner languages',()=>{
  for(const language of ['es','fr','ar']) for(const message of ['History','Why this check?','Recorded continuity','Red dashed: VFL passed','Fiber diagram; scroll down to follow the path','Case details','Pass','No return light','Weak return','New case started','Choose your path, then place a tool to begin.',
    'Recorded VFL path','Recorded checks, not live light.','Viewing here','Loose MMC only',
    'Add CAS','Remove last CAS','CAS 2 · Mapped port','LC loopback: tap either optic.','MMC loopback: tap a CAS.','VFL: tap Local or Remote LC legs.',
    'Red: confirmed light','Amber: investigate','Dashed: not checked',
    'Fiber / contacts suspect','MMC / CAS contact suspect','Recheck observations',
    "Weak light","Weak light reported here","Strand B: weak light reported","Dim VFL light is a visual observation, not a loss measurement.","Keep the VFL on this LC strand. Compare the loose incoming MMC head with the through-CAS result; inspect the mating connection if the glow changes there.","Check the VFL and LC seating with a known-good reference lead. Inspect the mapped fiber ends and bends, then use an optical loss test to measure loss.",
    "Open here","CAS 2 · Patched port","Previous port","Next port","Use FIM port 2","Choose a port from 1 to 32.","Patched port updated. Recheck this section.",
    'Tap an LC leg, then mark the light at the viewing point.',"CAS 2 · Viewing port","Viewing port updated. Recheck this section.","Inspect the strand and its connections; compare with an earlier CAS.",'Does light reach the expected channel?','Light on another channel or port','Other channel (A)','Other channel (B)',
    'The incoming fiber passes visible light to the loose MMC head. The dark through-CAS result makes this channel’s mating contact suspect: contamination, damage, alignment or seating.',
    'A passes visible light; B does not. The MMC ferrule holds separate fibers. Investigate B’s fiber and its end-face contacts; A passing does not clear them.',
    'B passes visible light; A does not. The MMC ferrule holds separate fibers. Investigate A’s fiber and its end-face contacts; B passing does not clear them.']) {
    assert.notEqual(translate(message,language),message,`${language}: ${message}`);
  }
});

test('every connected-case question, answer and explanation is translated in all learner languages',()=>{
  for(const language of ['es','fr','ar']) for(const source of ['Example RX limits: −3.00 to +3.00 dBm','Other required lanes','Not yet checked']) assert.notEqual(translate(source,language),source);
  for(const language of ['es','fr','ar']) for(const question of connectedCaseQuestions) {
    for(const source of [question.prompt,question.skill,question.explanation,question.reveal,...question.choices]) {
      assert.notEqual(translate(source,language),source,`${language}: ${source}`);
    }
  }
});

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


test('French translates composed feedback and findings without mixing language caches or technical values',()=>{
  const finding='Strand B is dark; the other has light';
  assert.equal(translate(finding,'fr'),'La fibre B est sans lumière ; l’autre transmet');
  assert.equal(translate(finding,'es'),'La fibra B está sin luz; la otra tiene luz');
  assert.equal(translate(finding,'en'),finding);
  assert.equal(translate(finding,'fr'),'La fibre B est sans lumière ; l’autre transmet');
  assert.equal(translate('Question 1 of 5','fr'),'Question 1 sur 5');
  assert.equal(translate('Select all supported answers. Then check your answers.','fr'),'Sélectionnez toutes les réponses étayées. Puis vérifiez vos réponses.');
  assert.equal(translate('Select all supported answers. Then check your answers.','es'),'Selecciona todas las respuestas respaldadas por la evidencia. Luego revisa tus respuestas.');
  assert.equal(translate('1 current check · Round 3','fr'),'1 contrôle actuel · série 3');
  assert.equal(translate('CAS 2 · Port 12','fr'),'CAS 2 · port 12');
  assert.equal(translate('✓ Seated in the correct port. 25/1 means optic 25, position 1. With the tab above, that is the left side.','fr'),'✓ Enclenché dans le bon port. 25/1 signifie optique 25, position 1. Avec la languette en haut, c’est le côté gauche.');
  assert.equal(translateLines('FIBER OBSERVATIONS — entered manually\nLoop · Local optic','fr'),'OBSERVATIONS FIBRE — saisies manuellement\nBoucle · Optique locale');
  for(const id of ['QNO5.5C.16f.17.30','S747885346FWL','25/5','RX −40 dBm','TX +0.25 dBm']) assert.equal(translate(id,'fr'),id);
  assert.equal(translate(finding,'unsupported'),finding);
});

test('French preference and glossary work without affecting progress or English aliases',()=>{
  const values=new Map([['fiber-progress','keep'],['fiber-workbench-v1','keep case']]);
  const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  assert.equal(saveLanguage(storage,'fr'),true);
  assert.equal(readLanguage(storage),'fr');
  assert.equal(readLanguage(storage,'?lang=es'),'es');
  assert.equal(readLanguage(null,'?lang=fr'),'fr');
  assert.equal(readLanguage(storage,'?lang=unknown'),'fr');
  assert.equal(values.get('fiber-progress'),'keep');
  assert.equal(values.get('fiber-workbench-v1'),'keep case');
  assert.equal(saveLanguage(null,'fr'),false);
  for(const [query,id] of [['optique','optic'],['ferule','ferrule'],['férule','ferrule'],['polarite','polarity'],['voisin','lldp'],['localisateur visuel','vfl'],['branche','follower'],['transceiver','optic']])
    assert.ok(searchReference(query,'','fr').some(term=>term.id===id),query);
  assert.deepEqual(searchReference('férule','Hardware','fr').map(term=>term.id),['ferrule']);
});

test('every translated catalog covers the same material and preserves message placeholders',async()=>{
  const {spanishMessages}=await import('../spanish.mjs');
  const {frenchMessages}=await import('../french.mjs');
  const {arabicMessages}=await import('../arabic.mjs');
  const keys=messages=>[...new Set(messages.map(([source])=>source))].sort();
  assert.deepEqual(keys(frenchMessages),keys(spanishMessages));
  assert.deepEqual(keys(arabicMessages),keys(spanishMessages));
  const placeholders=value=>[...value.matchAll(/\{\d+\}/g)].map(match=>match[0]).sort();
  for(const [language,messages] of [['es',spanishMessages],['fr',frenchMessages],['ar',arabicMessages]]) {
    for(const [source,translation] of messages) {
      assert.ok(translation.trim(),`${language}: ${source}`);
      assert.deepEqual(placeholders(translation),placeholders(source),`${language}: ${source}`);
    }
  }
});


test('Arabic translates questions, findings and feedback while keeping technical identifiers intact',()=>{
  assert.equal(translate('Question 1 of 5','ar'),'السؤال 1 من 5');
  assert.equal(translate('Strand B is dark; the other has light','ar'),'الليف B بلا ضوء؛ والآخر يمرر الضوء');
  assert.equal(translate('CAS 2 · Port 12','ar'),'CAS 2 · المنفذ 12');
  assert.equal(translate('Select all supported answers. Then check your answers.','ar'),'اختر جميع الإجابات التي تدعمها الأدلة. ثم تحقق من إجاباتك.');
  assert.equal(translate('Question 1 of 5','fr'),'Question 1 sur 5');
  assert.equal(translateLines('FIBER OBSERVATIONS — entered manually\nLoop · Local optic','ar'),'ملاحظات الألياف — أُدخلت يدويًا\nحلقة · الوحدة الضوئية المحلية');
  for(const id of ['QNO5.5C.16f.17.30','S747885346FWL','25/5','RX −40 dBm','TX +0.25 dBm']) assert.equal(translate(id,'ar'),id);
});

test('Arabic preference, direction and glossary search coexist with saved progress and other languages',()=>{
  const values=new Map([['fiber-progress','keep'],['fiber-workbench-v1','keep case']]);
  const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  assert.equal(saveLanguage(storage,'ar'),true);
  assert.equal(readLanguage(storage),'ar');
  assert.equal(readLanguage(null,'?lang=ar'),'ar');
  assert.equal(languageDirection(readLanguage(storage)),'rtl');
  assert.equal(readLanguage(storage,'?lang=fr'),'fr');
  assert.equal(saveLanguage(storage,'en'),true);
  assert.equal(languageDirection(readLanguage(storage)),'ltr');
  assert.equal(values.get('fiber-progress'),'keep');
  assert.equal(values.get('fiber-workbench-v1'),'keep case');
  for(const language of ['es','fr','unknown']) assert.equal(languageDirection(language),'ltr');
  for(const [query,id] of [['وحدة ضوئية','optic'],['فيرول','ferrule'],['قطبية','polarity'],['قُطْبِيّة','polarity'],['جار','lldp'],['محدد الأعطال','vfl'],['فرع','follower'],['transceiver','optic']])
    assert.ok(searchReference(query,'','ar').some(term=>term.id===id),query);
});

test('Arabic display isolates signed readings, equipment IDs and path directions without changing their text',()=>{
  for(const token of ['5C','16f']) assert.equal(formatBidi(token,'ar'),`\u2066${token}\u2069`);
  const text='القراءة −40 dBm؛ المنفذ 25/5؛ الموقع QNO5.5C.16f.17.30؛ A TX → B RX؛ /1 أو /5';
  const displayed=formatBidi(text,'ar');
  for(const token of ['−40 dBm','25/5','QNO5.5C.16f.17.30','A TX → B RX','/1','/5']) assert.ok(displayed.includes(`\u2066${token}\u2069`),token);
  assert.equal(displayed.replace(/[\u2066\u2069]/g,''),text);
  assert.equal(formatBidi(displayed,'ar'),displayed);
  assert.equal(formatBidi('TX +0.25 dBm','ar'),'\u2066TX +0.25 dBm\u2069');
  for(const language of ['en','es','fr']) assert.equal(formatBidi(text,language),text);
});
