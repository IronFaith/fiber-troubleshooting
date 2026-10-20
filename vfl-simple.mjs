import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {patchAt,traceFrom,traceKey,isOptic,fiberPointName,vflProgress} from './troubleshoot-state.mjs?v=20';
import {vflEndpoint} from './troubleshoot-visuals.mjs?v=24';
import {lcConnector,vflPen} from './test-tool-visuals.mjs?v=1';

const letter=strand=>strand==='tx'?'A':'B';
const label=(x,y,value,extra='')=>`<text x="${x}" y="${y}" class="vfl-label ${extra}">${value}</text>`;
const cable=path=>`<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
const resultLabel=(result,strand)=>!result?'Not checked':result==='seen'?`Light at ${letter(strand)}`:result==='swapped'?`Light at ${letter(strand==='tx'?'rx':'tx')}`:result==='dark'?'No light':result==='weak'?'Weak light':'Other port';
const observationLabels={seen:'Light seen',weak:'Weak light',swapped:'Other channel',dark:'No light',wrong:'Different port'};
const resultMark=result=>result==='seen'?'✓':result==='dark'?'×':result?'!':'?';

function inlineObservation(s,light,destination) {
  return `<div class="vfl-observe" aria-labelledby="test-title">
    <h3 id="test-title" class="sr-only" tabindex="-1">${s.simulated?'Save the simulated check':'Does light reach the expected channel?'}</h3>
    <p class="vfl-testing"><b>VFL on LC ${letter(s.strand)}</b><span aria-hidden="true"> → </span><span>${destination}</span></p>
    ${s.simulated?'<button type="button" data-action="run">Record this check</button>':`
      <div class="vfl-observe-buttons vfl-main-results">${['seen','dark','weak'].map(result=>`<button type="button" data-action="result-${result}" aria-pressed="${light.result===result}"><span class="vfl-choice-mark" aria-hidden="true">${light.result===result?'✓':''}</span><span>${observationLabels[result]}</span></button>`).join('')}</div>
      <details class="vfl-other-light" ${['swapped','wrong'].includes(light.result)?'open':''}><summary>Light on another channel or port</summary><div class="vfl-observe-buttons"><button type="button" data-action="result-swapped" aria-pressed="${light.result==='swapped'}">Other channel (${letter(s.strand==='tx'?'rx':'tx')})</button><button type="button" data-action="result-wrong" aria-pressed="${light.result==='wrong'}">Different port</button></div></details>`}
  </div>`;
}

function progressDiagram(s,viewing) {
  const progress=vflProgress(s);
  return `<section class="vfl-progress" aria-label="Recorded VFL path">
    <h3>Recorded VFL path</h3><p>Recorded checks, not live light.</p>
    <div class="vfl-progress-source"><b>${progress.from===0?'Local LC legs':'Remote LC legs'}</b><b>A</b><b>B</b></div>
    <ol>${progress.points.map(({point,lanes})=>`<li class="${point===viewing?'is-viewing':''}">
      <div class="vfl-progress-point"><b>${isOptic(s,point)?fiberPointName(point,s):`CAS ${point}`}</b>${!isOptic(s,point)?`<small>Port ${patchAt(s,point).port}</small>`:''}${point===viewing?'<small class="vfl-viewing">Viewing here</small>':''}</div>
      ${['tx','rx'].map(strand=>{const lane=lanes[strand],recheck=lane.isolation?.kind==='recheck';return `<div class="vfl-progress-lane ${lane.segment}"><span class="vfl-progress-marker ${recheck?'issue':lane.result==='seen'?'seen':lane.result?'issue':'unknown'}" aria-hidden="true">${recheck?'!':lane.result==='seen'?'✓':lane.result==='dark'?'×':lane.result?'!':'?'}</span><div class="vfl-progress-result"><b>${resultLabel(lane.result,strand)}</b>${lane.headOnly?'<small>Loose MMC only</small>':''}${lane.isolation?`<small class="vfl-isolation">${lane.isolation.label}</small>`:''}</div></div>`;}).join('')}
    </li>`).join('')}</ol>
    <div class="vfl-progress-key"><span class="confirmed">Red: confirmed light</span><span class="suspect">Amber: investigate</span><span class="unknown">Dashed: not checked</span></div>
  </section>`;
}

function diagram(s,mobile) {
  const light=vflEndpoint(s,{preview:true}),point=light.point,from=traceFrom(s);
  const atCAS=!isOptic(s,point),sourceLC=isOptic(s,from);
  const patch=atCAS?patchAt(s,point):null;
  const source=mobile?[[85,175],[265,175]]:[[185,155],[185,230]];
  const headY=mobile?450:310,headX=533;
  const head=mobile?[[154,headY+80],[190,headY+80]]:[[headX+87,151],[headX+87,189]];
  const port=mobile?[[145,615],[199,615]]:[[770,151],[770,199]];
  const stop=port;
  const selected=s.strand==='tx'?0:1,output=light.outputStrand==='tx'?0:1;
  const sourceName=sourceLC?from===0?'Local LC legs unplugged':'Remote LC legs unplugged':`Test fiber at CAS ${from}`;
  const activePath=(i,to)=>{
    if(mobile) {
      const edge=i?350:10,join=atCAS?headY:510;
      return `M${source[i][0]} ${source[i][1]} C${source[i][0]} 205 ${edge} 195 ${edge} 225 V${join-35} Q${edge} ${join} ${atCAS?head[i][0]:to[0]} ${join}${atCAS?` V${head[i][1]} V564 H${to[0]} V${to[1]}`:` V${to[1]}`}`;
    }
    return !atCAS?`M${source[i][0]} ${source[i][1]} C390 ${source[i][1]} 560 ${to[1]} ${to[0]} ${to[1]}`:
      `M${source[i][0]} ${source[i][1]} C310 ${source[i][1]} 380 ${head[i][1]} ${headX} ${head[i][1]} H${head[i][0]} H682 V${to[1]} H${to[0]}`;
  };
  const cards=atCAS?mobile?`<rect class="vfl-cas" x="70" y="545" width="220" height="140" rx="10"/>${label(180,572,`CAS ${point} · Port ${patch.port}`,'on-dark centered')}`:
    `<rect class="vfl-cas" x="645" y="92" width="215" height="170" rx="10"/>${label(752,118,`CAS ${point} · Port ${patch.port}`,'on-dark centered')}`:
    mobile?`<rect class="vfl-lc-end" x="70" y="545" width="220" height="140" rx="10"/>${label(180,572,fiberPointName(point,s),'centered')}`:`<rect class="vfl-lc-end" x="645" y="92" width="215" height="170" rx="10"/>${label(752,118,fiberPointName(point,s),'centered')}`;
  let drawing=mobile?label(180,27,sourceName,'centered'):label(35,32,sourceName);
  if(sourceLC) drawing+=`<g transform="translate(${mobile?146:35} ${mobile?42:49})"><path class="optic-pull" d="M2 9 V0 H66 V9 H59 V6 H9 V9Z"/><rect class="hardware-metal" x="0" y="9" width="68" height="46" rx="5"/><rect class="optic-recess" x="12" y="17" width="16" height="28" rx="2"/><rect class="optic-recess" x="40" y="17" width="16" height="28" rx="2"/></g>`;
  drawing+=mobile?label(180,117,sourceLC?'Optic disconnected':'VFL supplies the light','centered small'):label(35,117,sourceLC?'Optic disconnected':'VFL supplies the light','small');
  for(let i=0;i<2;i++) {
    const [x,y]=source[i],strand=i?'rx':'tx';
    drawing+=cable(activePath(i,stop[i]));
    drawing+=`<g role="button" tabindex="0" data-vfl-strand="${strand}" aria-pressed="${i===selected}" aria-label="Move VFL to ${sourceLC?'LC':'strand'} ${i?'B':'A'}" class="vfl-leg"><rect class="vfl-leg-hit" x="${mobile?x-40:x-140}" y="${mobile?y-140:y-25}" width="${mobile?80:160}" height="${mobile?165:50}" rx="9"/>
      <g transform="translate(${x} ${y}) ${mobile?'rotate(90)':''}">${lcConnector(-52,0,{scale:.82,reverse:true})}${i===selected?vflPen(-52,0,{scale:.8,on:true})+lightFlow('M-52 0 H0','red')+lightSource(-52,0,'red'):''}</g>
      ${label(mobile?x-33:x+28,mobile?y+21:y-16,`${sourceLC?'LC':'Strand'} ${i?'B':'A'}`,mobile?'centered':'')}
      ${label(mobile?x+25:x+70,mobile?y+21:y-16,resultMark(s.traces[traceKey({...s,selected:point,strand})]),'vfl-leg-result centered')}</g>`;
  }
  drawing+=cards;
  if(atCAS) {
    drawing+=mobile?`<rect class="cassette-adapter" x="126" y="526" width="94" height="26" rx="4"/>`:`<rect class="cassette-adapter" x="619" y="129" width="32" height="82" rx="4"/>`;
    drawing+=`<g>
      ${mobile?`<rect class="hardware-boot" x="150" y="${headY-14}" width="44" height="19" rx="4"/><rect class="hardware-plug" x="120" y="${headY}" width="105" height="75" rx="8"/><rect class="hardware-metal" x="137" y="${headY+65}" width="72" height="28" rx="4"/>${label(172,headY+43,'MMC','centered')}`:
      `<rect class="hardware-boot" x="${headX-16}" y="144" width="22" height="53" rx="4"/><rect class="hardware-plug" x="${headX}" y="117" width="82" height="105" rx="8"/><rect class="hardware-metal" x="${headX+73}" y="130" width="29" height="80" rx="4"/>${label(headX+37,175,'MMC','centered')}`}
      ${head.map(([x,y],i)=>`<circle class="vfl-channel" cx="${x}" cy="${y}" r="7"/>${label(mobile?x:x-19,mobile?y-13:y+5,i?'B':'A','small centered')}`).join('')}
    </g>`;
  }
  drawing+=mobile?'<rect class="vfl-port-face" x="119" y="592" width="105" height="49" rx="5"/>':'<rect class="vfl-port-face" x="745" y="132" width="50" height="89" rx="5"/>';
  for(let i=0;i<2;i++) drawing+=`<circle class="vfl-channel" cx="${port[i][0]}" cy="${port[i][1]}" r="10"/>${label(mobile?port[i][0]:812,mobile?port[i][1]+44:port[i][1]+5,i?'B':'A',`${atCAS?'on-dark ':''}${mobile?'centered':''}`)}`;
  const path=activePath(selected,stop[output]);
  if(light.emitting) {
    drawing+=`<g class="${light.result==='weak'?'vfl-dim':''}">${lightFlow(path,'red')}`;
    const [x,y]=stop[output];
    drawing+=`<circle class="ts-port-glow" cx="${x}" cy="${y}" r="17"/>${lightSource(x,y,'red')}<path class="ts-port-emission" d="${mobile?`M${x} ${y} l-15 32 h30 Z`:`M${x} ${y} l32 -15 v30 Z`}"/>`;
    drawing+='</g>';
  } else if(light.result==='dark') {
    const [x,y]=stop[selected];
    drawing+=`<path class="vfl-dark-path" d="${path}"/><path class="vfl-dark-mark" d="M${x-6} ${y-6} l12 12 m0 -12 l-12 12"/>`;
  }
  const outputCaption=light.result==='dark'?'No light reported here':light.result==='weak'?'Weak light reported here':light.result==='wrong'?'Light reported at a different port':`${light.mode==='expected'?'Expected':'Shown'} at ${atCAS?'CAS':'LC'} · ${letter(light.outputStrand)}`;
  drawing+=mobile?label(180,723,outputCaption,'centered'):label(650,304,outputCaption);
  return `<svg class="vfl-simple-canvas hardware-art ${mobile?'vfl-mobile':'vfl-desktop'}" viewBox="0 0 ${mobile?'360 750':'900 330'}" role="group" aria-label="VFL light from ${sourceName} to ${atCAS?`CAS ${point}`:fiberPointName(point,s)}">${drawing}</svg>`;
}

function viewingControls(s,light,points) {
  const point=light.point,atCAS=!isOptic(s,point),patch=atCAS?patchAt(s,point):null;
  const route=points.filter(([p])=>p!==traceFrom(s));
  if(traceFrom(s)>s.selected) route.reverse();
  return `<div class="vfl-viewing-controls">
    <div class="vfl-destinations" role="group" aria-label="Look for light at">${route.map(([p,name])=>`<button type="button" data-action="vfl-view-${p}" aria-pressed="${s.selected===p}"><b>${name}</b>${!isOptic(s,p)?`<small>Port ${patchAt(s,p).port}</small>`:''}</button>`).join('')}</div>
    ${atCAS?`<div class="vfl-port-controls"><label for="vfl-port-number">CAS ${point} · Viewing port</label><div class="vfl-port-stepper"><button type="button" data-action="vfl-port-minus" aria-label="Previous port" ${patch.port===1?'disabled':''}>−</button><input id="vfl-port-number" data-field="vfl-patch-port" type="number" inputmode="numeric" min="1" max="32" step="1" value="${patch.port}" required><button type="button" data-action="vfl-port-plus" aria-label="Next port" ${patch.port===32?'disabled':''}>+</button></div><div class="vfl-fim-port">${patch.port===s.ports[point-1]?`<span>FIM · Port ${s.ports[point-1]}</span>`:`<button type="button" data-action="vfl-port-fim">Use FIM port ${s.ports[point-1]}</button>`}</div></div>`:''}
  </div>`;
}

export function simpleVfl(s,paused,{embedded=false,recordedPath=''}={}) {
  const light=vflEndpoint(s,{preview:true}),point=light.point,from=traceFrom(s);
  const atCAS=!isOptic(s,point);
  const patch=atCAS?patchAt(s,point):null;
  const destination=atCAS?`CAS ${point} · Port ${patch.port}`:fiberPointName(point,s);
  const select=(field,title,items,current)=>`<label>${title}<select data-field="${field}">${items.map(([v,t])=>`<option value="${v}" ${Number(current)===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  const points=Array.from({length:s.reach+1},(_,p)=>[p,p===0?'Local LC legs':p===s.count+1?'Remote LC legs':`CAS ${p}`]);
  const status=light.mode==='expected'?'Expected path · no result recorded':light.mode==='simulation'?'Simulated fault · illustration':'Your recorded observation';
  return `<section class="vfl-simple" aria-label="VFL strand check">
    ${embedded?'':`<div class="vfl-simple-top"><div><h2>Follow the red light</h2><p>Tap an LC leg, then mark the light at the viewing point.</p></div><button type="button" data-action="motion" class="motion-toggle">${paused?'Play arrows':'Pause arrows'}</button></div>`}
    <div class="vfl-simple-route">${select('vfl-from','VFL attached to',points.filter(([p])=>isOptic(s,p)&&p!==s.selected),from)}${embedded&&atCAS?`<div class="vfl-fim-port">${patch.port===s.ports[point-1]?`<span>FIM · Port ${s.ports[point-1]}</span>`:`<button type="button" data-action="vfl-port-fim">Use FIM port ${s.ports[point-1]}</button>`}</div>`:''}</div>
    <div class="vfl-view ${paused?'light-paused':''}">
      ${embedded?'':viewingControls(s,light,points)}
      <p class="vfl-view-status ${light.mode}" role="status">${status}${light.mode==='observation'?` · ${observationLabels[light.result]}`:''}</p>
      <div class="vfl-scene">${diagram(s,false)}${diagram(s,true)}${inlineObservation(s,light,destination)}</div>
    </div>
    ${recordedPath||(embedded?`<details class="ts-finding-details"><summary>Recorded VFL path</summary>${progressDiagram(s,point)}</details>`:progressDiagram(s,point))}
    ${embedded?'':`<p class="vfl-hint"><a href="./learn.html#polarity-checks">Learn polarity: see TX / RX and trace both strands →</a></p><p class="vfl-fine">A / B illustrate one pair, not MMC pin numbers. Follow your actual channel map. Attach VFL only to disconnected LC legs; view light indirectly at the MMC or CAS.</p>`}
  </section>`;
}
