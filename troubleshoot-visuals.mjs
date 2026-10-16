import {cassetteFront} from './loop-visuals.mjs?v=3';
import {lightFlow} from './light-visuals.mjs?v=1';
import {assessment,pointName,loopLabels,traceLabels,simulatedReadings,connectionAt} from './troubleshoot-state.mjs?v=5';

function opticFace(mode='plugged',strand='tx',trace) {
  const loop=mode==='loop', plugged=mode==='plugged';
  const legs=[81,127].map((y,i)=>{
    const tip=plugged?168:52, boot=tip-40, bend=plugged?22+i*12:4+i*12, bottom=184+i*18;
    const cable=`M${boot} ${y} H${bend+12} Q${bend} ${y} ${bend} ${y+12} V${bottom-12} Q${bend} ${bottom} ${bend+12} ${bottom} H292`;
    const lit=mode==='vfl'&&trace&&trace!=='dark'&&(i===0?strand==='tx':strand==='rx');
    return `<path class="loop-jacket" d="${cable}"/><path class="loop-cord" d="${cable}"/>
      <g class="ts-lc-leg" data-connection="${plugged?'seated':'unplugged'}"><rect class="hardware-boot" x="${boot}" y="${y-6}" width="12" height="12" rx="2"/><rect class="hardware-plug" x="${tip-29}" y="${y-9}" width="29" height="18" rx="2"/>${!plugged?`<rect class="hardware-metal" x="${tip}" y="${y-4}" width="11" height="8"/>`:''}<path class="hardware-grip" d="M${tip-23} ${y-5} v10 m6 -10 v10"/></g>
      ${lit?lightFlow(`M63 ${y} H${boot} ${cable.slice(cable.indexOf(' H')+1)}`,'red'):''}`;
  }).join('');
  const vflY=strand==='tx'?81:127;
  return `<g class="hardware-art"><g transform="translate(80 0)">
    <path class="optic-pull" d="M48 54 V19 H190 V54 H180 V29 H58 V54 Z"/>
    <rect class="hardware-metal" x="54" y="43" width="130" height="120" rx="5"/>
    ${[88,151].map((x,i) => `<rect class="optic-recess" x="${x-23}" y="59" width="46" height="90" rx="3"/>
      ${[81,127].map(y => `<rect class="optic-opening" x="${x-15}" y="${y-13}" width="30" height="27" rx="2"/><circle class="optic-ferrule" cx="${x}" cy="${y}" r="7"/><circle class="optic-core" cx="${x}" cy="${y}" r="3"/>`).join('')}
      <text class="hardware-label hardware-center hardware-small" x="${x}" y="181">${i ? '5' : '1'}</text>`).join('')}
    ${loop ? `<path class="loop-jacket" d="M88 81 H29 Q9 81 9 104 Q9 127 29 127 H88"/><path class="loop-cord" d="M88 81 H29 Q9 81 9 104 Q9 127 29 127 H88"/>
      ${[81,127].map(y => `<rect class="hardware-plug" x="59" y="${y-9}" width="29" height="18" rx="2"/><rect class="hardware-boot" x="48" y="${y-6}" width="12" height="12" rx="2"/>`).join('')}` : ''}
    </g>${legs}
    ${mode==='vfl'?`<g data-mounted-tool="vfl" data-span="1"><rect class="hardware-metal" x="62" y="${vflY-6}" width="10" height="12"/><rect class="ts-vfl" x="70" y="${vflY-14}" width="51" height="28" rx="5"/><text class="ts-vfl-text" x="95" y="${vflY+5}">VFL</text><rect class="ts-tool-handle" x="28" y="${vflY-49}" width="98" height="98" rx="8"><title>VFL attached to the unplugged LC leg. Drag to move or remove.</title></rect></g>`:''}
    </g>`;
}

function passiveFace(s,point,mode) {
  return cassetteFront({name:`CAS ${point}`,port:s.ports[point-1],inserted:mode==='loop',patched:mode==='plugged'})+
    (mode==='plugged'?'':`<g class="hardware-art ts-parked-head"><path class="loop-jacket" d="M1 189 H19"/><path class="loop-cord" d="M1 189 H19"/><rect class="hardware-plug" x="19" y="180" width="43" height="18" rx="3"/><rect class="hardware-metal" x="62" y="184" width="10" height="10"/><text class="hardware-label hardware-small" x="81" y="194">Head unplugged</text></g>`);
}

export function workbenchDiagram(s) {
  const a = assessment(s), loopAssessment=assessment({...s,tool:'link',service:'unknown',disconnected:[]}), centers = Array.from({length:s.count+2},(_,i) => 135+i*290);
  const width = centers.at(-1)+135;
  const looping = s.tool === 'loop', tracing = s.tool === 'vfl';
  const loop = s.loops[s.selected];
  const trace = s.traces[`${s.selected}:${s.strand}`];
  const x = centers[s.selected], start = centers[0], end = centers.at(-1);
  let drawing = '';
  for (let i=0;i<centers.length;i++) {
    const cx = centers[i], remote = i === s.count+1, accessible = i <= s.reach;
    const mode=connectionAt(s,i), isLoop=mode==='loop';
    const handleX=i===0?cx-50:cx-121+(31.5+((s.ports[i-1]-1)%16)*19.8)*242/360-32;
    const handleY=i===0?117:81+(s.ports[i-1]<=16?59:137)*140/208-7;
    drawing += `<g class="ts-node${s.selected===i ? ' ts-selected' : ''}${!accessible ? ' ts-inaccessible' : ''}${s.loops[i]?' ts-observed-'+s.loops[i]:''}" ${accessible ? `role="button" tabindex="0" data-point="${i}" aria-pressed="${s.selected===i}" aria-label="Select ${pointName(i)}${i ? `, port ${s.ports[i-1]}` : ''}"` : ''}>
      <rect class="ts-node-card" x="${cx-128}" y="34" width="256" height="218" rx="12"/>
      <text class="ts-node-title" x="${cx}" y="59">${remote ? 'Remote device' : i===0 ? 'Local optic' : `CAS ${i} · Port ${s.ports[i-1]}`}</text>
      ${i===0 || remote ? `<svg x="${cx-107}" y="68" width="214" height="149.8" viewBox="0 0 300 210">${opticFace(mode,s.strand,trace)}</svg>` :
        `<svg x="${cx-121}" y="81" width="242" height="140" viewBox="0 0 360 208">${passiveFace(s,i,mode)}</svg>`}
      ${isLoop?`<rect class="ts-tool-handle" data-mounted-tool="${i===0?'lc':'mmc'}" x="${handleX}" y="${handleY}" width="72" height="72" rx="9"><title>Drag this loop to move it, or return it to the tray</title></rect>`:''}
      <text class="ts-connection-label ${mode==='plugged'?'':'open'}" x="${cx}" y="230">${mode==='loop'?'Loop inserted · service fiber unplugged':mode==='vfl'?i===0?'VFL on LC leg · optic empty':'VFL on unplugged fiber':mode==='unplugged'?i===0?'LC legs unplugged · optic empty':'MMC head unplugged · port empty':i===0||remote?'LC legs plugged into optic':'MMC head plugged into CAS'}</text>
      <text class="ts-node-caption" x="${cx}" y="247">${remote ? 'Remote · unverified' : !accessible ? 'Outside your reach' : s.loops[i]?`Earlier loop: ${loopLabels[s.loops[i]]}`:isLoop?'Enter your loop result':'Not tested yet'}</text>
    </g>`;
  }
  drawing += `<text class="ts-lane-label" x="10" y="278">TX →</text><text class="ts-lane-label" x="10" y="338">RX ←</text>
    <text class="ts-lane-label" x="${width-64}" y="278">→ RX</text><text class="ts-lane-label" x="${width-64}" y="338">← TX</text>
    <path class="ts-route" d="M${start} 274 H${end} M${end} 334 H${start}"/>`;
  for (let i=0;i<centers.length;i++) {
    drawing += `<path class="ts-drop" d="M${centers[i]} 253 V263"/><circle class="ts-junction" cx="${centers[i]}" cy="274" r="5"/><circle class="ts-junction" cx="${centers[i]}" cy="334" r="5"/>`;
  }
  if (looping) {
    const out = `M${start} 274 H${x+17} Q${x+42} 274 ${x+42} 304`;
    const back = `M${x+42} 304 Q${x+42} 334 ${x+17} 334 H${start}`;
    const path = `${out} Q${x+42} 334 ${x+17} 334 H${start}`;
    drawing += `<path class="ts-bypass" d="M${x+52} 263 l12 22 M${x+52} 323 l12 22"/>
      <path class="ts-loop-route ${loop || 'unknown'}" d="${path}"/>
      <text class="ts-result-label" x="${(start+x)/2}" y="308">${loop ? loopLabels[loop] : 'Loop connected · result not entered'}</text>`;
    if (loop==='pass' || loop==='weak') drawing += `<g class="${loop==='weak' ? 'ts-weak-flow' : ''}">${lightFlow(out)}${lightFlow(back,'return-ir')}</g>`;
    drawing += `<text class="ts-route-note" x="${Math.min(x+152,width-140)}" y="308">Beyond loop: bypassed</text>`;
  } else if (tracing) {
    const sx=centers[s.selected-1], sy=s.strand==='tx' ? 274 : 334;
    const targetY=trace==='swapped' ? (sy===274 ? 334 : 274) : trace==='wrong' ? 304 : sy;
    const source=s.selected===1?`M${sx+101.2933} ${68+(s.strand==='tx'?184:202)*214/300} V${sy-12} Q${sx+101.2933} ${sy} ${sx+113.2933} ${sy}`:`M${sx+86} ${sy}`;
    const path=`${source} H${x-55} Q${x-36} ${sy} ${x-36} ${targetY} H${x}`;
    drawing += (s.selected===1?'':`<g class="hardware-art"><rect class="hardware-plug" x="${sx+52}" y="${sy-9}" width="28" height="18" rx="2"/><rect class="hardware-boot" x="${sx+79}" y="${sy-5}" width="10" height="10" rx="2"/></g>
      <text class="ts-route-note" x="${sx+81}" y="${sy-20}">${s.selected===1?'LC leg':'Adapter'}</text>
      ${s.selected===1?`<text class="ts-route-note" x="${x-34}" y="${sy-20}">MMC head</text>`:''}
      <g data-mounted-tool="vfl" data-span="${s.selected}"><rect class="ts-vfl" x="${sx+3}" y="${sy-14}" width="49" height="28" rx="5"/><text class="ts-vfl-text" x="${sx+28}" y="${sy+5}">VFL</text><rect class="ts-tool-handle" x="${sx-10}" y="${sy-36}" width="72" height="72" rx="8"><title>Drag the VFL to move it, or return it to the tray</title></rect></g>`)+`
      <path class="ts-bypass" d="M${sx-13} ${sy-10} l10 20 M${x+12} ${sy-10} l10 20"/>
      <path class="ts-trace-route ${trace || 'unknown'}" d="${path}"/>
      <text class="ts-result-label" x="${(sx+x)/2}" y="${sy===274 ? 306 : 371}">${trace ? traceLabels[trace] : 'Isolated span · result unknown'}</text>`;
    if (trace && trace!=='dark') drawing += lightFlow(path,'red')+`<circle class="ts-red-dot" cx="${x}" cy="${targetY}" r="7"/>`;
    if (trace==='wrong') drawing += `<text class="ts-route-note" x="${x+12}" y="308">Other port</text>`;
  } else {
    drawing += `<text class="ts-result-label" x="${width/2}" y="309">${s.disconnected?.length?'Connectors unplugged · Normalize':s.simulated?'Simulated service path · fault position is illustrative':'Normal patching · health still needs checking'}</text>`;
    if(s.simulated && !s.disconnected?.length) {
      const f=s.fault,r=simulatedReadings(s),fx=f.at===0?start:(centers[f.at-1]+centers[f.at])/2;
      for(const strand of ['tx','rx']) {
        if(strand==='tx' && f.kind==='optic_tx') continue;
        const y=strand==='tx'?274:334, sx=strand==='tx'?start:end, ex=strand==='tx'?end:start;
        const affected=f.kind!=='none'&&!f.kind.startsWith('optic_')&&(f.strand===strand||f.strand==='both');
        const blocked=affected&&(strand==='tx'?r.farRx:r.rx)==='dark';
        let path=`M${sx} ${y} H${blocked?fx:ex}`;
        if(f.kind==='polarity') path=strand==='tx'?`M${start} 274 H${fx-22} L${fx+22} 334 H${end}`:`M${end} 334 H${fx+22} L${fx-22} 274 H${start}`;
        else if(affected&&f.kind==='misport') path+=` V${y===274?250:358}`;
        const weak=affected&&(strand==='tx'?r.farRx:r.rx)==='weak';
        drawing+=`<g class="${weak?'ts-weak-flow':''}">${lightFlow(path,strand==='tx'?'ir':'return-ir')}</g>`;
        if(blocked&&f.kind!=='polarity') drawing+=`<path class="ts-fault-cross" d="M${fx-5} ${y-6} l10 12 m-10 0 10 -12"/>`;
      }
      if(f.kind==='optic_rx') drawing+=`<text class="ts-route-note" x="${start+8}" y="355">Light arrives; RX fails</text>`;
    }
  }
  for (let i=1;i<=s.count;i++) {
    const cx=(centers[i-1]+centers[i])/2;
    const boundary=a.tone==='suspect'&&a.from!==null?a:loopAssessment;
    const suspect=boundary.from!==null && i>boundary.from && i<=boundary.to && boundary.tone==='suspect';
    const passed=i<=loopAssessment.lastPass;
    const traced=s.traces[`${i}:tx`]==='seen' || s.traces[`${i}:rx`]==='seen';
    drawing += `<g class="ts-fiber-target" ${i<=s.reach?`data-span="${i}" role="button" tabindex="0" aria-label="VFL on fiber from ${pointName(i-1)} to CAS ${i}"`:''}><rect class="ts-fiber-hit" x="${cx-127}" y="382" width="254" height="69" rx="8"/><text class="ts-span-name" x="${cx}" y="405">${i===1 ? 'LC leg → MMC head' : `CAS ${i-1} → CAS ${i}`}</text>
      <rect class="ts-span-badge ${suspect ? 'suspect' : passed ? 'pass' : traced ? 'traced' : ''}" x="${cx-67}" y="416" width="134" height="26" rx="13"/>
      <text class="ts-span-status" x="${cx}" y="434">${suspect ? 'Investigate here' : passed ? 'Loop passed' : traced ? 'Traced only' : 'Unverified'}</text></g>`;
  }
  if (s.simulated && s.fault.kind!=='none') {
    const at = s.fault.at, fx=at===0 ? centers[0] : (centers[at-1]+centers[at])/2;
    drawing += `<path class="ts-fault-pointer" d="M${fx} 16 v12"/><text class="ts-fault-label" x="${fx}" y="12">Simulated fault ${at===0 ? 'at optic' : 'in this section'} ↓</text>`;
  }
  return `<svg viewBox="0 0 ${width} 456" style="width:${width}px" role="group" aria-label="Interactive fiber path. TX sends along one strand; RX receives along the other. Choose a local optic or accessible cassette.">${drawing}</svg>`;
}
