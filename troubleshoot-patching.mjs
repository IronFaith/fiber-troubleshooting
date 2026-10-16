import {mmcHead} from './loop-visuals.mjs?v=3';

// One pointer path for touch and mouse; every drag has a tap/keyboard equivalent.
export function mountPatchDrag(host,commit,announce) {
  let drag=null,suppressUntil=0;
  const reset=()=>{if(!drag)return;const old=drag;drag=null;old.ghost?.remove();old.line?.remove();host.querySelectorAll('.ts-patch-over').forEach(el=>el.classList.remove('ts-patch-over'));if(old.el.hasPointerCapture(old.id))old.el.releasePointerCapture(old.id);};
  host.addEventListener('pointerdown',e=>{
    const el=e.target.closest('[data-patch-head]');
    if(!el||e.button!==0||!e.isPrimary)return;
    reset();drag={el,id:e.pointerId,x:e.clientX,y:e.clientY,moved:false,point:Number(el.dataset.patchPoint),side:el.dataset.patchSide};el.setPointerCapture(e.pointerId);
  });
  host.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<7)return;
    e.preventDefault();
    if(!drag.moved){
      drag.moved=true;drag.ghost=document.createElement('div');drag.ghost.className='ts-patch-ghost';drag.ghost.innerHTML=`<svg viewBox="-22 -3 112 54" class="hardware-art">${mmcHead(0,0,false)}</svg>`;drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);
      drag.line=document.createElementNS('http://www.w3.org/2000/svg','svg');drag.line.setAttribute('class','ts-patch-drag-cable');drag.line.setAttribute('aria-hidden','true');document.body.append(drag.line);
    }
    drag.ghost.style.transform=`translate(${e.clientX-72}px,${e.clientY-25}px)`;
    drag.line.innerHTML=`<path d="M${drag.x} ${drag.y} Q${drag.x-40} ${e.clientY+45} ${e.clientX-65} ${e.clientY}" fill="none" stroke="#dec34f" stroke-width="5"/>`;
    host.querySelectorAll('.ts-patch-over').forEach(el=>el.classList.remove('ts-patch-over'));
    document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-patch-port],[data-unplug-target]')?.classList.add('ts-patch-over');
  });
  host.addEventListener('pointerup',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const old=drag,target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-patch-port],[data-unplug-target]');reset();
    if(!old.moved)return;
    suppressUntil=Date.now()+500;
    if(target&&host.contains(target)&&Number(target.dataset.patchPoint??target.dataset.unplugTarget)===old.point){
      commit({type:'patch',point:old.point,side:old.side,connected:!target.hasAttribute('data-unplug-target'),...(target.dataset.patchPort?{port:Number(target.dataset.patchPort)}:{})});
    }else announce('Drop cancelled. Drop on a numbered port or inside the unplug area.');
  });
  host.addEventListener('click',e=>{if(e.detail&&Date.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
  host.addEventListener('pointercancel',reset);
  host.addEventListener('keydown',e=>{if(e.key==='Escape')reset();});
  return {reset};
}
