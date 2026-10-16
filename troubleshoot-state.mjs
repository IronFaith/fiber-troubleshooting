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
export const traceKey = state => `${traceFrom(state)===state.selected-1?'':`${traceFrom(state)}>`}${state.selected}:${state.strand}`;
export function parseTraceKey(key) {
  const match=/^(?:(\d+)>)?(\d+):(tx|rx)$/.exec(key);
  if(!match) return null;
  const to=Number(match[2]),from=match[1]===undefined?to-1:Number(match[1]);
  return from<0 || from===to ? null : {from,to,strand:match[3]};
}
const validTrace = (state,from,to) => [from,to].every(p=>Number.isInteger(p)&&p>=0&&p<=state.reach) && from!==to;

export function createCase(simulated = false) {
  return { simulated, count: 2, reach: 2, selected: 0, ports: [12,12,12,12], tool: 'link',
    strand: 'tx', vflFrom:0, ready: false, loops: {}, traces: {}, tx: 'unknown', rx: 'unknown', service:'unknown', disconnected:[],
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
  return state.disconnected?.includes(point)?'unplugged':'plugged';
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
  const clear = () => { s.loops = {}; s.traces = {}; s.ready = false; s.service='unknown'; s.disconnected=[]; };
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
      s.tool=action.kind==='vfl'?'vfl':'loop';
      s.ready=false; s.service='unknown'; s.disconnected=[]; break;
    case 'trace': {
      const from=Number(action.from),to=Number(action.to);
      if(!validTrace(s,from,to)) return state;
      s.vflFrom=from; s.selected=to; s.tool='vfl';
      s.ready=false; s.service='unknown'; s.disconnected=[]; break;
    }
    case 'remove':
      if(s.tool==='link') return state;
      s.disconnected=s.tool==='vfl'?[traceFrom(s),s.selected]:[s.selected];
      s.tool='link'; s.ready=false; s.service='unknown'; break;
    case 'normalize':
      s.tool='link'; s.disconnected=[]; s.ready=false; s.service='unknown'; break;
    case 'select':
      s.selected = bounded(action.point,0,s.reach); s.vflFrom=Math.max(0,s.selected-1); s.ready = false;
      if (s.selected === 0 && s.tool === 'vfl') s.tool = 'link';
      break;
    case 'tool':
      if (!['link','loop','vfl'].includes(action.tool) || (action.tool === 'vfl' && s.selected === 0)) return state;
      s.tool = action.tool; s.ready = false; s.disconnected=[];
      if(s.tool!=='link') s.service='unknown'; break;
    case 'service':
      if(s.simulated || s.tool!=='link' || s.disconnected?.length || s.loops[s.reach]!=='pass' || !['good','bad'].includes(action.value)) return state;
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
      } else {
        const result = s.simulated ? simulatedTrace(s) : action.result;
        if (!Object.hasOwn(traceLabels,result)) return state;
        s.traces[traceKey(s)] = result;
      }
      break;
    }
    case 'clear': clear(); break;
    default: return state;
  }
  if (s.tool === 'vfl' && !validTrace(s,traceFrom(s),s.selected)) {
    if(s.reach===0) s.tool='link';
    else s.vflFrom=s.selected===0?1:s.selected-1;
  }
  return s;
}

export function assessment(s) {
  const pairs = Object.entries(s.loops).map(([point,result]) => [Number(point),result]).sort((a,b) => a[0]-b[0]);
  const passed = pairs.filter(([,r]) => r === 'pass').map(([p]) => p);
  const lastPass = passed.length ? Math.max(...passed) : -1;
  const fail = pairs.find(([p,r]) => r !== 'pass' && p > lastPass);
  const trace = s.tool === 'vfl' && s.traces[traceKey(s)];
  const result = (title, why, next, extra = {}) => ({ title, why, next, tone:'neutral', from:null, to:null, lastPass, ...extra });
  if(s.tool==='link' && s.disconnected?.length) return result('Connections are still unplugged',
    'Removing the tool leaves the test connections open in the diagram. Earlier results are kept.',
    'Select Normalize to reconnect the service path, then check actual readings and link status.',
    {suggestion:{point:s.selected,tool:'link'}});
  if(s.tool==='link' && s.service==='good') return result('Restored link is working',
    'You confirmed the required local readings and link status after removing the tools.',
    'Record the work and readings. This does not identify the original cause or verify every other channel.',{tone:'pass',complete:true});
  if(s.tool==='link' && s.service==='bad') return result('Local loops passed; the service path still needs checking',
    'A return loop does not prove end-to-end pairing or the remote source and receiver.',
    'Verify FIM ports and TX-to-RX pairing. Trace accessible strands if needed; leave the onward path and remote device unverified.',
    {tone:'suspect',suggestion:s.reach>0?{point:1,tool:'vfl'}:null});
  if (trace) {
    const from=traceFrom(s),longRoute=Math.abs(s.selected-from)>1;
    const shared = { from:Math.min(from,s.selected), to:Math.max(from,s.selected), tone:trace === 'seen' ? 'trace' : 'suspect' };
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
