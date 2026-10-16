import {createCase,changeCase,assessment,faults,pointName,spanName,loopLabels,traceLabels,simulatedReadings,canPlaceTool,fiberPointName,traceFrom,traceName,traceKey,parseTraceKey} from './troubleshoot-state.mjs?v=6';
import {workbenchDiagram} from './troubleshoot-visuals.mjs?v=7';
import {toolNames,toolArt,mountToolDrag} from './troubleshoot-tools.mjs?v=4';

const host=document.querySelector('#troubleshoot-workbench');
const guided=document.querySelector('#guided-check');
const key='fiber-workbench-v1';
let view='actual', cases={actual:createCase(),simulation:createCase(true)};
let selectedTool=null,setupOpen=false;
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
  for(const [key,result] of Object.entries(raw.traces??{})) {
    const route=parseTraceKey(key);
    if(!route || route.from>s.reach || route.to>s.reach || !Object.hasOwn(traceLabels,result)) continue;
    for(const action of [{type:'trace',from:route.from,to:route.to},{type:'strand',value:route.strand},{type:'ready',value:true},{type:'record',result}]) s=changeCase(s,action);
  }
  s=changeCase(s,{type:'select',point:raw.selected});
  s=changeCase(s,{type:'strand',value:raw.strand});
  s=changeCase(s,{type:'tool',tool:raw.tool});
  if(raw.tool==='vfl') s=changeCase(s,{type:'trace',from:raw.vflFrom??Math.max(0,raw.selected-1),to:raw.selected});
  if(s.tool==='link' && Array.isArray(raw.disconnected)) s.disconnected=[...new Set(raw.disconnected.filter(p=>Number.isInteger(p)&&p>=0&&p<=s.reach))];
  return changeCase(s,{type:'service',value:raw.service});
}
try {
  const saved=JSON.parse(sessionStorage.getItem(key));
  if(saved) {
    cases={actual:restore(saved.actual,false),simulation:restore(saved.simulation,true)};
  }
} catch { /* A fresh case is usable without storage. */ }
function save() { try {sessionStorage.setItem(key,JSON.stringify({...cases,view}));} catch { /* Optional. */ } }
function update(actions, message='') {
  selectedTool=null;
  undo[view].push(cases[view]);
  if(undo[view].length>30) undo[view].shift();
  cases[view]=actions.reduce(changeCase,cases[view]);
  save(); render(true);
  if(message) announce(message);
}
function announce(message) {
  document.querySelector('#workbench-status').textContent=message;
  const hint=host.querySelector('#ts-tool-hint'); if(hint) hint.textContent=message;
}
function selectTool(kind) {
  selectedTool=kind;
  host.querySelectorAll('[data-pick-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pickTool===kind)));
  host.querySelectorAll('[data-point],[data-span]').forEach(el=>{
    const point=Number(el.dataset.span??el.dataset.point);
    el.classList.toggle('ts-can-drop',Boolean(kind)&&(!el.hasAttribute('data-span')||kind==='vfl')&&canPlaceTool(cases[view],kind,point));
  });
  announce(kind?`${toolNames[kind]}: ${kind==='lc'?'drop on the optic.':kind==='mmc'?'drop on a reachable CAS.':'drop at the LC leg or CAS where the VFL starts, then choose where to check for light.'} You can also tap the target.`:'Drag a tool onto the path, or tap a tool then its target.');
}
function placeTool(kind,point,atSource=false) {
  if(!canPlaceTool(cases[view],kind,point)) {announce('That tool does not match this point. Choose a highlighted target.');return;}
  selectedTool=null;
  update([{type:'place',kind,point,atSource}],kind==='vfl'?'VFL placed. Choose its source and where you expect light, then enter your observation.':`${toolNames[kind]} placed. Enter the result you observed.`);
  host.querySelector('[data-action="test-result"]')?.focus({preventScroll:true});
}
function removeTool() {
  update([{type:'remove'}],'Tool removed; connectors left unplugged. Results kept.');
}
function normalizeSetup() {
  update([{type:'normalize'}],'Setup normalized in the diagram. Recheck actual health.');
}
const toolDrag=mountToolDrag(host,{select:selectTool,place:placeTool,remove:removeTool,valid:(kind,point)=>canPlaceTool(cases[view],kind,point),announce,getSelected:()=>selectedTool});

function tray(s) {
  return `<div class="ts-tool-tray" aria-label="Test tools"><div class="ts-tool-items">${Object.entries(toolNames).map(([kind,name])=>`<button type="button" class="ts-tool-pick" data-pick-tool="${kind}" aria-pressed="${selectedTool===kind}" aria-label="Pick up ${name}">${toolArt(kind)}<span><b>${name}</b><small>${kind==='lc'?'At the optic':kind==='mmc'?'At a cassette':'LC leg / fiber'}</small></span></button>`).join('')}</div><div class="ts-tray-actions"><span>Drag a placed tool back here to remove.</span>${button('test-result','Enter result ↓',s.tool==='link'?'disabled':'')}${button('remove-tool','Remove tool',`class="ts-remove" aria-label="Remove placed tool" ${s.tool==='link'?'disabled':''}`)}${button('normalize','Normalize',`class="ts-normalize" ${s.tool==='link'&&!s.disconnected?.length?'disabled':''}`)}</div><p id="ts-tool-hint">Drag a tool onto the path, or tap a tool then its target.</p></div>`;
}

function setup(s) {
  const topology=select('count','Passives on path',[1,2,3,4].map(n=>[n,n]),s.count)+
    select('reach','I can reach',Array.from({length:s.count+1},(_,i)=>[i,i===0?'Optic only':`Through CAS ${i}`]),s.reach);
  if(!s.simulated) return `<div class="ts-path-settings"><p><b>Find the problem</b><span>Start with what you can reach. No fault selection needed.</span></p>${button('setup',`Edit path · ${s.count} CAS`,`aria-expanded="${setupOpen}" aria-controls="ts-path-fields"`)}</div><section id="ts-path-fields" class="ts-setup" aria-label="Your path settings" ${setupOpen?'':'hidden'}><div class="ts-fields">${topology}
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
function vflRouteControls(s) {
  if(s.tool!=='vfl') return '';
  const from=traceFrom(s),points=Array.from({length:s.reach+1},(_,p)=>[p,p===0?'Optic-side LC leg':`CAS ${p} · Port ${s.ports[p-1]}`]);
  return `<div class="ts-vfl-route" aria-label="VFL source and viewing point">${select('vfl-from','VFL starts at',points.filter(([p])=>p!==s.selected),from)}<span class="ts-vfl-direction" aria-hidden="true">→</span>${select('vfl-to','Expect light at',points.filter(([p])=>p!==from),s.selected)}<div class="ts-vfl-route-footer"><p>${s.selected?'Keep the incoming MMC seated. Open the onward connection at the viewing port.':'Check the disconnected optic-side LC leg.'} Intermediate passives stay patched.</p>${button('swap-trace','Swap ends')}</div></div>`;
}
function vflObservationControls(s) {
  const result=s.traces[traceKey(s)], point=s.selected;
  const destination=point?`CAS ${point} · Port ${s.ports[point-1]}`:'the disconnected LC leg';
  const labels={seen:'Yes, light passes',dark:'No light',wrong:'Light at a different port',swapped:'Light on the other strand'};
  return `<section class="ts-vfl-observation" aria-labelledby="test-title">
    <div class="ts-section-top"><h2 id="test-title" tabindex="-1">Does red light reach ${destination}?</h2>${button('link','Remove VFL','class="ts-remove"')}</div>
    <div class="ts-fields">${point?select('port',`CAS ${point} viewing port`,Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[point-1]):''}${traceFrom(s)>0?select('vfl-source-port',`CAS ${traceFrom(s)} source port`,Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[traceFrom(s)-1]):''}${select('strand','Trace this strand',[['tx','Normally local TX'],['rx','Normally local RX']],s.strand)}</div>
    ${s.simulated?'<p class="ts-note">Practice · run the test to show its result.</p>':`<label class="ts-ready"><input type="checkbox" data-field="ready" aria-describedby="vfl-setup-help" ${s.ready?'checked':''}><span>I’ve disconnected this test section from the optics.</span></label><p class="ts-note" id="vfl-setup-help">Confirm your real setup: disconnect the paths toward the optics at both test ends. Keep the incoming MMC and connections between your test points seated. Use the matching VFL adapter and approved viewing method.</p>`}
    <div class="ts-result-buttons">${s.simulated?button('run','Run this test','class="ts-primary"'):Object.entries(labels).map(([value,label])=>button(`result-${value}`,label,`aria-pressed="${result===value}" ${!s.ready?'disabled':''}`)).join('')}</div>
    <p class="ts-vfl-feedback" role="status">${result?({seen:`Red light shown at ${destination}, based on ${s.simulated?'the simulated result':'your result'}. Continuity only; loss is not measured.`,dark:`${destination} stays dark. Check the setup and narrow the route; the cause and location are still unknown.`,wrong:'Red is shown off the expected route. Confirm the actual port against FIM.',swapped:`Red reaches ${destination} on the other strand. Check the strand mapping.`}[result]):s.ready?'Choose your observation to update the red light in the picture.':s.simulated?'Run this test to show the simulated result.':'Tick the checkbox after checking your real connections, then choose what you see.'}</p>
  </section>`;
}
function controls(s) {
  const point=s.selected, tool=s.tool;
  const hasResults=Object.keys(s.loops).length+Object.keys(s.traces).length>0;
  const result=tool==='loop'?s.loops[point]:s.traces[traceKey(s)];
  if(tool==='link' && s.disconnected?.length) return `<section class="ts-control-card" aria-labelledby="test-title"><h2 id="test-title" tabindex="-1">Reconnect the service path</h2><p class="ts-tool-caption">The tool is off. The highlighted LC legs or MMC heads are still unplugged.</p>${button('normalize','Normalize','class="ts-primary"')}<p class="ts-note">Reconnects the illustration and keeps recorded tests. Confirm the real connections before checking health.</p></section>`;
  if(tool==='link') return `<section class="ts-control-card" aria-labelledby="test-title"><h2 id="test-title" tabindex="-1">${s.loops[s.reach]==='pass'?'Check the restored link':hasResults?'Choose the next test':'Place your first test'}</h2>
    ${s.loops[s.reach]==='pass'&&!s.simulated?`<p class="ts-tool-caption">Remove the loop, restore the mapped connections, then check required local readings and link status. Is the link working now?</p><div class="ts-result-buttons">${button('service-good','Yes · link working',`aria-pressed="${s.service==='good'}"`)}${button('service-bad','No · still a problem',`aria-pressed="${s.service==='bad'}"`)}</div>`:
      hasResults?'<p class="ts-tool-caption">Place a tool for your next check. Earlier observations stay on the path and in Recorded tests.</p>':`<p class="ts-tool-caption">Drag LC onto the optic to start. If you already have a test set up, place that tool at its matching point.</p>`}</section>`;
  const labels=tool==='loop'?{pass:'Yes · passes',dark:'No · no return light',weak:'Light returns, but weak'}:traceLabels;
  return `<section class="ts-control-card" aria-labelledby="test-title"><div class="ts-section-top"><div><p class="ts-test-location">${tool==='vfl'?'VFL':point===0?'LC loopback':'MMC loopback'} · ${tool==='vfl'?traceName(s):pointName(point)}</p><h2 id="test-title" tabindex="-1">${tool==='loop'?'Does the loop pass?':`What did you see at ${fiberPointName(point)}?`}</h2></div>${button('link','Remove tool','class="ts-remove"')}</div>
    <div class="ts-fields">${tool==='vfl'&&traceFrom(s)>0?select('vfl-source-port',`CAS ${traceFrom(s)} source port`,Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[traceFrom(s)-1]):''}${point?select('port',`CAS ${point} ${tool==='vfl'?'expected':'mapped'} port`,Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[point-1]):''}</div>
    <p class="ts-tool-caption">${tool==='loop'?'Use the correct loop mapping and required attenuation. Check TX and returning RX against this optic’s limits.':`The VFL supplies red light at ${fiberPointName(traceFrom(s))}. Check the isolated fiber end at ${fiberPointName(point)}. ${traceFrom(s)===0||point===0?'The optic-side LC leg is unplugged; the optic itself is not part of this trace.':''}`}</p>
    ${tool==='vfl'?select('strand','Strand to trace',[['tx','Normally local TX → remote RX'],['rx','Normally remote TX → local RX']],s.strand):''}
    ${s.simulated?'<p class="ts-prepared">Practice only · results come from the chosen fault.</p>':tool==='vfl'?`<label class="ts-ready"><input type="checkbox" data-field="ready" ${s.ready?'checked':''}><span>I’ve disconnected this test section from the optics and fitted the matching VFL adapter.</span></label>`:''}
    <div class="ts-result-buttons">${s.simulated?button('run','Run this test','class="ts-primary"'):Object.entries(labels).map(([value,label])=>button(`result-${value}`,label,`aria-pressed="${result===value}" ${tool==='vfl'&&!s.ready?'disabled':''}`)).join('')}</div>
    ${result?`<p class="ts-recorded">${s.simulated?'Simulated':'You recorded'}: <b>${tool==='loop'?loopLabels[result]:traceLabels[result]}</b></p>`:'<p class="ts-note">Placing the tool does not record a pass.</p>'}</section>`;
}
function advice(s) {
  const a=assessment(s);
  const pending=s.tool==='loop'&&!s.loops[s.selected] || s.tool==='vfl'&&!s.traces[traceKey(s)];
  if(pending) return `<section class="ts-advice" aria-labelledby="finding-title"><h2 id="finding-title">Waiting for your result</h2><p>${s.tool==='loop'?s.selected===0?'This test checks the optic with the external fiber bypassed.':`This loop includes the optic and its fiber path to CAS ${s.selected}.`:`This trace checks one isolated strand along ${traceName(s)}.`}</p>${a.lastPass>=0?`<p class="ts-note">✓ Last passing loop: ${pointName(a.lastPass)}. The next section remains unverified.</p>`:''}</section>`;
  return `<section class="ts-advice ${a.tone}" aria-labelledby="finding-title"><p class="ts-eyebrow">What your ${s.simulated?'simulated ':''}tests tell us</p><h2 id="finding-title">${a.title}</h2>
    <p>${a.why}</p><div class="ts-next"><b>Next check</b><p>${a.next}</p></div>
    ${a.suggestion&&!pending?button('next',a.suggestion.tool==='loop'?`Next: ${a.suggestion.point?'MMC':'LC'} loop at ${pointName(a.suggestion.point)}`:a.suggestion.tool==='vfl'?`Trace ${spanName(a.suggestion.point)} with VFL`:'Normalize','class="ts-next-button"'):''}
    ${a.tone==='suspect'&&s.tool!=='vfl'&&a.from!==0?'<p class="ts-note">Possible causes: contamination, seating, misport, ferrule damage, broken / bent fiber, polarity or a splice. Test results narrow the location; they do not identify a cause by themselves.</p>':''}
  </section>`;
}
function results(s) {
  const loops=Object.entries(s.loops).map(([p,result])=>button(`review-loop-${p}`,`${pointName(Number(p))} <b>${loopLabels[result]}</b>`,`class="ts-log-entry ${result}"`));
  const traces=Object.entries(s.traces).map(([id,result])=>{
    const {from,to,strand}=parseTraceKey(id);
    return button(`review-vfl-${from}-${to}-${strand}`,`VFL · ${fiberPointName(from)} → ${fiberPointName(to)} · ${strand.toUpperCase()} strand <b>${traceLabels[result]}</b>`,'class="ts-log-entry"');
  });
  return `<section class="ts-log" aria-label="Recorded tests"><div class="ts-section-top"><h3>${s.simulated?'Simulated':'Recorded'} tests</h3><div class="ts-small-actions">${button('undo','Undo',undo[view].length?'':'disabled')}${button('copy','Copy findings')}${button('reset','New case')}</div></div>
    ${loops.length+traces.length?`<div class="ts-log-list">${[...loops,...traces].join('')}</div>`:'<p class="ts-note">No tests recorded yet. Moving a loop or VFL does not mark a section as good.</p>'}
    <p class="ts-note">Saved in this browser tab. Changing the path or mapped ports clears test results. After a repair, start a new case and retest.</p><div id="ts-copy-fallback"></div></section>`;
}
function render(preservePosition=false) {
  const scrollLeft=host.querySelector('.ts-map')?.scrollLeft??0;
  toolDrag.reset();
  selectedTool=null;
  guided.hidden=view!=='guided'; host.hidden=view==='guided';
  document.querySelectorAll('[data-workbench-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workbenchView===view)));
  if(view==='guided') return;
  const s=cases[view];
  host.innerHTML=`${setup(s)}${readings(s)}${tray(s)}<div class="ts-live-grid ${s.tool==='vfl'?'ts-tracing':''}"><section class="ts-map-card" aria-label="Visual test path"><div class="ts-section-top"><div><h2>Your test path</h2><p class="ts-note">${s.tool==='link'?s.disconnected?.length?'Connections unplugged · service path open':'Normal patching · health not confirmed':s.tool==='loop'?`Loop at ${pointName(s.selected)} · ${s.loops[s.selected]?loopLabels[s.loops[s.selected]]:'waiting for your result'}`:`VFL · ${traceName(s)}`}</p></div>${button('motion',paused?'Play arrows':'Pause arrows','class="motion-toggle"')}</div>${vflRouteControls(s)}
    <div class="ts-map ${paused?'light-paused':''}" tabindex="0" aria-label="Fiber diagram; scroll horizontally to see the full path">${workbenchDiagram(s)}</div>
    <div class="ts-legend"><span>↔ Scroll to follow the path</span><span class="ts-key-ir">Blue / teal: invisible IR</span><span class="ts-key-red">Red: VFL</span><span>Dashed: unverified / bypassed</span></div>
    ${s.tool==='vfl'?vflObservationControls(s):''}
    </section>
    <div class="ts-work-grid">${s.tool==='vfl'?'':controls(s)}${advice(s)}</div></div>${results(s)}`;
  if(preservePosition) host.querySelector('.ts-map').scrollLeft=scrollLeft;
  else centerMap();
}

function centerMap(focusPoint) {
  const s=cases[view],map=host.querySelector('.ts-map');
  if(!map) return;
  const scale=map.querySelector('svg').getBoundingClientRect().width/(270+(s.count+1)*290);
  const point=focusPoint??s.selected;
  map.scrollLeft=Math.max(0,(135+point*290)*scale-map.clientWidth/2);
}

document.querySelectorAll('[data-workbench-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.workbenchView;selectedTool=null;save();render();}));
host.addEventListener('change',event=>{
  const field=event.target.dataset.field;
  if(!field) return;
  const value=event.target.value,s=cases[view];
  const action=field==='vfl-from'?{type:'trace',from:value,to:s.selected}:field==='vfl-to'?{type:'trace',from:traceFrom(s),to:value}:field==='vfl-source-port'?{type:'port',point:traceFrom(s),value}:field==='ready'?{type:'ready',value:event.target.checked}:field==='point'?{type:'select',point:value}:
    ['tx','rx'].includes(field)?{type:'health',signal:field,value}:field.startsWith('fault-')?{type:'fault',value:{[field.slice(6)]:value}}:{type:field,value};
  update([action],['count','reach','port','vfl-source-port'].includes(field)?'Path updated. Previous test results cleared.':['vfl-from','vfl-to'].includes(field)?'Trace route updated. Confirm this setup before recording a result.':'');
  if(['vfl-from','vfl-to'].includes(field)) centerMap(Number(value));
  host.querySelector(`[data-field="${field}"]`)?.focus({preventScroll:true});
});
function choosePoint(point) {
  if(selectedTool) {placeTool(selectedTool,point,true);return;}
  if(cases[view].tool==='vfl') {
    if(point===traceFrom(cases[view])) {announce('The VFL starts here. Choose a different point to check for light.');return;}
    update([{type:'trace',from:traceFrom(cases[view]),to:point}],'Viewing point changed. Confirm the setup, then record what you see.');return;
  }
  if(cases[view].tool!=='link') {announce('To move a tool, drag its handle or select it from the tray.');return;}
  update([{type:'select',point}]);
  host.querySelector(`[data-point="${point}"]`)?.focus({preventScroll:true});
}
host.addEventListener('keydown',event=>{
  const point=event.target.closest('[data-point],[data-span]');
  if(point&&['Enter',' '].includes(event.key)){event.preventDefault();if(point.hasAttribute('data-span')){if(!selectedTool||selectedTool==='vfl')placeTool('vfl',Number(point.dataset.span));else announce('Place this loop on its matching hardware.');}else choosePoint(Number(point.dataset.point));}
});
host.addEventListener('click',async event=>{
  const span=event.target.closest('[data-span]');
  if(span){if(selectedTool&&selectedTool!=='vfl'){announce('This fiber section accepts a VFL. Place the loop on its matching hardware.');return;}placeTool('vfl',Number(span.dataset.span));return;}
  const point=event.target.closest('[data-point]');
  if(point){choosePoint(Number(point.dataset.point));return;}
  const target=event.target.closest('[data-action]');
  if(!target) return;
  const action=target.dataset.action,s=cases[view];
  if(action==='setup') {setupOpen=!setupOpen;render();return;}
  if(action==='normalize') {normalizeSetup();return;}
  if(action==='swap-trace') {update([{type:'trace',from:s.selected,to:traceFrom(s)}],'VFL direction reversed. Confirm the new setup before recording a result.');centerMap(traceFrom(cases[view]));host.querySelector('[data-action="swap-trace"]')?.focus({preventScroll:true});return;}
  if(action==='remove-tool'||action==='link') {removeTool();host.querySelector('[data-pick-tool]')?.focus({preventScroll:true});return;}
  if(action==='test-result') {host.querySelector('#test-title')?.focus({preventScroll:true});host.querySelector('.ts-vfl-observation, .ts-control-card')?.scrollIntoView({block:'start',behavior:'instant'});return;}
  if(action==='start-loop') {placeTool('lc',0);return;}
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
      ...Object.entries(s.traces).map(([id,r])=>{const {from,to,strand}=parseTraceKey(id);return `VFL ${fiberPointName(from)} → ${fiberPointName(to)} / ${strand.toUpperCase()}: ${traceLabels[r]}`;}),
      ...(!s.simulated&&s.service!=='unknown'?[`Restored link: ${s.service==='good'?'Required local readings and link normal':'Still has a problem'}`]:[]),
      a.title,a.why,`Next: ${a.next}`,'Remote and untested lanes remain unverified.'].join('\n');
    try {await navigator.clipboard.writeText(text);target.textContent='Copied';}
    catch {const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Findings to copy');host.querySelector('#ts-copy-fallback').replaceChildren(area);area.select();}
    return;
  }
  if(action==='undo') {if(undo[view].length){cases[view]=undo[view].pop();save();render();}}
  else if(action==='reset') {undo[view].push(s);cases[view]=createCase(s.simulated);save();render();}
  else if(['loop','vfl','link'].includes(action)) update([{type:'tool',tool:action}]);
  else if(action==='run') update([{type:'ready',value:true},{type:'record'}],'Simulated test recorded.');
  else if(action.startsWith('service-')) update([{type:'service',value:action.slice(8)}],'Restored link observation recorded.');
  else if(action.startsWith('result-')) update([...(s.tool==='loop'?[{type:'ready',value:true}]:[]),{type:'record',result:action.slice(7)}],'Observation recorded.');
  else if(action==='next') {const next=assessment(s).suggestion;if(next){if(next.tool==='link')normalizeSetup();else placeTool(next.tool==='vfl'?'vfl':next.point?'mmc':'lc',next.point);}}
  else if(action.startsWith('review-vfl-')) {const [,,from,to,strand]=action.split('-');update([{type:'trace',from,to},{type:'strand',value:strand}]);}
  else if(action.startsWith('review-loop-')) update([{type:'select',point:action.slice(12)},{type:'tool',tool:'loop'}]);
  if(s.tool==='vfl' && (action.startsWith('result-') || action==='run')) {
    centerMap();
    host.querySelector('.ts-map').scrollIntoView({block:'start',behavior:'instant'});
  }
  host.querySelector(`[data-action="${action}"]`)?.focus({preventScroll:true});
});
render();
