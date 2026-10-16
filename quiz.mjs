import {quizVisual, quizThumbnail} from './quiz-visuals.mjs?v=3';

import {questions, topics, roundDescriptions, roundQuestionIds, startAttempt, recordAnswer, isCorrectAnswer, resultsFor, roundProgress, rookieRank, loadQuizProgress, saveQuizProgress, recordRoundProgress, skillsFor} from './quiz-data.mjs?v=8';

const host = document.querySelector('#quiz');
let attempt;
let index = 0;
let retry = false;
let currentRound = 0;
let roundAnswers = {};
let firstScore = 0;
let motionPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let progressStorage;
try { progressStorage = window.localStorage; } catch { /* Quizzes still work without storage. */ }
let {scores:savedScores,canSave} = loadQuizProgress(progressStorage);

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
  host.innerHTML = `<p class="chapter-count">Beginner level · 5 questions per exam</p>
    <h2 id="quiz-title" tabindex="-1">Exams</h2>
    <p class="lesson-intro">Look at the evidence. Choose your next check. Five questions at a time, in any order.</p>
    ${rank.level ? rankCard(rank,false,true) : '<p class="section-intro">Get 4/5 to earn a Fiber Rookie stripe. Each different exam you pass adds one stripe.</p>'}
    <div class="quiz-picker">${topics.map((topic,i) => {
      const score = savedScores[i];
      const passed = score !== null && score >= 4;
      return `<button type="button" class="quiz-pick${passed ? ' quiz-pick-passed' : ''}" data-round="${i}">
        ${quizThumbnail(i)}<span class="quiz-pick-content">
          <strong>${topic}</strong><span class="quiz-pick-description">${roundDescriptions[i]}</span>
          <span class="quiz-pick-status">${score === null ? 'Not taken' : `${passed ? '✓ Passed' : 'Keep practicing'} · Best result ${score}/5`}</span>
          <span class="quiz-pick-action">${score === null ? 'Start exam' : 'Retake exam'} →</span>
        </span></button>`;
    }).join('')}</div>
    <p class="picture-note">${canSave ? 'Completed exam results and stripes stay in this browser on this device. Best results include retries.' : 'This browser cannot save progress. You can still choose any exam; results last for this visit.'}</p>
    <a class="quiz-lesson-link" href="./simulations.html">Simulations · hands-on patching & 5-question exam →</a>
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
  const visual = question.interaction==='visual';
  host.classList.toggle('light-paused',motionPaused);
  host.innerHTML = `<div class="q-question-tools"><button class="quiz-picker-back" type="button" id="quiz-all">← All exams</button><button class="q-motion" type="button" id="quiz-motion" aria-label="${motionPaused ? 'Play' : 'Pause'} explanation animations">${motionPaused ? 'Play' : 'Pause'} motion</button></div>
    <div class="quiz-progress-label"><span>${retry ? 'Retry' : 'Question'} ${index+1} of ${attempt.ids.length}</span><span>Round ${currentRound+1} · ${topics[question.topic]}</span></div>
    <progress class="quiz-progress" value="${index}" max="${attempt.ids.length}" aria-label="Questions answered"></progress>
    <h2 id="quiz-title" class="quiz-question" tabindex="-1">${question.prompt}</h2>
    ${visual ? '<p class="q-tap-hint">Tap your answer in the picture. Keyboard: Tab, then Enter.</p>' : ''}
    <div id="quiz-scene">${quizVisual(question)}</div>
    <div id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
    ${multiple ? '<p class="quiz-selection-hint" id="quiz-selection-hint">Select all that could cause it, then check your answers.</p>' : ''}
    ${visual ? '' : `<div class="quiz-answers" role="group" aria-labelledby="quiz-title"${multiple ? ' aria-describedby="quiz-selection-hint"' : ''}>${question.choices.map((choice,i) => multiple
      ? `<label class="quiz-answer quiz-multiple"><input type="checkbox" value="${i}"><span>${choice}<span class="quiz-answer-state"></span></span></label>`
      : `<button type="button" class="quiz-answer" data-choice="${i}"><span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${choice}<span class="quiz-answer-state"></span></span></button>`).join('')}</div>`}
    ${multiple ? '<button class="quiz-primary" type="button" id="quiz-check" disabled>Check answers</button>' : ''}
    <button class="quiz-primary" type="button" id="quiz-next" hidden>${index === attempt.ids.length-1 ? 'Finish this round' : 'Next question'}</button>`;
  if (multiple) {
    const check = host.querySelector('#quiz-check');
    host.querySelectorAll('.quiz-multiple input').forEach(input => input.addEventListener('change',() => {
      check.disabled = !host.querySelector('.quiz-multiple input:checked');
    }));
    check.addEventListener('click',() => choose(question,[...host.querySelectorAll('.quiz-multiple input:checked')].map(input => Number(input.value))));
  } else {
    host.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click',() => choose(question,Number(button.dataset.choice))));
  }
  host.querySelector('#quiz-next').addEventListener('click',() => {
    if (!Object.hasOwn(attempt.answers,question.id)) return;
    if (++index < attempt.ids.length) renderQuestion(); else renderResults();
  });
  host.querySelector('#quiz-all').addEventListener('click',showQuizPicker);
  host.querySelector('#quiz-motion').addEventListener('click',event=> {
    motionPaused=!motionPaused;
    host.classList.toggle('light-paused',motionPaused);
    event.currentTarget.textContent=`${motionPaused ? 'Play' : 'Pause'} motion`;
    event.currentTarget.setAttribute('aria-label',`${motionPaused ? 'Play' : 'Pause'} explanation animations`);
  });
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
  const cassetteScroll=host.querySelector('.q-cas-scroll')?.scrollLeft ?? 0;
  host.querySelector('#quiz-scene').innerHTML=quizVisual(question,{answered:true,choice});
  if(host.querySelector('.q-cas-scroll')) host.querySelector('.q-cas-scroll').scrollLeft=cassetteScroll;
  const feedback = host.querySelector('#quiz-feedback');
  feedback.className = `quiz-feedback ${correct ? 'feedback-correct' : 'feedback-missed'}`;
  feedback.innerHTML = `<strong>${correct ? '✓ Good call. Here’s why.' : 'Here’s what the evidence tells us.'}</strong><p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review the illustrated lesson <span class="sr-only">(opens in a new tab)</span>↗</a>`;
  host.querySelector('.quiz-progress').value = index+1;
  const next = host.querySelector('#quiz-next'); next.hidden = false;
  next.focus({preventScroll:true});
  host.querySelector('#quiz-scene').scrollIntoView({block:'start',behavior:'instant'});
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
  const skills=skillsFor(currentRound,roundAnswers);
  const earnedNow = rank.level > previousRank.level;
  const title = !progress.passed ? 'A little more practice' : rank.complete ? 'Beginner basics complete' : earnedNow ? 'You earned a stripe' : 'Round complete';
  host.innerHTML = `<p class="chapter-count">Round ${currentRound+1} ${retry ? 'practice complete' : 'complete'} · ${topics[currentRound]}</p>
    <h2 id="quiz-title" tabindex="-1">${title}</h2>
    ${rankCard(rank,earnedNow,progress.passed)}
    <p class="quiz-score"><strong>${progress.correct}<span> / 5</span></strong> ${retry ? 'answered correctly after practice' : 'correct on your first answer'}</p>
    ${retry ? `<p class="picture-note">First try: ${firstScore}/5. This retry: ${result.correct}/${result.total}.</p>` : ''}
    <section class="q-skill-recap" aria-label="Skills from this round">
      ${skills.checked.length ? `<div><h3>What you showed</h3><ul>${skills.checked.map(skill=>`<li>✓ ${skill}</li>`).join('')}</ul></div>` : ''}
      ${skills.review.length ? `<div><h3>Practice next</h3><ul>${skills.review.map(skill=>`<li>${skill}</li>`).join('')}</ul></div>` : ''}
    </section>
    <p class="section-intro">${progress.passed ? 'You can revisit an idea or choose any other exam.' : 'Review the ideas below and retry the missed questions. Aim for four correct answers out of five.'}</p>
    ${!canSave ? '<p class="picture-note">Progress could not be saved in this browser. It will last for this visit.</p>' : ''}
    ${nextRound !== null ? `<p class="quiz-next-round"><strong>Next: ${topics[nextRound]}</strong><span>${roundDescriptions[nextRound]}</span></p>` : ''}
    <div class="quiz-result-actions">
      ${nextRound !== null ? '<button type="button" class="quiz-primary" id="quiz-continue">Try the next 5 questions</button>' : ''}
      ${progress.missed.length ? `<button type="button" class="${progress.passed ? 'quiz-secondary' : 'quiz-primary'}" id="quiz-retry">Retry ${progress.missed.length} missed ${progress.missed.length === 1 ? 'question' : 'questions'}</button>` : ''}
      <button type="button" class="${nextRound === null && progress.passed ? 'quiz-primary' : 'quiz-secondary'}" id="quiz-all">Choose another exam</button>
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
