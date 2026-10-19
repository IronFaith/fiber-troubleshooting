// One illustrative duplex pair. Results entered by a person are never inferred
// from placing a test tool. Simulation is a separate, deliberately simplified case.
export const faults = {
  none: 'No fault', optic_tx: 'Optic · TX not emitting', optic_rx: 'Optic · RX not receiving',
  dirty: 'Dirty connection', loose: 'Loose connection', ferrule: 'Damaged MMC ferrule',
  break: 'Broken fiber', bend: 'Tight bend / pinch', misport: 'Misport',
  polarity: 'Polarity swapped', splice: 'Poor splice'
};
export const loopLabels = { pass: 'Pass', weak: 'Weak return', dark: 'No return light' };
export const traceLabels = { seen: 'Expected port + strand', wrong: 'Different port', swapped: 'Other strand', dark: 'No light seen' };
export const pointName = point => point === 0 ? 'Local optic' : `CAS ${point}`;
export const spanName = point => `${pointName(point - 1)} → CAS ${point}`;
export const fiberPointName = point => point === 0 ? 'Optic-side LC leg' : pointName(point);
export const traceFrom = state => state.vflFrom ?? Math.max(0,state.selected-1);
export const traceName = state => `${fiberPointName(traceFrom(state))} → ${fiberPointName(state.selected)}`;
// Keep adjacent legacy keys so existing saved observations still belong to
// exactly the same section. Longer / reverse routes include both endpoints.
export const traceKey = state => `${traceFrom(state)===state.selected-1?'':`${traceFrom(state)}>`}${state.selected}:${state.strand}${traceStop(state)?.kind==='head'?':head':''}`;
export function parseTraceKey(key) {
  const match=/^(?:(\d+)>)?(\d+):(tx|rx)(:head)?$/.exec(key);
  if(!match) return null;
  const to=Number(match[2]),from=match[1]===undefined?to-1:Number(match[1]);
  return from<0 || from===to ? null : {from,to,strand:match[3],...(match[4]?{head:true}:{})};
}
const validTrace = (state,from,to) => [from,to].every(p=>Number.isInteger(p)&&p>=0&&p<=state.reach) && from!==to;

export function createCase(simulated = false) {
  return { simulated, started:false, round:1, history:[], count: 2, reach: 2, selected: 0, ports: [12,12,12,12], tool: 'link',
    strand: 'tx', vflFrom:0, ready: false, loops: {}, traces: {}, tx: 'unknown', rx: 'unknown', service:'unknown', disconnected:[], patches:{},
    fault: { kind: 'break', at: 2, strand: 'tx', severity: 'dark' } };
}
const bounded = (value, min, max) => Math.max(min, Math.min(max, Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : min));
const affects = (fault, strand) => fault.strand === 'both' || fault.strand === strand;
const lossResult = fault => ['dirty','loose','ferrule','bend','splice'].includes(fault.kind) ? fault.severity : 'dark';
export function canPlaceTool(state,kind,point) {
  const p=Number(point);
  return Number.isInteger(p) && p>=0 && p<=state.reach &&
    (kind==='lc' ? p===0 : kind==='vfl' ? state.reach>=1 : kind==='mmc' && p>0);
}

// Physical setup is separate from earlier optical observations.
export function connectionAt(state,point) {
  if(state.tool==='loop' && point===state.selected) return 'loop';
  if(state.tool==='vfl' && point===traceFrom(state)) return 'vfl';
  if(state.tool==='vfl' && point===state.selected) return 'unplugged';
  return state.disconnected?.includes(point)||state.patches?.[point]?.rear===false||state.patches?.[point]?.front===false?'unplugged':'plugged';
}

// Rear faces the local device; front faces the remote device. A VFL endpoint
// opens only the outward connection. Explicit changes persist until Normalize.
export function patchAt(s,point) {
  const patch={rear:true,front:true,port:s.ports[point-1]};
  if(s.disconnected?.includes(point)) patch.front=false;
  if(s.tool==='vfl') {
    const forward=traceFrom(s)<s.selected;
    if(point===s.selected) patch[forward?'front':'rear']=false;
    if(point===traceFrom(s)) patch[forward?'front':'rear']=false;
  }
  return {...patch,...s.patches?.[point]};
}
export function traceStop(s) {
  if(s.tool!=='vfl') return null;
  const from=traceFrom(s),direction=Math.sign(s.selected-from);
  if(!direction) return null;
  const incoming=direction>0?'rear':'front',outgoing=direction>0?'front':'rear';
  for(let point=from+direction;direction>0?point<=s.selected:point>=s.selected;point+=direction) {
    if(point===0) return {point:0,kind:'lc',blocked:false,closed:false};
    const p=patchAt(s,point);
    if(!p[incoming]||!p[outgoing]||point===s.selected) return {
      point,port:p.port,kind:p[incoming]?'port':'head',side:p[incoming]?outgoing:incoming,
      blocked:point!==s.selected,closed:p[incoming]&&p[outgoing],incomingSeated:p[incoming]
    };
  }
  return null;
}

export function simulatedLoop(state, point = state.selected) {
  const f = state.fault;
  if (f.kind === 'none') return 'pass';
  if (f.kind.startsWith('optic_')) return 'dark';
  if (f.at > point) return 'pass';
  // A swapped duplex pair can still close a return loop. Loop success does not
  // verify which strand will land on the remote receiver after reconnecting.
  if (f.kind === 'polarity') return 'pass';
  return lossResult(f);
}
export function simulatedTrace(state, segment, strand = state.strand) {
  if(segment===undefined && (traceStop(state)?.blocked || traceStop(state)?.closed)) return 'dark';
  const f = state.fault;
  const to=segment??state.selected, from=segment===undefined?traceFrom(state):segment-1;
  if (f.kind === 'none' || f.kind.startsWith('optic_') || f.at<=Math.min(from,to) || f.at>Math.max(from,to)) return 'seen';
  if (f.kind === 'polarity') return 'swapped';
  if (!affects(f, strand)) return 'seen';
  if (f.kind === 'misport') return 'wrong';
  // Visible continuity can coexist with unacceptable loss at the service wavelength.
  return lossResult(f) === 'weak' ? 'seen' : 'dark';
}
export function simulatedReadings(state) {
  const f = state.fault;
  const loss = lossResult(f);
  const swapped = f.kind === 'polarity';
  return {
    tx: f.kind === 'optic_tx' ? 'dark' : 'good',
    rx: f.kind === 'optic_rx' || swapped ? 'dark' : f.kind !== 'none' && !f.kind.startsWith('optic_') && affects(f,'rx') ? loss : 'good',
    farRx: f.kind === 'optic_tx' || swapped ? 'dark' : f.kind !== 'none' && !f.kind.startsWith('optic_') && affects(f,'tx') ? loss : 'good'
  };
}

export function changeCase(state, action) {
  const s = structuredClone(state);
  const clear = () => { if(Object.keys(s.loops).length||Object.keys(s.traces).length||s.history?.length) s.round=(s.round??1)+1; s.loops = {}; s.traces = {}; s.ready = false; s.service='unknown'; s.disconnected=[]; s.patches={}; };
  switch (action.type) {
    case 'place':
      if(!canPlaceTool(s,action.kind,action.point)) return state;
      if(action.kind==='vfl' && action.atSource) {
        const from=Number(action.point);
        s.selected=s.tool==='vfl' && s.selected!==from?s.selected:from<s.reach?from+1:from-1;
        s.vflFrom=from;
      } else {
        // Fiber-section shortcuts retain their original adjacent route.
        s.selected=action.kind==='vfl'?Math.max(1,Number(action.point)):Number(action.point);
        s.vflFrom=Math.max(0,s.selected-1);
      }
      s.started=true; s.tool=action.kind==='vfl'?'vfl':'loop';
      s.ready=false; s.service='unknown'; s.disconnected=[]; break;
    case 'trace': {
      const from=Number(action.from),to=Number(action.to);
      if(!validTrace(s,from,to)) return state;
      s.started=true; s.vflFrom=from; s.selected=to; s.tool='vfl';
      s.ready=false; s.service='unknown'; s.disconnected=[]; break;
    }
    case 'remove':
      if(s.tool==='link') return state;
      s.disconnected=s.tool==='vfl'?[traceFrom(s),s.selected]:[s.selected];
      s.tool='link'; s.ready=false; s.service='unknown'; break;
    case 'normalize':
      for(const [point,patch] of Object.entries(s.patches??{})) if(patch.port!==s.ports[Number(point)-1]) {
        for(const key of Object.keys(s.loops)) if(Number(key)>=Number(point)) delete s.loops[key];
        for(const key of Object.keys(s.traces)) {const r=parseTraceKey(key);if(r&&Number(point)>=Math.min(r.from,r.to)&&Number(point)<=Math.max(r.from,r.to))delete s.traces[key];}
      }
      s.tool='link'; s.disconnected=[]; s.patches={}; s.ready=false; s.service='unknown'; break;
    case 'patch': {
      const point=Number(action.point);
      if(!Number.isInteger(point)||point<1||point>s.reach||!['rear','front'].includes(action.side)) return state;
      const current=patchAt(s,point);
      const port=action.port===undefined?current.port:Number(action.port);
      if(!Number.isInteger(port)||port<1||port>32||typeof action.connected!=='boolean') return state;
      s.patches??={};
      s.patches[point]={...s.patches[point],[action.side]:action.connected,port};
      s.ready=false; s.service='unknown';
      if(current[action.side]===action.connected && current.port===port) break;
      if(port!==current.port) for(const key of Object.keys(s.loops)) if(Number(key)>=point) delete s.loops[key];
      for(const key of Object.keys(s.traces)) {
        const route=parseTraceKey(key);
        // Opening a test endpoint is a setup change, not a repair. Keep its
        // head / through-CAS observations for comparison; repatching a
        // different port still invalidates the affected route.
        if(route&&point===route.to&&port===current.port) continue;
        if(route&&point>=Math.min(route.from,route.to)&&point<=Math.max(route.from,route.to)) delete s.traces[key];
      }
      break;
    }
    case 'select':
      s.selected = bounded(action.point,0,s.reach); s.vflFrom=Math.max(0,s.selected-1); s.ready = false;
      if (s.selected === 0 && s.tool === 'vfl') s.tool = 'link';
      break;
    case 'tool':
      if (!['link','loop','vfl'].includes(action.tool) || (action.tool === 'vfl' && s.selected === 0)) return state;
      s.tool = action.tool; s.ready = false; s.disconnected=[];
      if(s.tool!=='link') {s.started=true; s.service='unknown';} break;
    case 'service':
      if(!canVerifyService(s) || !['good','bad'].includes(action.value)) return state;
      s.service=action.value; break;
    case 'ready': s.ready = Boolean(action.value); break;
    case 'strand':
      if (!['tx','rx'].includes(action.value)) return state;
      s.strand = action.value; s.ready = false; break;
    case 'health':
      if (!['tx','rx'].includes(action.signal) || !['unknown','good','weak','dark'].includes(action.value)) return state;
      s[action.signal] = action.value; break;
    case 'count':
      s.count = bounded(action.value,1,4); s.reach = Math.min(s.reach,s.count);
      s.selected = Math.min(s.selected,s.reach); s.fault.at = Math.min(s.fault.at,s.count+1); clear(); break;
    case 'reach': s.reach = bounded(action.value,0,s.count); s.selected = Math.min(s.selected,s.reach); clear(); break;
    case 'port': {
      const point=action.point===undefined?s.selected:Number(action.point);
      if (!Number.isInteger(point) || point<1 || point>s.reach) return state;
      s.ports[point-1] = bounded(action.value,1,32); clear(); break;
    }
    case 'fault':
      s.fault = { ...s.fault, ...action.value };
      if (!Object.hasOwn(faults,s.fault.kind)) return state;
      s.fault.at = s.fault.kind.startsWith('optic_') ? 0 : bounded(s.fault.at,['dirty','loose','none'].includes(s.fault.kind) ? 0 : 1,s.count+1);
      s.fault.strand = ['tx','rx','both'].includes(s.fault.strand) ? s.fault.strand : 'both';
      s.fault.severity = s.fault.severity === 'weak' ? 'weak' : 'dark'; clear(); break;
    case 'record': {
      if (!s.ready || s.tool === 'link') return state;
      s.service='unknown';
      if (s.tool === 'loop') {
        const result = s.simulated ? simulatedLoop(s) : action.result;
        if (!Object.hasOwn(loopLabels,result)) return state;
        const previous = s.loops[s.selected];
        if (result !== 'pass' || (previous && previous !== result)) {
          for (const key of Object.keys(s.loops)) if (Number(key) > s.selected) delete s.loops[key];
        }
        if (result === 'pass') {
          for (const key of Object.keys(s.loops)) if (Number(key) < s.selected && s.loops[key] !== 'pass') delete s.loops[key];
        }
        s.loops[s.selected] = result;
        appendObservation(s,'loop',String(s.selected),result);
      } else {
        const stop=traceStop(s);
        if(stop?.blocked||stop?.closed) return state;
        const result = s.simulated ? simulatedTrace(s) : action.result;
        if (!Object.hasOwn(traceLabels,result)) return state;
        s.traces[traceKey(s)] = result;
        appendObservation(s,'vfl',traceKey(s),result);
      }
      break;
    }
    case 'retest':
      s.round=(s.round??1)+1; s.loops={}; s.traces={}; s.ready=false; s.service='unknown'; break;
    case 'clear': clear(); break;
    default: return state;
  }
  if (s.tool === 'vfl' && !validTrace(s,traceFrom(s),s.selected)) {
    if(s.reach===0) s.tool='link';
    else s.vflFrom=s.selected===0?1:s.selected-1;
  }
  return s;
}

function basicAssessment(s) {
  const pairs = Object.entries(s.loops).map(([point,result]) => [Number(point),result]).sort((a,b) => a[0]-b[0]);
  const passed = pairs.filter(([,r]) => r === 'pass').map(([p]) => p);
  const lastPass = passed.length ? Math.max(...passed) : -1;
  const fail = pairs.find(([p,r]) => r !== 'pass' && p > lastPass);
  const trace = s.tool === 'vfl' && s.traces[traceKey(s)];
  const result = (title, why, next, extra = {}) => ({ title, why, next, tone:'neutral', from:null, to:null, lastPass, ...extra });
  const stop=traceStop(s);
  if(stop?.blocked) return result(`The setup is open at CAS ${stop.point}`,
    `The illustrated path ends at ${stop.kind==='head'?'the unplugged MMC head':'the open cassette port'} before your selected viewing point.`,
    'Check for light at this opening, or reconnect it to continue tracing. This is a setup condition, not a diagnosed fiber fault.');
  if(stop?.closed) return result('Open a viewing point',
    'Both sides of this cassette are connected. The fiber continues onward.',
    'Unplug the onward connector to check this port, or choose the next accessible cassette.');
  if(s.tool==='link' && s.disconnected?.length) return result('Connections are still unplugged',
    'Removing the tool leaves the test connections open in the diagram. Earlier results are kept.',
    'Select Normalize to reconnect the service path, then check actual readings and link status.',
    {suggestion:{point:s.selected,tool:'link'}});
  if(s.tool==='link' && s.service==='good') return result('Restored link is working',
    'You confirmed the required local readings and link status after removing the tools.',
    'Record the work and readings. This does not identify the original cause or verify every other channel.',{tone:'pass',complete:true});
  if(s.tool==='link' && s.service==='bad') return result('The restored link still needs checking',
    'Local tests do not prove end-to-end pairing or the remote source and receiver.',
    'Verify FIM ports and TX-to-RX pairing. Trace accessible strands if needed; leave the onward path and remote device unverified.',
    {tone:'suspect',suggestion:s.reach>0?{point:1,tool:'vfl'}:null});
  if (trace) {
    const from=traceFrom(s),longRoute=Math.abs(s.selected-from)>1;
    const shared = { from:Math.min(from,s.selected), to:Math.max(from,s.selected), tone:trace === 'seen' ? 'trace' : 'suspect' };
    if(trace==='seen' && stop?.kind==='head') return result('Light reaches the loose MMC head',
      'You confirmed continuity up to this connector. The cassette connection has not been tested.',
      'Plug the head into its mapped port, then check for light at the open opposite face.',shared);
    if(trace==='seen' && stop?.port!==undefined && stop.port!==s.ports[s.selected-1]) return result('Check the port against FIM',
      `The diagram is patched to port ${stop.port}; the mapped destination is port ${s.ports[s.selected-1]}.`,
      'Confirm the real patch and FIM record. Correct the connection if needed, then trace again.',{...shared,tone:'suspect'});
    if (trace === 'wrong' || trace === 'swapped') return result(trace === 'wrong' ? 'Light reached a different port' : 'Light reached the other strand',
      'There is a route, but it does not match the expected port / TX–RX pairing.',
      'Check the FIM destination, leader / follower mapping and polarity. Correct the route, then trace again.', shared);
    if (trace === 'dark') return result('Trace this section more closely',
      `No visible light at ${fiberPointName(s.selected)} does not identify a break or its exact position along ${traceName(s)}.`,
      `Verify the VFL and adapter. ${longRoute?'Choose an intermediate CAS to check a shorter route. ':''}Check nearby ports, seating, end faces, bends and damage; use a loss test / OTDR if needed.`, shared);
    return result('This strand has visible continuity',
      'Red light reached the expected destination. This does not prove acceptable IR loss or optic health.',
      'Trace the other strand, then remove the VFL, restore the mapped path and recheck RX against the optic limits.', shared);
  }
  if (s.loops[0] && s.loops[0] !== 'pass') return result('Start at the optic and test setup',
    'The direct loop did not pass. The external fiber path is bypassed.',
    'Inspect → clean if needed → reinspect. Verify seating, loop mapping / attenuation and host status. Compare a known-good optic with the same valid test.',
    { tone:'suspect',from:0,to:0 });
  if (fail) return result(lastPass >= 0 ? `Narrowed to ${pointName(lastPass)} → ${pointName(fail[0])}` : `Not isolated yet: loop at ${pointName(fail[0])} failed`,
    lastPass >= 0 ? `The loop passed at ${pointName(lastPass)} but ${fail[1] === 'weak' ? 'returned weak light' : 'had no return light'} at ${pointName(fail[0])}.` : 'A failed passive loop includes the optic, fiber, connections and loop setup.',
    lastPass >= 0 ? fail[0]>lastPass+1?`Recheck the failed loop setup. Then loop at ${pointName(lastPass+1)} to narrow this larger section before tracing.`:'Recheck the loop setup, then inspect the added section and its connections. Use VFL for routing / continuity; measure loss for attenuation.' : 'Try a valid LC loop directly at the optic to separate the optic / setup from the external path.',
    {tone:'suspect',from:Math.max(0,lastPass),to:fail[0], suggestion:lastPass < 0 ? {point:0,tool:'loop'} : {point:Math.min(lastPass+1,s.reach),tool:fail[0]>lastPass+1?'loop':'vfl'}});
  if (lastPass >= 0) return result(`Loop passed to ${pointName(lastPass)}`,
    'The tested pair returned light within the limits you checked. This does not verify the live link, all MMC fibers or end-to-end polarity.',
    lastPass < s.reach ? `Move the loop to ${pointName(lastPass+1)}. Compare the result with this passed test.` : 'Remove the loop and restore the mapped link. Recheck local health; leave the onward path and remote device unverified.',
    {tone:'pass', suggestion:lastPass < s.reach ? {point:lastPass+1,tool:'loop'} : {point:lastPass,tool:'link'}});
  const tx = s.simulated ? simulatedReadings(s).tx : s.tx;
  if (tx === 'dark') return result('Check why local TX is not emitting',
    'A reported −40 indicates no light / the reporting floor. A fiber polarity mismatch alone does not explain absent local TX output.',
    'Verify the report and lane, port / laser state and optic seating. Then use a supported loop or known-good comparison.',
    {suggestion:{point:0,tool:'loop'}});
  return result('Start with a direct optic loop',
    'A no-light reading tells you what is missing, not why. Test what you can reach.',
    'Insert a supported LC loopback at the local optic. Check TX and the returning RX on the tested pair.',
    {suggestion:{point:0,tool:'loop'}});
}


// Current observations drive guidance. Earlier rounds remain reviewable, never
// silently reused as proof after a repair, repatch or topology change.
function appendObservation(s,kind,key,result) {
  s.started=true;
  s.history=[...(s.history??[]),{kind,key,result,round:s.round??1,
    ports:s.ports.slice(0,s.count),port:kind==='vfl'?traceStop(s)?.port:undefined}].slice(-100);
}
export function caseHistory(s) {
  const history=s.history??[];
  return history.map((entry,index)=>({...entry,current:entry.round===(s.round??1) &&
    (entry.kind==='loop'?s.loops:s.traces)[entry.key]===entry.result &&
    !history.slice(index+1).some(e=>e.kind===entry.kind&&e.key===entry.key)}));
}
export function restoreCaseHistory(s,raw) {
  s.round=Number.isInteger(raw.round)&&raw.round>0?raw.round:1;
  s.history=Array.isArray(raw.history)?raw.history.filter(e=>e && Number.isInteger(e.round)&&e.round>0&&e.round<=s.round &&
    (e.kind==='loop'?/^[0-4]$/.test(e.key)&&Object.hasOwn(loopLabels,e.result):e.kind==='vfl'&&parseTraceKey(e.key)&&Object.hasOwn(traceLabels,e.result)))
    .slice(-100).map(e=>({kind:e.kind,key:String(e.key),result:e.result,round:e.round,
      ports:Array.isArray(e.ports)?e.ports.slice(0,4).map(p=>bounded(p,1,32)):[],
      ...(Number.isInteger(e.port)&&e.port>=1&&e.port<=32?{port:e.port}:{})})):[];
  if(!s.history.length) {
    for(const [key,result] of Object.entries(s.loops)) appendObservation(s,'loop',key,result);
    for(const [key,result] of Object.entries(s.traces)) appendObservation(s,'vfl',key,result);
  }
  s.started=Boolean(raw.started)||s.tool!=='link'||s.history.length>0;
  return s;
}
export function canVerifyService(s) {
  return !s.simulated && s.tool==='link' && !s.disconnected?.length &&
    !Object.values(s.patches??{}).some(p=>p.front===false||p.rear===false) &&
    Object.entries(s.patches??{}).every(([point,p])=>p.port===s.ports[Number(point)-1]) &&
    Object.keys(s.loops).length+Object.keys(s.traces).length>0;
}
const strandLetter=strand=>strand==='tx'?'A':'B';
const routeDescription=r=>`${fiberPointName(r.from)} → ${fiberPointName(r.to)}${r.head?' · loose MMC head':r.to>0?' · through CAS':''}`;
const traceCheck=(r,label)=>({tool:'vfl',from:r.from,to:r.to,strand:r.strand,head:Boolean(r.head),label});

function traceAssessment(s) {
  const entries=Object.entries(s.traces).map(([key,result])=>({...parseTraceKey(key),key,result}));
  if(!entries.length) return null;
  const activeKey=s.tool==='vfl'?traceKey(s):null;
  const groups=[];
  for(const r of entries) {
    let group=groups.find(g=>g.from===r.from&&g.to===r.to&&Boolean(g.head)===Boolean(r.head));
    if(!group) {group={from:r.from,to:r.to,head:r.head,rows:[]};groups.push(group);}
    group.rows.push(r);
  }
  const findings=[];
  for(const g of groups) {
    const rows=g.rows, a=rows.find(r=>r.strand==='tx'),b=rows.find(r=>r.strand==='rx');
    const status=r=>!r?'Not checked':r.result==='seen'?'Light at '+strandLetter(r.strand):r.result==='swapped'?'Light at '+strandLetter(r.strand==='tx'?'rx':'tx'):traceLabels[r.result];
    const pair=[{strand:'A',result:a?.result,label:status(a)},{strand:'B',result:b?.result,label:status(b)}];
    const make=(priority,title,why,next,extra={})=>findings.push({priority,title,why,next,tone:priority>=50?'suspect':'trace',
      from:Math.min(g.from,g.to),to:Math.max(g.from,g.to),route:routeDescription(g),pair,...extra,
      active:rows.some(r=>r.key===activeKey)});
    const output=r=>r?.result==='seen'?r.strand:r?.result==='swapped'?(r.strand==='tx'?'rx':'tx'):null;
    if(a&&b&&output(a)&&output(a)===output(b)) {
      make(100,'These channel results conflict','Both input strands were recorded at the same output channel.',
        'Confirm A / B labels and test one strand at a time. Recheck the same setup before changing polarity.',
        {check:traceCheck(a,'Recheck strand A'),branches:[['Separate outputs','Compare with the documented channel map.'],['Still the same output','Verify labels, adapter and test setup.']]});
      continue;
    }
    const wrong=rows.find(r=>r.result==='wrong');
    const portMismatch=g.to>0&&patchAt(s,g.to).port!==s.ports[g.to-1];
    if(wrong || portMismatch) {
      make(90,'The observed route does not match FIM',portMismatch?`Patched port ${patchAt(s,g.to).port}; expected port ${s.ports[g.to-1]}.`:'Light was reported at a different port.',
        'Verify the device, LC follower, MMC serial and FIM destination. Correct the patch only after confirming the mapping, then start a retest.',
        {branches:[['Mapping matches','Recheck the strand and viewing point.'],['Mapping differs','Correct the confirmed misport, then retest.']]});
      continue;
    }
    const dark=rows.find(r=>r.result==='dark');
    if(dark) {
      const dir=Math.sign(dark.to-dark.from),distance=r=>Math.abs(r.to-r.from)*2-(r.head?1:0);
      const related=entries.filter(r=>r.from===dark.from&&r.strand===dark.strand&&Math.sign(r.to-r.from)===dir);
      const farther=related.find(r=>r.result==='seen'&&distance(r)>distance(dark));
      const earlier=related.filter(r=>r.result==='seen'&&distance(r)<distance(dark)).sort((a,b)=>distance(b)-distance(a))[0];
      const both=rows.every(r=>r.result==='dark')&&rows.length===2;
      const letter=strandLetter(dark.strand);
      if(farther) {
        make(100,'The location results need a recheck',`Strand ${letter} was dark at ${fiberPointName(dark.to)} but seen farther along the same route.`,
          'Confirm the source, strand and patching stayed the same. Recheck the dark point; these observations cannot yet isolate a fault.',
          {check:traceCheck(dark,`Recheck ${fiberPointName(dark.to)} · ${letter}`)});
        continue;
      }
      const headPass=earlier?.to===dark.to&&earlier.head;
      const title=headPass?`Strand ${letter}: check the MMC / CAS connection`:both?'Both strands are dark here':a?.result==='seen'||b?.result==='seen'?`Strand ${letter} is dark; the other has light`:`Strand ${letter}: no light recorded here`;
      const why=headPass?'Light reached the loose head, but was not seen through the cassette connection.':earlier?`Last light: ${fiberPointName(earlier.to)}. First dark check: ${fiberPointName(dark.to)}. The added section and connections need checking.`:'This is a failed continuity observation. It does not identify which part is bad.';
      const from=earlier?Math.min(earlier.to,dark.to):Math.min(dark.from,dark.to);
      const to=earlier?Math.max(earlier.to,dark.to):Math.max(dark.from,dark.to);
      if(!dark.head&&dark.to>0&&!headPass) {
        make(80,title,why,`Keep the VFL on ${letter}. Verify the VFL / adapter, then unplug the incoming MMC at CAS ${dark.to} and check its loose head.`,
          {from,to,...(earlier?{evidencePath:[`${fiberPointName(earlier.to)} · ${letter} light seen`,`${fiberPointName(dark.to)} · ${letter} dark`]}:{}),check:traceCheck({...dark,head:true},`Check loose MMC · strand ${letter}`),
            branches:[['Light at the head','Inspect seating, end faces and the CAS connection.'],['Head also dark','Work back toward the source; check fiber and earlier connections.']]});
      } else if(headPass) {
        make(85,title,why,'Inspect both mating ends; clean and reinspect as needed. Verify seating and the mapped CAS port, then retest through the CAS.',
          {from,to,evidencePath:[`MMC head · ${letter} light seen`,`CAS ${dark.to} port · ${letter} dark`],check:traceCheck(dark,`Retest through CAS ${dark.to} · ${letter}`),
            branches:[['Light returns','Retest both strands, then verify optical readings.'],['Still dark','Compare a known-good compatible connection to isolate the failing part.']]});
      } else {
        const previous=dark.to-dir;
        const check=previous!==dark.from&&!related.some(r=>r.to===previous&&!r.head)?traceCheck({...dark,to:previous,head:false},`Check ${fiberPointName(previous)} · ${letter}`):null;
        make(80,title,why,'Verify the VFL / adapter and LC seating. Inspect this fiber section for contamination, bends or damage; compare a known-good compatible lead if needed.',
          {from,to,...(earlier?{evidencePath:[`${fiberPointName(earlier.to)} · ${letter} light seen`,`${fiberPointName(dark.to)} · ${letter} dark`]}:{}),check,branches:[['Earlier point has light','Investigate the section added after that point.'],['Earlier point is dark','Move toward the source and verify the VFL setup.']]});
      }
      continue;
    }
    if(rows.some(r=>r.result==='swapped')) {
      make(70,'Check the documented strand mapping','Light is present, but at the other illustrated channel.',
        'Compare both strands with the FIM / cable channel map. A / B are illustration labels; do not swap fibers solely because this picture differs.',
        {check:rows.length===1?traceCheck({...rows[0],strand:rows[0].strand==='tx'?'rx':'tx'},'Check the other strand'):null,
          branches:[['Matches the channel map','Verify TX reaches the intended RX.'],['Does not match','Correct the verified pairing, then retest.']]});
      continue;
    }
    if(rows.length===1) {
      const missing=rows[0].strand==='tx'?'rx':'tx';
      const covered=entries.some(r=>r.from===g.from&&r.strand===missing&&r.result==='seen'&&
        Math.sign(r.to-r.from)===Math.sign(g.to-g.from)&&
        Math.abs(r.to-r.from)*2-(r.head?1:0)>=Math.abs(g.to-g.from)*2-(g.head?1:0));
      if(covered) continue;
      make(20,`Strand ${strandLetter(rows[0].strand)} has light; check the other strand`,
        'One recorded strand does not prove the pair is continuous. Visible light does not prove acceptable IR loss or optic health.',
        'Keep the same source and viewing point. Move the VFL to the other strand and record what you see.',
        {check:traceCheck({...rows[0],strand:rows[0].strand==='tx'?'rx':'tx'},'Check the other strand'),
          branches:[['Other strand has light','Both have visible continuity at this point.'],['Other strand is dark','Separate the incoming head from the CAS connection.']]});
    } else {
      const nextPoint=g.to+Math.sign(g.to-g.from);
      make(10,g.head?'Both strands reach the loose MMC head':'Both strands have visible continuity here',
        g.head?'The cassette connection has not yet been checked.':'This does not prove acceptable IR loss, optic health or the remote link.',
        g.head?'Seat the head in its mapped port, then check through the cassette.':nextPoint>=0&&nextPoint<=s.reach?'Continue to the next accessible point and check both strands.':'Normalize the path, then verify the required optical readings and link status.',
        {check:g.head?traceCheck({...rows[0],head:false},'Check through the CAS'):nextPoint>=0&&nextPoint<=s.reach?traceCheck({...rows[0],to:nextPoint,head:false},`Continue to ${fiberPointName(nextPoint)}`):null,
          ...(!g.head&&(nextPoint<0||nextPoint>s.reach)?{suggestion:{tool:'link',point:g.to}}:{})});
    }
  }
  findings.sort((a,b)=>b.priority-a.priority||Number(b.active)-Number(a.active)||Math.abs(b.to-b.from)-Math.abs(a.to-a.from));
  const best=findings[0];
  if(!best) return null;
  const failedLoop=Object.entries(s.loops).find(([,r])=>r!=='pass');
  if(failedLoop) {
    best.caution=`Loop at ${pointName(Number(failedLoop[0]))}: ${loopLabels[failedLoop[1]]}. VFL continuity does not clear this optical test.`;
    if(best.priority<50) {
      best.title='Visible light does not clear the failed loop'; best.tone='suspect';
      best.next='Verify the loop setup and inspect the connections. Recheck the loop against the optic limits; measure loss if the return remains weak.';
      best.check=null; best.branches=[['Loop passes','Restore the mapped path and verify the live link.'],['Loop still fails','Continue isolating the optic / setup or added fiber section.']];
      best.suggestion={tool:'loop',point:Number(failedLoop[0])};
    }
  }
  if(!failedLoop&&s.tx==='dark') best.caution='Starting local TX reports no light. The VFL has its own source and does not verify the optic.';
  best.otherIssues=findings.filter(f=>f!==best&&f.priority>=50).length;
  return best;
}

export function assessment(s) {
  const basic=basicAssessment(s),stop=traceStop(s);
  if(basic.suggestion?.tool==='loop') basic.branches=[['Next loop passes','Compare with the next accessible point.'],['Next loop fails','Verify its setup; investigate the section added since the last pass.']];
  if(basic.from===0&&basic.to===0&&basic.tone==='suspect') basic.branches=[['Known-good setup passes','Compare the original optic / loop setup one change at a time.'],['Still fails','Check the optic, host state and test compatibility before tracing fiber.']];
  if(s.tool==='link'&&s.service==='good') return basic;
  const traces=traceAssessment(s);
  if(stop?.blocked||stop?.closed||s.tool==='link'&&s.disconnected?.length) {
    const failedLoop=Object.entries(s.loops).find(([,r])=>r!=='pass');
    return {...basic,...(traces?.tone==='suspect'?{caution:`Unresolved finding: ${traces.title}.`}:failedLoop?{caution:`Unresolved loop: ${pointName(Number(failedLoop[0]))} · ${loopLabels[failedLoop[1]]}.`}:{})};
  }
  if(!traces || s.tool==='link'&&s.service==='bad'&&traces.tone!=='suspect') return basic;
  if(s.tool==='link'&&s.service==='bad') traces.caution='The restored link still has a problem. These recorded findings remain unresolved.';
  // Keep the failed optic test visible while still retaining any VFL findings.
  if(s.loops[0]&&s.loops[0]!=='pass'&&s.tool==='loop') return {...basic,caution:traces.title};
  return {...traces,lastPass:basic.lastPass};
}

export function nextCheckActions(s) {
  const check=assessment(s).check;
  if(!check) return [];
  const actions=[{type:'trace',from:check.from,to:check.to},{type:'strand',value:check.strand}];
  const direction=Math.sign(check.to-check.from),incoming=direction>0?'rear':'front',outgoing=direction>0?'front':'rear';
  // A guided next check positions the diagram only. It never records a result.
  for(let p=check.from+direction;direction>0?p<check.to:p>check.to;p+=direction) if(p>0) {
    for(const side of ['rear','front']) actions.push({type:'patch',point:p,side,connected:true});
  }
  if(check.from>0) actions.push({type:'patch',point:check.from,side:outgoing,connected:false});
  if(check.to>0) actions.push({type:'patch',point:check.to,side:incoming,connected:!check.head},{type:'patch',point:check.to,side:outgoing,connected:false});
  return actions;
}

export function caseStatus(s) {
  const count=Object.keys(s.loops).length+Object.keys(s.traces).length;
  const a=assessment(s);
  if(a.complete) return {label:'Link verified',stage:3,count};
  if(s.round>1&&!count) return {label:'Retest · earlier checks kept',stage:1,count};
  if(count&&(a.tone==='suspect'||Object.values(s.loops).some(r=>r!=='pass')||Object.values(s.traces).some(r=>r!=='seen'))) return {label:'Issue found · keep isolating',stage:2,count};
  if(count) return {label:'Checks recorded · link unverified',stage:2,count};
  if(s.started||s.tool!=='link') return {label:'Case active · waiting for a result',stage:1,count};
  return {label:'Ready · place a tool to begin',stage:0,count};
}
