import {cassetteFront} from './loop-visuals.mjs?v=3';
import {lightFlow} from './light-visuals.mjs?v=1';
import {assessment,pointName,loopLabels,traceLabels,simulatedReadings} from './troubleshoot-state.mjs?v=2';

function opticFace(loop = false) {
  return `<g class="hardware-art">
    <path class="optic-pull" d="M48 54 V19 H190 V54 H180 V29 H58 V54 Z"/>
    <rect class="hardware-metal" x="54" y="43" width="130" height="120" rx="5"/>
    ${[88,151].map((x,i) => `<rect class="optic-recess" x="${x-23}" y="59" width="46" height="90" rx="3"/>
      ${[81,127].map(y => `<rect class="optic-opening" x="${x-15}" y="${y-13}" width="30" height="27" rx="2"/><circle class="optic-ferrule" cx="${x}" cy="${y}" r="7"/><circle class="optic-core" cx="${x}" cy="${y}" r="3"/>`).join('')}
      <text class="hardware-label hardware-center hardware-small" x="${x}" y="181">${i ? '5' : '1'}</text>`).join('')}
    ${loop ? `<path class="loop-jacket" d="M88 81 H29 Q9 81 9 104 Q9 127 29 127 H88"/><path class="loop-cord" d="M88 81 H29 Q9 81 9 104 Q9 127 29 127 H88"/>
      ${[81,127].map(y => `<rect class="hardware-plug" x="59" y="${y-9}" width="29" height="18" rx="2"/><rect class="hardware-boot" x="48" y="${y-6}" width="12" height="12" rx="2"/>`).join('')}` : ''}
    </g>`;
}

export function workbenchDiagram(s) {
  const a = assessment(s), loopAssessment=assessment({...s,tool:'link',service:'unknown'}), centers = Array.from({length:s.count+2},(_,i) => 135+i*290);
  const width = centers.at(-1)+135;
  const looping = s.tool === 'loop', tracing = s.tool === 'vfl';
  const loop = s.loops[s.selected];
  const trace = s.traces[`${s.selected}:${s.strand}`];
  const x = centers[s.selected], start = centers[0], end = centers.at(-1);
  let drawing = '';
  for (let i=0;i<centers.length;i++) {
    const cx = centers[i], remote = i === s.count+1, accessible = i <= s.reach;
    const isLoop = looping && i === s.selected;
    drawing += `<g class="ts-node${s.selected===i ? ' ts-selected' : ''}${!accessible ? ' ts-inaccessible' : ''}${s.loops[i]?' ts-observed-'+s.loops[i]:''}" ${isLoop?`data-mounted-tool="${i===0?'lc':'mmc'}"`:''} ${accessible ? `role="button" tabindex="0" data-point="${i}" aria-pressed="${s.selected===i}" aria-label="Select ${pointName(i)}${i ? `, port ${s.ports[i-1]}` : ''}"` : ''}>
      <rect class="ts-node-card" x="${cx-128}" y="34" width="256" height="208" rx="12"/>
      <text class="ts-node-title" x="${cx}" y="59">${remote ? 'Remote device' : i===0 ? 'Local optic' : `CAS ${i} · Port ${s.ports[i-1]}`}</text>
      ${i===0 || remote ? `<svg x="${cx-82}" y="68" width="164" height="133" viewBox="0 0 240 195">${opticFace(isLoop)}</svg>` :
        `<svg x="${cx-121}" y="81" width="242" height="140" viewBox="0 0 360 208">${cassetteFront({name:`CAS ${i}`,port:s.ports[i-1],inserted:isLoop,patched:!isLoop})}</svg>`}
      <text class="ts-node-caption" x="${cx}" y="226">${remote ? 'Other room / building · unverified' : !accessible ? 'Outside your reach' : s.loops[i]?`${s.loops[i]==='pass'?'✓':'!'} ${loopLabels[s.loops[i]]}${isLoop?' · loop inserted':''}`:isLoop?`${i===0?'LC':'MMC'} loop · enter result`:i===0&&tracing&&s.selected===1?'Isolate optic from VFL test':'Not tested yet'}</text>
    </g>`;
  }
  drawing += `<text class="ts-lane-label" x="10" y="278">TX →</text><text class="ts-lane-label" x="10" y="338">RX ←</text>
    <text class="ts-lane-label" x="${width-64}" y="278">→ RX</text><text class="ts-lane-label" x="${width-64}" y="338">← TX</text>
    <path class="ts-route" d="M${start} 274 H${end} M${end} 334 H${start}"/>`;
  for (let i=0;i<centers.length;i++) {
    drawing += `<path class="ts-drop" d="M${centers[i]} 243 V258"/><circle class="ts-junction" cx="${centers[i]}" cy="274" r="5"/><circle class="ts-junction" cx="${centers[i]}" cy="334" r="5"/>`;
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
    const path=`M${sx+52} ${sy} H${x-55} Q${x-36} ${sy} ${x-36} ${targetY} H${x}`;
    drawing += `<g data-mounted-tool="vfl"><rect class="ts-vfl" x="${sx+3}" y="${sy-14}" width="49" height="28" rx="5"/><text class="ts-vfl-text" x="${sx+28}" y="${sy+5}">VFL</text></g>
      <path class="ts-bypass" d="M${sx-13} ${sy-10} l10 20 M${x+12} ${sy-10} l10 20"/>
      <path class="ts-trace-route ${trace || 'unknown'}" d="${path}"/>
      <text class="ts-result-label" x="${(sx+x)/2}" y="${sy===274 ? 306 : 371}">${trace ? traceLabels[trace] : 'Isolated span · result unknown'}</text>`;
    if (trace && trace!=='dark') drawing += lightFlow(path,'red')+`<circle class="ts-red-dot" cx="${x}" cy="${targetY}" r="7"/>`;
    if (trace==='wrong') drawing += `<text class="ts-route-note" x="${x+12}" y="308">Other port</text>`;
  } else {
    drawing += `<text class="ts-result-label" x="${width/2}" y="309">${s.simulated?'Simulated service path · fault position is illustrative':'Mapped service path · no test tool connected'}</text>`;
    if(s.simulated) {
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
