// One illustrative duplex pair. Results entered by a person are never inferred
// from placing a test tool. Simulation is a separate, deliberately simplified case.
export const faults = {
  none: 'No fault', optic_tx: 'Optic · TX not emitting', optic_rx: 'Optic · RX not receiving',
  dirty: 'Dirty connection', loose: 'Loose connection', ferrule: 'Damaged MMC ferrule',
  break: 'Broken fiber', bend: 'Tight bend / pinch', misport: 'Misport',
  polarity: 'Polarity swapped', splice: 'Poor splice'
};
export const loopLabels = { pass: 'Pass', weak: 'Weak return', dark: 'No return light' };
export const traceLabels = { seen: 'Expected port + strand', weak: 'Weak light', wrong: 'Different port', swapped: 'Other strand', dark: 'No light seen' };
export const identityLabels = {
  optic:'Device + optic port', fanout:'LC follower + MMC head',
  route:'CAS route + ports', channels:'Strand mapping'
};
export const comparisonLabels = {
  source:{pass:'Reference has light',fail:'Reference also dark'},
  inspection:{clear:'Ends clean; original still dark',damage:'Damage seen',unavailable:'Cannot inspect'},
  substitute:{light:'Replacement has light',dark:'Replacement also dark',unavailable:'No compatible spare'}
};
export const identityConfirmed = s => Object.keys(identityLabels).every(key=>s.identity?.[key]===true);
const parseComparisonKey = key => {const [trace,step]=String(key).split('~');return parseTraceKey(trace)&&Object.hasOwn(comparisonLabels,step)?{trace,step}:null;};
export const isOptic = (s,point) => point===0 || point===s.count+1;
export const pointName = (point,s) => point === 0 ? 'Local optic' : s&&point===s.count+1?'Remote optic':`CAS ${point}`;
export const spanName = (point,s) => `${pointName(point - 1,s)} → ${pointName(point,s)}`;
export const fiberPointName = (point,s) => point === 0 ? 'Optic-side LC leg' : s&&point===s.count+1?'Remote LC legs':pointName(point,s);
export const loopSource = s => s.loopSide==='remote'?s.count+1:0;
export const loopResults = (s,side=s.loopSide) => side==='remote'?(s.remoteLoops??{}):s.loops;
export const loopResult = (s,point=s.selected) => loopResults(s)[point];
export const loopEntries = s => ['local','remote'].flatMap(side=>Object.entries(loopResults(s,side)).map(([point,result])=>({point:Number(point),result,side})));
export const traceFrom = state => state.vflFrom ?? 0;
export const traceName = state => `${fiberPointName(traceFrom(state),state)} → ${fiberPointName(state.selected,state)}`;
// Keep adjacent legacy keys so existing saved observations still belong to
// exactly the same section. Longer / reverse routes include both endpoints.
export const traceKey = state => `${traceFrom(state)===state.selected-1?'':`${traceFrom(state)}>`}${state.selected}:${state.strand}${traceStop(state)?.kind==='head'?':head':''}`;
export function parseTraceKey(key) {
  const match=/^(?:(\d+)>)?(\d+):(tx|rx)(:head)?$/.exec(key);
  if(!match) return null;
  const to=Number(match[2]),from=match[1]===undefined?to-1:Number(match[1]);
  return from<0 || from===to ? null : {from,to,strand:match[3],...(match[4]?{head:true}:{})};
}
const validTrace = (state,from,to) => [from,to].every(p=>Number.isInteger(p)&&p>=0&&p<=state.reach) && isOptic(state,from) && from!==to;

export function createCase(simulated = false) {
  return { simulated, endpointAccessVersion:1, started:false, round:1, history:[], identity:{}, comparisons:{}, count: 2, reach: 3, selected: 0, ports: [12,12,12,12], tool: 'link',
    strand: 'tx', vflFrom:0, loopSide:'local', ready: false, loops: {}, remoteLoops:{}, traces: {}, tx: 'unknown', rx: 'unknown', service:'unknown', disconnected:[], patches:{},
    fault: { kind: 'break', at: 2, strand: 'tx', severity: 'dark' } };
}
const bounded = (value, min, max) => Math.max(min, Math.min(max, Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : min));
const affects = (fault, strand) => fault.strand === 'both' || fault.strand === strand;
const lossResult = fault => ['dirty','loose','ferrule','bend','splice'].includes(fault.kind) ? fault.severity : 'dark';
export function canPlaceTool(state,kind,point) {
  const p=Number(point);
  return Number.isInteger(p) && p>=0 && p<=state.reach &&
    (kind==='lc' ? isOptic(state,p) : kind==='vfl' ? state.reach>=1&&isOptic(state,p) : kind==='mmc' && p>0&&p<=state.count);
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
  // Point checks illustrate the chosen observation route. Connector animations
  // do not gate recording; only the selected port and entered light result do.
  if(s.tool==='vfl'&&s.vflPointChecks) {
    patch.port=s.patches?.[point]?.port??patch.port;
    if(point===s.selected) patch[traceFrom(s)<s.selected?'front':'rear']=false;
    return patch;
  }
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
    if(isOptic(s,point)) return {point,kind:'lc',blocked:false,closed:false};
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
  const source=loopSource(state);
  if (f.kind === 'none') return 'pass';
  if (f.kind.startsWith('optic_')) return f.at===source?'dark':'pass';
  if (f.at===0) return source===0?lossResult(f):'pass';
  if (f.at<=Math.min(source,point)||f.at>Math.max(source,point)) return 'pass';
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
    tx: f.kind === 'optic_tx'&&f.at===0 ? 'dark' : 'good',
    rx: f.kind === 'optic_rx'&&f.at===0 || f.kind==='optic_tx'&&f.at===state.count+1 || swapped ? 'dark' : f.kind !== 'none' && !f.kind.startsWith('optic_') && affects(f,'rx') ? loss : 'good',
    farRx: f.kind === 'optic_tx'&&f.at===0 || f.kind==='optic_rx'&&f.at===state.count+1 || swapped ? 'dark' : f.kind !== 'none' && !f.kind.startsWith('optic_') && affects(f,'tx') ? loss : 'good'
  };
}

export function changeCase(state, action) {
  const s = structuredClone(state);
  s.remoteLoops??={}; s.loopSide??='local';
  const clear = () => { if(loopEntries(s).length||Object.keys(s.traces).length||s.history?.length) s.round=(s.round??1)+1; s.loops = {}; s.remoteLoops={}; s.traces = {}; s.identity={}; s.comparisons={}; s.ready = false; s.service='unknown'; s.disconnected=[]; s.patches={}; };
  switch (action.type) {
    case 'vfl-point-checks':
      if(s.vflPointChecks) return state;
      // Keep the old, narrower head tests as history. Never relabel them as a
      // pass at the cassette port when switching to the simpler workflow.
      for(const [key,result] of Object.entries(s.traces)) if(parseTraceKey(key)?.head) {
        if(!s.history?.some(e=>e.kind==='vfl'&&e.key===key&&e.result===result&&e.round===s.round)) appendObservation(s,'vfl',key,result);
        delete s.traces[key]; delete s.comparisons?.[key]; s.ready=false;
      }
      s.vflPointChecks=true; break;
    case 'identity':
      if(!Object.hasOwn(identityLabels,action.key)||typeof action.value!=='boolean'||s.identity?.[action.key]===action.value) return state;
      s.identity??={}; s.identity[action.key]=action.value; s.service='unknown';
      if(!action.value) s.comparisons={};
      appendObservation(s,'identity',action.key,action.value?'confirmed':'unchecked'); break;
    case 'comparison': {
      const guide=comparisonGuide(s,action.key);
      if(!guide?.diagnostic || guide.diagnostic.step!==action.step || !guide.diagnostic.options.some(([v])=>v===action.value)) return state;
      s.comparisons??={}; s.comparisons[action.key]??={};
      const steps=Object.keys(comparisonLabels),index=steps.indexOf(action.step);
      for(const later of steps.slice(index+1)) delete s.comparisons[action.key][later];
      s.comparisons[action.key][action.step]=action.value; s.service='unknown';
      appendObservation(s,'comparison',`${action.key}~${action.step}`,action.value); break;
    }
    case 'place':
      if(!canPlaceTool(s,action.kind,action.point)) return state;
      if(action.kind==='vfl') {
        const from=Number(action.point);
        s.selected=s.tool==='vfl' && s.selected!==from?s.selected:from<s.reach?from+1:from-1;
        s.vflFrom=from;
      } else {
        s.selected=Number(action.point);
      }
      s.started=true; s.tool=action.kind==='vfl'?'vfl':'loop';
      if(s.tool==='loop'&&isOptic(s,s.selected)) s.loopSide=s.selected===0?'local':'remote';
      s.ready=false; s.service='unknown'; s.disconnected=[]; break;
    case 'loop-side':
      if(!['local','remote'].includes(action.value)||action.value==='remote'&&s.reach<s.count+1||isOptic(s,s.selected)&&action.value!==(s.selected===0?'local':'remote')) return state;
      s.loopSide=action.value; s.ready=false; s.service='unknown'; break;
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
        s.identity={}; s.comparisons={};
        for(const key of Object.keys(s.loops)) if(Number(key)>=Number(point)) delete s.loops[key];
        for(const key of Object.keys(s.remoteLoops)) if(Number(key)<=Number(point)) delete s.remoteLoops[key];
        for(const key of Object.keys(s.traces)) {const r=parseTraceKey(key);if(r&&Number(point)>=Math.min(r.from,r.to)&&Number(point)<=Math.max(r.from,r.to))delete s.traces[key];}
      }
      s.tool='link'; s.disconnected=[]; s.patches={}; s.ready=false; s.service='unknown'; break;
    case 'patch': {
      const point=Number(action.point);
      if(!Number.isInteger(point)||point<1||point>Math.min(s.reach,s.count)||!['rear','front'].includes(action.side)) return state;
      const current=patchAt(s,point);
      const port=action.port===undefined?current.port:Number(action.port);
      if(!Number.isInteger(port)||port<1||port>32||typeof action.connected!=='boolean') return state;
      s.patches??={};
      s.patches[point]={...s.patches[point],[action.side]:action.connected,port};
      s.ready=false; s.service='unknown';
      if(current[action.side]===action.connected && current.port===port) break;
      if(port!==current.port) {s.identity={}; s.comparisons={};}
      if(port!==current.port) for(const key of Object.keys(s.loops)) if(Number(key)>=point) delete s.loops[key];
      if(port!==current.port) for(const key of Object.keys(s.remoteLoops)) if(Number(key)<=point) delete s.remoteLoops[key];
      for(const key of port!==current.port?Object.keys(s.traces):[]) {
        const route=parseTraceKey(key);
        // Plugging / unplugging on the same route only changes the live
        // opening. Keep recorded checks until a retest or route change.
        if(route&&point>=Math.min(route.from,route.to)&&point<=Math.max(route.from,route.to)) delete s.traces[key];
      }
      break;
    }
    case 'select':
      s.selected = bounded(action.point,0,s.reach); s.ready = false;
      if(isOptic(s,s.selected)) s.loopSide=s.selected===0?'local':'remote';
      if (s.selected === 0 && s.tool === 'vfl') s.tool = 'link';
      break;
    case 'tool':
      if (!['link','loop','vfl'].includes(action.tool) || (action.tool === 'vfl' && s.reach === 0)) return state;
      if(action.tool==='vfl'&&!validTrace(s,traceFrom(s),s.selected)) {
        s.vflFrom=loopSource(s)<=s.reach?loopSource(s):0;
        if(s.selected===s.vflFrom)s.selected=s.vflFrom===0?1:s.count;
      }
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
      {const all=s.reach===s.count+1,remoteSelected=s.selected===s.count+1,remoteFault=s.fault.kind.startsWith('optic_')&&s.fault.at===s.count+1;
        s.count=bounded(action.value,1,4);s.reach=all?s.count+1:Math.min(s.reach,s.count);
        if(remoteSelected)s.selected=s.count+1;if(remoteFault)s.fault.at=s.count+1;}
      s.selected = Math.min(s.selected,s.reach); s.fault.at = Math.min(s.fault.at,s.count+1); clear(); break;
    case 'reach': s.reach = bounded(action.value,0,s.count+1); s.selected = Math.min(s.selected,s.reach); if(s.reach<=s.count)s.loopSide='local'; clear(); break;
    case 'port': {
      const point=action.point===undefined?s.selected:Number(action.point);
      if (!Number.isInteger(point) || point<1 || point>Math.min(s.reach,s.count)) return state;
      s.ports[point-1] = bounded(action.value,1,32); clear(); break;
    }
    case 'fault':
      s.fault = { ...s.fault, ...action.value };
      if (!Object.hasOwn(faults,s.fault.kind)) return state;
      s.fault.at = s.fault.kind.startsWith('optic_') ? Number(s.fault.at)===s.count+1?s.count+1:0 : bounded(s.fault.at,['dirty','loose','none'].includes(s.fault.kind) ? 0 : 1,s.count+1);
      s.fault.strand = ['tx','rx','both'].includes(s.fault.strand) ? s.fault.strand : 'both';
      s.fault.severity = s.fault.severity === 'weak' ? 'weak' : 'dark'; clear(); break;
    case 'record': {
      if (!s.ready || s.tool === 'link') return state;
      s.service='unknown';
      if (s.tool === 'loop') {
        const loops=loopResults(s),distance=point=>Math.abs(Number(point)-loopSource(s));
        const result = s.simulated ? simulatedLoop(s) : action.result;
        if (!Object.hasOwn(loopLabels,result)) return state;
        const previous = loops[s.selected];
        if (result !== 'pass' || (previous && previous !== result)) {
          for (const key of Object.keys(loops)) if (distance(key)>distance(s.selected)) delete loops[key];
        }
        if (result === 'pass') {
          for (const key of Object.keys(loops)) if (distance(key)<distance(s.selected)&&loops[key]!=='pass') delete loops[key];
        }
        loops[s.selected] = result;
        appendObservation(s,'loop',String(s.selected),result);
      } else {
        const stop=traceStop(s);
        if(!validTrace(s,traceFrom(s),s.selected)||stop?.blocked||stop?.closed) return state;
        const result = s.simulated ? simulatedTrace(s) : action.result;
        if (!Object.hasOwn(traceLabels,result)) return state;
        delete s.comparisons?.[traceKey(s)];
        s.traces[traceKey(s)] = result;
        appendObservation(s,'vfl',traceKey(s),result);
      }
      break;
    }
    case 'retest':
      s.round=(s.round??1)+1; s.loops={}; s.remoteLoops={}; s.traces={}; s.identity={}; s.comparisons={}; s.ready=false; s.service='unknown'; break;
    case 'clear': clear(); break;
    default: return state;
  }
  for(const key of Object.keys(s.comparisons??{})) if(s.traces[key]!=='dark') delete s.comparisons[key];
  if (s.tool === 'vfl' && !validTrace(s,traceFrom(s),s.selected)) {
    s.tool='link'; s.ready=false;
  }
  return s;
}

function sideLoopAssessment(s,side) {
  const source=side==='remote'?s.count+1:0,dir=side==='remote'?-1:1;
  const pairs=Object.entries(loopResults(s,side)).map(([p,r])=>[Number(p),r]).sort((a,b)=>dir*(a[0]-b[0]));
  if(!pairs.length)return null;
  const passes=pairs.filter(([,r])=>r==='pass').map(([p])=>p);
  const lastPass=passes.length?passes.at(-1):-1;
  const fail=pairs.find(([p,r])=>r!=='pass'&&(lastPass<0||dir*(p-lastPass)>0));
  const result=(title,why,next,extra={})=>({title,why,next,tone:'neutral',from:null,to:null,lastPass,...extra});
  if(side==='local') {
    if (s.loops[0] && s.loops[0] !== 'pass') return result('Start at the optic and test setup',
      'The direct loop did not pass. The external fiber path is bypassed.',
      'Inspect → clean if needed → reinspect. Verify seating, loop mapping / attenuation and host status. Compare a known-good optic with the same valid test.',
      { tone:'suspect',from:0,to:0 });
    if (fail) return result(lastPass >= 0 ? `Narrowed to ${pointName(lastPass,s)} → ${pointName(fail[0],s)}` : `Not isolated yet: loop at ${pointName(fail[0],s)} failed`,
      lastPass >= 0 ? `The loop passed at ${pointName(lastPass,s)} but ${fail[1] === 'weak' ? 'returned weak light' : 'had no return light'} at ${pointName(fail[0],s)}.` : 'A failed passive loop includes the optic, fiber, connections and loop setup.',
      lastPass >= 0 ? fail[0]>lastPass+1?`Recheck the failed loop setup. Then loop at ${pointName(lastPass+1,s)} to narrow this larger section before tracing.`:'Recheck the loop setup, then inspect the added section and its connections. Use VFL for routing / continuity; measure loss for attenuation.' : 'Try a valid LC loop directly at the optic to separate the optic / setup from the external path.',
      {tone:'suspect',from:Math.max(0,lastPass),to:fail[0], suggestion:lastPass < 0 ? {point:0,tool:'loop'} : {point:Math.min(lastPass+1,Math.min(s.reach,s.count)),tool:fail[0]>lastPass+1?'loop':'vfl'}});
    if (lastPass >= 0) return result(`Loop passed to ${pointName(lastPass,s)}`,
      'The tested pair returned light within the limits you checked. This does not verify the live link, all MMC fibers or end-to-end polarity.',
      lastPass < Math.min(s.reach,s.count) ? `Move the loop to ${pointName(lastPass+1,s)}. Compare the result with this passed test.` : 'Remove the loop and restore the mapped link. Check the remote optic if accessible, then verify readings and link status at both ends.',
      {tone:'pass', suggestion:lastPass < Math.min(s.reach,s.count) ? {point:lastPass+1,tool:'loop'} : {point:lastPass,tool:'link'}});

  }
  const loopAt=pointName(lastPass,s),failedAt=fail&&pointName(fail[0],s);
  const suggestion=(point,tool='loop')=>({point,tool,side:'remote'});
  if(loopResults(s,side)[source]&&loopResults(s,side)[source]!=='pass') return result('Check the remote optic and loop setup',
    'The remote direct loop failed. Its external fiber is bypassed; local optic results are separate.',
    'Inspect, clean and reseat the remote optic and LC loop. Verify loop mapping, attenuation and host status; compare a compatible known-good setup.',
    {tone:'suspect',from:source,to:source,loopSide:side,suggestion:suggestion(source)});
  if(fail) return result(`Remote loop failed at ${failedAt}`,
    lastPass>=0?`Remote light returned at ${loopAt}, but the loop failed at ${failedAt}.`:'This remote loop includes the remote optic, added fiber, connections and loop setup.',
    lastPass<0?'Loop directly at the remote optic first. Then extend toward the local device one cassette at a time.':'Recheck the failed loop setup. Test the section added toward the local device; compare its connections before replacing a part.',
    {tone:'suspect',from:lastPass<0?fail[0]:Math.min(lastPass,fail[0]),to:lastPass<0?source:Math.max(lastPass,fail[0]),loopSide:side,
      suggestion:suggestion(lastPass<0?source:Math.max(1,lastPass-1)),lastPass});
  if(lastPass>=0) return result(`Remote loop passed to ${loopAt}`,
    'The remote optic returned light through this tested pair. This does not prove the local optic or the restored live link.',
    lastPass>1?`Move the remote-facing loop to ${pointName(lastPass-1,s)} and compare the result.`:'Compare with local-side checks, then Normalize and verify the mapped live link at both ends.',
    {tone:'pass',loopSide:side,suggestion:lastPass>1?suggestion(lastPass-1):{tool:'link',point:lastPass},lastPass});
  return null;
}
function combinedLoopAssessment(s) {
  const fromSide=(a,side)=>a?.suggestion?.tool==='loop'&&s.loopSide!==side?{...a,suggestion:{...a.suggestion,side}}:a;
  const local=fromSide(sideLoopAssessment(s,'local'),'local'),remote=fromSide(sideLoopAssessment(s,'remote'),'remote');
  const failed=[local,remote].filter(a=>a?.tone==='suspect');
  if(failed.length) {
    const chosen=failed.find(a=>a.from===a.to)??(s.loopSide==='remote'&&remote?.tone==='suspect'?remote:failed[0]);
    const other=failed.find(a=>a!==chosen);
    const opposite=chosen===remote?local:remote;
    const overlaps=opposite?.tone==='pass'&&chosen.from!==chosen.to&&(chosen===remote?opposite.lastPass>=chosen.to:opposite.lastPass<=chosen.from);
    return {...chosen,...(other?{caution:other.title}:overlaps?{caution:'An opposite-end loop passed across this section. Recheck the tested pair, mating faces, loop setup and optic limits; these results do not yet identify a failed part.'}:{})};
  }
  if(local&&remote) {
    const left=local.lastPass,right=remote.lastPass,gap=left<right;
    return {title:gap?'Checks from both ends leave an untested section':'Loop coverage meets from both ends',
      why:`Local checks reach ${pointName(left,s)}. Remote checks reach ${pointName(right,s)}.`,
      next:gap?'Test the section between these points, including both cassette connections. A gap in coverage is not proof of a faulty component.':'Remove the loops, Normalize, confirm the mapped TX-to-RX pairing, then verify readings and link status at both devices.',
      tone:gap?'neutral':'pass',from:gap?left:null,to:gap?right:null,lastPass:left,
      evidencePath:[`Local → ${pointName(left,s)}`,`Remote → ${pointName(right,s)}`],
      suggestion:gap?{point:Math.min(left+1,s.count),tool:'loop',side:'local'}:{point:0,tool:'link'}};
  }
  return remote??local;
}

function basicAssessment(s) {
  const pairs = Object.entries(s.loops).map(([point,result]) => [Number(point),result]).sort((a,b) => a[0]-b[0]);
  const passed = pairs.filter(([,r]) => r === 'pass').map(([p]) => p);
  const lastPass = passed.length ? Math.max(...passed) : -1;
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
    'You confirmed the required readings and link status at the accessible devices after removing the tools.',
    'Record the work and readings. This does not identify the original cause or verify every other channel.',{tone:'pass',complete:true});
  if(s.tool==='link' && s.service==='bad') return result('The restored link still needs checking',
    'Loop tests do not prove the restored end-to-end pairing or live link.',
    'Verify FIM ports and TX-to-RX pairing. Compare both optic tests and trace accessible strands; keep untested sections unverified.',
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
      `No visible light at ${fiberPointName(s.selected,s)} does not identify a break or its exact position along ${traceName(s)}.`,
      `Verify the VFL and LC connection. ${longRoute?'Choose an intermediate CAS to check a shorter route. ':''}Check nearby ports, seating, end faces, bends and damage; use a loss test / OTDR if needed.`, shared);
    return result('This strand has visible continuity',
      'Red light reached the expected destination. This does not prove acceptable IR loss or optic health.',
      'Trace the other strand, then remove the VFL, restore the mapped path and recheck RX against the optic limits.', shared);
  }
  const loops=combinedLoopAssessment(s);
  if(loops) return loops;
  const tx = s.simulated ? simulatedReadings(s).tx : s.tx;
  if (tx === 'dark') return result('Check why local TX is not emitting',
    'A reported −40 indicates no light / the reporting floor. A fiber polarity mismatch alone does not explain absent local TX output.',
    'Verify the report and lane, port / laser state and optic seating. Then use a supported loop or known-good comparison.',
    {suggestion:{point:0,tool:'loop'}});
  return result('Start with a direct optic loop',
    'A no-light reading tells you what is missing, not why. Test what you can reach.',
    'Place a supported LC loop at either accessible optic. Record its result, then extend from that same device through the passives.',
    {suggestion:{point:s.loopSide==='remote'?s.count+1:0,tool:'loop'}});
}


// Current observations drive guidance. Earlier rounds remain reviewable, never
// silently reused as proof after a repair, repatch or topology change.
function appendObservation(s,kind,key,result) {
  s.started=true;
  s.history=[...(s.history??[]),{kind,key,result,round:s.round??1,
    ports:s.ports.slice(0,s.count),count:s.count,...(kind==='loop'?{source:s.loopSide}:{}),...(kind==='vfl'&&traceStop(s)?.port?{port:traceStop(s).port}:{})}].slice(-100);
}
const observationValue=(s,entry)=> {
  if(entry.kind==='identity') return s.identity?.[entry.key]===true?'confirmed':s.identity?.[entry.key]===false?'unchecked':undefined;
  if(entry.kind==='comparison') {const r=parseComparisonKey(entry.key);return r?s.comparisons?.[r.trace]?.[r.step]:undefined;}
  return (entry.kind==='loop'?loopResults(s,entry.source??'local'):s.traces)[entry.key];
};
export function caseHistory(s) {
  const history=s.history??[];
  return history.map((entry,index)=>({...entry,current:entry.round===(s.round??1) &&
    observationValue(s,entry)===entry.result &&
    !history.slice(index+1).some(e=>e.kind===entry.kind&&e.key===entry.key&&(e.source??'local')===(entry.source??'local'))}));
}
export function restoreCaseHistory(s,raw) {
  // Preserve old CAS-source observations as history, never reassign them to an LC source.
  const priorTraces={...s.traces};
  s.traces=Object.fromEntries(Object.entries(s.traces).filter(([key])=>{const r=parseTraceKey(key);return r&&validTrace(s,r.from,r.to);}));
  if(s.tool==='vfl'&&!validTrace(s,traceFrom(s),s.selected)) {s.tool='link';s.ready=false;}

  s.identity=Object.fromEntries(Object.keys(identityLabels).filter(k=>typeof raw.identity?.[k]==='boolean').map(k=>[k,raw.identity[k]]));
  s.comparisons={};
  for(const [key,values] of Object.entries(raw.comparisons??{})) {
    if(s.traces[key]!=='dark'||!values||typeof values!=='object') continue;
    for(const step of Object.keys(comparisonLabels)) if(Object.hasOwn(comparisonLabels[step],values[step])) {
      if(step!=='source'&&s.comparisons[key]?.source!=='pass') continue;
      if(step!=='source'&&!identityConfirmed(s)) continue;
      if(step==='substitute'&&!s.comparisons[key]?.inspection) continue;
      (s.comparisons[key]??={})[step]=values[step];
    }
  }
  s.round=Number.isInteger(raw.round)&&raw.round>0?raw.round:1;
  s.history=Array.isArray(raw.history)?raw.history.filter(e=>e && Number.isInteger(e.round)&&e.round>0&&e.round<=s.round &&
    (e.kind==='loop'?/^[0-5]$/.test(e.key)&&Object.hasOwn(loopLabels,e.result):
      e.kind==='vfl'?parseTraceKey(e.key)&&Object.hasOwn(traceLabels,e.result):
      e.kind==='identity'?Object.hasOwn(identityLabels,e.key)&&['confirmed','unchecked'].includes(e.result):
      e.kind==='comparison'&&parseComparisonKey(e.key)&&Object.hasOwn(comparisonLabels[parseComparisonKey(e.key).step],e.result)))
    .slice(-100).map(e=>({kind:e.kind,key:String(e.key),result:e.result,round:e.round,
      count:bounded(e.count??e.ports?.length??s.count,1,4),...(e.kind==='loop'?{source:e.source==='remote'?'remote':'local'}:{}),
      ports:Array.isArray(e.ports)?e.ports.slice(0,4).map(p=>bounded(p,1,32)):[],
      ...(Number.isInteger(e.port)&&e.port>=1&&e.port<=32?{port:e.port}:{})})):[];
  if(!s.history.length) {
    for(const {point,result,side} of loopEntries(s)) {appendObservation(s,'loop',String(point),result);s.history.at(-1).source=side;}
    for(const [key,result] of Object.entries(priorTraces)) appendObservation(s,'vfl',key,result);
  }
  s.started=Boolean(raw.started)||s.tool!=='link'||s.history.length>0;
  return s;
}
export function canVerifyService(s) {
  return !s.simulated && s.tool==='link' && !s.disconnected?.length &&
    !Object.values(s.patches??{}).some(p=>p.front===false||p.rear===false) &&
    Object.entries(s.patches??{}).every(([point,p])=>p.port===s.ports[Number(point)-1]) &&
    loopEntries(s).length+Object.keys(s.traces).length>0;
}
const strandLetter=strand=>strand==='tx'?'A':'B';
const routeDescription=(s,r)=>`${fiberPointName(r.from,s)} → ${fiberPointName(r.to,s)}${r.head?' · loose MMC head':!isOptic(s,r.to)?s.vflPointChecks?` · Port ${patchAt(s,r.to).port}`:' · through CAS':''}`;
const traceCheck=(r,label)=>({tool:'vfl',from:r.from,to:r.to,strand:r.strand,head:Boolean(r.head),label});

// Bound a dark observation using only the same source, strand and direction.
// A ferrule holds multiple fibers: a passing neighbor never clears this strand.
function vflBoundary(entries,dark) {
  const direction=Math.sign(dark.to-dark.from),distance=r=>Math.abs(r.to-r.from)*2-(r.head?1:0);
  const related=entries.filter(r=>r.from===dark.from&&r.strand===dark.strand&&Math.sign(r.to-r.from)===direction);
  const farther=related.find(r=>r.result==='seen'&&distance(r)>distance(dark));
  const earlier=related.filter(r=>r.result==='seen'&&distance(r)<distance(dark)).sort((a,b)=>distance(b)-distance(a))[0];
  const kind=farther?'recheck':earlier?.to===dark.to&&earlier.head?'mmc-cas-contact':'fiber-contacts';
  const label=kind==='recheck'?'Recheck observations':kind==='mmc-cas-contact'?'MMC / CAS contact suspect':'Fiber / contacts suspect';
  const isolation={kind,label,strand:dark.strand,from:Math.min(earlier?.to??dark.from,dark.to),to:Math.max(earlier?.to??dark.from,dark.to)};
  return {related,earlier,farther,isolation};
}

// These are comparison observations about the original dark route, not new
// continuity passes. A different source, strand, direction or endpoint never
// inherits them. Hardware principles: US Conec MMC/TMT; Fluke fiber testing.
export function comparisonGuide(s,key) {
  const r=parseTraceKey(key);
  if(!r||s.traces[key]!=='dark') return null;
  const c=s.comparisons?.[key]??{},letter=strandLetter(r.strand);
  const diagnostic=(step,next,extra={})=>({next,diagnostic:{key,step,options:Object.entries(comparisonLabels[step])},...extra});
  const terminal=(next,extra={})=>({next,diagnostic:{key,step:null,options:[]},...extra});
  if(c.source!=='pass') return diagnostic('source',
    `Check the VFL on a known-good LC reference using the same LC connection used for ${letter}. Does the reference pass light?`,
    c.source==='fail'?{comparisonFinding:'The reference is also dark. Check the VFL, LC connection and reference lead before blaming the installed fiber.'}:{});
  if(!identityConfirmed(s)) return terminal('Confirm the device / optic socket, follower-to-head serial, CAS ports and expected channel in “Match the physical path”. A working strand can still belong to the wrong fanout.',{needsIdentity:true,comparisonFinding:'The VFL reference passes. The intended fiber identity still needs confirmation.'});
  if(!c.inspection) return diagnostic('inspection',
    `Turn the VFL off and isolate from active gear. Inspect the mapped ${letter} fiber end faces with a compatible inspection probe. Clean and reinspect as needed; check seating and visible bends. Retest the original route before continuing.`,
    {comparisonFinding:'Reference and mapping checked. Inspect the individual fiber contacts, not just the outside of the MMC.'});
  if(c.inspection==='damage') return terminal('Record which end / component shows damage. Replace or repair it using the approved procedure, then choose “Made a change · retest” and check both strands and optical readings.',
    {comparisonFinding:'Visible damage is a concrete finding. It may explain the dark strand; a post-repair test must confirm recovery.'});
  if(!c.substitute) return diagnostic('substitute',
    r.head||isOptic(s,r.to)?`Compare one known-good compatible cable / fanout in place of the suspect assembly, keeping the same VFL, LC attachment and mapped ${letter} channel. Record the replacement result; the diagram still shows the original observations.`:
    `Compare one known-good compatible mating lead / connection at CAS ${r.to}, keeping the source and mapped ${letter} channel unchanged. Record the comparison separately from the original path.`,
    {comparisonFinding:c.inspection==='clear'?'Clean end faces did not restore continuity. Compare one component at a time.':'End-face condition remains unknown. A compatible spare can still help narrow the assembly.'});
  if(c.substitute==='light') return terminal('The original assembly or its mating contact is implicated. Record the replaced part; use end-face inspection and loss testing to separate connector / ferrule contact from an internal fiber fault. Retest both strands after the actual repair.',
    {comparisonFinding:'The compatible replacement passes where the original did not. This supports an assembly / connection problem; it does not prove a damaged ferrule.'});
  if(c.substitute==='dark') return terminal('Both assemblies were dark in this setup. Recheck the VFL, LC attachment and channel mapping. The original assembly is not cleared. Use a loss test and, where suitable, OTDR to locate an unresolved fault.',
    {comparisonFinding:'Replacing that assembly did not restore visible continuity. Investigate what stayed common to both tests.'});
  return terminal('Keep this strand and its connections suspect. Use an optical loss test to quantify loss and a suitable OTDR to locate events, or hand off these recorded checks to someone with access / equipment.',
    {comparisonFinding:'No compatible comparison is available. The evidence does not yet distinguish the termination, bend, break or splice.'});
}

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
      from:Math.min(g.from,g.to),to:Math.max(g.from,g.to),route:routeDescription(s,g),pair,...extra,
      active:rows.some(r=>r.key===activeKey)});
    const output=r=>['seen','weak'].includes(r?.result)?r.strand:r?.result==='swapped'?(r.strand==='tx'?'rx':'tx'):null;
    if(a&&b&&output(a)&&output(a)===output(b)) {
      make(100,'These channel results conflict','Both input strands were recorded at the same output channel.',
        'Confirm A / B labels and test one strand at a time. Recheck the same setup before changing polarity.',
        {check:traceCheck(a,'Recheck strand A'),branches:[['Separate outputs','Compare with the documented channel map.'],['Still the same output','Verify labels, LC attachment and test setup.']]});
      continue;
    }
    const wrong=rows.find(r=>r.result==='wrong');
    const portMismatch=!isOptic(s,g.to)&&patchAt(s,g.to).port!==s.ports[g.to-1];
    if(wrong || portMismatch) {
      make(90,'The observed route does not match FIM',portMismatch?`Patched port ${patchAt(s,g.to).port}; expected port ${s.ports[g.to-1]}.`:'Light was reported at a different port.',
        'Verify the device, LC follower, MMC serial and FIM destination. Correct the patch only after confirming the mapping, then start a retest.',
        {branches:[['Mapping matches','Recheck the strand and viewing point.'],['Mapping differs','Correct the confirmed misport, then retest.']]});
      continue;
    }
    const dark=rows.find(r=>r.result==='dark');
    if(dark) {
      const dir=Math.sign(dark.to-dark.from);
      const {related,earlier,farther,isolation}=vflBoundary(entries,dark);
      const both=rows.every(r=>r.result==='dark')&&rows.length===2;
      const letter=strandLetter(dark.strand);
      if(farther) {
        make(100,'The location results need a recheck',`Strand ${letter} was dark at ${fiberPointName(dark.to,s)} but seen farther along the same route.`,
          'Confirm the source, strand and patching stayed the same. Recheck the dark point; these observations cannot yet isolate a fault.',
          {isolation,check:traceCheck(dark,`Recheck ${fiberPointName(dark.to,s)} · ${letter}`)});
        continue;
      }
      // A dark incoming head already explains why the through-CAS check is
      // dark. Continue the head investigation instead of asking to repeat it.
      if(!dark.head&&!isOptic(s,dark.to)&&related.some(r=>r.head&&r.to===dark.to&&r.result==='dark')) continue;
      const headPass=earlier?.to===dark.to&&earlier.head;
      const passing=rows.find(r=>r.result==='seen'),goodLetter=passing?strandLetter(passing.strand):null;
      const title=headPass?`Strand ${letter}: check the MMC / CAS connection`:both?'Both strands are dark here':a?.result==='seen'||b?.result==='seen'?`Strand ${letter} is dark; the other has light`:`Strand ${letter}: no light recorded here`;
      const why=headPass?'The incoming fiber passes visible light to the loose MMC head. The dark through-CAS result makes this channel’s mating contact suspect: contamination, damage, alignment or seating.':passing?`${goodLetter} passes visible light; ${letter} does not. The MMC ferrule holds separate fibers. Investigate ${letter}’s fiber and its end-face contacts; ${goodLetter} passing does not clear them.`:earlier?`Last light: ${fiberPointName(earlier.to,s)}. First dark check: ${fiberPointName(dark.to,s)}. The added section and connections need checking.`:'This is a failed continuity observation. It does not identify which part is bad.';
      const from=earlier?Math.min(earlier.to,dark.to):Math.min(dark.from,dark.to);
      const to=earlier?Math.max(earlier.to,dark.to):Math.max(dark.from,dark.to);
      if(!s.vflPointChecks&&!dark.head&&!isOptic(s,dark.to)&&!headPass) {
        make(80,title,why,`Keep the VFL on LC ${letter}. Verify its LC connection, then unplug the incoming MMC at CAS ${dark.to} and check its loose head for light.`,
          {from,to,isolation,...(earlier?{evidencePath:[`${fiberPointName(earlier.to,s)} · ${letter} light seen`,`${fiberPointName(dark.to,s)} · ${letter} dark`]}:{}),check:traceCheck({...dark,head:true},`Check loose MMC · strand ${letter}`),
            branches:[['Light at the head','Inspect seating, end faces and the CAS connection.'],['Head also dark','Work back toward the source; check fiber and earlier connections.']]});
      } else if(headPass) {
        make(85,title,why,'Inspect both mating ends; clean and reinspect as needed. Verify seating and the mapped CAS port, then retest through the CAS.',
          {from,to,isolation,evidencePath:[`MMC head · ${letter} light seen`,`CAS ${dark.to} port · ${letter} dark`],check:traceCheck(dark,`Retest through CAS ${dark.to} · ${letter}`),
            branches:[['Light returns','Retest both strands, then verify optical readings.'],['Still dark','Compare a known-good compatible connection to isolate the failing part.']]});
      } else {
        const previous=dark.to-dir;
        const check=previous!==dark.from&&!related.some(r=>r.to===previous&&!r.head)?traceCheck({...dark,to:previous,head:false},`Check ${fiberPointName(previous,s)} · ${letter}`):null;
        const scope=dark.head?`At the loose head, the receiving CAS ${dark.to} mating connection is bypassed. Check the incoming assembly and source-side connections.`:
          'The optic is disconnected from this VFL trace. Check the mapped fiber, its terminations and the source-side connection.';
        const guide=check?{}:s.simulated?{next:'Verify the source and mapped channel, inspect the individual fiber contacts, then compare one compatible assembly at a time. In a real case, record these checks in Find my problem.'}:comparisonGuide(s,dark.key);
        make(80,title,why,
          check?`Keep the source and strand unchanged. Check ${fiberPointName(previous,s)} to shorten the suspect section.`:guide.next,
          {from,to,isolation,scope,...(earlier?{evidencePath:[`${fiberPointName(earlier.to,s)} · ${letter} light seen`,`${fiberPointName(dark.to,s)} · ${letter} dark`]}:{}),check,...guide,
            ...(check?{branches:[['Earlier point has light','Investigate the section added after that point.'],['Earlier point is dark','Move toward the source and verify the VFL setup.']]}:{})});
      }
      continue;
    }
    const weak=rows.find(r=>r.result==='weak');
    if(weak) {
      const letter=strandLetter(weak.strand);
      const head=entries.find(r=>r.head&&r.from===weak.from&&r.to===weak.to&&r.strand===weak.strand);
      const checkHead=!s.vflPointChecks&&!weak.head&&!isOptic(s,weak.to)&&!head;
      const distance=r=>Math.abs(r.to-r.from)*2-(r.head?1:0);
      const earlier=entries.filter(r=>r.from===weak.from&&r.strand===weak.strand&&r.result==='seen'&&
        Math.sign(r.to-r.from)===Math.sign(weak.to-weak.from)&&distance(r)<distance(weak)).sort((a,b)=>distance(b)-distance(a))[0];
      make(75,`Strand ${letter}: weak light reported`,'Dim VFL light is a visual observation, not a loss measurement.',
        checkHead?'Keep the VFL on this LC strand. Compare the loose incoming MMC head with the through-CAS result; inspect the mating connection if the glow changes there.':head?.result==='seen'?
          'Inspect both mating ends; clean and reinspect as needed. Verify seating and the mapped CAS port, then retest through the CAS.':
          'Check the VFL and LC seating with a known-good reference lead. Inspect the mapped fiber ends and bends, then use an optical loss test to measure loss.',
        {from:Math.min(earlier?.to??weak.from,weak.to),to:Math.max(earlier?.to??weak.from,weak.to),
          check:traceCheck({...weak,head:checkHead||weak.head},checkHead?`Check loose MMC · strand ${letter}`:`Recheck ${fiberPointName(weak.to,s)} · ${letter}`)});
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
          branches:[['Other strand has light','Both have visible continuity at this point.'],['Other strand is dark',s.vflPointChecks?'Inspect the strand and its connections; compare with an earlier CAS.':'Separate the incoming head from the CAS connection.']]});
    } else {
      const distance=r=>Math.abs(r.to-r.from)*2-(r.head?1:0);
      const covered=rows.every(row=>entries.some(r=>r.from===g.from&&r.strand===row.strand&&r.result==='seen'&&
        Math.sign(r.to-r.from)===Math.sign(g.to-g.from)&&distance(r)>distance(g)));
      if(covered) continue; // A completed onward check supersedes this earlier success.
      const nextPoint=g.to+Math.sign(g.to-g.from);
      make(10,g.head?'Both strands reach the loose MMC head':'Both strands have visible continuity here',
        g.head?'The cassette connection has not yet been checked.':'This does not prove acceptable IR loss, optic health or the remote link.',
        g.head?'Seat the head in its mapped port, then check through the cassette.':nextPoint>=0&&nextPoint<=s.reach?'Continue to the next accessible point and check both strands.':'Normalize the path, then verify the required optical readings and link status.',
        {check:g.head?traceCheck({...rows[0],head:false},'Check through the CAS'):nextPoint>=0&&nextPoint<=s.reach?traceCheck({...rows[0],to:nextPoint,head:false},`Continue to ${fiberPointName(nextPoint,s)}`):null,
          ...(!g.head&&(nextPoint<0||nextPoint>s.reach)?{suggestion:{tool:'link',point:g.to}}:{})});
    }
  }
  findings.sort((a,b)=>b.priority-a.priority||Number(b.active)-Number(a.active)||Math.abs(b.to-b.from)-Math.abs(a.to-a.from));
  const best=findings[0];
  if(!best) return null;
  const failure=loopEntries(s).find(e=>e.result!=='pass'),failedLoop=failure?[failure.point,failure.result]:null;
  if(failedLoop) {
    best.caution=`${pointName(failure.side==='remote'?s.count+1:0,s)} · Loop at ${pointName(Number(failedLoop[0]),s)}: ${loopLabels[failedLoop[1]]}. VFL continuity does not clear this optical test.`;
    if(best.priority<50) {
      best.title='Visible light does not clear the failed loop'; best.tone='suspect';
      best.next='Verify the loop setup and inspect the connections. Recheck the loop against the optic limits; measure loss if the return remains weak.';
      best.check=null; best.branches=[['Loop passes','Restore the mapped path and verify the live link.'],['Loop still fails','Continue isolating the optic / setup or added fiber section.']];
      best.suggestion={tool:'loop',point:Number(failedLoop[0]),side:failure.side};
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
    const failure=loopEntries(s).find(e=>e.result!=='pass'),failedLoop=failure?[failure.point,failure.result]:null;
    return {...basic,...(traces?.tone==='suspect'?{caution:`Unresolved finding: ${traces.title}.`}:failedLoop?{caution:`Unresolved loop: ${pointName(Number(failedLoop[0]),s)} · ${loopLabels[failedLoop[1]]}.`}:{})};
  }
  if(!traces || s.tool==='link'&&s.service==='bad'&&traces.tone!=='suspect') return basic;
  if(s.tool==='link'&&s.service==='bad') traces.caution='The restored link still has a problem. These recorded findings remain unresolved.';
  // Keep the failed optic test visible while still retaining any VFL findings.
  if(loopEntries(s).some(e=>e.result!=='pass'&&isOptic(s,e.point))&&s.tool==='loop') return {...basic,caution:traces.title};
  return {...traces,lastPass:basic.lastPass};
}

export function nextCheckActions(s) {
  const check=assessment(s).check;
  if(!check) return [];
  if(!validTrace(s,check.from,check.to)) return [];
  const actions=[{type:'trace',from:check.from,to:check.to},{type:'strand',value:check.strand}];
  if(s.vflPointChecks) return actions;
  const direction=Math.sign(check.to-check.from),incoming=direction>0?'rear':'front',outgoing=direction>0?'front':'rear';
  // A guided next check positions the diagram only. It never records a result.
  for(let p=check.from+direction;direction>0?p<check.to:p>check.to;p+=direction) if(!isOptic(s,p)) {
    for(const side of ['rear','front']) actions.push({type:'patch',point:p,side,connected:true});
  }
  if(!isOptic(s,check.from)) actions.push({type:'patch',point:check.from,side:outgoing,connected:false});
  if(!isOptic(s,check.to)) actions.push({type:'patch',point:check.to,side:incoming,connected:!check.head},{type:'patch',point:check.to,side:outgoing,connected:false});
  return actions;
}

export function caseStatus(s) {
  const count=loopEntries(s).length+Object.keys(s.traces).length;
  const a=assessment(s);
  if(a.complete) return {label:'Link verified',stage:3,count};
  if(s.round>1&&!count) return {label:'Retest · earlier checks kept',stage:1,count};
  if(count&&(a.tone==='suspect'||loopEntries(s).some(e=>e.result!=='pass')||Object.values(s.traces).some(r=>r!=='seen'))) return {label:'Issue found · keep isolating',stage:2,count};
  if(count) return {label:'Checks recorded · link unverified',stage:2,count};
  if(s.started||s.tool!=='link') return {label:'Case active · waiting for a result',stage:1,count};
  return {label:'Ready · place a tool to begin',stage:0,count};
}


// Coverage is evidence from this case, not a live power reading. A loop checks
// the illustrated pair; VFL checks only its recorded strand and route.
export function pathCoverage(s) {
  const passes=Object.entries(s.loops).filter(([,r])=>r==='pass').map(([p])=>Number(p));
  const lastLoopPass=passes.length?Math.max(...passes):-1;
  const remotePasses=Object.entries(s.remoteLoops??{}).filter(([,r])=>r==='pass').map(([p])=>Number(p));
  const firstRemotePass=remotePasses.length?Math.min(...remotePasses):s.count+2;
  const points=Array.from({length:s.count+2},(_,point)=>({point,loop:point<=lastLoopPass||point>=firstRemotePass?'pass':'unknown',head:{},port:{},issue:false}));
  const spans=Array.from({length:s.count+1},(_,index)=>({point:index+1,lanes:Object.fromEntries(['tx','rx'].map(strand=>[strand,{loop:index+1<=lastLoopPass||index>=firstRemotePass,localLoop:index+1<=lastLoopPass,remoteLoop:index>=firstRemotePass,vfl:false,issue:false,status:'unknown'}]))}));
  const traces=Object.entries(s.traces).map(([key,result])=>({...parseTraceKey(key),result}));
  const mark=(from,to,strand,field)=>{
    for(const span of spans) if(span.point>Math.min(from,to)&&span.point<=Math.max(from,to)) span.lanes[strand][field]=true;
  };
  for(const r of traces) {
    if(points[r.to]) points[r.to][r.head?'head':'port'][r.strand]=r.result;
    if(r.result==='seen') mark(r.from,r.to,r.strand,'vfl');
  }
  for(const {point,result,side} of loopEntries(s)) if(result!=='pass') {
    if(points[point]) points[point].issue=true;
    const passed=side==='remote'?Math.min(s.count+1,firstRemotePass):Math.max(0,lastLoopPass);
    for(const strand of ['tx','rx']) mark(passed,point,strand,'issue');
  }
  for(const r of traces.filter(r=>r.result!=='seen')) {
    const distance=entry=>Math.abs(entry.to-entry.from)*2-(entry.head?1:0);
    const previous=traces.filter(t=>t.result==='seen'&&t.from===r.from&&t.strand===r.strand&&
      Math.sign(t.to-t.from)===Math.sign(r.to-r.from)&&distance(t)<distance(r))
      .sort((a,b)=>distance(b)-distance(a))[0];
    mark(previous?.to??r.from,r.to,r.strand,'issue');
    if(!isOptic(s,r.to)&&points[r.to]) points[r.to].issue=true;
  }
  for(const span of spans) for(const lane of Object.values(span.lanes)) {
    lane.status=lane.issue?'suspect':lane.loop?'loop':lane.vfl?'vfl':'unknown';
  }
  const optic=s.loops[0]&&s.loops[0]!=='pass'?'suspect':lastLoopPass>=0?'pass':'unknown';
  let txThrough=0;
  if(optic==='pass'&&connectionAt(s,0)==='plugged') {
    for(const span of spans) {
      if(span.lanes.tx.status!=='loop'||!span.lanes.tx.localLoop||connectionAt(s,span.point)!=='plugged'||points[span.point].port.tx&&points[span.point].port.tx!=='seen') break;
      txThrough=span.point;
    }
  }
  const remoteOptic=s.remoteLoops?.[s.count+1]&&s.remoteLoops[s.count+1]!=='pass'?'suspect':firstRemotePass<=s.count+1?'pass':'unknown';
  let remoteTxThrough=s.count+1;
  if(remoteOptic==='pass'&&connectionAt(s,s.count+1)==='plugged') {
    for(const span of [...spans].reverse()) {
      const point=span.point-1;
      if(span.lanes.rx.status!=='loop'||!span.lanes.rx.remoteLoop||connectionAt(s,point)!=='plugged'||points[point].port.rx&&points[point].port.rx!=='seen') break;
      remoteTxThrough=point;
    }
  }
  return {optic,remoteOptic,lastLoopPass,firstRemotePass,points,spans,txThrough,remoteTxThrough};
}

// Recorded VFL continuity for one LC source only. Physical emission still uses
// traceStop; unplugging a connector cannot turn history into live light.
export function vflProgress(s) {
  const from=traceFrom(s),direction=from===0?1:-1;
  const traces=Object.fromEntries(Object.entries(s.traces).filter(([key])=>parseTraceKey(key)?.from===from));
  const coverage=pathCoverage({...s,traces,loops:{},remoteLoops:{}});
  const entries=Object.entries(traces).map(([key,result])=>({...parseTraceKey(key),result}));
  const isolationAt=(point,strand)=>{
    const failures=entries.filter(r=>r.to===point&&r.strand===strand&&r.result==='dark');
    const dark=failures.find(r=>r.head)??failures[0];
    return dark?vflBoundary(entries,dark).isolation:null;
  };
  const points=[];
  for(let point=from+direction;point>=0&&point<=s.reach;point+=direction) {
    const measured=coverage.points[point],span=coverage.spans[Math.max(point,point-direction)-1];
    points.push({point,lanes:Object.fromEntries(['tx','rx'].map(strand=>[strand,{
      segment:span.lanes[strand].status,
      head:measured.head[strand],through:measured.port[strand],
      result:measured.port[strand]??measured.head[strand],
      headOnly:!measured.port[strand]&&Boolean(measured.head[strand]),
      isolation:isolationAt(point,strand),
    }]))});
  }
  return {from,points};
}
