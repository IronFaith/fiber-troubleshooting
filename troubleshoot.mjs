import {translateLines} from './locale.mjs?v=15';
import {createCase,changeCase,assessment,faults,pointName,spanName,loopLabels,traceLabels,simulatedReadings,canPlaceTool,fiberPointName,traceFrom,traceName,traceKey,parseTraceKey,patchAt,traceStop,caseHistory,restoreCaseHistory,canVerifyService,caseStatus,nextCheckActions,pathCoverage,identityLabels,identityConfirmed,comparisonLabels,isOptic,loopSource,loopResult,loopEntries} from './troubleshoot-state.mjs?v=18';
import {workbenchDiagram} from './troubleshoot-visuals.mjs?v=20';
import {toolNames,toolArt,mountToolDrag} from './troubleshoot-tools.mjs?v=7';
import {mountPatchDrag} from './troubleshoot-patching.mjs?v=3';
import {simpleVfl} from './vfl-simple.mjs?v=16';
import {mmcLoopbackConnection} from './loop-visuals.mjs?v=4';

const host=document.querySelector('#troubleshoot-workbench');
const guided=document.querySelector('#guided-check');
const key='fiber-workbench-v1';
let view='actual', cases={actual:createCase(),simulation:createCase(true)};
let selectedTool=null,setupOpen=false,identityOpen=false,newCaseStarted=false;
let serviceCheckOpen=false;
let deferPortRender=false,portRenderPending=false;
const undo={actual:[],simulation:[]};
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options=(items,value)=>items.map(([id,label])=>`<option value="${escape(id)}" ${String(id)===String(value)?'selected':''}>${escape(label)}</option>`).join('');
const select=(field,label,items,value)=>`<label class="ts-field">${label}<select data-field="${field}">${options(items,value)}</select></label>`;
const button=(action,label,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
const statusLabels={unknown:'Not checked',good:'Light present',weak:'Weak / out of limits',dark:'−40 · no light reported'};
const faultNotes={
  none:'A clear example path. Test results still cover only the pair and section tested.',
  optic_tx:'The selected optic is not emitting in this example. VFL uses its own light source.',
  optic_rx:'The selected optic receiver fails in this example even though its TX still emits.',
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
  s=changeCase(s,{type:'reach',value:raw.endpointAccessVersion===1?raw.reach:raw.reach>=s.count?s.count+1:raw.reach});
  if(simulated && raw.fault) s=changeCase(s,{type:'fault',value:raw.fault});
  for(const signal of ['tx','rx']) s=changeCase(s,{type:'health',signal,value:raw[signal]});
  for(let p=0;p<=Math.min(s.reach,s.count);p++) {
    if(!Object.hasOwn(loopLabels,raw.loops?.[p])) continue;
    for(const action of [{type:'select',point:p},{type:'tool',tool:'loop'},{type:'ready',value:true},{type:'record',result:raw.loops[p]}]) s=changeCase(s,action);
  }
  if(s.reach===s.count+1) for(let p=s.count+1;p>=1;p--) {
    if(!Object.hasOwn(loopLabels,raw.remoteLoops?.[p])) continue;
    for(const action of [{type:'place',kind:isOptic(s,p)?'lc':'mmc',point:p},{type:'loop-side',value:'remote'},{type:'ready',value:true},{type:'record',result:raw.remoteLoops[p]}]) s=changeCase(s,action);
  }
  for(const [key,result] of Object.entries(raw.traces??{})) {
    const route=parseTraceKey(key);
    if(!route || route.from>s.reach || route.to>s.reach || !Object.hasOwn(traceLabels,result)) continue;
    s.traces[key]=result;
  }
  s=changeCase(s,{type:'select',point:raw.selected});
  s=changeCase(s,{type:'strand',value:raw.strand});
  s=changeCase(s,{type:'loop-side',value:raw.loopSide??'local'});
  const savedSource=raw.vflFrom??Math.max(0,raw.selected-1);
  const savedTool=raw.tool==='vfl'&&!canPlaceTool(s,'vfl',savedSource)?'link':raw.tool;
  s=changeCase(s,{type:'tool',tool:savedTool});
  if(savedTool==='vfl') s=changeCase(s,{type:'trace',from:savedSource,to:raw.selected});
  for(const [point,patch] of Object.entries(raw.patches??{})) {
    for(const side of ['rear','front']) if(typeof patch?.[side]==='boolean') {
      const validated=changeCase(s,{type:'patch',point,side,connected:patch[side],port:patch.port});
      s.patches=validated.patches;
    }
  }
  if(s.tool==='link' && Array.isArray(raw.disconnected)) s.disconnected=[...new Set(raw.disconnected.filter(p=>Number.isInteger(p)&&p>=0&&p<=s.reach))];
  s=restoreCaseHistory(s,raw);
  if(raw.vflPointChecks===true||s.tool==='vfl') s=changeCase(s,{type:'vfl-point-checks'});
  s.ready=raw.ready===true && Boolean(s.tool==='loop'?loopResult(s):s.tool==='vfl'&&!traceStop(s)?.blocked&&!traceStop(s)?.closed&&s.traces[traceKey(s)]);
  return changeCase(s,{type:'service',value:raw.service});
}
try {
  const saved=JSON.parse(sessionStorage.getItem(key));
  if(saved) {
    cases={actual:restore(saved.actual,false),simulation:restore(saved.simulation,true)};
    if(['actual','simulation','guided'].includes(saved.view)) view=saved.view;
  }
} catch { /* A fresh case is usable without storage. */ }
function save() { try {sessionStorage.setItem(key,JSON.stringify({...cases,view}));} catch { /* Optional. */ } }
function update(actions, message='',renderNow=true) {
  selectedTool=null;
  newCaseStarted=false;
  undo[view].push(cases[view]);
  if(undo[view].length>30) undo[view].shift();
  cases[view]=actions.reduce(changeCase,cases[view]);
  if(cases[view].tool==='vfl') cases[view]=changeCase(cases[view],{type:'vfl-point-checks'});
  save();
  if(renderNow) render(true); else portRenderPending=true;
  if(message) announce(message);
}
// Keep the tapped control at the same screen position when evidence above it
// changes height. Wait for display-only translation before restoring its offset.
function updateVflInPlace(actions,message,selector) {
  const top=host.querySelector(selector)?.getBoundingClientRect().top;
  update(actions,message);
  host.querySelector(selector)?.focus({preventScroll:true});
  if(top!==undefined) requestAnimationFrame(()=>{
    const control=host.querySelector(selector);
    if(control) window.scrollBy({top:control.getBoundingClientRect().top-top,behavior:'instant'});
  });
}
function chooseVflStrand(target) {
  const value=target.dataset.vflStrand;
  const surface=target.closest('.vfl-mobile')?'.vfl-mobile':'.vfl-desktop';
  updateVflInPlace([{type:'strand',value}],'',`${surface} [data-vfl-strand="${value}"]`);
}
function changeVflPort(port,selector) {
  const s=cases[view],point=traceStop(s)?.point;
  if(point===undefined||isOptic(s,point)) return;
  const patch=patchAt(s,point),side=traceFrom(s)<s.selected?'rear':'front';
  if(!Number.isInteger(port)||port<1||port>32) {
    host.querySelector('[data-field="vfl-patch-port"]').value=patch.port;
    announce('Choose a port from 1 to 32.');
    return;
  }
  if(port===patch.port) return;
  const actions=[{type:'patch',point,side,connected:patch[side],port}],message='Viewing port updated. Recheck this section.';
  // A blur commits the typed port before the following click. Keep its target
  // in the DOM until that click is handled, so changing CAS takes only one tap.
  if(deferPortRender) {update(actions,message,false);return;}
  updateVflInPlace(actions,message,selector);
  if(host.querySelector(selector)?.disabled) host.querySelector('[data-field="vfl-patch-port"]')?.focus({preventScroll:true});
}
function announce(message) {
  document.querySelector('#workbench-status').textContent=message;
  const hint=host.querySelector('#ts-tool-hint'); if(hint) hint.textContent=message;
}
function selectTool(kind) {
  selectedTool=kind;
  host.querySelectorAll('[data-pick-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pickTool===kind)));
  host.querySelectorAll('[data-point]').forEach(el=>{
    const point=Number(el.dataset.point);
    el.classList.toggle('ts-can-drop',Boolean(kind)&&canPlaceTool(cases[view],kind,point));
  });
  announce(kind?`${toolNames[kind]}: ${kind==='lc'?'drop on either optic.':kind==='mmc'?'drop on a reachable CAS.':'attach to disconnected local or remote LC legs, then choose where to check for light.'} You can also tap the target.`:'Drag a tool onto the path, or tap a tool then its target.');
}
function placeTool(kind,point,atSource=false,side) {
  if(!canPlaceTool(cases[view],kind,point)) {announce(kind==='vfl'?'Attach VFL only to disconnected LC legs. CAS and MMC are viewing points.':'That tool does not match this point. Choose a highlighted target.');return;}
  selectedTool=null;
  update([{type:'place',kind,point,atSource},...(side?[{type:'loop-side',value:side}]:[])],kind==='vfl'?'VFL placed. Choose its source and where you expect light, then enter your observation.':`${toolNames[kind]} placed. Enter the result you observed.`);
  host.querySelector('[data-action="test-result"]')?.focus({preventScroll:true});
  if(window.matchMedia('(max-width:700px)').matches) host.querySelector('.vfl-simple, .ts-map-card')?.scrollIntoView({block:'start',behavior:'instant'});
}
function removeTool() {
  update([{type:'remove'}],'Tool removed; connectors left unplugged. Results kept.');
}
function normalizeSetup() {
  update([{type:'normalize'}],'Setup normalized. Your recorded coverage stays on the path.');
  centerMap(0);
  host.querySelector('.ts-map-card')?.scrollIntoView({block:'start',behavior:'instant'});
}
const toolDrag=mountToolDrag(host,{select:selectTool,activate:kind=>kind==='vfl'&&canPlaceTool(cases[view],kind,cases[view].selected)?placeTool('vfl',cases[view].selected,true):selectTool(kind),place:placeTool,remove:removeTool,valid:(kind,point)=>canPlaceTool(cases[view],kind,point),announce,getSelected:()=>selectedTool});
function patchConnection(action) {
  update([action],`CAS ${action.point}: ${action.side} ${action.connected?'connected':'unplugged'}. Recheck the affected section.`);
  centerMap(action.point);
  centerPatch();
}
const patchDrag=mountPatchDrag(host,patchConnection,announce);

function tray(s) {
  if(s.tool==='vfl') return `<div class="ts-tool-tray vfl-active-tray" aria-label="Test tools"><b>VFL on fiber</b>${button('remove-tool','Remove VFL')}${button('normalize','Normalize')}</div>`;
  return `<div class="ts-tool-tray" aria-label="Test tools"><div class="ts-tool-items">${Object.entries(toolNames).map(([kind,name])=>`<button type="button" class="ts-tool-pick" data-pick-tool="${kind}" aria-pressed="${selectedTool===kind}" aria-label="Pick up ${name}">${toolArt(kind)}<span><b>${name}</b><small>${kind==='lc'?'At either optic':kind==='mmc'?'At a cassette':'Disconnected LC legs only'}</small></span></button>`).join('')}</div><div class="ts-tray-actions"><span>Drag a placed tool back here to remove.</span>${button('test-result','Enter result ↓',s.tool==='link'?'disabled':'')}${button('remove-tool','Remove tool',`class="ts-remove" aria-label="Remove placed tool" ${s.tool==='link'?'disabled':''}`)}${button('normalize','Normalize',`class="ts-normalize" ${s.tool==='link'&&!s.disconnected?.length?'disabled':''}`)}</div><p id="ts-tool-hint">Drag a tool onto the path, or tap a tool then its target.</p></div>`;
}

function setup(s) {
  const topology=select('count','Passives on path',[1,2,3,4].map(n=>[n,n]),s.count)+
    select('reach','I can reach',Array.from({length:s.count+2},(_,i)=>[i,i===0?'Local optic only':i===s.count+1?'Both devices + full path':`Through CAS ${i}`]),s.reach);
  if(!s.simulated) return `<section class="ts-path-settings" aria-label="Your path settings">${button('setup',`<span>Edit path · ${s.count} CAS</span><span class="ts-disclosure-arrow" aria-hidden="true"></span>`,`class="ts-disclosure" aria-expanded="${setupOpen}" aria-controls="ts-path-fields"`)}<div id="ts-path-fields" class="ts-setup" ${setupOpen?'':'hidden'}><div class="ts-fields">${topology}
    ${select('tx','Starting local TX',Object.entries(statusLabels),s.tx)}
    ${select('rx','Starting local RX',Object.entries({...statusLabels,good:'Within optic limits'}),s.rx)}</div>
    <p class="ts-note">Enter your observations. Nothing is connected to Cable Guy or live equipment. A −40 report tells us no light was reported, not the cause.</p></div></section>`;
  const f=s.fault;
  const opticOnly=f.kind.startsWith('optic_'), canAtOptic=['dirty','loose','none'].includes(f.kind);
  const locations=Array.from({length:s.count+2},(_,i)=>[i,i===0?'Optic face / LC socket':i===s.count+1?opticOnly?'Remote optic':`Beyond CAS ${s.count} → remote`:spanName(i,s)]).filter(([i])=>opticOnly?isOptic(s,i):canAtOptic||i>0);
  return `<section class="ts-setup ts-sim-setup" aria-label="Simulation setup"><div class="ts-mode-notice"><b>SIMULATION</b> Hypothetical results · no live measurements</div>
    <div class="ts-fields">${topology}${select('fault-kind','Choose a fault',Object.entries(faults),f.kind)}
    ${f.kind!=='none'?select('fault-at','Where?',locations,f.at):''}
    ${!opticOnly&&!['none','polarity'].includes(f.kind)?select('fault-strand','Affected strand',[['tx','Local TX → remote RX'],['rx','Remote TX → local RX'],['both','Both strands']],f.strand):''}
    ${['dirty','loose','ferrule','bend','splice'].includes(f.kind)?select('fault-severity','Example effect',[['dark','Blocks light'],['weak','Adds loss · weak light']],f.severity):''}</div>
    <p class="ts-note">${faultNotes[f.kind]} Effects are simplified; real results depend on the hardware, mapping and wavelength.</p></section>`;
}
function identityChecks(s) {
  if(s.simulated) return '';
  const help={optic:'Device IDs + optic sockets at the tested ends, e.g. 25/1 vs 25/5',fanout:'Follower number + head serial match the record',route:'Accessible CAS faces and ports match FIM',channels:'Expected fiber / channel at both test ends'};
  const count=Object.keys(identityLabels).filter(k=>s.identity?.[k]).length;
  return `<section class="ts-identity" aria-labelledby="identity-title"><h3>${button('identity',`<span>Match the physical path</span><b>${count}/4 confirmed</b><span class="ts-disclosure-arrow" aria-hidden="true"></span>`,`id="identity-title" class="ts-disclosure" aria-expanded="${identityOpen}" aria-controls="ts-identity-fields"`)}</h3><div id="ts-identity-fields" class="ts-identity-fields" ${identityOpen?'':'hidden'}>
    <p class="ts-note">${identityConfirmed(s)?'Identity checked by you for this round. This is separate from optical health.':'A pass belongs to the hardware tested. Confirm it is the intended path.'}</p>
    <div class="ts-identity-grid">${Object.entries(identityLabels).map(([key,label])=>`<label><input type="checkbox" data-field="identity-${key}" ${s.identity?.[key]?'checked':''}><span><b>${label}</b><small>${help[key]}</small></span></label>`).join('')}</div></div></section>`;
}
function setDisclosure(action,open) {
  if(action==='setup') setupOpen=open; else identityOpen=open;
  const toggle=host.querySelector(`[data-action="${action}"]`);
  toggle?.setAttribute('aria-expanded',String(open));
  const fields=host.querySelector(action==='setup'?'#ts-path-fields':'#ts-identity-fields');
  if(fields) fields.hidden=!open;
}
function diagnosticControls(a,s) {
  if(s.simulated) return '';
  return `${a.diagnostic?.options.length?`<div class="ts-comparison-options" role="group" aria-label="Record the comparison result">${a.diagnostic.options.map(([value,label])=>button('comparison',label,`data-check-key="${escape(a.diagnostic.key)}" data-check-step="${a.diagnostic.step}" data-check-value="${value}" aria-pressed="${s.comparisons?.[a.diagnostic.key]?.[a.diagnostic.step]===value}"`)).join('')}</div>`:''}
    ${a.needsIdentity?button('check-identity','Confirm path identity','class="ts-next-button"'):''}`;
}
function readings(s) {
  if(!s.simulated) return '';
  const r=simulatedReadings(s);
  const badge=(name,value)=>`<span class="ts-reading ${value}">${name}<b>${value==='good'?'Light present':value==='weak'?'Weak':'No light'}</b></span>`;
  return `<div class="ts-readings"><span>Expected with service path restored:</span>${badge('Local TX',r.tx)}${badge('Local RX',r.rx)}${badge('Remote TX',s.fault.kind==='optic_tx'&&s.fault.at===s.count+1?'dark':'good')}${badge('Remote RX',r.farRx)}<small>Simulated readings at both ends.</small></div>`;
}
function controls(s) {
  const point=s.selected, tool=s.tool;
  const hasResults=loopEntries(s).length+Object.keys(s.traces).length>0;
  const result=tool==='loop'?loopResult(s,point):s.traces[traceKey(s)];
  if(tool==='link' && s.disconnected?.length) return `<section class="ts-control-card" aria-labelledby="test-title"><h2 id="test-title" tabindex="-1">Reconnect the service path</h2><p class="ts-tool-caption">The tool is off. The highlighted LC legs or MMC heads are still unplugged.</p>${button('normalize','Normalize','class="ts-primary"')}<p class="ts-note">Reconnects the illustration and keeps recorded tests. Confirm the real connections before checking health.</p></section>`;
  if(tool==='link'&&canVerifyService(s)) return `<details class="ts-service-check" ${serviceCheckOpen?'open':''}><summary id="test-title"><span><b>Final check · normal operation</b><small>${s.service==='good'?'Yes · link working':s.service==='bad'?'No · still a problem':'Use after reconnecting the real service path.'}</small></span></summary><div class="ts-service-body"><p>A loop or VFL pass checks only part of the connection. This final check confirms whether the devices communicate after the tools are removed.</p><p>Reconnect the mapped path. Check current TX/RX against the optic limits and confirm link status at the accessible devices.</p><div class="ts-result-buttons">${button('service-good','Yes · link working',`aria-pressed="${s.service==='good'}"`)}${button('service-bad','No · still a problem',`aria-pressed="${s.service==='bad'}"`)}</div><p class="ts-note">Not ready? Keep testing; this check is optional until you finish.</p></div></details>`;
  if(tool==='link') return `<section class="ts-control-card" aria-labelledby="test-title"><h2 id="test-title" tabindex="-1">${hasResults?'Choose the next test':'Place your first test'}</h2>${hasResults?'<p class="ts-tool-caption">Place a tool for your next check. Earlier observations stay on the path and in Case history.</p>':'<p class="ts-tool-caption">Drag LC onto either optic to start. At a cassette, choose the optic under test. Earlier findings stay in this case.</p>'}</section>`;
  const labels=tool==='loop'?{pass:'Yes · passes',dark:'No · no return light',weak:'Light returns, but weak'}:traceLabels;
  return `<section class="ts-control-card" aria-labelledby="test-title"><div class="ts-section-top"><div><p class="ts-test-location">${tool==='vfl'?'VFL':isOptic(s,point)?'LC loopback':'MMC loopback'} · ${tool==='vfl'?traceName(s):pointName(point,s)}</p><h2 id="test-title" tabindex="-1">${tool==='loop'?'Does the loop pass?':`What did you see at ${fiberPointName(point,s)}?`}</h2></div>${button('link','Remove tool','class="ts-remove"')}</div>
    <div class="ts-fields">${tool==='loop'&&!isOptic(s,point)&&s.reach===s.count+1?select('loop-side','Optic under test',[['local','Local optic'],['remote','Remote optic']],s.loopSide):''}${!isOptic(s,point)?select('port',`CAS ${point} ${tool==='vfl'?'expected':'mapped'} port`,Array.from({length:32},(_,i)=>[i+1,i+1]),s.ports[point-1]):''}</div>
    ${tool==='loop'?`<p class="ts-loop-context"><b>${isOptic(s,point)?`${pointName(point,s)} · TX → loop → RX`:`Light path: ${pointName(loopSource(s),s)} → ${pointName(point,s)} → ${pointName(loopSource(s),s)}`}</b><span>${isOptic(s,point)?'Direct loop · external fiber bypassed':`Loop faces ${pointName(loopSource(s),s)}. Read returning RX at that device.`}</span></p>`:''}
    ${tool==='loop'&&!isOptic(s,point)?`<svg class="ts-loop-closeup" viewBox="0 0 360 140" role="img" aria-label="MMC loopback">${mmcLoopbackConnection(`CAS ${point}`,s.ports[point-1])}</svg>`:''}
    <p class="ts-tool-caption">${tool==='loop'?'Use the correct loop mapping and required attenuation. Check TX and returning RX against this optic’s limits.':`The VFL supplies red light at ${fiberPointName(traceFrom(s),s)}. Check the isolated fiber end at ${fiberPointName(point,s)}. ${traceFrom(s)===0||point===0?'The optic-side LC leg is unplugged; the optic itself is not part of this trace.':''}`}</p>
    ${tool==='vfl'?select('strand','Strand to trace',[['tx','Normally local TX → remote RX'],['rx','Normally remote TX → local RX']],s.strand):''}
    ${s.simulated?'<p class="ts-prepared">Practice only · results come from the chosen fault.</p>':tool==='vfl'?`<label class="ts-ready"><input type="checkbox" data-field="ready" ${s.ready?'checked':''}><span>The test fiber is disconnected from the optics; VFL is attached to an LC leg.</span></label>`:''}
    <div class="ts-result-buttons">${s.simulated?button('run','Run this test','class="ts-primary"'):Object.entries(labels).map(([value,label])=>button(`result-${value}`,label,`aria-pressed="${result===value}" ${tool==='vfl'&&!s.ready?'disabled':''}`)).join('')}</div>
    ${result?`<p class="ts-recorded">${s.simulated?'Simulated':'You recorded'}: <b>${tool==='loop'?loopLabels[result]:traceLabels[result]}</b></p>`:'<p class="ts-note">Placing the tool does not record a pass.</p>'}</section>`;
}
function caseBar(s) {
  const status=caseStatus(s);
  return `<section class="ts-case-bar" aria-label="Case progress"><div><b>${s.simulated?'Practice · ':''}${status.label}</b><span>${status.count} current ${status.count===1?'check':'checks'} · Round ${s.round}</span></div><ol>${['Set up','Test','Isolate','Verify'].map((label,i)=>`<li class="${i===status.stage?'active':i<status.stage?'done':''}" ${i===status.stage?'aria-current="step"':''}><span>${i+1}</span>${label}</li>`).join('')}</ol></section>`;
}
function advice(s) {
  const a=assessment(s);
  const pending=s.tool!=='link'&&(!s.ready || (s.tool==='loop'?!loopResult(s):!s.traces[traceKey(s)]));
  const hasEvidence=loopEntries(s).length+Object.keys(s.traces).length>0;
  const waiting=pending&&!hasEvidence&&!traceStop(s)?.blocked&&!traceStop(s)?.closed;
  const title=waiting?'Ready for your first result':a.title;
  const why=waiting?(s.tool==='loop'?'Compare TX and returning RX with the optic’s limits.':'The red glow illustrates the expected path. Record what you actually see on the selected strand.'):a.why;
  const areaPoint=point=>a.issue==='loop'?pointName(point,s):fiberPointName(point,s);
  const nextLabel=a.check?.label??(a.suggestion?.tool==='loop'?`Next: ${isOptic(s,a.suggestion.point)?'LC':'MMC'} loop at ${pointName(a.suggestion.point,s)}`:a.suggestion?.tool==='vfl'?`VFL from ${a.suggestion.side==='remote'?'Remote LC legs':'Local LC legs'} → ${fiberPointName(a.suggestion.point,s)}`:'Normalize');
  return `<section class="ts-advice ${waiting?'':a.tone}" aria-labelledby="finding-title"><p class="ts-eyebrow">${s.simulated?'Simulated findings':'Case findings'}${a.route?` · ${escape(a.route)}`:''}</p><h2 id="finding-title" tabindex="-1">${title}</h2>
    ${a.pair?`<div class="ts-evidence-pair" aria-label="Recorded strand comparison">${a.pair.map(r=>`<div class="${['dark','wrong','weak'].includes(r.result)?'issue':r.result?'recorded':'untested'}"><b>VFL on ${r.strand}</b><span>${r.label}</span></div>`).join('')}</div>`:''}
    ${a.evidencePath?`<div class="ts-evidence-path" aria-label="Section to investigate"><span>${a.evidencePath[0]}</span><b aria-hidden="true">→</b><span>${a.evidencePath[1]}</span></div>`:''}
    ${!a.evidencePath&&a.tone==='suspect'&&a.from!==null&&a.to!==null?`<div class="ts-evidence-path ts-suspect-area" aria-label="Section to investigate"><span>${areaPoint(a.from)}</span>${a.from!==a.to?`<b aria-hidden="true">→</b><span>${areaPoint(a.to)}</span>`:''}</div>`:''}
    <p class="ts-finding-evidence">${a.comparisonFinding??why}</p>
    ${!waiting&&a.causes.length?`<div class="ts-causes"><b>Possible causes to check</b><ul>${a.causes.map(c=>`<li>${c.label}</li>`).join('')}</ul></div>`:''}
    ${a.caution?`<p class="ts-caution">${a.caution}</p>`:''}
    ${waiting?'':`<div class="ts-next"><b>${a.complete?'Verified by your confirmation':'Next check'}</b><p>${a.next}</p>
    ${a.check||a.suggestion?button('next',nextLabel,'class="ts-next-button"'):''}${diagnosticControls(a,s)}</div>
    ${a.branches?`<div class="ts-check-branches" aria-label="How the next result guides you">${a.branches.map(([condition,meaning])=>`<div><b>↳ ${condition}</b><span>${meaning}</span></div>`).join('')}</div>`:''}`}
    ${pending&&hasEvidence?'<p class="ts-note">Current setup: waiting for a new result. Earlier findings stay visible.</p>':''}
    ${a.otherIssues?`<p class="ts-note">${a.otherIssues} other recorded ${a.otherIssues===1?'issue':'issues'} remain in this case.</p>`:''}
    ${hasEvidence?`<details class="ts-finding-details"><summary>Evidence details & references</summary>${a.comparisonFinding?`<p>${why}</p>`:''}${a.scope?`<p>${a.scope}</p>`:''}${a.isolation?`<p><b>${a.isolation.strand==='tx'?'A':'B'}</b> · <span>${a.isolation.label}</span></p>`:''}${!a.complete?'<p>Only the recorded source, pair and section are checked. Untested parts and the live link remain unverified.</p>':''}<p class="ts-sources"><a href="https://www.usconec.com/connectors/mmc-connectors" target="_blank" rel="noopener noreferrer">MMC ferrule</a> · <a href="https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber" target="_blank" rel="noopener noreferrer">Fiber testing</a> · <a href="https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html" target="_blank" rel="noopener noreferrer">Optical readings</a></p></details>`:''}
  </section>`;
}
function historyLabel(e) {
  const topology={count:e.count??e.ports?.length??cases[view].count};
  if(e.kind==='identity') return `Identity · ${identityLabels[e.key]}`;
  if(e.kind==='comparison') {const [key,step]=e.key.split('~');return `${historyLabel({...e,kind:'vfl',key})} · ${step==='source'?'VFL reference':step==='inspection'?'End-face inspection':'Compatible replacement'}`;}
  if(e.kind==='loop') return `${e.source==='remote'?'Remote loop':'Local loop'} · ${pointName(Number(e.key),topology)}${!isOptic(topology,Number(e.key))&&e.ports?.[Number(e.key)-1]?` · Port ${e.ports[Number(e.key)-1]}`:''}`;
  const r=parseTraceKey(e.key);
  return `VFL ${fiberPointName(r.from,topology)} → ${fiberPointName(r.to,topology)}${r.head?' · loose head':''}${e.port?` · port ${e.port}`:''} · strand ${r.strand==='tx'?'A':'B'}`;
}
function historyResult(e) {
  if(e.kind==='identity') return e.result==='confirmed'?'Confirmed by you':'Needs confirmation';
  if(e.kind==='comparison') return comparisonLabels[e.key.split('~')[1]][e.result];
  if(e.kind==='loop') return loopLabels[e.result];
  const strand=parseTraceKey(e.key).strand;
  return e.result==='seen'?`Light at ${strand==='tx'?'A':'B'}`:e.result==='swapped'?`Light at ${strand==='tx'?'B':'A'}`:traceLabels[e.result];
}
function results(s) {
  const history=caseHistory(s).reverse();
  const reviewAction=e=>{if(e.kind==='loop')return `review-loop-${e.key}-${e.source??'local'}`;const r=parseTraceKey(e.key);return `review-vfl-${r.from}-${r.to}-${r.strand}${r.head?'-head':''}`;};
  const entries=history.map(e=>`<li class="ts-history-entry ${e.current?'current':'earlier'}"><span class="ts-history-state">${e.current?'Current':'Earlier'} · round ${e.round}</span><span>${e.current&&['loop','vfl'].includes(e.kind)?button(reviewAction(e),escape(historyLabel(e)),'class="ts-history-review"'):escape(historyLabel(e))}</span><b>${historyResult(e)}</b></li>`).join('');
  return `<section class="ts-log" aria-label="Recorded tests"><div class="ts-section-top"><h3>${s.simulated?'Practice':'Case'} history</h3><div class="ts-small-actions">${button('undo','Undo',undo[view].length?'':'disabled')}${button('retest','Made a change · retest',history.length?'':'disabled')}${button('copy','Copy findings')}${button('reset','New case')}</div></div>
    ${history.length?`<ol class="ts-history-list">${entries}</ol>`:'<p class="ts-note">No tests recorded. Place a tool, then enter the result you observed.</p>'}
    <p class="ts-note">Saved in this browser tab · up to 100 checks. Retest keeps earlier checks and starts fresh findings.</p><div id="ts-copy-fallback"></div></section>`;
}
function mobileActions(s) {
  if(s.tool==='vfl') return '';
  const a=assessment(s), recorded=s.tool==='loop'?loopResult(s):s.tool==='vfl'?s.traces[traceKey(s)]:null;
  const action=s.tool!=='link'&&(!recorded||!s.ready)?'test-result':s.tool==='link'&&s.disconnected?.length?'normalize':recorded?'findings':a.check||a.suggestion?'next':'findings';
  const label=action==='test-result'?'Record result':action==='normalize'?'Normalize':action==='next'?'Next check':'See findings';
  const context=s.tool==='vfl'?`VFL · check ${fiberPointName(s.selected,s)}`:s.tool==='loop'?`${s.loopSide==='remote'?'Remote loop':'Local loop'} · ${pointName(s.selected,s)} · ${recorded?loopLabels[recorded]:'loop placed'}`:'Choose a test, then record what you find';
  return `<nav class="ts-mobile-actions" aria-label="Current test actions"><span>${context}</span><div>${button('view-test','View path')}${button(action,label,'class="ts-mobile-primary"')}</div></nav>`;
}
function mobilePoints(s) {
  const coverage=pathCoverage(s),focused=s.tool==='link'?0:s.selected;
  const mark=point=>coverage.points[point]?.issue?' !':coverage.points[point]?.loop==='pass'?' ✓':'';
  return `<nav class="ts-point-picker" aria-label="View a point on the path">${Array.from({length:s.count+2},(_,point)=>button(`focus-point-${point}`,`<span>${point===0?'Optic':point===s.count+1?'Remote':`CAS ${point}`}</span><span>${mark(point)}</span>`,`aria-pressed="${point===focused}"`)).join('')}</nav>`;
}
function render(preservePosition=false) {
  portRenderPending=false;
  const scrollLeft=host.querySelector('.ts-map')?.scrollLeft??0;
  const patchScroll=host.querySelector('.ts-patch-scroll')?.scrollLeft??0;
  toolDrag.reset();
  patchDrag.reset();
  selectedTool=null;
  guided.hidden=view!=='guided'; host.hidden=view==='guided';
  document.querySelectorAll('[data-workbench-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workbenchView===view)));
  if(view==='guided') return;
  const s=cases[view];
  if(s.tool==='vfl') {
    host.innerHTML=`${setup(s)}${caseBar(s)}${identityChecks(s)}${readings(s)}${tray(s)}${simpleVfl(s,paused)}${advice(s)}${results(s)}${mobileActions(s)}`;
    return;
  }
  const freshCase=newCaseStarted?`<section class="ts-new-case" aria-labelledby="new-case-title"><div role="status"><h2 id="new-case-title" tabindex="-1">New case started</h2><p>Choose your path, then place a tool to begin.</p></div>${button('undo','Undo')}</section>`:'';
  host.innerHTML=`${freshCase}${setup(s)}${caseBar(s)}${identityChecks(s)}${readings(s)}${tray(s)}<div class="ts-live-grid"><section class="ts-map-card" aria-label="Visual test path"><div class="ts-section-top"><div><h2>Your test path</h2><p class="ts-note">${s.tool==='link'?s.disconnected?.length?'Connections unplugged · service path open':'Normalized · recorded test coverage':`${s.loopSide==='remote'?'Remote loop':'Local loop'} at ${pointName(s.selected,s)} · ${loopResult(s)?loopLabels[loopResult(s)]:'waiting for your result'}`}</p></div>${button('motion',paused?'Play arrows':'Pause arrows','class="motion-toggle"')}</div>
    ${mobilePoints(s)}<div class="ts-map ${paused?'light-paused':''}" tabindex="0" aria-label="Fiber diagram; scroll horizontally to see the full path">${workbenchDiagram(s)}</div>
    <div class="ts-legend"><span>↔ Scroll to follow the path</span>${s.tool==='link'&&!s.simulated?'<span class="ts-key-ir">Blue / teal: loop checked</span><span class="ts-key-red">Red: VFL continuity recorded</span><span>Amber: investigate · dashed: untested</span><span>A = local TX → remote RX · B = remote TX → local RX</span>':'<span class="ts-key-ir">Blue / teal: invisible IR</span><span class="ts-key-red">Red: VFL</span><span>Dashed: unverified / bypassed</span>'}</div>
    </section>
    <div class="ts-work-grid">${controls(s)}${advice(s)}</div></div>${results(s)}${mobileActions(s)}`;
  if(preservePosition) host.querySelector('.ts-map').scrollLeft=scrollLeft;
  else centerMap();
  if(window.matchMedia('(max-width:700px)').matches) centerMap(s.tool==='link'?0:s.selected);
  if(preservePosition&&host.querySelector('.ts-patch-scroll'))host.querySelector('.ts-patch-scroll').scrollLeft=patchScroll;
}

function showFindings() {
  host.querySelector('.ts-advice')?.scrollIntoView({block:'start',behavior:'instant'});
  host.querySelector('#finding-title')?.focus({preventScroll:true});
}
function centerMap(focusPoint) {
  const s=cases[view],map=host.querySelector('.ts-map');
  if(!map) return;
  const scale=map.querySelector('svg').getBoundingClientRect().width/(270+(s.count+1)*290);
  const point=focusPoint??s.selected;
  map.scrollLeft=Math.max(0,(135+point*290)*scale-map.clientWidth/2);
}
function centerPatch() {
  const panel=host.querySelector('.ts-patch-scroll'),stop=traceStop(cases[view]);
  if(!panel||!stop)return;
  const target=panel.querySelector(stop.kind==='head'?'[data-patch-head]':`[data-port="${stop.port}"]`);
  if(!target)return;
  const box=panel.getBoundingClientRect(),rect=target.getBoundingClientRect();
  panel.scrollLeft+=rect.left+rect.width/2-box.left-panel.clientWidth/2;
}

document.querySelectorAll('[data-workbench-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.workbenchView;selectedTool=null;newCaseStarted=false;save();render();}));
document.addEventListener('pointerdown',event=>{
  const input=host.querySelector('[data-field="vfl-patch-port"]');
  deferPortRender=Boolean(input&&document.activeElement===input&&event.target!==input);
},true);
function flushPortEdit() {deferPortRender=false;if(portRenderPending) render(true);}
document.addEventListener('click',flushPortEdit);
document.addEventListener('pointercancel',flushPortEdit);
host.addEventListener('change',event=>{
  const field=event.target.dataset.field;
  if(!field) return;
  const value=event.target.value,s=cases[view];
  if(field.startsWith('identity-')) {update([{type:'identity',key:field.slice(9),value:event.target.checked}],'Path identity updated. Optical observations are unchanged.');host.querySelector(`[data-field="${field}"]`)?.focus({preventScroll:true});return;}
  if(field==='vfl-patch-port') {changeVflPort(Number(value),'[data-field="vfl-patch-port"]');return;}
  if(field==='patch-port') {patchConnection({type:'patch',point:Number(event.target.dataset.patchPoint),side:event.target.dataset.patchSide,connected:true,port:Number(value)});host.querySelector('[data-field="patch-port"]')?.focus({preventScroll:true});return;}
  const action=field==='vfl-from'?{type:'trace',from:value,to:s.selected}:field==='ready'?{type:'ready',value:event.target.checked}:field==='point'?{type:'select',point:value}:
    ['tx','rx'].includes(field)?{type:'health',signal:field,value}:field.startsWith('fault-')?{type:'fault',value:{[field.slice(6)]:value}}:{type:field,value};
  update([action],['count','reach','port'].includes(field)?'Path updated. Earlier checks kept in history; current findings cleared.':field==='vfl-from'?'Trace route updated. Confirm this setup before recording a result.':'');
  if(field==='vfl-from') centerMap(Number(value));
  host.querySelector(`[data-field="${field}"]`)?.focus({preventScroll:true});
});
host.addEventListener('toggle',event=>{if(host.contains(event.target)&&event.target.matches('.ts-service-check')) serviceCheckOpen=event.target.open;},true);
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
  if(event.target.dataset.field==='vfl-patch-port'&&['Enter','Tab'].includes(event.key)) {
    deferPortRender=false;
    if(event.key==='Enter') event.preventDefault();
    changeVflPort(Number(event.target.value),'[data-field="vfl-patch-port"]');
    return;
  }
  const strand=event.target.closest('[data-vfl-strand]');
  if(strand&&strand.tagName.toLowerCase()!=='button'&&['Enter',' '].includes(event.key)){event.preventDefault();chooseVflStrand(strand);return;}
  const patch=event.target.closest('[data-patch-point]');
  if(patch&&['Enter',' '].includes(event.key)&&patch.tagName.toLowerCase()!=='button'&&patch.tagName.toLowerCase()!=='select') {event.preventDefault();patchConnection({type:'patch',point:Number(patch.dataset.patchPoint),side:patch.dataset.patchSide,connected:patch.dataset.patchConnected==='true',...(patch.dataset.patchPort?{port:Number(patch.dataset.patchPort)}:{})});return;}
  const point=event.target.closest('[data-point]');
  if(point&&['Enter',' '].includes(event.key)){event.preventDefault();choosePoint(Number(point.dataset.point));}
});
host.addEventListener('click',async event=>{
  deferPortRender=false;
  const strand=event.target.closest('[data-vfl-strand]');
  if(strand){chooseVflStrand(strand);return;}
  const patch=event.target.closest('[data-patch-connected]');
  if(patch){patchConnection({type:'patch',point:Number(patch.dataset.patchPoint),side:patch.dataset.patchSide,connected:patch.dataset.patchConnected==='true',...(patch.dataset.patchPort?{port:Number(patch.dataset.patchPort)}:{})});return;}
  const point=event.target.closest('[data-point]');
  if(point){choosePoint(Number(point.dataset.point));return;}
  const target=event.target.closest('[data-action]');
  if(!target) return;
  const action=target.dataset.action,s=cases[view];
  if(action.startsWith('vfl-view-')) {
    const point=Number(action.slice(9));
    if(point!==s.selected) updateVflInPlace([{type:'trace',from:traceFrom(s),to:point}],'Viewing point changed. Confirm the setup, then record what you see.',`[data-action="${action}"]`);
    return;
  }
  if(action.startsWith('vfl-port-')) {
    const point=traceStop(s).point,port=patchAt(s,point).port;
    changeVflPort(action==='vfl-port-fim'?s.ports[point-1]:port+(action==='vfl-port-plus'?1:-1),action==='vfl-port-fim'?'[data-field="vfl-patch-port"]':`[data-action="${action}"]`);
    return;
  }
  if(action.startsWith('focus-point-')) {
    const point=Number(action.slice(12));
    if(selectedTool) {placeTool(selectedTool,point,true);return;}
    centerMap(point);
    host.querySelectorAll('.ts-point-picker button').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));
    return;
  }
  if(action==='view-test') {
    centerMap(s.tool==='link'?0:s.selected);
    const target=host.querySelector('.vfl-view, .ts-map-card');
    target?.scrollIntoView({block:'start',behavior:'instant'});
    return;
  }
  if(action==='findings') {showFindings();return;}
  if(action==='check-identity') {setDisclosure('identity',true);host.querySelector('.ts-identity')?.scrollIntoView({block:'start',behavior:'instant'});host.querySelector('#identity-title')?.focus({preventScroll:true});return;}
  if(action==='comparison') {update([{type:'comparison',key:target.dataset.checkKey,step:target.dataset.checkStep,value:target.dataset.checkValue}],'Comparison recorded for this route and strand.');showFindings();return;}
  if(action==='setup'||action==='identity') {setDisclosure(action,!(action==='setup'?setupOpen:identityOpen));return;}
  if(action==='normalize') {normalizeSetup();return;}
  if(action==='check-opening') {update([{type:'trace',from:traceFrom(s),to:traceStop(s).point}],'Check the open end here, then enter your observation.');centerMap();return;}
  if(action==='swap-trace') {update([{type:'trace',from:s.selected,to:traceFrom(s)}],'VFL direction reversed. Confirm the new setup before recording a result.');centerMap(traceFrom(cases[view]));host.querySelector('[data-action="swap-trace"]')?.focus({preventScroll:true});return;}
  if(action==='remove-tool'||action==='link') {removeTool();host.querySelector('[data-pick-tool]')?.focus({preventScroll:true});return;}
  if(action==='test-result') {host.querySelector('#test-title')?.focus({preventScroll:true});host.querySelector('.vfl-observe, .ts-control-card')?.scrollIntoView({block:'start',behavior:'instant'});return;}
  if(action==='start-loop') {placeTool('lc',0);return;}
  if(action==='motion') {
    paused=!paused;host.querySelectorAll('.ts-map,.vfl-view').forEach(el=>el.classList.toggle('light-paused',paused));target.textContent=paused?'Play arrows':'Pause arrows';return;
  }
  if(action==='show-path') {centerMap();host.querySelector('.ts-map-card').scrollIntoView({block:'start',behavior:'instant'});host.querySelector('.ts-map').focus({preventScroll:true});return;}
  if(action==='copy') {
    const a=assessment(s);
    const text=translateLines([s.simulated?'SIMULATED FIBER CASE':'FIBER OBSERVATIONS — entered manually',`Reach: ${pointName(s.reach,s)}; ${s.count} passives on path`,
      `Mapped ports: ${s.ports.slice(0,s.count).map((p,i)=>`CAS ${i+1} / ${p}`).join(', ')}`,
      ...(!s.simulated?[`Starting local TX: ${statusLabels[s.tx]}; RX: ${s.rx==='good'?'Within optic limits':statusLabels[s.rx]}`]:[`Fault: ${faults[s.fault.kind]}; section ${s.fault.at}`]),
      `Case: ${caseStatus(s).label}; round ${s.round}`,
      ...Object.entries(identityLabels).map(([key,label])=>`IDENTITY: ${label} — ${s.identity?.[key]?'confirmed by technician':'not confirmed'}`),
      ...caseHistory(s).filter(e=>e.current).map(e=>`CURRENT: ${historyLabel(e)} — ${historyResult(e)}`),
      ...Object.entries(s.patches??{}).map(([point,p])=>`Diagram CAS ${point}: port ${p.port}; rear ${patchAt(s,Number(point)).rear?'connected':'unplugged'}, front ${patchAt(s,Number(point)).front?'connected':'unplugged'}`),
      ...(!s.simulated&&s.service!=='unknown'?[`Restored link: ${s.service==='good'?'Required readings and link normal':'Still has a problem'}`]:[]),
      ...caseHistory(s).filter(e=>!e.current).map(e=>`EARLIER round ${e.round}: ${historyLabel(e)} — ${historyResult(e)}`),
      a.title,a.why,...(a.scope?[a.scope]:[]),...(a.comparisonFinding?[a.comparisonFinding]:[]),...(a.causes.length?['Possible causes to check',...a.causes.map(c=>c.label)]:[]),`Next: ${a.next}`,'Only the recorded source, pair and section are checked. Untested parts and the live link remain unverified.'].join('\n'));
    try {await navigator.clipboard.writeText(text);target.textContent='Copied';}
    catch {const area=document.createElement('textarea');area.value=text;area.readOnly=true;area.setAttribute('aria-label','Findings to copy');host.querySelector('#ts-copy-fallback').replaceChildren(area);area.select();}
    return;
  }
  if(action==='undo') {if(undo[view].length){const wasNewCase=newCaseStarted;newCaseStarted=false;cases[view]=undo[view].pop();save();render();if(wasNewCase){host.querySelector('.vfl-simple, .ts-map-card')?.scrollIntoView({block:'start',behavior:'instant'});host.querySelector('#test-title')?.focus({preventScroll:true});return;}}}
  else if(action==='retest') {update([{type:'retest'}],'Retest started. Earlier checks kept; enter fresh results after your change.');host.querySelector('#test-title')?.focus({preventScroll:true});}
  else if(action==='reset') {
    undo[view].push(s);
    if(undo[view].length>30) undo[view].shift();
    cases[view]=createCase(s.simulated);
    newCaseStarted=true;setupOpen=true;identityOpen=false;serviceCheckOpen=false;
    save();render();
    host.querySelector('.ts-new-case')?.scrollIntoView({block:'start',behavior:'instant'});
    host.querySelector('#new-case-title')?.focus({preventScroll:true});
    return;
  }
  else if(['loop','vfl','link'].includes(action)) update([{type:'tool',tool:action}]);
  else if(action.startsWith('service-')) {serviceCheckOpen=false;update([{type:'service',value:action.slice(8)}],'Restored link observation recorded.');showFindings();}
  else if(action==='run'||action.startsWith('result-')) {
    const actions=[...(s.tool==='vfl'&&traceStop(s).blocked?[{type:'trace',from:traceFrom(s),to:traceStop(s).point}]:[]),{type:'ready',value:true},{type:'record',...(action==='run'?{}:{result:action.slice(7)})}];
    const message=action==='run'?'Simulated test recorded.':'Observation recorded.';
    if(s.tool==='vfl') {updateVflInPlace(actions,message,`.vfl-observe [data-action="${action}"]`);return;}
    update(actions,message);
  }
  else if(action==='next') {const actions=nextCheckActions(s),next=assessment(s).suggestion;if(actions.length){update(actions,'Next check set up in the diagram. Match the real setup, then record your result.');host.querySelector('.vfl-observe')?.scrollIntoView({block:'start',behavior:'instant'});host.querySelector('#test-title')?.focus({preventScroll:true});return;}if(next){if(next.tool==='link')normalizeSetup();else if(next.tool==='vfl'){update([{type:'trace',from:next.side==='remote'?s.count+1:0,to:next.point}],'VFL placed. Choose its source and where you expect light, then enter your observation.');host.querySelector('.vfl-simple')?.scrollIntoView({block:'start',behavior:'instant'});}else placeTool(isOptic(s,next.point)?'lc':'mmc',next.point,false,next.side);}}
  else if(action.startsWith('review-vfl-')) {const [,,from,to,strand,head]=action.split('-');const review=[{type:'trace',from,to},{type:'strand',value:strand}];update(review);if(Boolean(head)!==(traceStop(cases[view])?.kind==='head'))announce('The connections changed. Set up this recorded test again before rechecking.');}
  else if(action.startsWith('review-loop-')) {const [,,point,side]=action.split('-');update([{type:'place',kind:isOptic(s,Number(point))?'lc':'mmc',point:Number(point)},{type:'loop-side',value:side??'local'}]);}
  if(action.startsWith('result-') || action==='run' || action.startsWith('service-')) {showFindings();return;}
  host.querySelector(`[data-action="${action}"]`)?.focus({preventScroll:true});
});
render();
