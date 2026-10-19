import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {patchAt,traceFrom,traceKey,isOptic,fiberPointName,vflProgress} from './troubleshoot-state.mjs?v=14';
import {vflEndpoint} from './troubleshoot-visuals.mjs?v=16';

const letter=strand=>strand==='tx'?'A':'B';
const label=(x,y,value,extra='')=>`<text x="${x}" y="${y}" class="vfl-label ${extra}">${value}</text>`;
const cable=path=>`<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
const patchAction=(point,side,connected,port)=>`data-patch-point="${point}" data-patch-side="${side}" data-patch-connected="${connected}" data-patch-port="${port}"`;
const resultLabel=(result,strand)=>!result?'Not checked':result==='seen'?`Light at ${letter(strand)}`:result==='swapped'?`Light at ${letter(strand==='tx'?'rx':'tx')}`:result==='dark'?'No light':'Other port';

function progressDiagram(s,viewing) {
  const progress=vflProgress(s);
  return `<section class="vfl-progress" aria-label="Recorded VFL path">
    <h3>Recorded VFL path</h3><p>Recorded checks, not live light.</p>
    <div class="vfl-progress-source"><b>${progress.from===0?'Local LC legs':'Remote LC legs'}</b><b>A</b><b>B</b></div>
    <ol>${progress.points.map(({point,lanes})=>`<li class="${point===viewing?'is-viewing':''}">
      <div class="vfl-progress-point"><b>${isOptic(s,point)?fiberPointName(point,s):`CAS ${point}`}</b>${!isOptic(s,point)?`<small>Port ${patchAt(s,point).port}</small>`:''}${point===viewing?'<small class="vfl-viewing">Viewing here</small>':''}</div>
      ${['tx','rx'].map(strand=>{const lane=lanes[strand];return `<div class="vfl-progress-lane ${lane.segment}"><span class="vfl-progress-marker ${lane.result==='seen'?'seen':lane.result?'issue':'unknown'}" aria-hidden="true">${lane.result==='seen'?'✓':lane.result==='dark'?'×':lane.result?'!':'?'}</span><div class="vfl-progress-result"><b>${resultLabel(lane.result,strand)}</b>${lane.headOnly?'<small>Loose MMC only</small>':''}</div></div>`;}).join('')}
    </li>`).join('')}</ol>
    <div class="vfl-progress-key"><span class="confirmed">Red: confirmed light</span><span class="suspect">Amber: investigate</span><span class="unknown">Dashed: not checked</span></div>
  </section>`;
}

function diagram(s,mobile) {
  const light=vflEndpoint(s,{preview:true}),point=light.point,from=traceFrom(s),forward=from<s.selected;
  const atCAS=!isOptic(s,point),sourceLC=isOptic(s,from);
  const patch=atCAS?patchAt(s,point):null,incoming=forward?'rear':'front',outgoing=forward?'front':'rear';
  const seated=atCAS&&patch[incoming],closed=atCAS&&patch[outgoing]&&seated;
  const source=mobile?[[85,175],[265,175]]:[[185,155],[185,230]];
  const headY=seated?310:270,headX=seated?533:475;
  const head=mobile?[[154,headY+80],[190,headY+80]]:[[headX+87,151],[headX+87,189]];
  const port=mobile?[[145,475],[199,475]]:[[770,151],[770,199]];
  const stop=atCAS?(seated?port:head):port;
  const selected=s.strand==='tx'?0:1,output=light.outputStrand==='tx'?0:1;
  const sourceName=sourceLC?from===0?'Local LC legs unplugged':'Remote LC legs unplugged':`Test fiber at CAS ${from}`;
  const activePath=(i,to)=>!atCAS?mobile?`M${source[i][0]} ${source[i][1]} V370 H${to[0]} V${to[1]}`:`M${source[i][0]} ${source[i][1]} C390 ${source[i][1]} 560 ${to[1]} ${to[0]} ${to[1]}`:mobile?`M${source[i][0]} ${source[i][1]} C${source[i][0]} 245 ${head[i][0]} 235 ${head[i][0]} ${headY}${seated?` V${head[i][1]} V424 H${to[0]} V${to[1]}`:` V${headY+45} H${to[0]} V${to[1]}`}`:
    `M${source[i][0]} ${source[i][1]} C310 ${source[i][1]} 380 ${head[i][1]} ${headX} ${head[i][1]}${seated?` H${head[i][0]} H682 V${to[1]} H${to[0]}`:` H${headX+55} V${to[1]} H${to[0]}`}`;
  const action=atCAS?patchAction(point,incoming,!seated,patch.port):'';
  const cards=atCAS?mobile?`<rect class="vfl-cas" x="70" y="405" width="220" height="140" rx="10"/>${label(180,432,`CAS ${point} · Port ${patch.port}`,'on-dark centered')}`:
    `<rect class="vfl-cas" x="645" y="92" width="215" height="170" rx="10"/>${label(752,118,`CAS ${point} · Port ${patch.port}`,'on-dark centered')}`:
    mobile?`<rect class="vfl-lc-end" x="70" y="405" width="220" height="140" rx="10"/>${label(180,432,fiberPointName(point,s),'centered')}`:`<rect class="vfl-lc-end" x="645" y="92" width="215" height="170" rx="10"/>${label(752,118,fiberPointName(point,s),'centered')}`;
  let drawing=mobile?label(180,27,sourceName,'centered'):label(35,32,sourceName);
  if(sourceLC) drawing+=`<g transform="translate(${mobile?146:35} ${mobile?42:49})"><path class="optic-pull" d="M2 9 V0 H66 V9 H59 V6 H9 V9Z"/><rect class="hardware-metal" x="0" y="9" width="68" height="46" rx="5"/><rect class="optic-recess" x="12" y="17" width="16" height="28" rx="2"/><rect class="optic-recess" x="40" y="17" width="16" height="28" rx="2"/></g>`;
  drawing+=mobile?label(180,117,sourceLC?'Optic disconnected':'VFL supplies the light','centered small'):label(35,117,sourceLC?'Optic disconnected':'VFL supplies the light','small');
  for(let i=0;i<2;i++) {
    const [x,y]=source[i],strand=i?'rx':'tx';
    drawing+=cable(activePath(i,stop[i]));
    drawing+=`<g role="button" tabindex="0" data-vfl-strand="${strand}" aria-label="Move VFL to ${sourceLC?'LC':'strand'} ${i?'B':'A'}" class="vfl-leg"><rect class="vfl-leg-hit" x="${mobile?x-40:x-120}" y="${mobile?y-115:y-25}" width="${mobile?80:140}" height="${mobile?140:50}" rx="9"/>
      <g transform="translate(${x} ${y}) ${mobile?'rotate(90)':''}"><rect class="hardware-metal" x="-52" y="-5" width="12" height="10"/><rect class="hardware-plug" x="-42" y="-12" width="32" height="24" rx="3"/><rect class="hardware-boot" x="-10" y="-7" width="10" height="14" rx="2"/>${i===selected?'<rect class="vfl-tool" x="-111" y="-15" width="59" height="30" rx="9"/>':''}</g>
      ${i===selected?label(mobile?x:x-82,mobile?y-78:y+5,'VFL','tool centered'):''}${label(mobile?x-33:x+28,mobile?y+21:y-16,`${sourceLC?'LC':'Strand'} ${i?'B':'A'}`,mobile?'centered':'')}</g>`;
  }
  drawing+=lightSource(source[selected][0],source[selected][1],'red')+cards;
  if(atCAS) {
    drawing+=mobile?`<rect class="vfl-unplug-target" data-unplug-target="${point}" x="110" y="245" width="130" height="50" rx="8"/>`:`<rect class="vfl-unplug-target" data-unplug-target="${point}" x="440" y="110" width="65" height="125" rx="8"/>`;
    drawing+=mobile?`<rect class="cassette-adapter" x="126" y="386" width="94" height="26" rx="4"/>`:`<rect class="cassette-adapter" x="619" y="129" width="32" height="82" rx="4"/>`;
    drawing+=`<g class="ts-patch-head" data-patch-head="${point}" role="button" tabindex="0" ${action} aria-label="${seated?'Unplug':'Plug in'} MMC">
      ${mobile?`<rect class="hardware-boot" x="150" y="${headY-14}" width="44" height="19" rx="4"/><rect class="hardware-plug" x="120" y="${headY}" width="105" height="75" rx="8"/><rect class="hardware-metal" x="137" y="${headY+65}" width="72" height="28" rx="4"/>${label(172,headY+43,'MMC','centered')}`:
      `<rect class="hardware-boot" x="${headX-16}" y="144" width="22" height="53" rx="4"/><rect class="hardware-plug" x="${headX}" y="117" width="82" height="105" rx="8"/><rect class="hardware-metal" x="${headX+73}" y="130" width="29" height="80" rx="4"/>${label(headX+37,175,'MMC','centered')}`}
      ${head.map(([x,y],i)=>`<circle class="vfl-channel" cx="${x}" cy="${y}" r="7"/>${label(mobile?x:x-19,mobile?y-13:y+5,i?'B':'A','small centered')}`).join('')}
    </g>`;
    drawing+=mobile?label(180,headY-25,seated?'MMC plugged in':'MMC unplugged','centered'):label(headX+50,93,seated?'MMC plugged in':'MMC unplugged','centered');
    drawing+=`<g ${patchAction(point,incoming,true,patch.port)} role="button" tabindex="0" aria-label="Plug MMC into CAS ${point} port ${patch.port}" class="vfl-port-target">`;
  }
  drawing+=mobile?'<rect class="vfl-port-face" x="119" y="452" width="105" height="49" rx="5"/>':'<rect class="vfl-port-face" x="745" y="132" width="50" height="89" rx="5"/>';
  for(let i=0;i<2;i++) drawing+=`<circle class="vfl-channel" cx="${port[i][0]}" cy="${port[i][1]}" r="10"/>${label(mobile?port[i][0]:812,mobile?port[i][1]+44:port[i][1]+5,i?'B':'A',`${atCAS?'on-dark ':''}${mobile?'centered':''}`)}`;
  if(atCAS)drawing+='</g>';
  const path=atCAS?activePath(selected,stop[output]):mobile?`M${source[selected][0]} ${source[selected][1]} V370 H${port[output][0]} V${port[output][1]}`:`M${source[selected][0]} ${source[selected][1]} C390 ${source[selected][1]} 560 ${port[output][1]} ${port[output][0]} ${port[output][1]}`;
  if(light.emitting||closed&&light.result!=='dark') {
    drawing+=lightFlow(path,'red');
    if(closed) drawing+=lightFlow(mobile?`M${port[output][0]} ${port[output][1]} V590`:`M${port[output][0]} ${port[output][1]} H900`,'red');
    else {
      const [x,y]=stop[output];
      drawing+=`<circle class="ts-port-glow" cx="${x}" cy="${y}" r="17"/>${lightSource(x,y,'red')}<path class="ts-port-emission" d="${mobile?`M${x} ${y} l-15 32 h30 Z`:`M${x} ${y} l32 -15 v30 Z`}"/>`;
    }
  }
  const outputCaption=closed?'Light continues onward →':light.result==='dark'?'No light reported here':light.result==='wrong'?'Light reported at a different port':`${light.mode==='expected'?'Expected':'Shown'} at ${atCAS?seated?'CAS':'MMC head':'LC'} · ${letter(light.outputStrand)}`;
  drawing+=mobile?label(180,583,outputCaption,'centered'):label(650,304,outputCaption);
  return `<svg class="vfl-simple-canvas hardware-art ${mobile?'vfl-mobile':'vfl-desktop'}" viewBox="0 0 ${mobile?'360 610':'900 330'}" role="group" aria-label="VFL light from ${sourceName} to ${atCAS?`CAS ${point}`:fiberPointName(point,s)}">${drawing}</svg>`;
}

function pairChecks(s,point) {
  const rows=['tx','rx'].map(strand=>{
    const base=traceKey({...s,selected:point,strand}).replace(/:head$/,'');
    return {strand,head:s.traces[base+':head'],port:s.traces[base]};
  });
  return `<table class="vfl-checks"><caption>Your checks · ${fiberPointName(point,s)} · from ${fiberPointName(traceFrom(s),s)}</caption><thead><tr><th scope="col">VFL on</th><th scope="col">Loose MMC</th><th scope="col">Through CAS</th></tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${letter(r.strand)}</th><td class="${r.head==='dark'?'issue':''}">${resultLabel(r.head,r.strand)}</td><td class="${r.port==='dark'?'issue':''}">${resultLabel(r.port,r.strand)}</td></tr>`).join('')}</tbody></table>`;
}

export function simpleVfl(s,paused) {
  const light=vflEndpoint(s,{preview:true}),point=light.point,from=traceFrom(s),forward=from<s.selected;
  const atCAS=!isOptic(s,point),sourceLC=isOptic(s,from);
  const patch=atCAS?patchAt(s,point):null,incoming=forward?'rear':'front';
  const destination=atCAS?light.kind==='head'?`loose MMC head at CAS ${point}`:`CAS ${point} · Port ${patch.port}`:fiberPointName(point,s);
  const select=(field,title,items,current)=>`<label>${title}<select data-field="${field}">${items.map(([v,t])=>`<option value="${v}" ${Number(current)===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  const points=Array.from({length:s.reach+1},(_,p)=>[p,p===0?'Local LC legs':p===s.count+1?'Remote LC legs':`CAS ${p}`]);
  const status=light.mode==='expected'?'Expected path · no result recorded':light.mode==='simulation'?'Simulated fault · illustration':'Your recorded observation';
  const obsLabels={seen:'Same channel',swapped:'Other channel',dark:'No light',wrong:'Different port'};
  const next=point+(forward?1:-1);
  return `<section class="vfl-simple" aria-label="VFL strand check">
    <div class="vfl-simple-top"><div><h2>Follow the red light</h2><p>VFL stays on the LC leg. Plug or unplug the MMC to check for light.</p></div><button type="button" data-action="motion" class="motion-toggle">${paused?'Play arrows':'Pause arrows'}</button></div>
    <div class="vfl-simple-route">${select('vfl-from','VFL attached to',points.filter(([p])=>isOptic(s,p)&&p!==s.selected),from)}${select('vfl-to','Look for light at',points.filter(([p])=>p!==from),s.selected)}${atCAS?select('vfl-patch-port','Patched port',Array.from({length:32},(_,i)=>[i+1,i+1]),patch.port):''}</div>
    ${atCAS?`<p class="vfl-hint">FIM destination: CAS ${point} · Port ${s.ports[point-1]}</p>`:''}
    <div class="vfl-strands" role="group" aria-label="Choose VFL strand">${['tx','rx'].map(strand=>`<button type="button" data-vfl-strand="${strand}" aria-pressed="${s.strand===strand}"><b>${sourceLC?'LC':'Strand'} ${letter(strand)}</b><small>${sourceLC?(strand==='tx')===(from===0)?'Normally TX':'Normally RX':'Trace this strand'}</small></button>`).join('')}</div>
    ${progressDiagram(s,point)}
    <div class="vfl-view ${paused?'light-paused':''}"><p class="vfl-view-status ${light.mode}" role="status">${status}${light.mode==='observation'?` · ${obsLabels[light.result]}`:''}</p>${diagram(s,false)}${diagram(s,true)}</div>
    <div class="vfl-connect-actions">${atCAS?`<button type="button" ${patchAction(point,incoming,!patch[incoming],patch.port)}>${patch[incoming]?'Unplug MMC':'Plug MMC in'}</button>${next>=0&&next<=s.reach&&next!==from?`<button type="button" data-action="continue-trace">Connect onward → ${fiberPointName(next,s)}</button>`:''}`:''}</div>
    ${light.blocked?`<p class="vfl-hint">Light exits at the open connection at CAS ${point}, before your selected destination.</p>`:''}
    <div class="vfl-observe" aria-labelledby="test-title"><h3 id="test-title" tabindex="-1">${s.simulated?'Save the simulated check':`What do you see at the ${destination}?`}</h3>
      ${light.closed?'<p>Unplug the onward connection to check this port.</p><button type="button" data-action="open-vfl-end">Unplug onward MMC</button>':s.simulated?'<button type="button" data-action="run">Record this check</button>':`<div class="vfl-observe-buttons"><button type="button" data-action="result-${s.strand==='tx'?'seen':'swapped'}" aria-pressed="${light.result===(s.strand==='tx'?'seen':'swapped')}">Light at A</button><button type="button" data-action="result-${s.strand==='rx'?'seen':'swapped'}" aria-pressed="${light.result===(s.strand==='rx'?'seen':'swapped')}">Light at B</button><button type="button" data-action="result-dark" aria-pressed="${light.result==='dark'}">No light</button><button type="button" data-action="result-wrong" aria-pressed="${light.result==='wrong'}">Different port</button></div><p>Record the real observation to get your next check. The initial glow is only an illustration.</p>`}
    </div>
    ${atCAS?pairChecks(s,point):''}
    <p class="vfl-hint"><a href="./learn.html#polarity-checks">Learn polarity: see TX / RX and trace both strands →</a></p>
    <p class="vfl-fine">A / B illustrate one pair, not MMC pin numbers. Follow your actual channel map. Attach VFL only to disconnected LC legs; view light indirectly at the MMC or CAS.</p>
  </section>`;
}
