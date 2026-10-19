import {mmcLoopback} from './loop-visuals.mjs?v=5';
import {lcLoopback,vflPen} from './test-tool-visuals.mjs?v=1';
export const toolNames={lc:'LC loopback',mmc:'MMC loopback',vfl:'VFL'};
export function toolArt(kind) {
  if(kind==='mmc') return `<svg viewBox="0 0 230 92" aria-hidden="true">${mmcLoopback(142,42,{label:true})}</svg>`;
  return kind==='lc'?`<svg viewBox="0 0 124 88" aria-hidden="true">${lcLoopback(115,23)}</svg>`:
    `<svg viewBox="0 0 116 40" aria-hidden="true">${vflPen(109,20)}</svg>`;
}

// Pointer events give mouse and touch the same placement behavior. Click/Enter
// selects a tool; the diagram's native button handlers provide a second route.
export function mountToolDrag(host,{select,place,remove,valid,announce,getSelected,activate=select}) {
  let drag=null,ignoreClickUntil=0;
  function destination(x,y) {
    const el=document.elementFromPoint(x,y)?.closest('[data-point],.ts-tool-tray');
    if(!el || !host.contains(el)) return null;
    if(el.matches('.ts-tool-tray')) return {el,remove:true,valid:drag.mounted};
    const point=Number(el.dataset.point);
    return {el,point,atSource:true,valid:valid(drag.kind,point)};
  }
  function reset() {
    if(!drag) return;
    const old=drag; drag=null;
    cancelAnimationFrame(old.frame); old.ghost?.remove();
    old.source.classList.remove('ts-drag-source');
    host.querySelectorAll('.ts-drop-over,.ts-drop-invalid').forEach(e=>e.classList.remove('ts-drop-over','ts-drop-invalid'));
    if(old.source.hasPointerCapture(old.pointer)) old.source.releasePointerCapture(old.pointer);
  }
  function paint() {
    if(!drag?.moved) return;
    const {x,y}=drag;
    const map=host.querySelector('.ts-map'),r=map?.getBoundingClientRect();
    const target=destination(x,y);
    if(!target?.valid) {
      if(r && y>r.top && y<r.bottom && x>=r.left && x<=r.right) map.scrollLeft+=x<r.left+45?-9:x>r.right-45?9:0;
      if(y<55 || y>innerHeight-55) window.scrollBy({top:y<55?-8:8,behavior:'instant'});
    }
    host.querySelectorAll('.ts-drop-over,.ts-drop-invalid').forEach(e=>e.classList.remove('ts-drop-over','ts-drop-invalid'));
    target?.el.classList.add(target.valid?'ts-drop-over':'ts-drop-invalid');
    drag.ghost.style.transform=`translate(${x-43}px,${y-42}px)`;
    drag.frame=requestAnimationFrame(paint);
  }
  host.addEventListener('pointerdown',event=>{
    ignoreClickUntil=0;
    const source=event.target.closest('[data-pick-tool],[data-mounted-tool]');
    if(!source || event.button!==0 || !event.isPrimary) return;
    reset();
    const kind=source.dataset.pickTool??source.dataset.mountedTool;
    drag={kind,source,mounted:source.hasAttribute('data-mounted-tool'),pointer:event.pointerId,startX:event.clientX,startY:event.clientY,x:event.clientX,y:event.clientY,moved:false};
    source.setPointerCapture(event.pointerId);
  });
  host.addEventListener('pointermove',event=>{
    if(!drag || drag.pointer!==event.pointerId) return;
    drag.x=event.clientX; drag.y=event.clientY;
    if(!drag.moved && Math.hypot(drag.x-drag.startX,drag.y-drag.startY)<7) return;
    event.preventDefault();
    if(drag.moved) return;
    drag.moved=true;
    select(drag.kind);
    drag.ghost=document.createElement('div'); drag.ghost.className='ts-tool-ghost';
    drag.ghost.setAttribute('aria-hidden','true');
    drag.ghost.innerHTML=toolArt(drag.kind);
    document.body.append(drag.ghost); drag.source.classList.add('ts-drag-source'); paint();
  });
  host.addEventListener('pointerup',event=>{
    if(!drag || drag.pointer!==event.pointerId) return;
    const {kind,moved}=drag,target=moved?destination(event.clientX,event.clientY):null;
    reset();
    if(!moved) return;
    ignoreClickUntil=Date.now()+500;
    if(target?.valid) {if(target.remove) remove(); else place(kind,target.point,target.atSource);}
    else {select(null);announce('Drop cancelled. Any placed tool stays where it was.');}
  });
  host.addEventListener('click',event=>{
    if(event.detail!==0 && Date.now()<ignoreClickUntil) {event.preventDefault();event.stopImmediatePropagation();return;}
    const source=event.target.closest('[data-pick-tool],[data-mounted-tool]');
    // A selected tray tool should replace an installed tool at this target,
    // rather than the installed handle stealing that tap as a new selection.
    if(source?.hasAttribute('data-mounted-tool') && getSelected()) return;
    if(source) {(source.hasAttribute('data-pick-tool')?activate:select)(source.dataset.pickTool??source.dataset.mountedTool);event.stopImmediatePropagation();}
  },true);
  host.addEventListener('pointercancel',()=>{reset();select(null);});
  host.addEventListener('lostpointercapture',event=>{if(drag?.source===event.target&&drag.pointer===event.pointerId) reset();});
  host.addEventListener('keydown',event=>{
    if(event.key==='Escape') {reset();select(null);announce('Tool selection cancelled.');}
  });
  return {reset};
}
