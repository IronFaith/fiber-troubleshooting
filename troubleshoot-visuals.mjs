import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=4';
import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {pointName,loopLabels,traceLabels,simulatedReadings,simulatedTrace,connectionAt,traceFrom,traceKey,parseTraceKey,patchAt,traceStop,pathCoverage,isOptic,loopSource,loopResult} from './troubleshoot-state.mjs?v=15';

// At the observation cassette, open the onward connection, not the MMC
// carrying light from the source. The selected port is the viewing face.
export function vflEndpoint(s,{preview=false}={}) {
  const stop=traceStop(s);
  if(!stop || isOptic(s,stop.point)&&!preview) return null;
  const {point,port,kind,side,blocked,closed,incomingSeated}=stop;
  const atOpening=preview?{...s,selected:point}:s;
  const result=preview&&s.simulated?simulatedTrace(atOpening):s.traces[traceKey(atOpening)];
  return {point,port,result,face:side,kind,blocked,closed,
    x:kind==='head'?63:31.5+((port-1)%16)*19.8,y:kind==='head'?194:(port<=16?59:137)+12,
    incomingSeated,emitting:!closed&&(!blocked||preview)&&(result==='seen'||result==='swapped'||preview&&result===undefined),
    ...(preview?{mode:s.simulated?'simulation':result?'observation':'expected',outputStrand:result==='swapped'?(s.strand==='tx'?'rx':'tx'):s.strand}:{})};
}

function opticFace(mode='plugged',strand='tx',trace,receiving=false,coverage=null,remote=false,point=0) {
  const loop=mode==='loop', plugged=mode==='plugged';
  const legs=[81,127].map((y,i)=>{
    const tip=plugged?168:52, boot=tip-40, bend=plugged?22+i*12:4+i*12, bottom=184+i*18;
    const cable=`M${boot} ${y} H${bend+12} Q${bend} ${y} ${bend} ${y+12} V${bottom-12} Q${bend} ${bottom} ${bend+12} ${bottom} H${remote?8:292}`;
    const litStrand=receiving&&trace==='swapped'?(strand==='tx'?'rx':'tx'):strand;
    const lit=(mode==='vfl'||receiving&&trace!=='wrong')&&trace&&trace!=='dark'&&(i===0?litStrand==='tx':litStrand==='rx');
    const signal=receiving?`M${remote?8:292} ${bottom} H${bend+12} Q${bend} ${bottom} ${bend} ${bottom-12} V${y+12} Q${bend} ${y} ${bend+12} ${y} H63`:`M63 ${y} H${boot} ${cable.slice(cable.indexOf(' H')+1)}`;
    return `<path class="loop-jacket" d="${cable}"/><path class="loop-cord" d="${cable}"/>
      <g class="ts-lc-leg" data-connection="${plugged?'seated':'unplugged'}"><rect class="hardware-boot" x="${boot}" y="${y-6}" width="12" height="12" rx="2"/><rect class="hardware-plug" x="${tip-29}" y="${y-9}" width="29" height="18" rx="2"/>${!plugged?`<rect class="hardware-metal" x="${tip}" y="${y-4}" width="11" height="8"/>`:''}<path class="hardware-grip" d="M${tip-23} ${y-5} v10 m6 -10 v10"/></g>
      ${coverage?.txThrough>0&&plugged&&i===(remote?1:0)?lightFlow(`M${tip} ${y} H${boot} ${cable.slice(cable.indexOf(' H')+1)}`):''}
      ${lit?lightFlow(signal,'red')+(receiving?`<circle class="ts-red-dot" cx="63" cy="${y}" r="5"/>`:''):''}`;
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
    </g>${legs}${coverage?.optic==='pass'&&plugged?lightSource(168,remote?127:81):''}
    ${mode==='vfl'?`<g data-mounted-tool="vfl" data-point="${point}"><rect class="hardware-metal" x="62" y="${vflY-6}" width="10" height="12"/><rect class="ts-vfl" x="70" y="${vflY-14}" width="51" height="28" rx="5"/><text class="ts-vfl-text" x="95" y="${vflY+5}">VFL</text>${lightSource(63,vflY,'red')}<rect class="ts-tool-handle" x="28" y="${vflY-49}" width="98" height="98" rx="8"><title>VFL attached to the unplugged LC leg. Drag to move or remove.</title></rect></g>`:''}
    </g>`;
}

function passiveFace(s,point,mode) {
  const endpoint=vflEndpoint(s);
  if(s.tool==='vfl' && point!==traceFrom(s) && point>=Math.min(traceFrom(s),s.selected) && point<=Math.max(traceFrom(s),s.selected)) {
    const patch=patchAt(s,point),forward=traceFrom(s)<s.selected;
    const active=endpoint?.point===point, incomingSeated=patch[forward?'rear':'front'];
    const {x,y,emitting,face}=active?endpoint:{emitting:false,face:forward?'front':'rear'};
    const cassette=cassetteFront({name:`CAS ${point}`,port:patch.port,patched:patch[forward?'front':'rear']}).replace('front view',`${face} view`);
    return cassette+`<g class="hardware-art ts-vfl-port-view" aria-label="Incoming MMC ${incomingSeated?'seated':'unplugged'}; ${face} port ${patch.port}">
      <path class="loop-jacket" d="M2 194 H${incomingSeated?25:12}"/><path class="loop-cord" d="M2 194 H${incomingSeated?25:12}"/>
      <g transform="translate(${incomingSeated?34.5:21.5} 182) scale(.5)">${mmcHead(0,0,false)}</g><rect class="cassette-adapter" x="76" y="181" width="12" height="26" rx="2"/>
      <text class="hardware-label hardware-small" x="12" y="178">${incomingSeated?'Incoming MMC':'Loose MMC head'}</text>
      ${emitting?`<circle class="ts-port-glow" cx="${x}" cy="${y}" r="17"/>${lightSource(x,y,'red')}<path class="ts-port-emission" d="M${x} ${y} l-12 24 h24 Z"/>`:''}
    </g>`;
  }
  return cassetteFront({name:`CAS ${point}`,port:s.ports[point-1],inserted:mode==='loop',patched:mode==='plugged'})+
    (mode==='plugged'?'':`<g class="hardware-art ts-parked-head"><path class="loop-jacket" d="M1 194 H13"/><path class="loop-cord" d="M1 194 H13"/><g transform="translate(23 182) scale(.5)">${mmcHead(0,0,false)}</g><text class="hardware-label hardware-small" x="81" y="194">Head unplugged</text></g>`);
}

function recordedNodeCaption(s,coverage,point) {
  const p=coverage.points[point];
  if(!p) return 'Remote · unverified';
  const local=s.loops[point],remote=s.remoteLoops?.[point];
  if(local&&remote) return `Local: ${loopLabels[local]} · Remote: ${loopLabels[remote]}`;
  if(local) return `Local loop: ${loopLabels[local]}`;
  if(remote) return `Remote loop: ${loopLabels[remote]}`;
  if(p.issue) return 'Recorded mismatch · check connection';
  if(p.loop==='pass') return isOptic(s,point)?'✓ Tested optic pair passed':'✓ Loop passed to here';
  const check=Object.keys(p.port).length?p.port:p.head;
  if(Object.keys(check).length) return `VFL ${isOptic(s,point)?'at LC':Object.keys(p.port).length?'through':'to head'} · A ${check.tx==='seen'?'✓':'—'} · B ${check.rx==='seen'?'✓':'—'}`;
  return 'Not tested yet';
}
function coverageLabel(lane,strand) {
  const label=strand==='tx'?'A':'B';
  return `${label} · ${lane.status==='suspect'?'Investigate':lane.status==='loop'?lane.vfl?'Loop + VFL passed':'Loop passed':lane.status==='vfl'?'VFL continuity':'Not checked'}`;
}
// The overlay follows the LC leg into each mapped cassette port. The gray
// continuation is still drawn, so the end of the confirmed route is not a
// claim that light physically stops there. Each optic animates its own TX coverage.
function normalizedTxPath(s,centers,through,onward=false) {
  const sourceX=centers[0]-107+292*214/300,sourceY=68+184*214/300;
  let path=`M${sourceX} ${sourceY} V262 Q${sourceX} 274 ${sourceX+12} 274`;
  for(let point=1;point<=through;point++) {
    const cx=centers[point],port=s.ports[point-1],px=cx-121+(31.5+((port-1)%16)*19.8)*242/360,py=81+((port<=16?59:137)+12)*140/208;
    path+=` H${cx-134} Q${cx-122} 274 ${cx-122} 262 V217 Q${cx-122} 205 ${cx-110} 205 H${px-12} Q${px} 205 ${px} 193 V${py}`;
    if(point<through||onward) path+=` H${cx+110} Q${cx+122} ${py} ${cx+122} ${py+12} V262 Q${cx+122} 274 ${cx+134} 274`;
  }
  if(onward) path+=` H${centers.at(-1)}`;
  return path;
}
function coverageOverlay(s,coverage,centers) {
  let drawing='';
  for(const span of coverage.spans) for(const strand of ['tx','rx']) {
    const lane=span.lanes[strand],y=strand==='tx'?274:334;
    if(lane.status==='unknown'||strand==='tx'&&lane.status==='loop'&&span.point<=coverage.txThrough||strand==='rx'&&lane.status==='loop'&&span.point>coverage.remoteTxThrough) continue;
    drawing+=`<g role="img" aria-label="${pointName(span.point-1,s)} to ${pointName(span.point,s)}, ${coverageLabel(lane,strand)}"><path class="ts-coverage-lane ${lane.status} ${strand}" d="M${centers[span.point-1]} ${y} H${centers[span.point]}"/></g>`;
    if(lane.status==='suspect') {
      const x=(centers[span.point-1]+centers[span.point])/2;
      drawing+=`<circle class="ts-coverage-issue" cx="${x}" cy="${y}" r="11"/><text class="ts-coverage-mark" x="${x}" y="${y+4}">!</text>`;
    }
  }
  if(coverage.txThrough>0) {
    const path=normalizedTxPath(s,centers,coverage.txThrough);
    drawing+=`<g class="ts-confirmed-route" role="img" aria-label="Recorded loop coverage: local TX through CAS ${coverage.txThrough}. Onward path unverified."><path class="ts-coverage-underlay" d="${path}"/>${lightFlow(path)}</g>`;
    for(let p=1;p<=coverage.txThrough;p++) {
      const port=s.ports[p-1],cx=centers[p]-121+(31.5+((port-1)%16)*19.8)*242/360,cy=81+((port<=16?59:137)+12)*140/208;
      drawing+=lightSource(cx,cy);
    }
  }
  if(coverage.remoteTxThrough<s.count+1) {
    const sourceX=centers.at(-1)-107+8*214/300,sourceY=68+202*214/300;
    let path=`M${sourceX} ${sourceY} V322 Q${sourceX} 334 ${sourceX-12} 334`;
    for(let point=s.count;point>=coverage.remoteTxThrough;point--) {
      const cx=centers[point],port=s.ports[point-1],px=cx-121+(31.5+((port-1)%16)*19.8)*242/360,py=81+((port<=16?59:137)+12)*140/208;
      path+=` H${cx+134} Q${cx+122} 334 ${cx+122} 322 V217 Q${cx+122} 205 ${cx+110} 205 H${px+12} Q${px} 205 ${px} 193 V${py}`;
      if(point>coverage.remoteTxThrough) path+=` H${cx-110} Q${cx-122} ${py} ${cx-122} ${py+12} V322 Q${cx-122} 334 ${cx-134} 334`;
      drawing+=lightSource(px,py,'return-ir');
    }
    drawing+=`<g class="ts-confirmed-route" role="img" aria-label="Recorded remote loop coverage to CAS ${coverage.remoteTxThrough}. Live link unverified."><path class="ts-coverage-underlay" d="${path}"/>${lightFlow(path,'return-ir')}</g>`;
  }
  return drawing;
}

export function workbenchDiagram(s) {
  const coverage=pathCoverage(s), centers = Array.from({length:s.count+2},(_,i) => 135+i*290);
  const width = centers.at(-1)+135;
  const looping = s.tool === 'loop', tracing = s.tool === 'vfl', normalized=!s.simulated&&s.tool==='link';
  const loop = loopResult(s);
  const from=traceFrom(s),trace = s.traces[traceKey(s)];
  const endpoint=vflEndpoint(s);
  const x = centers[endpoint?.point??s.selected], start = centers[0], end = centers.at(-1);
  let drawing = '';
  for (let i=0;i<centers.length;i++) {
    const cx = centers[i], remote = i === s.count+1, accessible = i <= s.reach;
    const mode=connectionAt(s,i), isLoop=mode==='loop';
    const handleX=isOptic(s,i)?cx-50:cx-121+(31.5+((s.ports[i-1]-1)%16)*19.8)*242/360-32;
    const handleY=isOptic(s,i)?117:81+(s.ports[i-1]<=16?59:137)*140/208-7;
    drawing += `<g class="ts-node${s.selected===i ? ' ts-selected' : ''}${tracing&&from===i?' ts-vfl-source':''}${!accessible ? ' ts-inaccessible' : ''}${loopResult(s,i)?' ts-observed-'+loopResult(s,i):''}${coverage.points[i]?.issue?' ts-coverage-suspect':coverage.points[i]?.loop==='pass'?' ts-coverage-passed':''}" ${accessible ? `role="button" tabindex="0" data-point="${i}" aria-pressed="${s.selected===i}" aria-label="${tracing&&i!==from?'Check light at':'Select'} ${i===0&&tracing?'optic-side LC leg':pointName(i,s)}${!isOptic(s,i) ? `, port ${s.ports[i-1]}` : ''}"` : ''}>
      <rect class="ts-node-card" x="${cx-128}" y="34" width="256" height="218" rx="12"/>
      <text class="ts-node-title" x="${cx}" y="59">${remote ? 'Remote optic' : i===0 ? 'Local optic' : `CAS ${i} · Port ${patchAt(s,i).port}`}</text>
      ${i===0 || remote ? `<svg x="${cx-107}" y="68" width="214" height="149.8" viewBox="0 0 300 210">${opticFace(mode,s.strand,trace,tracing&&s.selected===i,normalized&&isOptic(s,i)?remote?{optic:coverage.remoteOptic,txThrough:s.count+1-coverage.remoteTxThrough}:coverage:null,remote,i)}</svg>` :
        `<svg x="${cx-121}" y="81" width="242" height="140" viewBox="0 0 360 208">${passiveFace(s,i,mode)}</svg>`}
      ${isLoop?`<rect class="ts-tool-handle" data-mounted-tool="${isOptic(s,i)?'lc':'mmc'}" x="${handleX}" y="${handleY}" width="72" height="72" rx="9"><title>Drag this loop to move it, or return it to the tray</title></rect>`:''}
      <text class="ts-connection-label ${mode==='plugged'?'':'open'}" x="${cx}" y="230">${endpoint?.point===i&&endpoint.kind!=='lc'?endpoint.kind==='head'?'MMC head unplugged · CAS bypassed':endpoint.closed?'Both sides patched · path continues':`${endpoint.face==='front'?'Front':'Rear'} port open · incoming MMC seated`:mode==='loop'?'Loop inserted · service fiber unplugged':mode==='vfl'?isOptic(s,i)?'VFL on LC leg · optic empty':'VFL on unplugged fiber':mode==='unplugged'?isOptic(s,i)?'LC legs unplugged · optic empty':'MMC unplugged · path open':i===0||remote?'LC legs plugged into optic':'MMC head plugged into CAS'}</text>
      <text class="ts-node-caption" x="${cx}" y="247">${tracing&&i===from?'VFL source':tracing&&i===s.selected?({seen:'Light seen here',wrong:'Light at another port',swapped:'Light on other strand',dark:'No light seen here'}[trace]??'Expect light here'):!accessible ? 'Outside your reach' : isLoop&&!loopResult(s,i)?'Enter your loop result':recordedNodeCaption(s,coverage,i)}</text>
    </g>`;
  }
  drawing += `<text class="ts-lane-label" x="10" y="278">TX →</text><text class="ts-lane-label" x="10" y="338">RX ←</text>
    <text class="ts-lane-label" x="${width-64}" y="278">→ RX</text><text class="ts-lane-label" x="${width-64}" y="338">← TX</text>
    <path class="ts-route" d="${normalized?normalizedTxPath(s,centers,s.count,true):`M${start} 274 H${end}`} M${end} 334 H${start}"/>`;
  for (let i=0;i<centers.length;i++) {
    drawing += `<path class="ts-drop" d="M${centers[i]} 253 V263"/><circle class="ts-junction" cx="${centers[i]}" cy="274" r="5"/><circle class="ts-junction" cx="${centers[i]}" cy="334" r="5"/>`;
  }
  if (looping) {
    const remote=s.loopSide==='remote',source=centers[loopSource(s)],bend=x+(remote?-42:42),near=x+(remote?-17:17),outY=remote?334:274,backY=remote?274:334;
    const out=`M${source} ${outY} H${near} Q${bend} ${outY} ${bend} 304`;
    const back=`M${bend} 304 Q${bend} ${backY} ${near} ${backY} H${source}`;
    const path=`${out} Q${bend} ${backY} ${near} ${backY} H${source}`;
    drawing+=`<path class="ts-bypass" d="M${x+(remote?-52:52)} 263 l12 22 M${x+(remote?-52:52)} 323 l12 22"/>
      <path class="ts-loop-route ${loop||'unknown'}" d="${path}"/>
      <text class="ts-result-label" x="${(source+x)/2}" y="308">${loop?loopLabels[loop]:'Loop connected · result not entered'}</text>`;
    if(loop==='pass'||loop==='weak')drawing+=`<g class="${loop==='weak'?'ts-weak-flow':''}">${lightFlow(out,remote?'return-ir':'ir')}${lightFlow(back,remote?'ir':'return-ir')}</g>`;
    drawing+=`<text class="ts-route-note" x="${remote?Math.max(x-152,140):Math.min(x+152,width-140)}" y="308">Beyond loop: bypassed</text>`;
  } else if (tracing) {
    const sx=centers[from], sy=s.strand==='tx' ? 274 : 334, direction=Math.sign(x-sx);
    const targetY=trace==='swapped' ? (sy===274 ? 334 : 274) : trace==='wrong' ? 304 : sy;
    const source=from===0?`M${sx+101.2933} ${68+(s.strand==='tx'?184:202)*214/300} V${sy-12} Q${sx+101.2933} ${sy} ${sx+113.2933} ${sy}`:`M${sx+direction*86} ${sy}`;
    const portX=endpoint?x-121+endpoint.x*242/360:0,portY=endpoint?81+endpoint.y*140/208:0;
    let through='';
    const last=endpoint?.point??s.selected;
    for(let p=from+direction;p!==last;p+=direction) {
      if(p<=0||p>s.count) break;
      const patch=patchAt(s,p),cx=centers[p],px=cx-121+(31.5+((patch.port-1)%16)*19.8)*242/360,py=81+((patch.port<=16?59:137)+12)*140/208;
      through+=` H${cx-133} V${81+194*140/208} H${px} V${py} H${cx+130} V${sy}`;
    }
    const target=endpoint&&trace!=='wrong'?`H${x-133} V${81+194*140/208} H${portX} V${portY}`:s.selected===0&&trace!=='wrong'?`H${x+113.2933} Q${x+101.2933} ${sy} ${x+101.2933} ${sy-12} V${68+(targetY===274?184:202)*214/300}`:`H${x-direction*55} Q${x-direction*36} ${sy} ${x-direction*36} ${targetY} H${x}`;
    const path=source+through+' '+target;
    drawing += (from===0?'':`<g class="hardware-art"><rect class="hardware-plug" x="${direction>0?sx+52:sx-80}" y="${sy-9}" width="28" height="18" rx="2"/><rect class="hardware-boot" x="${direction>0?sx+79:sx-89}" y="${sy-5}" width="10" height="10" rx="2"/></g>
      <text class="ts-route-note" x="${direction>0?sx+63:sx-100}" y="${sy-20}">Adapter</text>
      <g data-mounted-tool="vfl" data-point="${from}"><rect class="ts-vfl" x="${direction>0?sx+3:sx-52}" y="${sy-14}" width="49" height="28" rx="5"/><text class="ts-vfl-text" x="${sx+direction*28}" y="${sy+5}">VFL</text><rect class="ts-tool-handle" x="${direction>0?sx-10:sx-62}" y="${sy-36}" width="72" height="72" rx="8"><title>Drag the VFL to move it, or return it to the tray</title></rect></g>`)+`
      <path class="ts-bypass" d="M${sx-direction*13} ${sy-10} l10 20 M${x+direction*12} ${sy-10} l10 20"/>
      <path class="ts-trace-route ${trace || 'unknown'}" d="${path}"/>
      <text class="ts-result-label" x="${(sx+x)/2}" y="${sy===274 ? 306 : 371}">${endpoint?.blocked?'Open connection · check here first':endpoint?.closed?'Patched onward · open a viewing point':trace==='seen'&&endpoint?.kind==='head'?'Light at loose MMC head':trace==='seen'&&endpoint&&endpoint.port!==s.ports[endpoint.point-1]?`Light at patched port ${endpoint.port}`:trace ? traceLabels[trace] : 'Follow this route · light not yet confirmed'}</text>`;
    if (trace && trace!=='dark'&&!endpoint?.blocked&&!endpoint?.closed) drawing += lightFlow(path,'red')+(s.selected===0&&trace!=='wrong'||endpoint&&trace!=='wrong'?'':`<circle class="ts-red-dot" cx="${x}" cy="${targetY}" r="7"/>`);
    if (trace==='wrong') drawing += `<text class="ts-route-note" x="${x+12}" y="308">Other port</text>`;
  } else {
    drawing += `<text class="ts-result-label" x="${width/2}" y="309">${s.disconnected?.length?'Connectors unplugged · Normalize':s.simulated?'Simulated service path · fault position is illustrative':'Recorded coverage · live link not implied'}</text>`;
    if(normalized) drawing+=coverageOverlay(s,coverage,centers);
    if(s.simulated && !s.disconnected?.length) {
      const f=s.fault,r=simulatedReadings(s),fx=f.kind.startsWith('optic_')?centers[f.at]:f.at===0?start:(centers[f.at-1]+centers[f.at])/2;
      for(const strand of ['tx','rx']) {
        if(f.kind==='optic_tx'&&(strand==='tx'?f.at===0:f.at===s.count+1)) continue;
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
      if(f.kind==='optic_rx'&&f.at===0) drawing+=`<text class="ts-route-note" x="${start+8}" y="355">Light arrives; RX fails</text>`;
    }
  }
  for (let i=1;i<=s.count+1;i++) {
    const cx=(centers[i-1]+centers[i])/2;
    const span=coverage.spans[i-1];
    drawing += `<g role="img" aria-label="Fiber section: ${pointName(i-1,s)} → ${pointName(i,s)}"><rect class="ts-fiber-summary" x="${cx-127}" y="382" width="254" height="87" rx="8"/><text class="ts-span-name" x="${cx}" y="401">${i===1?'LC leg → MMC head':i===s.count+1?`CAS ${i-1} → Remote LC legs`:`CAS ${i-1} → CAS ${i}`}</text>
      ${['tx','rx'].map((strand,index)=>`<rect class="ts-coverage-badge ${span.lanes[strand].status}" x="${cx-111}" y="${410+index*27}" width="222" height="24" rx="6"/><text class="ts-span-status" x="${cx}" y="${426+index*27}">${coverageLabel(span.lanes[strand],strand)}</text>`).join('')}</g>`;
  }
  if (s.simulated && s.fault.kind!=='none') {
    const at = s.fault.at, fx=s.fault.kind.startsWith('optic_')?centers[at]:at===0 ? centers[0] : (centers[at-1]+centers[at])/2;
    drawing += `<path class="ts-fault-pointer" d="M${fx} 16 v12"/><text class="ts-fault-label" x="${fx}" y="12">Simulated fault ${s.fault.kind.startsWith('optic_')||at===0 ? 'at optic' : 'in this section'} ↓</text>`;
  }
  return `<svg viewBox="0 0 ${width} 476" style="width:${width}px" role="group" aria-label="Interactive fiber path. TX sends along one strand; RX receives along the other. Choose either optic or an accessible cassette.">${drawing}</svg>`;
}
