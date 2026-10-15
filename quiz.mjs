import {questions, topics, startAttempt, recordAnswer, resultsFor} from './quiz-data.mjs?v=1';

const host = document.querySelector('#quiz');
let attempt;
let index = 0;
let retry = false;

const label = (x,y,value,extra='') => `<text x="${x}" y="${y}" ${extra}>${value}</text>`;
const block = (x,y,w,h,name) => `<rect class="quiz-device" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>${label(x+w/2,y+h/2+5,name,'text-anchor="middle"')}`;
const line = (path,red=false) => `<path class="quiz-light${red ? ' quiz-red' : ''}" d="${path}"/>`;
const arrow = (x,y,red=false) => `<path class="quiz-light${red ? ' quiz-red' : ''}" d="M${x-5} ${y-5} l6 5 -6 5"/>`;

function opticFace(x,y) {
  return `<g transform="translate(${x} ${y})"><path fill="#7053a4" d="M0 17 H9 V81 H85 V17 H94 V91 H0 Z"/><rect fill="#cacbd0" stroke="#777a84" x="7" y="7" width="80" height="67" rx="3"/>`+
    [30,64].map(center => `<rect fill="#454252" x="${center-12}" y="20" width="24" height="43" rx="2"/>`+[31,52].map(y => `<circle fill="#bfc1c9" cx="${center}" cy="${y}" r="6"/><circle fill="#262435" cx="${center}" cy="${y}" r="3"/>`).join('')).join('')+'</g>';
}

function readingFigure(kind) {
  if (kind === 'lanes') return `<figure class="quiz-readings"><div class="quiz-lanes">${['+0.25','+0.28','−40','+0.21'].map((value,i) => `<div class="quiz-reading ${i === 2 ? 'reading-alert' : ''}"><span>RX lane ${i+1}</span><strong>${value}</strong><small>dBm</small></div>`).join('')}</div><figcaption>Example report: four receive lanes. −40 is the reported no-light indication.</figcaption></figure>`;
  const values = {healthy:['+0.80','+0.25'],dark:['+0.80','−40'],weak:['+0.80','−4.20'],high:['+0.80','+4.00']}[kind];
  return `<figure class="quiz-readings"><div class="quiz-reading-pair"><div class="quiz-reading"><span>TX · sending</span><strong>${values[0]}</strong><small>dBm</small></div><div class="quiz-reading ${kind === 'dark' ? 'reading-alert' : ''}"><span>RX · receiving</span><strong>${values[1]}</strong><small>dBm</small></div></div><figcaption>${kind === 'dark' ? 'Example from your workflow: RX −40 is highlighted red for no light.' : '<b>Training limits only:</b> TX −1.00 to +3.00 dBm · RX −3.00 to +3.00 dBm.<br>Real optics use their own limits.'}</figcaption></figure>`;
}

function diagram(kind) {
  if (['healthy','dark','weak','high','lanes'].includes(kind)) return readingFigure(kind);
  let drawing = '';
  let caption = '';
  if (kind === 'optic') {
    drawing = block(8,58,83,52,'Device')+line('M92 84 H130')+opticFace(133,35)+line('M232 84 H348')+arrow(306,84)+label(180,26,'Optic module','text-anchor="middle"')+label(289,112,'Fiber','text-anchor="middle"');
    caption = 'The module sits between the device and its fiber connection.';
  } else if (kind === 'link') {
    drawing = block(8,45,90,90,'Local')+block(262,45,90,90,'Remote')+line('M98 65 H262')+line('M262 113 H98')+arrow(190,65)+`<path class="quiz-light" d="M174 108 l-6 5 6 5"/>`+label(110,54,'TX → RX')+label(110,137,'RX ← TX');
    caption = 'Two directions let each device send and receive. Blue represents invisible IR.';
  } else if (kind === 'passive' || kind === 'passive-loop' || kind === 'direct-loop') {
    const direct = kind === 'direct-loop';
    drawing = opticFace(8,37)+label(54,25,'Local optic','text-anchor="middle"')+line('M104 72 H274 Q324 72 324 89 Q324 106 274 106 H104')+arrow(187,72)+`<path class="quiz-light" d="M193 101 l-6 5 6 5"/>`;
    if (!direct) drawing += block(234,49,48,77,'MMC')+label(255,148,'CAS 1 · Port 12','text-anchor="middle"');
    else drawing += block(109,58,40,61,'LC')+label(235,146,'Short local return','text-anchor="middle"');
    caption = kind === 'passive' ? 'Example of light passing through a passive connection.' : direct ? 'LC loop at the local optic. The long fiber route is outside this test.' : 'MMC loop at the passive. The route continues beyond this test point.';
    if (kind === 'passive') {
      drawing = opticFace(8,37)+line('M104 72 H225')+block(225,48,63,73,'CAS')+line('M288 72 H348')+arrow(175,72)+arrow(333,72)+label(259,145,'Passive','text-anchor="middle"');
    }
  } else if (kind === 'dirty') {
    drawing = '<circle class="scope-face" cx="180" cy="79" r="57"/><circle class="scope-core" cx="180" cy="79" r="16"/><circle class="dirt" cx="171" cy="73" r="9"/><circle class="dirt" cx="194" cy="88" r="6"/><circle class="dirt" cx="151" cy="103" r="4"/>'+label(180,157,'Magnified end face','text-anchor="middle"');
    caption = 'A connector end face seen with the appropriate inspection tool.';
  } else if (kind === 'comparison') {
    drawing = opticFace(48,28)+opticFace(218,28)+label(95,20,'Original','text-anchor="middle"')+label(265,20,'Known-good','text-anchor="middle"')+label(95,146,'Loop fails','text-anchor="middle"')+label(265,146,'Loop passes','text-anchor="middle"');
    caption = 'Same verified setup. One compatible optic changed at a time.';
  } else if (kind === 'sections') {
    drawing = block(5,58,79,48,'Optic')+line('M84 82 H134')+block(134,58,92,48,'Passive 1')+'<path class="quiz-unverified" d="M226 82 H270"/>'+block(270,58,85,48,'Passive 2')+label(45,132,'Passed','text-anchor="middle"')+label(180,132,'Passed','text-anchor="middle"')+label(313,132,'Next test','text-anchor="middle"');
    caption = 'Extend the tested path one accessible section at a time.';
  } else {
    const wrong = kind === 'wrong-port';
    const dark = kind === 'dark-section';
    drawing = '<rect class="vfl-body" x="6" y="61" width="69" height="36" rx="16"/>'+label(40,84,'VFL','text-anchor="middle"')+line('M75 79 H132',true)+'<path class="quiz-unverified" d="M132 79 H242"/>'+block(242,36,109,50,'Expected');
    if (wrong) {
      drawing += block(242,108,109,44,'Other port')+line('M132 79 Q177 79 194 129 H242',true)+'<circle class="red-dot" cx="249" cy="130" r="7"/>';
      caption = 'Red light is detected at a different port from the expected destination.';
    } else if (dark) {
      drawing += '<rect class="suspect-section" x="126" y="44" width="108" height="63" rx="5"/>'+label(180,80,'Check here','text-anchor="middle"')+label(296,111,'No light detected','class="small" text-anchor="middle"');
      caption = 'The section is suspect; this picture does not locate a specific break.';
    } else {
      drawing += line('M132 79 H220 Q231 79 242 61',true)+arrow(181,79,true)+'<circle class="red-dot" cx="249" cy="61" r="7"/>'+label(180,134,'Isolated fiber section','text-anchor="middle"');
      caption = kind === 'vfl-seen' ? 'Red light is detected at the expected port using the safe viewing method.' : 'VFL red light is a separate test source; active equipment is disconnected.';
    }
  }
  return `<figure class="lesson-figure quiz-diagram"><svg viewBox="0 0 360 175" role="img" aria-label="${caption}">${drawing}</svg><figcaption>${caption}</figcaption></figure>`;
}

function focusTitle() {
  const title = host.querySelector('h2');
  title.focus({preventScroll:true});
  host.scrollIntoView({block:'start',behavior:'instant'});
}

function begin(ids, isRetry = false) {
  attempt = startAttempt(ids); index = 0; retry = isRetry;
  renderQuestion();
}

function renderIntro() {
  host.innerHTML = `<p class="chapter-count">Beginner practice · 20 questions · about 10 minutes</p>
    <h2 id="quiz-title" tabindex="-1">Optic & fiber knowledge check</h2>
    <p class="lesson-intro">Know what the optic does, read its light levels, and choose the next useful test.</p>
    ${diagram('optic')}
    <ul class="quiz-topics">${topics.map(topic => `<li>${topic}</li>`).join('')}</ul>
    <p class="section-intro">One question at a time. No timer. Get a simple explanation after each answer, then revisit anything you missed.</p>
    <button class="quiz-primary" type="button" id="quiz-start">Start knowledge check</button>
    <a class="quiz-lesson-link" href="./learn.html">Learn the basics first</a>`;
  host.querySelector('#quiz-start').addEventListener('click',() => begin());
}

function renderQuestion() {
  const question = questions.find(item => item.id === attempt.ids[index]);
  host.innerHTML = `<div class="quiz-progress-label"><span>${retry ? 'Retry' : 'Question'} ${index+1} of ${attempt.ids.length}</span><span>${topics[question.topic]}</span></div>
    <progress class="quiz-progress" value="${index}" max="${attempt.ids.length}" aria-label="Questions answered"></progress>
    <h2 id="quiz-title" class="quiz-question" tabindex="-1">${question.prompt}</h2>
    ${diagram(question.visual)}
    <div class="quiz-answers" role="group" aria-labelledby="quiz-title">${question.choices.map((choice,i) => `<button type="button" class="quiz-answer" data-choice="${i}"><span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${choice}<span class="quiz-answer-state"></span></span></button>`).join('')}</div>
    <div id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
    <button class="quiz-primary" type="button" id="quiz-next" hidden>${index === attempt.ids.length-1 ? 'See results' : 'Next question'}</button>`;
  host.querySelectorAll('.quiz-answer').forEach(button => button.addEventListener('click',() => choose(question,Number(button.dataset.choice))));
  host.querySelector('#quiz-next').addEventListener('click',() => {
    if (!Object.hasOwn(attempt.answers,question.id)) return;
    if (++index < attempt.ids.length) renderQuestion(); else renderResults();
  });
  focusTitle();
}

function choose(question,choice) {
  if (Object.hasOwn(attempt.answers,question.id)) return;
  attempt = recordAnswer(attempt,question.id,choice);
  const correct = choice === question.correct;
  host.querySelectorAll('.quiz-answer').forEach((button,i) => {
    button.disabled = true;
    const status = button.querySelector('.quiz-answer-state');
    if (i === question.correct) { button.classList.add('answer-correct'); status.textContent = correct ? 'Your answer · correct' : 'Correct answer'; }
    else if (i === choice) { button.classList.add('answer-missed'); status.textContent = 'Your answer'; }
  });
  const feedback = host.querySelector('#quiz-feedback');
  feedback.className = `quiz-feedback ${correct ? 'feedback-correct' : 'feedback-missed'}`;
  feedback.innerHTML = `<strong>${correct ? 'That’s right.' : 'Here’s the key idea.'}</strong><p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review the illustrated lesson <span class="sr-only">(opens in a new tab)</span>↗</a>`;
  host.querySelector('.quiz-progress').value = index+1;
  const next = host.querySelector('#quiz-next'); next.hidden = false;
  next.focus({preventScroll:true});
  feedback.scrollIntoView({block:'nearest',behavior:'instant'});
}

function renderResults() {
  const result = resultsFor(attempt);
  host.innerHTML = `<p class="chapter-count">${retry ? 'Retry complete' : 'Knowledge check complete'}</p>
    <h2 id="quiz-title" tabindex="-1">${result.missed.length ? 'Your next learning steps' : 'You’ve covered the basics'}</h2>
    <p class="quiz-score"><strong>${result.correct}<span> / ${result.total}</span></strong> correct on your first answer${retry ? ' in this retry' : ''}</p>
    <p class="section-intro">${result.missed.length ? 'Review the ideas below, then try the missed questions again.' : 'Keep using the real optic limits, FIM mapping and your site’s procedures in the field.'}</p>
    <ul class="quiz-breakdown">${topics.map((topic,topicIndex) => {
      const ids = attempt.ids.filter(id => questions.find(question => question.id === id).topic === topicIndex);
      return ids.length ? `<li><span>${topic}</span><strong>${ids.length-ids.filter(id => result.missed.includes(id)).length} / ${ids.length}</strong></li>` : '';
    }).join('')}</ul>
    <div class="quiz-result-actions">${result.missed.length ? '<button type="button" class="quiz-primary" id="quiz-retry">Retry missed questions</button>' : ''}<button type="button" class="quiz-secondary" id="quiz-restart">Start the full check again</button></div>
    ${result.missed.length ? `<h3 class="quiz-review-title">Review these ideas</h3><ol class="quiz-review">${result.missed.map(id => {
      const question = questions.find(item => item.id === id);
      return `<li><h4>${question.prompt}</h4><p class="quiz-review-choice">Your answer: ${question.choices[attempt.answers[id]]}</p><p><b>Correct:</b> ${question.choices[question.correct]}</p><p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review lesson ↗<span class="sr-only"> (opens in a new tab)</span></a></li>`;
    }).join('')}</ol>` : ''}
    <p class="picture-note">This is a learning check, not an equipment health result or field qualification.</p>
    <a class="lesson-return" href="./index.html">Use the optic / fiber health check →</a>`;
  host.querySelector('#quiz-retry')?.addEventListener('click',() => begin(result.missed,true));
  host.querySelector('#quiz-restart').addEventListener('click',() => begin());
  focusTitle();
}

renderIntro();
