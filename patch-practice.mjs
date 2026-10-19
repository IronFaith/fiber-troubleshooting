import {startExamCount,recordExamCompletion} from './site-counter.mjs?v=7';
import {cassetteFront, mmcHead} from './loop-visuals.mjs?v=5';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {patchCableVisual} from './patch-cable-visuals.mjs?v=1';
import {patchTasks,headSerial,placementCorrect,placementExplanation,recordPatchAnswer,patchResult,loadPatchBest,savePatchBest,loadPatchDraft,savePatchDraft,clearPatchDraft} from './patch-practice-data.mjs?v=2';

function connectorArt(kind) {
  if(kind==='mmc') return `<svg viewBox="0 0 130 85" aria-hidden="true"><path class="loop-cord" d="M2 48 H35"/><g class="lab-connector-head" transform="translate(32 24) scale(.85)">${mmcHead(0,0,false)}</g></svg>`;
  return `<svg viewBox="0 0 130 85" aria-hidden="true"><path class="loop-cord" d="M4 33 H43 M4 59 H43"/><g class="lab-lc-plug lab-connector-head"><rect x="35" y="22" width="68" height="20" rx="3"/><rect x="35" y="48" width="68" height="20" rx="3"/><path d="M51 19 H94 V22 H51 Z M51 45 H94 V48 H51 Z"/><path class="lab-ferrule" d="M103 26 h14 v12 h-14z M103 52 h14 v12 h-14z"/><path class="lab-grip" d="M45 25 v14 M52 25 v14 M45 51 v14 M52 51 v14"/></g></svg>`;
}

export function mountPatchPractice(host) {
  let mode=new URLSearchParams(location.search).get('exam')==='patching'?'quiz':'practice', index=0, answers={}, selected=null, placement=null, finished=false;
  let countEvent = mode === 'quiz' ? startExamCount() : null;
  let storage;
  try { storage=window.localStorage; } catch { /* Works without saved progress. */ }
  let {best,canSave}=loadPatchBest(storage);
  let pending=loadPatchDraft(storage);
  if(mode==='quiz' && pending) restorePending();
  function restorePending() {
    mode='quiz'; index=pending.index; answers=pending.answers; selected=pending.selected;
    countEvent=pending.countEvent?{...pending.countEvent,at:Date.now()}:startExamCount();
    const answer=answers[patchTasks[index].id];
    placement=answer?{slot:answer.slot,correct:placementCorrect(patchTasks[index],answer.connector,answer.slot)}:null;
    if(answer) selected=answer.connector;
    finished=false;
  }
  function persist() {
    if(mode!=='quiz' || finished) return;
    pending={index,answers,selected,countEvent};savePatchDraft(storage,pending);
  }
  let drag=null, ignoreClickUntil=0;
  const cable=patchCableVisual(host);
  const task=()=>patchTasks[index];
  const locked=()=>mode==='quiz' && Object.hasOwn(answers,task().id);

  function feedback(message,kind='') {
    const output=host.querySelector('.lab-feedback');
    output.className=`lab-feedback ${kind ? `lab-${kind}` : ''}`;
    output.textContent=message;
  }
  function selectConnector(kind) {
    if(locked() || placement?.correct) return;
    if(!drag) cable.clear();
    selected=kind; persist();
    host.querySelectorAll('[data-connector]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.connector===kind)));
    feedback(`${kind.toUpperCase()} selected. Drag it, or tap the port to place it.`);
  }
  function dropTarget(x,y) {
    const found=document.elementFromPoint(x,y)?.closest('[data-drop]');
    return found && host.contains(found) && !found.disabled ? found : null;
  }
  function clearDrag(keepCable=false) {
    if(!drag) return;
    const old=drag; drag=null;
    cancelAnimationFrame(old.frame);
    old.source.classList.remove('lab-dragging');
    if(!keepCable) cable.clear();
    host.querySelectorAll('.lab-over').forEach(item=>item.classList.remove('lab-over'));
    if(old.source.hasPointerCapture(old.pointer)) old.source.releasePointerCapture(old.pointer);
  }
  function scrollWhileDragging() {
    if(!drag?.moved) return;
    const {clientX:x,clientY:y}=drag;
    const vertical=y<70 ? -9 : y>window.innerHeight-70 ? 9 : 0;
    if(vertical) window.scrollBy({top:vertical,behavior:'instant'});
    const cassette=host.querySelector('.lab-cas-scroll');
    if(cassette) {
      const box=cassette.getBoundingClientRect();
      if(y>box.top && y<box.bottom && x>box.left && x<box.right) cassette.scrollLeft+=x<box.left+38 ? -8 : x>box.right-38 ? 8 : 0;
    }
    host.querySelectorAll('.lab-over').forEach(item=>item.classList.remove('lab-over'));
    const target=dropTarget(x,y);
    target?.classList.add('lab-over');
    cable.move(x,y,target?.dataset.drop);
    drag.frame=requestAnimationFrame(scrollWhileDragging);
  }
  function attachDrag(button) {
    button.addEventListener('pointerdown',event=> {
      if(event.button!==0 || !event.isPrimary || button.disabled) return;
      clearDrag(); selectConnector(button.dataset.connector);
      drag={source:button,pointer:event.pointerId,x:event.clientX,y:event.clientY,moved:false};
      button.setPointerCapture(event.pointerId);
    });
    button.addEventListener('pointermove',event=> {
      if(!drag || event.pointerId!==drag.pointer) return;
      drag.clientX=event.clientX; drag.clientY=event.clientY;
      if(!drag.moved && Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<7) return;
      if(!drag.moved) {
        drag.moved=true;
        cable.grab(selected,event.clientX,event.clientY);
        button.classList.add('lab-dragging');
        drag.frame=requestAnimationFrame(scrollWhileDragging);
      }
      event.preventDefault();
      host.querySelectorAll('.lab-over').forEach(item=>item.classList.remove('lab-over'));
      const target=dropTarget(event.clientX,event.clientY);
      target?.classList.add('lab-over');
      cable.move(event.clientX,event.clientY,target?.dataset.drop);
    });
    button.addEventListener('pointerup',event=> {
      if(!drag || event.pointerId!==drag.pointer) return;
      const moved=drag.moved, target=dropTarget(event.clientX,event.clientY);
      clearDrag(moved);
      if(!moved) return;
      ignoreClickUntil=Date.now()+400;
      if(target) place(target.dataset.drop);
      else { cable.returnToTray(); feedback('Released outside a port. Try again; this does not count as an answer.'); }
    });
    button.addEventListener('pointercancel',()=>clearDrag());
    button.addEventListener('lostpointercapture',()=>clearDrag());
    button.addEventListener('click',event=> { if(event.detail===0 || Date.now()>ignoreClickUntil) selectConnector(button.dataset.connector); });
  }

  function board() {
    const current=task(), seated=placement?.correct;
    const stateFor=slot=>placement?.slot===slot ? (seated ? ' lab-seated' : ' lab-missed') : '';
    const disabled=locked() || seated ? ' disabled' : '';
    if(current.kind==='lc') {
      const art=opticIllustration({optic:current.optic,flipped:current.flipped,labels:mode==='practice',id:'lab-optic'});
      return `<p class="lab-orientation">${current.flipped ? 'Tab below · upside down' : 'Tab above · upright'}</p>
        <div class="lab-optic-board${seated ? ' lab-connected' : ''}">
          <svg viewBox="0 0 360 354" aria-hidden="true">${art.drawing}</svg>
          ${['left','right'].map((side,i)=>`<button type="button" class="lab-drop${stateFor(side)}" data-drop="${side}" aria-label="${side==='left' ? 'Left' : 'Right'} LC position of optic ${current.optic}" style="left:${(91+i*104)/360*100}%;top:${(current.flipped ? 111 : 171)/354*100}%;width:${74/360*100}%;height:${112/354*100}%"${disabled}>${seated && placement.slot===side ? '<span class="lab-seat-mark">✓</span>' : ''}</button>`).join('')}
        </div>`;
    }
    return `<p class="lab-cas-hint"><strong>CAS ${current.cas} · front view</strong>Top: 1–16 · Bottom: 17–32 <span>↔ Scroll the cassette to reach every port.</span></p>
      <div class="lab-cas-scroll" tabindex="0" role="group" aria-label="CAS ${current.cas} cassette. Scroll horizontally to see all 32 ports.">
        <div class="lab-cas-board">
          <svg viewBox="0 0 360 206" aria-hidden="true">${cassetteFront({port:seated ? current.port : null,name:`CAS ${current.cas}`})}</svg>
          ${Array.from({length:32},(_,i)=> {
            const port=i+1, x=31.5+(i%16)*19.8;
            return `<button type="button" class="lab-drop${stateFor(String(port))}" data-drop="${port}" aria-label="CAS ${current.cas} Port ${port}" style="left:${(x-9.9)/360*100}%;top:${(port<=16 ? 38 : 116)/206*100}%;width:5.5%;height:${52/206*100}%"${disabled}>${seated && current.port===port ? '<span class="lab-seat-mark">✓</span>' : ''}</button>`;
          }).join('')}
        </div>
      </div>`;
  }

  function updateBoard() {
    const scroll=host.querySelector('.lab-cas-scroll')?.scrollLeft ?? 0;
    host.querySelector('.lab-board').innerHTML=board();
    const cassette=host.querySelector('.lab-cas-scroll');
    if(cassette) { cassette.scrollLeft=scroll; cassette.addEventListener('scroll',cable.refresh); }
    host.querySelectorAll('[data-drop]').forEach(button=>button.addEventListener('click',()=>place(button.dataset.drop)));
  }

  function place(slot) {
    if(locked() || placement?.correct) return;
    if(!selected) { feedback('Choose an LC connector or MMC head first.'); return; }
    const current=task(), correct=placementCorrect(current,selected,slot);
    if(mode==='quiz') answers=recordPatchAnswer(answers,current.id,selected,slot);
    placement={slot,correct}; persist();
    updateBoard();
    const wrongType=selected!==current.kind;
    feedback(`${correct ? '✓ Seated in the correct port.' : wrongType ? `${selected.toUpperCase()} is the wrong connector here. ${current.kind==='lc' ? 'LC followers connect to the optic.' : 'The MMC head connects to the CAS.'}` : 'That is a different port.'} ${placementExplanation(current)}${mode==='practice' && !correct ? ' Try again.' : ''}`,correct ? 'success' : 'error');
    if(correct || mode==='quiz') {
      host.querySelectorAll('[data-connector]').forEach(button=>button.disabled=true);
      const next=host.querySelector('.lab-next'); next.hidden=false;
      next.focus({preventScroll:true});
      if(mode==='quiz') host.querySelector('progress').value=Object.keys(answers).length;
    } else {
      host.querySelector(`[data-drop="${slot}"]`).focus({preventScroll:true});
    }
    const showFeedback=()=>host.querySelector('.lab-feedback')?.scrollIntoView({block:'nearest',behavior:'instant'});
    if(correct) cable.seat(selected,slot,showFeedback);
    else cable.returnToTray(showFeedback);
  }

  function begin(nextMode,nextIndex=0) {
    clearDrag(); mode=nextMode; index=nextIndex; selected=null; placement=null; finished=false; ignoreClickUntil=0;
    if(mode==='quiz') {if(pending) restorePending(); else {answers={}; countEvent=startExamCount();}}
    render(); focusTask();
  }
  function focusTask() {
    host.querySelector('h4').focus({preventScroll:true});
    host.scrollIntoView({block:'start',behavior:'instant'});
  }
  function finishQuiz() {
    if (finished) return;
    recordExamCompletion(countEvent);
    finished=true; pending=null; clearPatchDraft(storage);
    const result=patchResult(answers);
    const saved=savePatchBest(storage,Math.max(result.correct,best ?? 0));
    best=saved.best; canSave=saved.canSave;
    render(); focusTask();
  }
  function render() {
    persist();
    cable.clear();
    const current=task();
    const result=patchResult(answers);
    host.innerHTML=`<a class="quiz-picker-back" href="./quiz.html#beginner">← Beginner exams</a><div class="lab-modes" role="group" aria-label="Patching activity">
        <button type="button" data-mode="practice" aria-pressed="${mode==='practice'}">Practice · retry freely</button>
        <button type="button" data-mode="quiz" aria-pressed="${mode==='quiz'}">Take the 5-question exam</button>
      </div>
      <p class="lab-best">${best===null ? 'Beginner patching · exam available anytime' : `Beginner patching · best exam ${best}/5`}${!canSave ? ' · progress lasts for this visit' : ''}</p>
      ${mode==='practice'&&pending?'<div class="exam-resume"><span>Your patching exam is saved.</span><button type="button" class="lab-resume">Resume patching exam</button></div>':''}
      ${finished ? `<div class="lab-result">
        <h4 tabindex="-1">${result.passed ? 'Patching basics passed' : 'Keep building your patching skills'}</h4>
        <p class="lab-score">${result.correct}<span> / 5</span></p><p>Correct on the first placement. ${result.passed ? 'You matched at least four of the five tickets.' : 'Aim for 4/5. Review the missed placements below.'}</p>
        ${result.missed.length ? `<ul>${result.missed.map(item=>`<li><strong>${item.title}</strong><p>${placementExplanation(item)}</p></li>`).join('')}</ul>` : '<p>LC positions, optic orientation, and both CAS rows covered.</p>'}
        <button type="button" class="quiz-primary lab-retake">Retake 5 questions</button>
        <button type="button" class="quiz-secondary lab-practice-return">Back to practice</button>
      </div>` : `
      ${mode==='practice' ? `<label class="lab-exercise">Choose a practice ticket<select aria-label="Practice ticket">${patchTasks.map((item,i)=>`<option value="${i}"${i===index ? ' selected' : ''}>${item.title}</option>`).join('')}</select></label>` : `<p class="lab-progress">Question ${index+1} of 5 · first placement counts</p><progress value="${index}" max="5" aria-label="Patching questions completed"></progress>`}
      <div class="lab-ticket"><span>Mock FIM ticket · training example</span>
        <h4 tabindex="-1">${current.kind==='lc' ? `Patch Ethernet ${current.optic}/${current.ethernet}` : `Patch CAS ${current.cas} · Port ${current.port}`}</h4>
        <p>${current.kind==='lc' ? `Follower: Leg ${current.leg} · of the 12-leg fanout` : 'Connector: MMC leader / head'}</p>
        <p class="lab-serial">Head ${headSerial}</p>
      </div>
      <p class="lab-instruction">Pull the cable to a port. Or select its connector, then tap the port.</p>
      <div class="lab-workbench">
      <div class="lab-tray" role="group" aria-label="Choose a connector">${['lc','mmc'].map(kind=>`<button type="button" data-connector="${kind}" aria-pressed="false" aria-label="Select ${kind==='lc' ? 'LC follower' : 'MMC head'}">${connectorArt(kind)}<strong>${kind==='lc' ? 'LC follower' : 'MMC head'}</strong></button>`).join('')}</div>
      <div class="lab-board"></div>
      </div>
      <p class="lab-feedback" role="status" aria-live="polite" aria-atomic="true">${mode==='practice' ? current.kind==='lc' ? 'Match the Ethernet suffix to the optic position. Check which way the purple tab faces.' : 'Match the CAS and port in the ticket. The serial alone does not tell you the port.' : 'Choose your connector, then make one placement.'}</p>
      <button type="button" class="quiz-primary lab-next" hidden>${mode==='quiz' ? index===4 ? 'See my exam result' : 'Next question' : 'Next practice ticket'}</button>`}`;
    host.querySelector('.lab-resume')?.addEventListener('click',()=>begin('quiz'));
    host.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=> {
      if(button.dataset.mode===mode && !finished) return;
      begin(button.dataset.mode);
    }));
    if(finished) {
      cable.reset();
      host.querySelector('.lab-retake').addEventListener('click',()=>begin('quiz'));
      host.querySelector('.lab-practice-return').addEventListener('click',()=>begin('practice'));
      return;
    }
    host.querySelector('select')?.addEventListener('change',event=>begin('practice',Number(event.target.value)));
    host.querySelectorAll('[data-connector]').forEach(attachDrag);
    updateBoard();
    cable.reset();
    if(locked()) {
      host.querySelectorAll('[data-connector]').forEach(button=>button.disabled=true);
      feedback(`${placement.correct?'Correct placement.':'This placement did not match.'} ${placementExplanation(current)}`,placement.correct?'success':'error');
      host.querySelector('.lab-next').hidden=false;
      host.querySelector('progress').value=Object.keys(answers).length;
      if(placement.correct) cable.seat(selected,placement.slot);
    } else if(selected) {
      host.querySelector(`[data-connector="${selected}"]`)?.setAttribute('aria-pressed','true');
    }
    host.querySelector('.lab-next').addEventListener('click',()=> {
      if(mode==='quiz' && !locked()) return;
      if(mode==='quiz' && index===4) { finishQuiz(); return; }
      index=(index+1)%patchTasks.length; placement=null; selected=null;
      render(); focusTask();
    });
  }
  host.addEventListener('keydown',event=> {
    if(event.key==='Escape' && drag) { clearDrag(); feedback('Drag cancelled. Choose a connector to try again.'); }
  });
  render();
}
