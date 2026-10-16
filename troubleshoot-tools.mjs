export const toolNames={lc:'LC loopback',mmc:'MMC loopback',vfl:'VFL'};
export function toolArt(kind) {
  const cord='<path d="M38 19 C10 19 10 57 38 57" fill="none" stroke="#b3983a" stroke-width="8"/><path d="M38 19 C10 19 10 57 38 57" fill="none" stroke="#f3db67" stroke-width="4"/>';
  const plugs=kind==='lc'?`${cord}<g fill="#b5d3e0" stroke="#496e83" stroke-width="2"><rect x="36" y="11" width="32" height="16" rx="3"/><rect x="36" y="49" width="32" height="16" rx="3"/></g><path d="M67 16 h10 v6 H67 M67 54 h10 v6 H67" fill="#c5ced5" stroke="#647581"/>`:
    kind==='mmc'?`${cord}<rect x="36" y="6" width="39" height="64" rx="7" fill="#d4ba61" stroke="#756030" stroke-width="2"/><rect x="63" y="19" width="21" height="38" rx="3" fill="#dae0df" stroke="#637780" stroke-width="2"/><path d="M70 25 v26 M77 25 v26" stroke="#738487" stroke-width="2"/>`:
    '<path d="M65 36 H91" stroke="#d53250" stroke-width="4"/><circle cx="92" cy="36" r="5" fill="#e6425c"/><rect x="15" y="23" width="50" height="26" rx="10" fill="#b8334d" stroke="#7b2940" stroke-width="2"/><rect x="58" y="27" width="12" height="18" rx="2" fill="#d4dce0"/><path d="M27 30 v12 M32 30 v12" stroke="#f7b4bd" stroke-width="2"/>';
  return `<svg viewBox="0 0 105 78" aria-hidden="true">${plugs}</svg>`;
}

// Pointer events give mouse and touch the same placement behavior. Click/Enter
// selects a tool; the diagram's native button handlers provide a second route.
export function mountToolDrag(host,{select,place,remove,valid,announce,getSelected,activate=select}) {
  let drag=null,ignoreClickUntil=0;
  function destination(x,y) {
    const el=document.elementFromPoint(x,y)?.closest('[data-span],[data-point],.ts-tool-tray');
    if(!el || !host.contains(el)) return null;
    if(el.matches('.ts-tool-tray')) return {el,remove:true,valid:drag.mounted};
    const point=Number(el.dataset.span??el.dataset.point);
    return {el,point,atSource:!el.hasAttribute('data-span'),valid:(!el.hasAttribute('data-span') || drag.kind==='vfl') && valid(drag.kind,point)};
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
