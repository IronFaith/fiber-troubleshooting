import { cassetteFront, loopIllustration } from './loop-visuals.mjs?v=3';
import { lightSource } from './light-visuals.mjs?v=1';
import {questions, topics, roundDescriptions, roundQuestionIds, startAttempt, recordAnswer, isCorrectAnswer, resultsFor, roundProgress, rookieRank, loadQuizProgress, saveQuizProgress, recordRoundProgress} from './quiz-data.mjs?v=5';

const host = document.querySelector('#quiz');
let attempt;
let index = 0;
let retry = false;
let currentRound = 0;
let roundAnswers = {};
let firstScore = 0;
let progressStorage;
try { progressStorage = window.localStorage; } catch { /* Quizzes still work without storage. */ }
let {scores:savedScores,canSave} = loadQuizProgress(progressStorage);

const label = (x,y,value,extra='') => `<text x="${x}" y="${y}" ${extra}>${value}</text>`;
const block = (x,y,w,h,name) => `<rect class="quiz-device" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>${label(x+w/2,y+h/2+5,name,'text-anchor="middle"')}`;
const line = (path,red=false) => `<path class="quiz-light${red ? ' quiz-red' : ''}" d="${path}"/>`;
const arrow = (x,y,red=false) => `<path class="quiz-light${red ? ' quiz-red' : ''}" d="M${x-5} ${y-5} l6 5 -6 5"/>`;

function opticFace(x,y) {
  return `<g transform="translate(${x} ${y})"><g transform="translate(0 98) scale(1 -1)"><path fill="#7053a4" d="M0 17 H9 V81 H85 V17 H94 V91 H0 Z"/><rect fill="#cacbd0" stroke="#777a84" x="7" y="7" width="80" height="67" rx="3"/>`+
    [30,64].map(center => `<rect fill="#454252" x="${center-12}" y="20" width="24" height="43" rx="2"/>`+[31,52].map(y => `<circle fill="#bfc1c9" cx="${center}" cy="${y}" r="6"/><circle fill="#262435" cx="${center}" cy="${y}" r="3"/>`).join('')).join('')+'</g></g>';
}

function readingFigure(kind) {
  if (kind === 'simple-rx-dark') return `<figure class="quiz-readings"><div class="quiz-reading reading-alert"><span>RX · light arriving</span><strong>−40</strong></div><figcaption>Example Cable Guy report · no light received</figcaption></figure>`;
  if (kind === 'light-returns') return `<figure class="quiz-readings"><div class="quiz-reading-pair"><div class="quiz-reading reading-alert"><span>Before</span><strong>−40</strong><small>No light reported</small></div><div class="quiz-reading"><span>After</span><strong>Light returns</strong><small>Check the new reading</small></div></div><figcaption>You cleaned and reseated this connection.</figcaption></figure>`;
  if (kind === 'simple-dark') return `<figure class="quiz-readings"><div class="quiz-reading-pair">${['RX','TX'].map(name => `<div class="quiz-reading reading-alert"><span>${name}</span><strong>−40</strong></div>`).join('')}</div><figcaption>Example Cable Guy report</figcaption></figure>`;
  if (kind === 'lanes') return `<figure class="quiz-readings"><div class="quiz-lanes">${['+0.25','+0.28','−40','+0.21'].map((value,i) => `<div class="quiz-reading ${i === 2 ? 'reading-alert' : ''}"><span>RX lane ${i+1}</span><strong>${value}</strong><small>dBm</small></div>`).join('')}</div><figcaption>Example report: four receive lanes. −40 is the reported no-light indication.</figcaption></figure>`;
  const values = {healthy:['+0.80','+0.25'],dark:['+0.80','−40'],weak:['+0.80','−4.20'],high:['+0.80','+4.00']}[kind];
  return `<figure class="quiz-readings"><div class="quiz-reading-pair"><div class="quiz-reading"><span>TX · sending</span><strong>${values[0]}</strong><small>dBm</small></div><div class="quiz-reading ${kind === 'dark' ? 'reading-alert' : ''}"><span>RX · receiving</span><strong>${values[1]}</strong><small>dBm</small></div></div><figcaption>${kind === 'dark' ? 'Example from your workflow: RX −40 is highlighted red for no light.' : '<b>Training limits only:</b> TX −1.00 to +3.00 dBm · RX −3.00 to +3.00 dBm.<br>Real optics use their own limits.'}</figcaption></figure>`;
}

function diagram(kind) {
  if (['simple-dark','simple-rx-dark','light-returns','healthy','dark','weak','high','lanes'].includes(kind)) return readingFigure(kind);
  let drawing = '';
  let caption = '';
  let height = 175;
  let hardware = false;
  if (kind === 'unseated') {
    drawing = opticFace(12,36)+'<rect class="quiz-device" x="108" y="64" width="45" height="38" rx="3"/><rect class="lc-plug" x="184" y="64" width="62" height="38" rx="3"/><path class="quiz-fiber" d="M246 83 H343"/><path class="quiz-gap" d="M156 57 H181 M156 52 V62 M181 52 V62"/>'+label(168,39,'Gap','text-anchor="middle"');
    caption = 'The connector is not fully seated.';
  } else if (kind === 'bend') {
    drawing = '<path class="quiz-fiber" d="M20 65 H242 Q251 65 251 74 Q251 83 242 83 H115 Q85 83 85 113 V145"/><circle class="quiz-gap" cx="250" cy="74" r="24"/>'+label(274,32,'Tight bend','text-anchor="middle"');
    caption = 'A tight bend in the fiber route.';
  } else if (kind === 'port-label') {
    drawing = cassetteFront()+label(180,205,'Record: CAS 1 Port 12','text-anchor="middle"');
    height = 220; hardware = true;
    caption = 'Top row: 1–16. Bottom row: 17–32. Match the port in the record.';
  } else if (kind === 'recheck') {
    drawing = block(8,58,130,57,'One fix')+line('M138 86 H222')+arrow(194,86)+block(222,58,130,57,'Recheck');
    caption = 'Check the result after each change.';
  } else if (kind === 'optic') {
    drawing = block(8,58,83,52,'Device')+line('M92 84 H130')+opticFace(133,35)+line('M232 84 H348')+arrow(306,84)+label(180,26,'Optic module','text-anchor="middle"')+label(289,112,'Fiber','text-anchor="middle"');
    caption = 'The module sits between the device and its fiber connection.';
    drawing += lightSource(232,84);
  } else if (kind === 'link') {
    drawing = block(8,45,90,90,'Local')+block(262,45,90,90,'Remote')+line('M98 65 H262')+line('M262 113 H98')+arrow(190,65)+`<path class="quiz-light" d="M174 108 l-6 5 6 5"/>`+label(110,54,'TX → RX')+label(110,137,'RX ← TX');
    caption = 'Two directions let each device send and receive. Blue represents invisible IR.';
    drawing += lightSource(98,65)+lightSource(262,113);
  } else if (kind === 'passive-loop' || kind === 'direct-loop') {
    const art = loopIllustration(kind === 'direct-loop' ? 'direct' : 'passive');
    drawing = art.drawing; caption = art.caption; height = art.height; hardware = true;
  } else if (kind === 'passive') {
    drawing = cassetteFront({port:null}); height = 190; hardware = true;
    caption = 'A 32-port passive cassette. It connects fiber paths; it does not produce light.';
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
    drawing += lightSource(75,79,'red');
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
  return `<figure class="lesson-figure quiz-diagram"><svg class="${hardware ? 'hardware-diagram' : ''}" viewBox="0 0 360 ${height}" role="img" aria-label="${caption}">${drawing}</svg><figcaption>${caption}</figcaption></figure>`;
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

function beginRound(topic) {
  currentRound = topic;
  roundAnswers = {};
  firstScore = 0;
  begin(roundQuestionIds(topic));
}

function renderIntro() {
  const rank = rookieRank(savedScores);
  host.innerHTML = `<p class="chapter-count">Beginner practice · 5 questions per quiz</p>
    <h2 id="quiz-title" tabindex="-1">Choose your quiz</h2>
    <p class="lesson-intro">From simple signs to applied checks. All four are beginner quizzes, and you can take them in any order.</p>
    ${rank.level ? rankCard(rank,false,true) : '<p class="section-intro">Get 4/5 to earn a Fiber Rookie stripe. Each different quiz you pass adds one stripe.</p>'}
    <div class="quiz-picker">${topics.map((topic,i) => {
      const score = savedScores[i];
      const passed = score !== null && score >= 4;
      return `<button type="button" class="quiz-pick${passed ? ' quiz-pick-passed' : ''}" data-round="${i}">
        <span class="quiz-pick-number" aria-hidden="true">${i+1}</span><span class="quiz-pick-content">
          <strong>${topic}</strong><span class="quiz-pick-description">${roundDescriptions[i]}</span>
          <span class="quiz-pick-status">${score === null ? 'Not taken' : `${passed ? '✓ Passed' : 'Keep practicing'} · Best result ${score}/5`}</span>
          <span class="quiz-pick-action">${score === null ? 'Start quiz' : 'Retake quiz'} →</span>
        </span></button>`;
    }).join('')}</div>
    <p class="picture-note">${canSave ? 'Completed quiz results and stripes stay in this browser on this device. Best results include retries.' : 'This browser cannot save progress. You can still choose any quiz; results last for this visit.'}</p>
    <a class="quiz-lesson-link" href="./learn.html">Learn the basics first</a>`;
  host.querySelectorAll('.quiz-pick').forEach(button => button.addEventListener('click',() => beginRound(Number(button.dataset.round))));
}

function showQuizPicker() {
  renderIntro();
  focusTitle();
}

function renderQuestion() {
  const question = questions.find(item => item.id === attempt.ids[index]);
  const multiple = Array.isArray(question.correct);
  host.innerHTML = `<button class="quiz-picker-back" type="button" id="quiz-all">← All quizzes</button>
    <div class="quiz-progress-label"><span>${retry ? 'Retry' : 'Question'} ${index+1} of ${attempt.ids.length}</span><span>Round ${currentRound+1} · ${topics[question.topic]}</span></div>
    <progress class="quiz-progress" value="${index}" max="${attempt.ids.length}" aria-label="Questions answered"></progress>
    <h2 id="quiz-title" class="quiz-question" tabindex="-1">${question.prompt}</h2>
    ${diagram(question.visual)}
    ${multiple ? '<p class="quiz-selection-hint" id="quiz-selection-hint">Select all that could cause it, then check your answers.</p>' : ''}
    <div class="quiz-answers" role="group" aria-labelledby="quiz-title"${multiple ? ' aria-describedby="quiz-selection-hint"' : ''}>${question.choices.map((choice,i) => multiple
      ? `<label class="quiz-answer quiz-multiple"><input type="checkbox" value="${i}"><span>${choice}<span class="quiz-answer-state"></span></span></label>`
      : `<button type="button" class="quiz-answer" data-choice="${i}"><span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${choice}<span class="quiz-answer-state"></span></span></button>`).join('')}</div>
    ${multiple ? '<button class="quiz-primary" type="button" id="quiz-check" disabled>Check answers</button>' : ''}
    <div id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
    <button class="quiz-primary" type="button" id="quiz-next" hidden>${index === attempt.ids.length-1 ? 'Finish this round' : 'Next question'}</button>`;
  if (multiple) {
    const check = host.querySelector('#quiz-check');
    host.querySelectorAll('.quiz-multiple input').forEach(input => input.addEventListener('change',() => {
      check.disabled = !host.querySelector('.quiz-multiple input:checked');
    }));
    check.addEventListener('click',() => choose(question,[...host.querySelectorAll('.quiz-multiple input:checked')].map(input => Number(input.value))));
  } else {
    host.querySelectorAll('.quiz-answer').forEach(button => button.addEventListener('click',() => choose(question,Number(button.dataset.choice))));
  }
  host.querySelector('#quiz-next').addEventListener('click',() => {
    if (!Object.hasOwn(attempt.answers,question.id)) return;
    if (++index < attempt.ids.length) renderQuestion(); else renderResults();
  });
  host.querySelector('#quiz-all').addEventListener('click',showQuizPicker);
  focusTitle();
}

function choose(question,choice) {
  if (Object.hasOwn(attempt.answers,question.id)) return;
  const updated = recordAnswer(attempt,question.id,choice);
  if (updated === attempt) return;
  attempt = updated;
  roundAnswers = {...roundAnswers,[question.id]:attempt.answers[question.id]};
  const correct = isCorrectAnswer(question,choice);
  const multiple = Array.isArray(question.correct);
  const expected = multiple ? question.correct : [question.correct];
  const selected = multiple ? choice : [choice];
  host.querySelectorAll('.quiz-answer').forEach((card,i) => {
    if (multiple) card.querySelector('input').disabled = true; else card.disabled = true;
    const status = card.querySelector('.quiz-answer-state');
    if (expected.includes(i)) {
      card.classList.add('answer-correct');
      status.textContent = selected.includes(i) ? 'Your answer · correct' : multiple ? 'Also a possible cause · not selected' : 'Correct answer';
    } else if (selected.includes(i)) {
      card.classList.add('answer-missed'); status.textContent = multiple ? 'Your answer · not a cause' : 'Your answer';
    }
  });
  const check = host.querySelector('#quiz-check');
  if (check) { check.disabled = true; check.hidden = true; }
  const feedback = host.querySelector('#quiz-feedback');
  feedback.className = `quiz-feedback ${correct ? 'feedback-correct' : 'feedback-missed'}`;
  feedback.innerHTML = `<strong>${correct ? 'That’s right.' : multiple ? 'Look at each possible cause.' : 'Here’s the key idea.'}</strong>${multiple && !correct ? '<p>For this question, include every possible cause and leave out the option that is not a cause.</p>' : ''}<p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review the illustrated lesson <span class="sr-only">(opens in a new tab)</span>↗</a>`;
  host.querySelector('.quiz-progress').value = index+1;
  const next = host.querySelector('#quiz-next'); next.hidden = false;
  next.focus({preventScroll:true});
  feedback.scrollIntoView({block:'nearest',behavior:'instant'});
}

function rankCard(rank, earnedNow, passed) {
  const note = rank.complete ? 'All four beginner rounds passed.'
    : !passed && (savedScores[currentRound] ?? 0) < 4 ? 'Get 4/5 in this round to earn your next stripe.'
    : !passed ? 'Your earned stripe stays while you practice.'
    : 'One stripe for each beginner round passed.';
  return `<section class="quiz-rank${rank.complete ? ' rank-complete' : ''}" aria-labelledby="quiz-rank-title">
    <svg class="quiz-rank-badge" viewBox="0 0 88 100" aria-hidden="true" focusable="false">
      <path class="rank-shield" d="M8 7 Q44 -1 80 7 V59 Q80 78 44 96 Q8 78 8 59 Z"/>
      ${Array.from({length:4},(_,i) => `<path class="rank-stripe${i < rank.level ? ' stripe-earned' : ''}" d="M23 ${21+i*14} L44 ${28+i*14} L65 ${21+i*14} V${28+i*14} L44 ${35+i*14} L23 ${28+i*14} Z"/>`).join('')}
    </svg>
    <div><p class="quiz-rank-label">Beginner · ${earnedNow ? 'Stripe earned' : rank.level ? 'Your earned rank' : 'Your first stripe is next'}</p>
      <h3 id="quiz-rank-title">${rank.title}</h3>
      <p class="quiz-rank-count">${rank.level} of 4 stripes${rank.complete ? ' · Beginner complete' : ''}</p>
      <p class="quiz-rank-note">${note}</p>
    </div>
  </section>`;
}

function renderResults() {
  const result = resultsFor(attempt);
  if (!retry) firstScore = result.correct;
  const progress = roundProgress(currentRound,roundAnswers);
  const nextRound = progress.nextRound;
  const previousRank = rookieRank(savedScores);
  savedScores = recordRoundProgress(savedScores,currentRound,roundAnswers);
  canSave = saveQuizProgress(progressStorage,savedScores);
  const rank = rookieRank(savedScores);
  const earnedNow = rank.level > previousRank.level;
  const title = !progress.passed ? 'A little more practice' : rank.complete ? 'Beginner basics complete' : earnedNow ? 'You earned a stripe' : 'Round complete';
  host.innerHTML = `<p class="chapter-count">Round ${currentRound+1} ${retry ? 'practice complete' : 'complete'} · ${topics[currentRound]}</p>
    <h2 id="quiz-title" tabindex="-1">${title}</h2>
    ${rankCard(rank,earnedNow,progress.passed)}
    <p class="quiz-score"><strong>${progress.correct}<span> / 5</span></strong> ${retry ? 'answered correctly after practice' : 'correct on your first answer'}</p>
    ${retry ? `<p class="picture-note">First try: ${firstScore}/5. This retry: ${result.correct}/${result.total}.</p>` : ''}
    <p class="section-intro">${progress.passed ? 'You can revisit an idea or choose any other quiz.' : 'Review the ideas below and retry the missed questions. Aim for four correct answers out of five.'}</p>
    ${!canSave ? '<p class="picture-note">Progress could not be saved in this browser. It will last for this visit.</p>' : ''}
    ${nextRound !== null ? `<p class="quiz-next-round"><strong>Next: ${topics[nextRound]}</strong><span>${roundDescriptions[nextRound]}</span></p>` : ''}
    <div class="quiz-result-actions">
      ${nextRound !== null ? '<button type="button" class="quiz-primary" id="quiz-continue">Try the next 5 questions</button>' : ''}
      ${progress.missed.length ? `<button type="button" class="${progress.passed ? 'quiz-secondary' : 'quiz-primary'}" id="quiz-retry">Retry ${progress.missed.length} missed ${progress.missed.length === 1 ? 'question' : 'questions'}</button>` : ''}
      <button type="button" class="${nextRound === null && progress.passed ? 'quiz-primary' : 'quiz-secondary'}" id="quiz-all">Choose another quiz</button>
      <button type="button" class="quiz-secondary" id="quiz-restart">Repeat these 5 questions</button>
      <a class="quiz-lesson-link" href="./learn.html">Stop here · back to lessons</a>
    </div>
    ${progress.missed.length ? `<h3 class="quiz-review-title">Ideas to revisit</h3><ol class="quiz-review">${progress.missed.map(id => {
      const question = questions.find(item => item.id === id);
      const answerText = answer => (Array.isArray(answer) ? answer : [answer]).map(choice => question.choices[choice]).join(' ');
      return `<li><h4>${question.prompt}</h4><p class="quiz-review-choice">Your answer: ${answerText(roundAnswers[id])}</p><p><b>Correct:</b> ${answerText(question.correct)}</p><p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review lesson ↗<span class="sr-only"> (opens in a new tab)</span></a></li>`;
    }).join('')}</ol>` : ''}
    <a class="lesson-return" href="./index.html">Use the optic / fiber health check →</a>`;
  host.querySelector('#quiz-continue')?.addEventListener('click',() => beginRound(nextRound));
  host.querySelector('#quiz-retry')?.addEventListener('click',() => begin(progress.missed,true));
  host.querySelector('#quiz-restart').addEventListener('click',() => beginRound(currentRound));
  host.querySelector('#quiz-all').addEventListener('click',showQuizPicker);
  focusTitle();
}

renderIntro();
