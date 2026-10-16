import {createCase,changeCase,assessment,faults,pointName,spanName,loopLabels,traceLabels,simulatedReadings} from './troubleshoot-state.mjs?v=1';
import {workbenchDiagram} from './troubleshoot-visuals.mjs?v=1';

const host=document.querySelector('#troubleshoot-workbench');
const guided=document.querySelector('#guided-check');
const key='fiber-workbench-v1';
let view='actual', cases={actual:createCase(),simulation:createCase(true)};
const undo={actual:[],simulation:[]};
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options=(items,value)=>items.map(([id,label])=>`<option value="${escape(id)}" ${String(id)===String(value)?'selected':''}>${escape(label)}</option>`).join('');
const select=(field,label,items,value)=>`<label class="ts-field">${label}<select data-field="${field}">${options(items,value)}</select></label>`;
const button=(action,label,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
const statusLabels={unknown:'Not checked',good:'Light present',weak:'Weak / out of limits',dark:'−40 · no light reported'};
const faultNotes={
  none:'A clear example path. Test results still cover only the pair and section tested.',
  optic_tx:'The local source is not emitting in this example. VFL uses its own light source.',
  optic_rx:'The receiver fails in this example even though local TX still emits.',
  dirty:'Contamination can reduce or block light at an optic face, LC, MMC or passive connection.',
  loose:'An incompletely seated connector can interrupt the selected strand or pair.',
  ferrule:'The MMC ferrule holds and aligns fibers. Damage can affect one or several channels.',
  break:'One selected strand is interrupted. A dark test alone does not locate a real break.',
  bend:'A tight bend or pinch can add loss, even when the jacket looks intact.',
  misport:'The selected strand reaches a different port than the one on the connection record.',
  polarity:'The pair is swapped here. A loop can pass, yet the restored link can still land TX on TX.',
  splice:'A poor splice can add loss or interrupt the selected strand.'
};

function restore(raw,simulated) {
  let s=createCase(simulated);
  if (!raw || typeof raw!=='object') return s;
  s=changeCase(s,{type:'count',value:raw.count});
  s=changeCase(s,{type:'reach',value:s.count});
  for(let p=1;p<=s.count;p++) {
    s=changeCase(s,{type:'select',point:p});
    s=changeCase(s,{type:'port',value:raw.ports?.[p-1]??12});
  }
  s=changeCase(s,{type:'reach',value:raw.reach});
  if(simulated && raw.fault) s=changeCase(s,{type:'fault',value:raw.fault});
  for(const signal of ['tx','rx']) s=changeCase(s,{type:'health',signal,value:raw[signal]});
  for(let p=0;p<=s.reach;p++) {
    if(!Object.hasOwn(loopLabels,raw.loops?.[p])) continue;
    for(const action of [{type:'select',point:p},{type:'tool',tool:'loop'},{type:'ready',value:true},{type:'record',result:raw.loops[p]}]) s=changeCase(s,action);
  }
  for(let p=1;p<=s.reach;p++) for(const strand of ['tx','rx']) {
    const result=raw.traces?.[`${p}:${strand}`];
    if(!Object.hasOwn(traceLabels,result)) continue;
    for(const action of [{type:'select',point:p},{type:'strand',value:strand},{type:'tool',tool:'vfl'},{type:'ready',value:true},{type:'record',result}]) s=changeCase(s,action);
  }
  s=changeCase(s,{type:'select',point:raw.selected});
  s=changeCase(s,{type:'strand',value:raw.strand});
  return changeCase(s,{type:'tool',tool:raw.tool});
}
try {
  const saved=JSON.parse(sessionStorage.getItem(key));
  if(saved) {
    cases={actual:restore(saved.actual,false),simulation:restore(saved.simulation,true)};
    if(['actual','simulation','guided'].includes(saved.view)) view=saved.view;
  }
} catch { /* A fresh case is usable without storage. */ }
function save() { try {sessionStorage.setItem(key,JSON.stringify({...cases,view}));} catch { /* Optional. */ } }
function update(actions, message='') {
  undo[view].push(cases[view]);
  if(undo[view].length>30) undo[view].shift();
  cases[view]=actions.reduce(changeCase,cases[view]);
  save(); render();
  if(message) document.querySelector('#workbench-status').textContent=message;
}

function setup(s) {
  const topology=select('count','Passives on path',[1,2,3,4].map(n=>[n,n]),s.count)+
    select('reach','I can reach',Array.from({length:s.count+1},(_,i)=>[i,i===0?'Optic only':`Through CAS ${i}`]),s.reach);
  if(!s.simulated) return `<section class="ts-setup" aria-label="Your situation"><div class="ts-fields">${topology}
    ${select('tx','Starting local TX',Object.entries(statusLabels),s.tx)}
    ${select('rx','Starting local RX',Object.entries({...statusLabels,good:'Within optic limits'}),s.rx)}</div>
    <p class="ts-note">Enter your observations. Nothing is connected to Cable Guy or live equipment. A −40 report tells us no light was reported, not the cause.</p></section>`;
  const f=s.fault;
  const opticOnly=f.kind.startsWith('optic_'), canAtOptic=['dirty','loose','none'].includes(f.kind);
  const locations=Array.from({length:s.count+2},(_,i)=>[i,i===0?'Optic face / LC socket':i===s.count+1?`Beyond CAS ${s.count} → remote`:spanName(i)]).filter(([i])=>opticOnly?i===0:canAtOptic||i>0);
  return `<section class="ts-setup ts-sim-setup" aria-label="Simulation setup"><div class="ts-mode-notice"><b>SIMULATION</b> Hypothetical results · no live measurements</div>
    <div class="ts-fields">${topology}${select('fault-kind','Choose a fault',Object.entries(faults),f.kind)}
    ${f.kind!=='none'?select('fault-at','Where?',locations,f.at):''}
    ${!opticOnly&&!['none','polarity'].includes(f.kind)?select('fault-strand','Affected strand',[['tx','Local TX → remote RX'],['rx','Remote TX → local RX'],['both','Both strands']],f.strand):''}
    ${['dirty','loose','ferrule','bend','splice'].includes(f.kind)?select('fault-severity','Example effect',[['dark','Blocks light'],['weak','Adds loss · weak light']],f.severity):''}</div>
    <p class="ts-note">${faultNotes[f.kind]} Effects are simplified; real results depend on the hardware, mapping and wavelength.</p></section>`;
}
function readings(s) {
  if(!s.simulated) return '';
  const r=simulatedReadings(s);
  const badge=(name,value)=>`<span class="ts-reading ${value}">${name}<b>${value==='good'?'Light present':value==='weak'?'Weak':'No light'}</b></span>`;
  return `<div class="ts-readings"><span>Expected with service path restored:</span>${badge('Local TX',r.tx)}${badge('Local RX',r.rx)}${badge('Remote RX',r.farRx)}<small>Remote shown for simulation only.</small></div>`;
}
function controls(s) {
  const point=s.selected, tool=s.tool;
  const result=tool==='loop'?s.loops[point]:s.traces[`${point}:${s.strand}`];
  const labels=tool==='loop'?loopLabels:traceLabels;
  return `<section class="ts-control-card" aria-labelledby="test-title"><div class="ts-section-top"><div><p class="ts-eyebrow">1 · Choose a point</p><h2 id="test-title">${pointName(point)}</h2></div>
    ${point?select('port','Mapped port',Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[point-1]):'<span class="ts-tag">LC duplex pair</span>'}</div>
    <div class="ts-fields">${select('point','Test location',Array.from({length:s.reach+1},(_,i)=>[i,pointName(i)]),point)}</div>
    <p class="ts-eyebrow">2 · Place a test tool</p>
    <div class="ts-tool-buttons">${button('loop',point===0?'↶ LC loopback':'↶ MMC loopback',`aria-pressed="${tool==='loop'}"`)}${button('vfl','◉ VFL',`aria-pressed="${tool==='vfl'}" ${point===0?'disabled title="Choose the passive at the end of the section to trace"':''}`)}${button('link','Remove test',`aria-pressed="${tool==='link'}"`)}</div>
    <p class="ts-tool-caption">${tool==='loop'?point===0?'TX returns directly to the same optic’s RX. External fiber is bypassed.':`TX goes out to CAS ${point} and returns through the loop to local RX. The onward route is bypassed.`:tool==='vfl'?`Trace only ${spanName(point)}. VFL replaces the optic source on this isolated section.`:'Choose a loopback, or select a passive to trace its incoming fiber with VFL.'}</p>
    ${tool==='vfl'?select('strand','Strand to trace',[['tx','Normally local TX → remote RX'],['rx','Normally remote TX → local RX']],s.strand):''}
    ${tool!=='link'?`${s.simulated?'<p class="ts-prepared">Simulation assumes a correct test setup; VFL sections are isolated from active gear.</p>':`<label class="ts-ready"><input type="checkbox" data-field="ready" ${s.ready?'checked':''}><span>${tool==='loop'?'Correct loop / lane mapping and any required attenuation checked. I am using this optic’s limits.':'Both ends of this section are disconnected from active gear. Correct VFL adapter fitted.'}</span></label>`}
      <p class="ts-eyebrow">3 · ${s.simulated?'Run the test':'Record what you see'}</p>
      <div class="ts-result-buttons">${s.simulated?button('run','Run this test','class="ts-primary"'):Object.entries(labels).map(([value,label])=>button(`result-${value}`,label,`aria-pressed="${result===value}" ${!s.ready?'disabled':''}`)).join('')}</div>
      ${result?`<p class="ts-recorded">${s.simulated?'Simulated':'Recorded'} result: <b>${labels[result]}</b></p>${button('show-path','View result on path ↑','class="ts-show-path"')}`:''}`:''}
  </section>`;
}
function advice(s) {
  const a=assessment(s);
  return `<section class="ts-advice ${a.tone}" aria-labelledby="finding-title"><p class="ts-eyebrow">What your ${s.simulated?'simulated ':''}tests tell us</p><h2 id="finding-title">${a.title}</h2>
    <p>${a.why}</p><div class="ts-next"><b>Next check</b><p>${a.next}</p></div>
    ${a.suggestion?button('next',a.suggestion.tool==='loop'?`Place ${a.suggestion.point?'MMC':'LC'} loop at ${pointName(a.suggestion.point)} →`:a.suggestion.tool==='vfl'?`Set up VFL to CAS ${a.suggestion.point} →`:'Remove loop / restore path →','class="ts-next-button"'):''}
    ${a.tone==='suspect'&&s.tool!=='vfl'&&a.from!==0?'<p class="ts-note">Possible causes: contamination, seating, misport, ferrule damage, broken / bent fiber, polarity or a splice. Test results narrow the location; they do not identify a cause by themselves.</p>':''}
  </section>`;
}
function results(s) {
  const loops=Object.entries(s.loops).map(([p,result])=>button(`review-loop-${p}`,`${pointName(Number(p))} <b>${loopLabels[result]}</b>`,`class="ts-log-entry ${result}"`));
  const traces=Object.entries(s.traces).map(([id,result])=>{
    const [p,strand]=id.split(':');
    return button(`review-vfl-${p}-${strand}`,`VFL → CAS ${p} · ${strand.toUpperCase()} strand <b>${traceLabels[result]}</b>`,'class="ts-log-entry"');
  });
  return `<section class="ts-log" aria-label="Recorded tests"><div class="ts-section-top"><h3>${s.simulated?'Simulated':'Recorded'} tests</h3><div class="ts-small-actions">${button('undo','Undo',undo[view].length?'':'disabled')}${button('copy','Copy findings')}${button('reset','New case')}</div></div>
    ${loops.length+traces.length?`<div class="ts-log-list">${[...loops,...traces].join('')}</div>`:'<p class="ts-note">No tests recorded yet. Moving a loop or VFL does not mark a section as good.</p>'}
    <p class="ts-note">Saved in this browser tab. Changing the path or mapped ports clears test results. After a repair, start a new case and retest.</p><div id="ts-copy-fallback"></div></section>`;
}
function render() {
  guided.hidden=view!=='guided'; host.hidden=view==='guided';
  document.querySelectorAll('[data-workbench-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workbenchView===view)));
  if(view==='guided') return;
  const s=cases[view];
  host.innerHTML=`${setup(s)}${readings(s)}<section class="ts-map-card" aria-label="Visual test path"><div class="ts-section-top"><div><h2>Follow the pair</h2><p class="ts-note">Tap the optic or a reachable CAS. Place a test below.</p></div>${button('motion',paused?'Play arrows':'Pause arrows','class="motion-toggle"')}</div>
    <div class="ts-map ${paused?'light-paused':''}" tabindex="0" aria-label="Fiber diagram; scroll horizontally to see the full path">${workbenchDiagram(s)}</div>
    <div class="ts-legend"><span>↔ Scroll to follow the path</span><span class="ts-key-ir">Blue / teal: invisible IR</span><span class="ts-key-red">Red: VFL</span><span>Dashed: unverified / bypassed</span></div>
    <p class="ts-note">${s.tool==='vfl'?'TX/RX labels show normal service roles. VFL follows its own source through the isolated strand.':'One pair within the LC follower / MMC head. CAS passes light; it does not create or split it. Drawing is not a ferrule pin map.'}</p></section>
    <div class="ts-work-grid">${controls(s)}${advice(s)}</div>${results(s)}`;
  centerMap();
}

function centerMap() {
  const s=cases[view],map=host.querySelector('.ts-map');
  if(!map) return;
  const scale=map.querySelector('svg').getBoundingClientRect().width/(270+(s.count+1)*290);
  const point=s.tool==='vfl'?s.selected-.5:s.selected;
  map.scrollLeft=Math.max(0,(135+point*290)*scale-map.clientWidth/2);
}

document.querySelectorAll('[data-workbench-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.workbenchView;save();render();}));
host.addEventListener('change',event=>{
  const field=event.target.dataset.field;
  if(!field) return;
  const value=event.target.value;
  const action=field==='ready'?{type:'ready',value:event.target.checked}:field==='point'?{type:'select',point:value}:
    ['tx','rx'].includes(field)?{type:'health',signal:field,value}:field.startsWith('fault-')?{type:'fault',value:{[field.slice(6)]:value}}:{type:field,value};
  update([action],['count','reach','port'].includes(field)?'Path updated. Previous test results cleared.':'');
  host.querySelector(`[data-field="${field}"]`)?.focus({preventScroll:true});
});
function choosePoint(point) {
  update([{type:'select',point}]);
  host.querySelector(`[data-point="${point}"]`)?.focus({preventScroll:true});
}
host.addEventListener('keydown',event=>{
  const point=event.target.closest('[data-point]');
  if(point&&['Enter',' '].includes(event.key)){event.preventDefault();choosePoint(Number(point.dataset.point));}
});
host.addEventListener('click',async event=>{
  const point=event.target.closest('[data-point]');
  if(point){choosePoint(Number(point.dataset.point));return;}
  const target=event.target.closest('[data-action]');
  if(!target) return;
  const action=target.dataset.action,s=cases[view];
  if(action==='motion') {
    paused=!paused;host.querySelector('.ts-map').classList.toggle('light-paused',paused);target.textContent=paused?'Play arrows':'Pause arrows';return;
  }
  if(action==='show-path') {centerMap();host.querySelector('.ts-map-card').scrollIntoView({block:'start',behavior:'instant'});host.querySelector('.ts-map').focus({preventScroll:true});return;}
  if(action==='copy') {
    const a=assessment(s);
    const text=[s.simulated?'SIMULATED FIBER CASE':'FIBER OBSERVATIONS — entered manually',`Reach: ${pointName(s.reach)}; ${s.count} passives on path`,
      `Mapped ports: ${s.ports.slice(0,s.count).map((p,i)=>`CAS ${i+1} / ${p}`).join(', ')}`,
      ...(!s.simulated?[`Starting local TX: ${statusLabels[s.tx]}; RX: ${s.rx==='good'?'Within optic limits':statusLabels[s.rx]}`]:[`Fault: ${faults[s.fault.kind]}; section ${s.fault.at}`]),
      ...Object.entries(s.loops).map(([p,r])=>`Loop at ${pointName(Number(p))}: ${loopLabels[r]}`),
      ...Object.entries(s.traces).map(([id,r])=>`VFL segment / strand ${id}: ${traceLabels[r]}`),
      a.title,a.why,`Next: ${a.next}`,'Remote and untested lanes remain unverified.'].join('\n');
    try {await navigator.clipboard.writeText(text);target.textContent='Copied';}
    catch {const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Findings to copy');host.querySelector('#ts-copy-fallback').replaceChildren(area);area.select();}
    return;
  }
  if(action==='undo') {if(undo[view].length){cases[view]=undo[view].pop();save();render();}}
  else if(action==='reset') {undo[view].push(s);cases[view]=createCase(s.simulated);save();render();}
  else if(['loop','vfl','link'].includes(action)) update([{type:'tool',tool:action}]);
  else if(action==='run') update([{type:'ready',value:true},{type:'record'}],'Simulated test recorded.');
  else if(action.startsWith('result-')) update([{type:'record',result:action.slice(7)}],'Observation recorded.');
  else if(action==='next') {const next=assessment(s).suggestion;if(next)update([{type:'select',point:next.point},{type:'tool',tool:next.tool}]);}
  else if(action.startsWith('review-')) {const [,tool,p,strand]=action.split('-');update([{type:'select',point:p},{type:'tool',tool},...(strand?[{type:'strand',value:strand}]:[])]);}
  host.querySelector(`[data-action="${action}"]`)?.focus({preventScroll:true});
});
render();
