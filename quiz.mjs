import {loadExam,saveExam,clearExam} from './quiz-session.mjs?v=2';
import {startExamCount,recordExamCompletion} from './site-counter.mjs?v=7';
import {quizVisual, quizThumbnail, rankEmblem, examEmblem} from './quiz-visuals.mjs?v=7';

import {questions, topics, allTopics, allDescriptions, levelFor, roundsForLevel, drawRoundIds, startAttempt, recordAnswer, isCorrectAnswer, resultsFor, roundProgress, apprenticeRank, loadQuizProgress, saveQuizProgress, recordRoundProgress, skillsFor} from './quiz-data.mjs?v=12';
import {loadPatchBest} from './patch-practice-data.mjs?v=2';

const host = document.querySelector('#quiz');
let attempt, countEvent;
let index = 0;
let retry = false;
let currentRound = 0;
let roundAnswers = {};
let firstScore = 0;
let motionPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let progressStorage;
try { progressStorage = window.localStorage; } catch { /* Quizzes still work without storage. */ }
let {scores:savedScores,canSave} = loadQuizProgress(progressStorage);
let {scores:appliedScores} = loadQuizProgress(progressStorage,'intermediate');
let suspended=loadExam(progressStorage), fullRoundIds=[], draftChoices=[];
let selectedLevel=['beginner','intermediate'].includes(location.hash.slice(1))?location.hash.slice(1):null;
const levelTitle=level=>level==='intermediate'?'Intermediate':'Beginner';
const activeScores=()=>selectedLevel==='intermediate'?appliedScores:savedScores;

function focusTitle() {
  const title = host.querySelector('h2');
  title.focus({preventScroll:true});
  host.scrollIntoView({block:'start',behavior:'instant'});
}

function persistExam() {
  suspended={round:currentRound,ids:fullRoundIds,attempt,index,retry,roundAnswers,firstScore,countEvent,draftChoices};
  saveExam(progressStorage,suspended);
}
function showResume() {
  if(!suspended) return;
  const panel=document.createElement('div'); panel.className='exam-resume';
  panel.innerHTML=`<div><strong>${suspended.retry?'Practice':'Exam'} in progress</strong><span>${allTopics[suspended.round]} · Question ${suspended.index+1} of ${suspended.attempt.ids.length}</span></div><button type="button">Resume ${suspended.retry?'practice':'exam'}</button>`;
  host.querySelector('h2').after(panel);
  panel.querySelector('button').addEventListener('click',()=>{
    const saved=suspended;
    currentRound=saved.round; fullRoundIds=[...saved.ids]; attempt=saved.attempt; index=saved.index;
    retry=saved.retry; roundAnswers=saved.roundAnswers; firstScore=saved.firstScore; draftChoices=saved.draftChoices;
    countEvent=retry?null:saved.countEvent?{...saved.countEvent,at:Date.now()}:startExamCount();
    selectedLevel=levelFor(currentRound);
    history.replaceState(null,'',`${location.pathname}#${selectedLevel}`);
    renderQuestion();
  });
}

function begin(ids, isRetry = false) {
  attempt = startAttempt(ids); index = 0; retry = isRetry; draftChoices=[];
  countEvent = isRetry ? null : startExamCount();
  renderQuestion();
}

function beginRound(topic) {
  selectedLevel=levelFor(topic);
  history.replaceState(null,'',`${location.pathname}#${selectedLevel}`);
  currentRound = topic;
  roundAnswers = {};
  firstScore = 0;
  fullRoundIds=drawRoundIds(topic);
  begin(fullRoundIds);
}

function renderIntro() {
  host.classList.remove('light-paused');
  if(location.hash==='#progress') { renderProgress(); showResume(); return; }
  const patchBest=loadPatchBest(progressStorage).best;
  if(!selectedLevel) {
    const counts=[savedScores.filter(s=>s>=4).length+(patchBest>=4?1:0),appliedScores.filter(s=>s>=4).length];
    host.innerHTML=`<h2 id="quiz-title" tabindex="-1">Exams</h2><p class="lesson-intro">Choose a level. Every exam has five questions and draws from the chapters.</p>
      <a class="quiz-lesson-link" href="#progress">My progress · ${apprenticeRank(savedScores).title}</a>
      <div class="exam-levels">${['beginner','intermediate'].map((level,i)=>`<button type="button" class="exam-level" data-level="${level}">
        ${quizThumbnail(i===0?2:3)}<span><strong>${levelTitle(level)}</strong><b>${i===0?'Foundations':'Applied troubleshooting'}</b><span>${i===0?'Recognize parts, read the signs and make the basic checks.':'Combine observations, explain the limits of a test and choose your next check.'}</span><small>${counts[i]} of ${i===0?5:2} exams passed · choose any exam</small><em>Open ${levelTitle(level)} →</em></span></button>`).join('')}</div>
      <p class="picture-note">Beginner includes four knowledge exams and hands-on patching. Intermediate combines those ideas in mixed scenarios. Choose any exam; there is no required order.</p>
      <a class="quiz-lesson-link" href="./learn.html">Explore the chapters</a>`;
    showResume();
    host.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>chooseLevel(b.dataset.level)));
    return;
  }
  const beginner=selectedLevel==='beginner', scores=activeScores();
  const rank = apprenticeRank(savedScores);
  host.innerHTML = `<button type="button" class="quiz-picker-back" id="exam-levels">← Exam levels</button><p class="chapter-count">5 questions per exam · choose freely</p>
    <h2 id="quiz-title" tabindex="-1">${levelTitle(selectedLevel)} · ${beginner?'Foundations':'Applied troubleshooting'}</h2>
    <p class="lesson-intro">${beginner?'Understand the parts, interpret a clear observation and choose a sensible first check.':'Use the same chapter knowledge in situations with several clues. Separate what is known from what still needs checking.'}</p>
    ${beginner?(rank.level ? rankCard(rank,false,true) : '<p class="section-intro">Pass each knowledge exam with 4/5 to advance from Fiber Learner through Fiber Apprentice I–IV. Patching has its own result.</p>'):appliedCard()}
    <div class="quiz-picker">${roundsForLevel(selectedLevel).map((topic,i) => {
      const score = scores[i];
      const passed = score !== null && score >= 4;
      return `<button type="button" class="quiz-pick${passed ? ' quiz-pick-passed' : ''}" data-round="${topic}">
        ${quizThumbnail(beginner?topic:i===0?3:2)}<span class="quiz-pick-content">
          <strong>${allTopics[topic]}</strong><span class="quiz-pick-description">${allDescriptions[topic]}</span>
          <span class="quiz-pick-status">${score === null ? 'Not taken' : `${passed ? '✓ Passed' : 'Keep practicing'} · Best result ${score}/5`}</span>
          <span class="quiz-pick-action">${score === null ? 'Start exam' : 'Retake exam'} →</span>
        </span></button>`;
    }).join('')}${beginner?`<a class="quiz-pick${patchBest>=4?' quiz-pick-passed':''}" href="./simulations.html?exam=patching#practice">${quizThumbnail(1)}<span class="quiz-pick-content"><strong>Hands-on patching</strong><span class="quiz-pick-description">Place LC and MMC connectors from a mock FIM ticket, including a flipped optic.</span><span class="quiz-pick-status">${patchBest===null?'Not taken':`${patchBest>=4?'✓ Passed':'Keep practicing'} · Best result ${patchBest}/5`}</span><span class="quiz-pick-action">Open patching exam →</span></span></a>`:''}</div>
    <p class="picture-note">${canSave ? `Scores stay in this browser on this device. ${beginner?'Knowledge-exam best results include retries.':'Intermediate best scores use complete exam attempts; practice retries do not replace them.'}` : 'This browser cannot save progress. You can still choose any exam; results last for this visit.'}</p>
    <a class="quiz-lesson-link" href="./learn.html${beginner?'':'#compare-loops'}">${beginner?'Learn the basics first':'Review the worked examples'}</a>`;
  showResume();
  host.querySelectorAll('[data-round]').forEach(button => button.addEventListener('click',() => beginRound(Number(button.dataset.round))));
  host.querySelector('#exam-levels').addEventListener('click',()=>chooseLevel(null));
}

function chooseLevel(level) {
  selectedLevel=level;
  history.replaceState(null,'',`${location.pathname}${level?`#${level}`:''}`);
  showQuizPicker();
}
function renderProgress() {
  const rank=apprenticeRank(savedScores), patch=loadPatchBest(progressStorage);
  const badge=(title,score,topic)=>{
    const earned=score!==null && score>=4;
    const content=`${examEmblem(topic===null?'patch':topic,earned)}
      <span><strong>${title}</strong><small>${earned?'Earned':score===null?'Not yet earned':'Keep practicing'}${score===null?'':` · Best ${score}/5`}</small></span><span class="progress-badge-action">${score===null?'Take exam':'Retake'} →</span>`;
    const classes=`progress-badge${earned?' badge-earned':''}`;
    return topic===null ? `<a class="${classes}" href="./simulations.html?exam=patching#practice">${content}</a>` : `<button type="button" class="${classes}" data-round="${topic}">${content}</button>`;
  };
  const earned=rank.level+appliedScores.filter(score=>score>=4).length+(patch.best>=4?1:0);
  host.innerHTML=`<button type="button" class="quiz-picker-back" id="exam-levels">← Exams</button>
    <h2 id="quiz-title" tabindex="-1">My progress</h2>
    ${rankCard(rank,false,true)}
    <ol class="rank-tiers" aria-label="Fiber Apprentice tier designs">${[1,2,3,4].map(level=>{
      const status=level===rank.level?'Current':level<rank.level?'Earned':'Not earned';
      return `<li class="rank-tier${level===rank.level?' tier-current':''}"${level===rank.level?' aria-current="step"':''} aria-label="Fiber Apprentice ${['','I','II','III','IV'][level]} · ${status}">${rankEmblem(level)}<strong>${['','I','II','III','IV'][level]}</strong><span>${status}</span></li>`;
    }).join('')}</ol>
    <p class="picture-note">${canSave && patch.canSave?'Saved only in this browser. Clearing site data removes your progress.':'This browser cannot save progress. Results last for this visit.'}</p>
    <div class="progress-badges-heading"><h3>Your badges</h3><span>${earned} of 7 earned</span></div>
    <p class="section-intro">Earn a badge by passing its exam with 4/5 or better.</p>
    <h4 class="progress-group-title">Beginner</h4>
    <div class="progress-badges">${topics.map((title,i)=>badge(title,savedScores[i],i)).join('')}${badge('Hands-on patching',patch.best,null)}</div>
    <h4 class="progress-group-title">Intermediate</h4>
    <div class="progress-badges">${roundsForLevel('intermediate').map((topic,i)=>badge(allTopics[topic],appliedScores[i],topic)).join('')}</div>`;
  host.querySelector('#exam-levels').addEventListener('click',()=>chooseLevel(null));
  host.querySelectorAll('[data-round]').forEach(button=>button.addEventListener('click',()=>beginRound(Number(button.dataset.round))));
}
function appliedCard() {
  const count=appliedScores.filter(score=>score>=4).length;
  return `<section class="exam-applied-progress" aria-label="Intermediate progress"><b>${count} of 2 Intermediate exams passed</b><p>Pass with 4/5 on a complete attempt. Review feedback and practice missed questions, then retake the full exam to improve your saved score.</p></section>`;
}

function showQuizPicker() {
  renderIntro();
  focusTitle();
}

function renderQuestion() {
  persistExam();
  const question = questions.find(item => item.id === attempt.ids[index]);
  const multiple = Array.isArray(question.correct);
  const visual = question.interaction==='visual';
  host.classList.toggle('light-paused',motionPaused);
  host.innerHTML = `<div class="q-question-tools"><button class="quiz-picker-back" type="button" id="quiz-all">← ${levelTitle(selectedLevel)} exams</button><button class="q-motion" type="button" id="quiz-motion" aria-label="${motionPaused ? 'Play' : 'Pause'} explanation animations">${motionPaused ? 'Play' : 'Pause'} motion</button></div>
    <div class="quiz-progress-label"><span>${retry ? 'Practice' : 'Question'} ${index+1} of ${attempt.ids.length}</span><span>${levelTitle(selectedLevel)} · ${allTopics[question.topic]}</span></div>
    <progress class="quiz-progress" value="${index}" max="${attempt.ids.length}" aria-label="Questions answered"></progress>
    <h2 id="quiz-title" class="quiz-question" tabindex="-1">${question.prompt}</h2>
    ${question.caseStudy ? '<p class="connected-case-note">One case · new observations at each step</p>' : ''}
    ${visual ? '<p class="q-tap-hint">Tap your answer in the picture. Keyboard: Tab, then Enter.</p>' : ''}
    <div id="quiz-scene">${quizVisual(question)}</div>
    <div id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
    ${multiple ? `<p class="quiz-selection-hint" id="quiz-selection-hint">${selectedLevel==='intermediate'?'Select all supported answers.':'Select all that could cause it.'} Then check your answers.</p>` : ''}
    ${visual ? '' : `<div class="quiz-answers" role="group" aria-labelledby="quiz-title"${multiple ? ' aria-describedby="quiz-selection-hint"' : ''}>${question.choices.map((choice,i) => multiple
      ? `<label class="quiz-answer quiz-multiple"><input type="checkbox" value="${i}"><span>${selectedLevel==='intermediate'?`<b>${String.fromCharCode(65+i)}.</b> `:''}${choice}<span class="quiz-answer-state"></span></span></label>`
      : `<button type="button" class="quiz-answer" data-choice="${i}"><span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${choice}<span class="quiz-answer-state"></span></span></button>`).join('')}</div>`}
    ${multiple ? '<button class="quiz-primary" type="button" id="quiz-check" disabled>Check answers</button>' : ''}
    <button class="quiz-primary" type="button" id="quiz-next" hidden>${index === attempt.ids.length-1 ? 'Finish this round' : 'Next question'}</button>`;
  if (multiple) {
    const check = host.querySelector('#quiz-check');
    host.querySelectorAll('.quiz-multiple input').forEach(input => input.addEventListener('change',() => {
      draftChoices=[...host.querySelectorAll('.quiz-multiple input:checked')].map(input=>Number(input.value));
      check.disabled = !draftChoices.length;
      persistExam();
    }));
    host.querySelectorAll('.quiz-multiple input').forEach(input=>{input.checked=draftChoices.includes(Number(input.value));});
    check.disabled=!draftChoices.length;
    check.addEventListener('click',() => choose(question,[...host.querySelectorAll('.quiz-multiple input:checked')].map(input => Number(input.value))));
  } else {
    host.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click',() => choose(question,Number(button.dataset.choice))));
  }
  host.querySelector('#quiz-next').addEventListener('click',() => {
    if (!Object.hasOwn(attempt.answers,question.id)) return;
    draftChoices=[];
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
  if(Object.hasOwn(attempt.answers,question.id)) showAnswer(question,attempt.answers[question.id],false);
}

function choose(question,choice) {
  if (Object.hasOwn(attempt.answers,question.id)) return;
  const updated = recordAnswer(attempt,question.id,choice);
  if (updated === attempt) return;
  attempt = updated;
  roundAnswers = {...roundAnswers,[question.id]:attempt.answers[question.id]};
  draftChoices=[];
  persistExam();
  showAnswer(question,choice);
}

function showAnswer(question,choice,moveFocus=true) {
  const correct = isCorrectAnswer(question,choice);
  const multiple = Array.isArray(question.correct);
  const expected = multiple ? question.correct : [question.correct];
  const selected = multiple ? choice : [choice];
  host.querySelectorAll('.quiz-answer').forEach((card,i) => {
    if (multiple) {card.querySelector('input').disabled = true; card.querySelector('input').checked=selected.includes(i);} else card.disabled = true;
    const status = card.querySelector('.quiz-answer-state');
    if (expected.includes(i)) {
      card.classList.add('answer-correct');
      status.textContent = selected.includes(i) ? 'Your answer · correct' : multiple ? 'Also correct · not selected' : 'Correct answer';
    } else if (selected.includes(i)) {
      card.classList.add('answer-missed'); status.textContent = multiple ? 'Your answer · not supported' : 'Your answer';
    }
  });
  const check = host.querySelector('#quiz-check');
  if (check) { check.disabled = true; check.hidden = true; }
  const cassetteScroll=host.querySelector('.q-cas-scroll')?.scrollLeft ?? 0;
  host.querySelector('#quiz-scene').innerHTML=quizVisual(question,{answered:true,choice});
  if(host.querySelector('.q-cas-scroll')) host.querySelector('.q-cas-scroll').scrollLeft=cassetteScroll;
  const feedback = host.querySelector('#quiz-feedback');
  feedback.className = `quiz-feedback ${correct ? 'feedback-correct' : 'feedback-missed'}`;
  feedback.innerHTML = `<strong>${correct ? '✓ Good call. Here’s why.' : 'Here’s what the evidence tells us.'}</strong><p>${question.explanation}</p>
    ${question.choiceReasons?`<ol class="exam-choice-reasons">${question.choiceReasons.map((reason,i)=>`<li><b>${String.fromCharCode(65+i)} · ${expected.includes(i)?'Supported':'Not supported'}</b><span>${reason}</span></li>`).join('')}</ol>`:''}
    <a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review the illustrated lesson <span class="sr-only">(opens in a new tab)</span>↗</a>
    ${(question.relatedLessons??[]).map(([title,href])=>`<a class="exam-related" href="./${href}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`).join('')}`;
  host.querySelector('.quiz-progress').value = index+1;
  const next = host.querySelector('#quiz-next'); next.hidden = false;
  if(moveFocus) {next.focus({preventScroll:true});host.querySelector('#quiz-scene').scrollIntoView({block:'start',behavior:'instant'});}
}

function rankCard(rank, earnedNow, passed) {
  const note = rank.complete ? 'All four knowledge exams passed. Hands-on patching has its own result.'
    : !passed && (savedScores[currentRound] ?? 0) < 4 ? 'Get 4/5 in this exam to earn your next Apprentice level.'
    : !passed ? 'Your earned level stays while you practice.'
    : 'One Apprentice level for each beginner knowledge exam passed.';
  return `<section class="quiz-rank${rank.complete ? ' rank-complete' : ''}" data-rank="${rank.level}" aria-labelledby="quiz-rank-title">
    ${rankEmblem(rank.level)}
    <div><p class="quiz-rank-label">Beginner · ${earnedNow ? 'Apprentice level earned' : rank.level ? 'Your earned rank' : 'Your first Apprentice level is next'}</p>
      <h3 id="quiz-rank-title">${rank.title}</h3>
      <p class="quiz-rank-count">${rank.level} of 4 knowledge exams passed${rank.complete ? ' · Knowledge rounds complete' : ''}</p>
      <p class="quiz-rank-note">${note}</p>
    </div>
  </section>`;
}

function renderResults() {
  suspended=null; clearExam(progressStorage);
  recordExamCompletion(countEvent, {practice:retry});
  const result = resultsFor(attempt);
  if (!retry) firstScore = result.correct;
  const progress = roundProgress(currentRound,roundAnswers,fullRoundIds);
  const nextRound = progress.nextRound;
  const previousRank = apprenticeRank(savedScores);
  const beginner=selectedLevel==='beginner';
  const updated=recordRoundProgress(activeScores(),currentRound,roundAnswers,{practice:retry,ids:fullRoundIds});
  if(beginner) savedScores=updated; else appliedScores=updated;
  canSave = saveQuizProgress(progressStorage,updated,selectedLevel);
  const rank = apprenticeRank(savedScores);
  const skills=skillsFor(currentRound,roundAnswers);
  const earnedNow = rank.level > previousRank.level;
  const title = !beginner&&retry?'Practice complete':!progress.passed ? 'A little more practice' : !beginner?'Intermediate exam passed':rank.complete ? 'Knowledge rounds complete' : earnedNow ? 'Apprentice level earned' : 'Round complete';
  host.innerHTML = `<p class="chapter-count">${levelTitle(selectedLevel)} · ${allTopics[currentRound]} · ${retry?'practice':'exam'} complete</p>
    <h2 id="quiz-title" tabindex="-1">${title}</h2>
    ${beginner?rankCard(rank,earnedNow,progress.passed):appliedCard()}
    <p class="quiz-score"><strong>${progress.correct}<span> / 5</span></strong> ${retry ? 'answered correctly after practice' : 'correct on your first answer'}</p>
    ${retry ? `<p class="picture-note">Full exam: ${firstScore}/5. This retry: ${result.correct}/${result.total}.${!beginner?' Practice does not change the saved exam score.':''}</p>` : ''}
    <section class="q-skill-recap" aria-label="Skills from this round">
      ${skills.checked.length ? `<div><h3>What you showed</h3><ul>${skills.checked.map(skill=>`<li>✓ ${skill}</li>`).join('')}</ul></div>` : ''}
      ${skills.review.length ? `<div><h3>Practice next</h3><ul>${skills.review.map(skill=>`<li>${skill}</li>`).join('')}</ul></div>` : ''}
    </section>
    <p class="section-intro">${progress.passed ? 'You can revisit an idea or choose any other exam.' : 'Review the ideas below and retry the missed questions. Aim for four correct answers out of five.'}</p>
    ${!canSave ? '<p class="picture-note">Progress could not be saved in this browser. It will last for this visit.</p>' : ''}
    ${nextRound !== null ? `<p class="quiz-next-round"><strong>Next: ${allTopics[nextRound]}</strong><span>${allDescriptions[nextRound]}</span></p>` : ''}
    <div class="quiz-result-actions">
      ${nextRound !== null ? '<button type="button" class="quiz-primary" id="quiz-continue">Try the next 5 questions</button>' : ''}
      ${progress.missed.length ? `<button type="button" class="${progress.passed ? 'quiz-secondary' : 'quiz-primary'}" id="quiz-retry">Retry ${progress.missed.length} missed ${progress.missed.length === 1 ? 'question' : 'questions'}</button>` : ''}
      <button type="button" class="${nextRound === null && progress.passed ? 'quiz-primary' : 'quiz-secondary'}" id="quiz-all">Choose another exam</button>
      <button type="button" class="quiz-secondary" id="quiz-restart">${questions.find(q=>q.id===fullRoundIds[0])?.caseStudy?'Retake this case':currentRound===0?'Retake this exam':'Retake with a fresh mix'}</button>
      <a class="quiz-lesson-link" href="#progress">My progress</a>
      <a class="quiz-lesson-link" href="./learn.html">Stop here · back to lessons</a>
    </div>
    ${progress.missed.length ? `<h3 class="quiz-review-title">Ideas to revisit</h3><ol class="quiz-review">${progress.missed.map(id => {
      const question = questions.find(item => item.id === id);
      const answerText = answer => (Array.isArray(answer) ? answer : [answer]).map(choice => question.choices[choice]).join(' ');
      return `<li><h4>${question.prompt}</h4><p class="quiz-review-choice">Your answer: ${answerText(roundAnswers[id])}</p><p><b>Correct:</b> ${answerText(question.correct)}</p><p>${question.explanation}</p><a href="./${question.lesson}" target="_blank" rel="noopener noreferrer">Review lesson ↗<span class="sr-only"> (opens in a new tab)</span></a></li>`;
    }).join('')}</ol>` : ''}
    <a class="lesson-return" href="./index.html">Use Troubleshoot →</a>`;
  host.querySelector('#quiz-continue')?.addEventListener('click',() => beginRound(nextRound));
  host.querySelector('#quiz-retry')?.addEventListener('click',() => begin(progress.missed,true));
  host.querySelector('#quiz-restart').addEventListener('click',() => beginRound(currentRound));
  host.querySelector('#quiz-all').addEventListener('click',showQuizPicker);
  focusTitle();
}

window.addEventListener('hashchange',()=>{
  selectedLevel=['beginner','intermediate'].includes(location.hash.slice(1))?location.hash.slice(1):null;
  showQuizPicker();
});
function refreshProgress() {
  if(location.hash!=='#progress') return;
  if(canSave) {
    const beginner=loadQuizProgress(progressStorage), applied=loadQuizProgress(progressStorage,'intermediate');
    if(beginner.canSave) savedScores=beginner.scores;
    if(applied.canSave) appliedScores=applied.scores;
  }
  renderIntro();
}
window.addEventListener('storage',event=>{
  if(event.key===null || ['fiber-quiz-progress-v1','fiber-applied-progress-v1','fiber-patching-best-v1'].includes(event.key)) refreshProgress();
});
window.addEventListener('pageshow',event=>{if(event.persisted) refreshProgress();});
renderIntro();
