import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=3';
import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {patchAt,traceFrom,traceStop,traceKey} from './troubleshoot-state.mjs?v=7';

export function patchingPanel(s,paused=false) {
  if(s.tool!=='vfl') return '';
  const stop=traceStop(s),point=stop?.point??s.selected;
  if(!point) return '<p class="ts-note">Check the loose LC leg. The local optic is disconnected from this VFL trace.</p>';
  const patch=patchAt(s,point),forward=traceFrom(s)<s.selected,incoming=forward?'rear':'front',outgoing=forward?'front':'rear';
  const seated=patch[incoming],onward=patch[outgoing],result=stop.blocked?null:s.traces[traceKey(s)];
  const lit=!stop.closed&&(result==='seen'||result==='swapped');
  const px=260+31.5+((patch.port-1)%16)*19.8,py=35+(patch.port<=16?59:137)+12;
  const headX=seated?134:76,tip=headX+83;
  const route=seated?`M12 159 H243 V137 H${px+10} V${py} H${px}`:`M12 159 H${tip}`;
  const destination=seated?`CAS ${point} · ${outgoing} port ${patch.port}`:'the loose MMC head';
  const action=(side,connected,port='')=>`data-patch-point="${point}" data-patch-side="${side}" data-patch-connected="${connected}"${port?` data-patch-port="${port}"`:''}`;
  const headAction=action(incoming,!seated,patch.port);
  let cassette=cassetteFront({name:`CAS ${point}`,port:patch.port,patched:onward}).replace('front view',`${outgoing} view`);
  cassette=cassette.replace(/data-port="(\d+)"/g,(_,port)=>`data-port="${port}" role="button" tabindex="0" ${action(incoming,true,port)} aria-label="Plug incoming MMC into CAS ${point} port ${port}"`);
  return `<section class="ts-patch-panel" aria-labelledby="patch-title">
    <div class="ts-section-top"><div><h3 id="patch-title">Unplug &amp; patch · CAS ${point}</h3><p class="ts-note">Rear and front shown together. Tap a port number, or drag the incoming head to a port or the unplug area.</p></div><span class="ts-patch-target">FIM: port ${s.ports[point-1]}</span></div>
    <div class="ts-patch-scroll ${paused?'light-paused':''}" tabindex="0" aria-label="Cassette connections close-up; scroll to see all ports">
      <svg class="ts-patch-bench hardware-art" viewBox="0 0 740 300" role="group" aria-label="Incoming MMC, cassette ports and onward connection">
        <rect class="ts-unplug-zone" x="12" y="56" width="180" height="178" rx="10" data-unplug-target="${point}"/>
        <text class="hardware-label hardware-small" x="25" y="79">Unplug area</text>
        <text class="hardware-label hardware-small" x="12" y="121">From VFL → ${incoming} side</text>
        <path class="loop-jacket" d="M12 159 H${headX-16}"/><path class="loop-cord" d="M12 159 H${headX-16}"/>
        <path class="ts-patch-guide" d="M234 159 H270"/>
        <rect class="cassette-adapter" x="216" y="140" width="18" height="38" rx="3"/>
        <g class="ts-patch-head" data-patch-head="${point}" role="button" tabindex="0" ${headAction} aria-label="${seated?'Unplug':'Plug in'} incoming MMC at CAS ${point}">${mmcHead(headX,135)}</g>
        <text class="hardware-label hardware-small" x="24" y="213">${seated?'Incoming MMC seated':'Loose head · outside CAS'}</text>
        <g transform="translate(260 35)">${cassette}</g>
        <path class="ts-patch-guide" d="${route}"/>
        ${lit?lightFlow(route,'red')+`<circle class="ts-port-glow" cx="${seated?px:tip}" cy="${seated?py:159}" r="15"/>`+lightSource(seated?px:tip,seated?py:159,'red')+`<path class="ts-port-emission" d="${seated?`M${px} ${py} l-13 30 h26 Z`:`M${tip} 159 l30 -13 v26 Z`}"/>`:''}
        <path class="loop-jacket" d="M${onward?px:655} ${onward?py+14:180} V270 H724"/><path class="loop-cord" d="M${onward?px:655} ${onward?py+14:180} V270 H724"/>
        ${!onward?`<g transform="translate(655 191) rotate(-90) scale(.65)">${mmcHead(0,0,false)}</g>`:''}
        <text class="hardware-label hardware-small hardware-end" x="724" y="290">${onward?'Onward MMC connected →':'Onward MMC unplugged'}</text>
        <text class="hardware-label hardware-small" x="272" y="259">${lit?s.simulated?'Red = simulated light':'Red = your recorded observation':'Dashed = route to check; light unconfirmed'}</text>
      </svg>
    </div>
    <div class="ts-patch-actions">
      <button type="button" ${headAction}>${seated?'Unplug incoming MMC':'Plug incoming MMC in'}</button>
      <label class="ts-field">Patch incoming MMC to port<select data-field="patch-port" data-patch-point="${point}" data-patch-side="${incoming}">${Array.from({length:32},(_,i)=>`<option value="${i+1}" ${patch.port===i+1?'selected':''}>${i+1}${s.ports[point-1]===i+1?' · FIM':''}</option>`).join('')}</select></label>
      <button type="button" ${action(outgoing,!onward)}>${onward?'Unplug onward MMC':'Connect onward MMC'}</button>
    </div>
    <p class="ts-patch-status" role="status">${stop.blocked?`The path is open here, before ${s.selected?`CAS ${s.selected}`:'the LC leg'}.`:stop.closed?'Both sides are connected. Open the onward side to check this port.':lit?`${s.simulated?'Simulated light reaches':'You reported light at'} ${destination}.`: `Check for red light at ${destination}.`}${patch.port!==s.ports[point-1]?` Patched port ${patch.port} differs from FIM port ${s.ports[point-1]}.`:''}${!seated?' Light at the loose head does not test the CAS connection.':''}</p>
    ${stop.blocked?`<button type="button" class="ts-patch-next" data-action="check-opening">Check light here at CAS ${point}</button>`:forward&&point<s.reach?`<button type="button" class="ts-patch-next" data-action="continue-trace">Connect onward &amp; check CAS ${point+1} →</button>`:!forward&&point>0?`<button type="button" class="ts-patch-next" data-action="continue-trace">Connect onward &amp; check ${point===1?'the LC leg':`CAS ${point-1}`} →</button>`:''}
  </section>`;
}

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
