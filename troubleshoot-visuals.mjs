import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=5';
import {lcConnector,lcLoopback,vflPen} from './test-tool-visuals.mjs?v=1';
import {lightFlow,lightSource} from './light-visuals.mjs?v=1';
import {pointName,loopLabels,simulatedReadings,simulatedTrace,connectionAt,traceFrom,traceKey,patchAt,traceStop,recordedContinuity,isOptic,loopSource,loopResult,loopEntries} from './troubleshoot-state.mjs?v=21';

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
    incomingSeated,emitting:!closed&&(!blocked||preview)&&(['seen','swapped','weak'].includes(result)||preview&&result===undefined),
    ...(preview?{mode:s.simulated?'simulation':result?'observation':'expected',outputStrand:result==='swapped'?(s.strand==='tx'?'rx':'tx'):s.strand}:{})};
}

function opticFace(mode='plugged',strand='tx',trace,receiving=false,coverage=null,remote=false,point=0,loopState) {
  const loop=mode==='loop', plugged=mode==='plugged';
  const legs=[81,127].map((y,i)=>{
    const tip=plugged?168:63, boot=tip-64*.67, bend=plugged?22+i*12:4+i*12, bottom=184+i*18;
    const cable=`M${boot} ${y} H${bend+12} Q${bend} ${y} ${bend} ${y+12} V${bottom-12} Q${bend} ${bottom} ${bend+12} ${bottom} H${remote?8:292}`;
    const litStrand=receiving&&trace==='swapped'?(strand==='tx'?'rx':'tx'):strand;
    const lit=(mode==='vfl'||receiving&&trace!=='wrong')&&trace&&trace!=='dark'&&(i===0?litStrand==='tx':litStrand==='rx');
    return `<path class="loop-jacket" d="${cable}"/><path class="loop-cord" d="${cable}"/>
      <g class="ts-lc-leg" data-connection="${plugged?'seated':'unplugged'}">${lcConnector(tip,y,{scale:.67,seated:plugged})}</g>
      ${lit&&receiving?`<circle class="ts-red-dot" cx="63" cy="${y}" r="5"/>`:''}`;
  }).join('');
  const vflY=strand==='tx'?81:127;
  return `<g class="hardware-art"><g transform="translate(80 0)">
    <path class="optic-pull" d="M48 54 V19 H190 V54 H180 V29 H58 V54 Z"/>
    <rect class="hardware-metal" x="54" y="43" width="130" height="120" rx="5"/>
    ${[88,151].map((x,i) => `<rect class="optic-recess" x="${x-23}" y="59" width="46" height="90" rx="3"/>
      ${[81,127].map(y => `<rect class="optic-opening" x="${x-15}" y="${y-13}" width="30" height="27" rx="2"/><circle class="optic-ferrule" cx="${x}" cy="${y}" r="7"/><circle class="optic-core" cx="${x}" cy="${y}" r="3"/>`).join('')}
      <text class="hardware-label hardware-center hardware-small" x="${x}" y="181">${i ? '5' : '1'}</text>`).join('')}
    ${loop?lcLoopback(88,81,{gap:46/.8,scale:.8,seated:true,result:loopState}):''}
    </g>${legs}${coverage?.optic==='pass'&&plugged?lightSource(168,remote?127:81):''}
    ${mode==='vfl'?`<g data-mounted-tool="vfl" data-point="${point}">${vflPen(63,vflY,{scale:.65,reverse:true,on:true})}${lightSource(63,vflY,'red')}<rect class="ts-tool-handle" x="28" y="${vflY-49}" width="108" height="98" rx="8"><title>VFL attached to the unplugged LC leg. Drag to move or remove.</title></rect></g>`:''}
    </g>`;
}

// The outer cassettes show the user's fanout arrangement. The remote rack is
// mirrored: its rear faces its own device. Stored patch sides stay path-relative.
export const displayedCasFace=(s,point,side)=>point===s.count&&s.count>1?(side==='rear'?'front':'rear'):side;
const cord=path=>`<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
// The loop cord and its two animation halves use exactly the same cubics.
const mmcOut='M-48 24 C-96 24 -96 64 -61 64';
function testMmcLoopback() {
  return `<g class="mmc-loopback">${cord(`${mmcOut} C-28 64 -25 24 -48 24 H-20`)}${mmcHead(0,0,false)}</g>`;
}
function cassetteConnection(s,point,mode) {
  const patch=patchAt(s,point),remote=point===s.count&&s.count>1,fanout=point===1||remote;
  const loopSide=s.loopSide==='remote'?'rear':'front';
  const caption=(x,y,text)=>`<text class="hardware-label hardware-center" text-anchor="middle" x="${x}" y="${y}" style="font-size:14px">${text}</text>`;
  const connectors=['rear','front'].map((side,i)=>{
    const face=displayedCasFace(s,point,side),female=fanout&&face==='rear';
    const loop=mode==='loop'&&side===loopSide,seated=loop||patch[side];
    const x=i?(seated?233.95:263.95):(seated?126.05:96.05),scale=i?'-.65 .65':'.65 .65';
    const name=fanout?(female?'Rear · female MMC':'Front · male MMC'):(face==='rear'?'Rear MMC':'Front MMC');
    return `${caption(i?278:82,207,name)}${loop?`${cord(`M${i?360:0} 233.6 H${i?320:40}`)}<circle class="ts-open-cord" cx="${i?320:40}" cy="233.6" r="3"/>`:cord(`M${i?360:0} 233.6 H${x+(i?13:-13)}`)}<g transform="translate(${x} 218) scale(${scale})">${loop?testMmcLoopback():mmcHead(0,0,false)}${fanout&&!female?'<path d="M83 21 h7 M83 31 h7" stroke="#556862" stroke-width="2"/>':female?'<circle cx="82" cy="21" r="1.8" fill="#263a32"/><circle cx="82" cy="31" r="1.8" fill="#263a32"/>':''}</g>${caption(i?278:82,278,loop?'MMC loopback':fanout&&female?'Fanout head':seated?(fanout||i?'Onward cable':'Incoming MMC'):'Unplugged')}`;
  }).join('');
  const endpoint=vflEndpoint(s),lit=endpoint?.point===point&&endpoint.emitting;
  const faceX=endpoint?.kind==='head'?(endpoint.face==='rear'?150:210):180;
  return `<g class="hardware-art ts-cas-connection" role="img" aria-label="${fanout?`CAS ${point} connection: the rear female MMC fanout head mates with the front male MMC onward cable at the selected port.`:`CAS ${point} connection: two MMC mating connectors. Follow the actual cable record.`}">
    <rect x="158" y="218" width="44" height="34" rx="4" fill="#e3f0e7" stroke="#3d785d" stroke-width="2"/>
    ${connectors}
    ${lit?lightSource(faceX,234,'red'):''}
    ${caption(180,305,`Port ${patch.port} · MMC mating point`)}
  </g>`;
}
function passiveFace(s,point,mode,detailed=false) {
  const finish=drawing=>detailed?drawing.replace('front view','port layout').replace('rear view','port layout')+cassetteConnection(s,point,mode):drawing;
  const endpoint=vflEndpoint(s);
  if(s.tool==='vfl' && point!==traceFrom(s) && point>=Math.min(traceFrom(s),s.selected) && point<=Math.max(traceFrom(s),s.selected)) {
    const patch=patchAt(s,point),forward=traceFrom(s)<s.selected;
    const active=endpoint?.point===point, incomingSeated=patch[forward?'rear':'front'];
    const {x,y,emitting,face}=active?endpoint:{emitting:false,face:forward?'front':'rear'};
    const cassette=cassetteFront({name:`CAS ${point}`,port:patch.port,patched:patch[forward?'front':'rear']}).replace('front view',`${face} view`);
    return finish(cassette+(detailed?'':`<g class="hardware-art ts-vfl-port-view" aria-label="Incoming MMC ${incomingSeated?'seated':'unplugged'}; ${face} port ${patch.port}">
      <path class="loop-jacket" d="M2 194 H${incomingSeated?25:12}"/><path class="loop-cord" d="M2 194 H${incomingSeated?25:12}"/>
      <g transform="translate(${incomingSeated?34.5:21.5} 182) scale(.5)">${mmcHead(0,0,false)}</g><rect class="cassette-adapter" x="76" y="181" width="12" height="26" rx="2"/>
      <text class="hardware-label hardware-small" x="12" y="178">${incomingSeated?'Incoming MMC':'Loose MMC head'}</text>
    </g>`)+`${emitting?`<circle class="ts-port-glow" cx="${x}" cy="${y}" r="17"/>${lightSource(x,y,'red')}<path class="ts-port-emission" d="M${x} ${y} l-12 24 h24 Z"/>`:''}`);
  }
  return finish(cassetteFront({name:`CAS ${point}`,port:s.ports[point-1],inserted:!detailed&&mode==='loop',patched:!detailed&&mode==='plugged'})+
    (mode==='plugged'||detailed?'':`<g class="hardware-art ts-parked-head"><path class="loop-jacket" d="M1 194 H13"/><path class="loop-cord" d="M1 194 H13"/><g transform="translate(23 182) scale(.5)">${mmcHead(0,0,false)}</g><text class="hardware-label hardware-small" x="81" y="194">Head unplugged</text></g>`));
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

// Translate the component's own cord geometry into the enclosing scene. Using
// the same geometry for the yellow cord and the signal prevents floating routes.
function transformPath(path,{x=0,y=0,sx=1,sy=sx}={}) {
  const parts=path.match(/[MLHVQC]|-?\d*\.?\d+/g);let at=0,out='',px=0,py=0;
  const n=()=>Number(parts[at++]), xy=(a,b)=>`${+(x+a*sx).toFixed(5)} ${+(y+b*sy).toFixed(5)}`;
  while(at<parts.length) {
    const op=parts[at++];
    if(op==='H'){px=n();out+=` L${xy(px,py)}`;}
    else if(op==='V'){py=n();out+=` L${xy(px,py)}`;}
    else {
      const count={M:1,L:1,Q:2,C:3}[op],points=[];
      for(let i=0;i<count;i++){px=n();py=n();points.push(xy(px,py));}
      out+=` ${op}${points.join(' ')}`;
    }
  }
  return out.trim();
}
function opticCord(mode,remote,lane) {
  const plugged=mode==='plugged',y=lane==='tx'?81:127,i=lane==='tx'?0:1;
  const tip=plugged?168:63,boot=tip-64*.67,bend=plugged?22+i*12:4+i*12,bottom=184+i*18;
  const path=`M${boot} ${y} H${bend+12} Q${bend} ${y} ${bend} ${y+12} V${bottom-12} Q${bend} ${bottom} ${bend+12} ${bottom} H${remote?8:292}`;
  const reverse=`M${remote?8:292} ${bottom} H${bend+12} Q${bend} ${bottom} ${bend} ${bottom-12} V${y+12} Q${bend} ${y} ${bend+12} ${y} H${tip}`;
  return {out:`M${tip} ${y} H${boot} ${path.slice(path.indexOf(' H')+1)}`,back:reverse};
}
function supportedLoops(s,coverage) {
  return ['local','remote'].flatMap(side=>{
    const source=side==='local'?0:s.count+1;
    const passes=loopEntries(s).filter(test=>test.side===side&&test.result==='pass'&&
      !coverage.points[source].issue&&coverage.spans.filter(span=>span.point>Math.min(source,test.point)&&span.point<=Math.max(source,test.point))
        .every(span=>Object.values(span.lanes).every(lane=>lane.ir&&lane[side==='local'?'localLoop':'remoteLoop'])));
    const selected=s.tool==='loop'&&s.loopSide===side?passes.find(test=>test.point===s.selected):null;
    const test=selected??passes.sort((a,b)=>side==='local'?b.point-a.point:a.point-b.point)[0];
    return test?[{...test,source}]:[];
  });
}
const opticScale=214/300,casScale=242/360;
const opticTop=97,casTop=81,cardHeight=332,nodeHeight=372;
const casY=lane=>casTop+(233.6+(lane==='tx'?-1.95:1.95))*casScale;
const endpoint=(s,point,cx,lane)=>isOptic(s,point)?
  {x:cx-107+(point===0?292:8)*opticScale,y:opticTop+(lane==='tx'?184:202)*opticScale}:
  {x:cx+(point===0?121:-121),y:casY(lane)};
function laneFlow(path,lane,direction,kind='ir') {
  return `<g class="ts-hardware-flow ts-hardware-${kind}" data-strand="${lane}" data-direction="${direction}">${lightFlow(path,kind==='vfl'?'red':lane==='tx'?'ir':'return-ir')}</g>`;
}
function flowOnCord(path,reverse,lane,strand) {
  const color=lane.irStrand??strand,direction=color==='tx'?1:-1;
  let flow=lane.ir?`<g class="${lane.weak?'ts-weak-flow':''}">${laneFlow(direction>0?path:reverse,color,direction)}</g>`:'';
  for(const direction of lane.vflDirections)flow+=laneFlow(direction>0?path:reverse,strand,direction,'vfl');
  return flow;
}
function practiceLane(s,span,strand,lane) {
  if(!s.simulated||s.tool!=='link'||s.disconnected?.length)return lane;
  const f=s.fault,r=simulatedReadings(s),outgoing=strand==='tx';
  const deadSource=f.kind==='optic_tx'&&f.at===(outgoing?0:s.count+1);
  const affected=f.kind!=='none'&&!f.kind.startsWith('optic_')&&(f.strand===strand||f.strand==='both');
  const dark=affected&&f.kind!=='polarity'&&(outgoing?r.farRx:r.rx)==='dark';
  const through=outgoing?span<f.at:span>f.at;
  const swapped=f.kind==='polarity'&&span>Math.max(1,f.at),irStrand=swapped?(strand==='tx'?'rx':'tx'):strand;
  return {...lane,ir:!deadSource&&(!dark||through),irStrand,weak:affected&&(outgoing?r.farRx:r.rx)==='weak',vflDirections:[]};
}
function section(s,coverage,point,strand) {
  const lane=coverage.spans[point-1]?.lanes[strand];
  if(!lane)return {ir:false,vflDirections:[]};
  const weak=s.tool==='loop'&&loopResult(s)==='weak'&&point>Math.min(loopSource(s),s.selected)&&point<=Math.max(loopSource(s),s.selected);
  return weak?{...lane,ir:true,weak:true}:practiceLane(s,point,strand,lane);
}
function nodeFlow(s,coverage,point,cx,mode,test) {
  const optic=isOptic(s,point),remote=point===s.count+1;
  let drawing='';
  if(optic) {
    if(mode==='loop')return '';// The direct LC loop animates its own exact cord.
    for(const strand of ['tx','rx']) {
      const lane=section(s,coverage,remote?point:1,strand),paths=opticCord(mode,remote,strand);
      const map=d=>transformPath(d,{x:cx-107,y:opticTop,sx:opticScale});
      drawing+=flowOnCord(map(remote?paths.back:paths.out),map(remote?paths.out:paths.back),lane,strand);
    }
    return drawing;
  }
  const patch=patchAt(s,point),loopSide=s.loopSide==='remote'?'rear':'front';
  const map=d=>transformPath(d,{x:cx-121,y:casTop,sx:casScale});
  if(s.simulated&&s.tool==='link'&&s.fault.kind==='polarity'&&Math.max(1,s.fault.at)===point) {
    const a=231.65,b=235.55;
    return laneFlow(map(`M0 ${a} H158 C174 ${a} 186 ${b} 202 ${b} H360`),'tx',1)+laneFlow(map(`M360 ${a} H202 C186 ${a} 174 ${b} 158 ${b} H0`),'rx',-1);
  }
  for(const strand of ['tx','rx']) {
    const y=233.6+(strand==='tx'?-1.95:1.95),left=section(s,coverage,point,strand),right=section(s,coverage,point+1,strand);
    const leftTip=patch.rear?180:150,rightTip=patch.front?180:210;
    if(mode==='loop') {
      const local=loopSide==='front',active=local?left:right;
      const stop=180,edge=local?0:360;
      drawing+=flowOnCord(map(local?`M${edge} ${y} H${stop}`:`M${stop} ${y} H${edge}`),map(local?`M${stop} ${y} H${edge}`:`M${edge} ${y} H${stop}`),active,strand);
    } else {
      drawing+=flowOnCord(map(`M0 ${y} H${leftTip}`),map(`M${leftTip} ${y} H0`),left,strand);
      drawing+=flowOnCord(map(`M${rightTip} ${y} H360`),map(`M360 ${y} H${rightTip}`),right,strand);
    }
  }
  if(mode==='loop'&&test) {
    const remote=test.side==='remote',x=remote?126.05:233.95,sx=remote ? .65 : -.65;
    const pair=d=>map(transformPath(d,{x,y:218,sx,sy:.65}));
    const out=remote?'M83 27 H-20 L-48 24 C-25 24 -28 64 -61 64':'M83 21 H-20 L-48 24 C-96 24 -96 64 -61 64';
    const back=remote?'M-61 64 C-96 64 -96 24 -48 24 L-20 27 H83':'M-61 64 C-28 64 -25 24 -48 24 L-20 27 H83';
    // For the reverse source, the return meets the upper lane at y=21.
    const returning=remote?back.replace('L-20 27 H83','L-20 21 H83'):back;
    drawing+=`<g class="ts-hardware-loop" data-loop-side="${test.side}" data-loop-point="${point}"><g class="${test.result==='weak'?'ts-weak-flow':''}">${laneFlow(pair(out),remote?'rx':'tx',remote?-1:1)}${laneFlow(pair(returning),remote?'tx':'rx',remote?1:-1)}</g></g>`;
  }
  return drawing;
}
function nodeCaption(s,point,mode,endpoint) {
  if(endpoint?.point===point&&endpoint.kind!=='lc')return endpoint.kind==='head'?'MMC head unplugged · CAS bypassed':endpoint.closed?'Both sides patched · path continues':`${displayedCasFace(s,point,endpoint.face)==='front'?'Front':'Rear'} port open`;
  return mode==='loop'?'Loop inserted · service fiber unplugged':mode==='vfl'?'VFL on LC leg · optic empty':mode==='unplugged'?isOptic(s,point)?'LC legs unplugged · optic empty':'MMC unplugged · path open':isOptic(s,point)?'LC legs plugged into optic':'MMC head plugged into CAS';
}
function hardwareNode(s,coverage,point,cx,tests) {
  const mode=connectionAt(s,point),test=tests.find(test=>test.point===point);
  const source=traceFrom(s),trace=s.traces[traceKey(s)],endpoint=vflEndpoint(s);
  const accessible=point<=s.reach,optic=isOptic(s,point),remote=point===s.count+1;
  const value=loopResult(s,point),cxClasses=`${s.selected===point?' ts-selected':''}${s.tool==='vfl'&&source===point?' ts-vfl-source':''}${!accessible?' ts-inaccessible':''}${value?' ts-observed-'+value:''}${coverage.points[point]?.issue?' ts-coverage-suspect':coverage.points[point]?.loop==='pass'?' ts-coverage-passed':''}`;
  const result=s.tool==='vfl'&&point===source?'VFL source':s.tool==='vfl'&&point===s.selected?({seen:'Light seen here',wrong:'Light at another port',swapped:'Light on other strand',dark:'No light seen here'}[trace]??'Expect light here'):!accessible?'Outside your reach':mode==='loop'&&!value?'Enter your loop result':recordedNodeCaption(s,coverage,point);
  let art=optic?`<svg x="${cx-107}" y="${opticTop}" width="214" height="149.8" viewBox="0 0 300 210">${opticFace(mode,s.strand,trace,s.tool==='vfl'&&s.selected===point,null,remote,point,value)}</svg>`:
    `<svg x="${cx-121}" y="${casTop}" width="242" height="${320*casScale}" viewBox="0 0 360 320">${passiveFace(s,point,mode,true)}</svg>`;
  if(optic&&mode==='loop'&&test)art=art.replace('class="lc-loopback"',`class="lc-loopback ts-hardware-loop" data-loop-side="${test.side}" data-loop-point="${point}"`);
  const handle=mode==='loop'?`<rect class="ts-tool-handle" data-mounted-tool="${optic?'lc':'mmc'}" x="${optic?cx-50:cx-26}" y="${optic?opticTop+49:casTop+218*casScale-16}" width="${optic?72:100}" height="72" rx="9"><title>Drag this loop to move it, or return it to the tray</title></rect>`:'';
  const drawing=`<g class="ts-node${cxClasses}" ${accessible?`role="button" tabindex="0" data-point="${point}" aria-pressed="${s.selected===point}" aria-label="${s.tool==='vfl'&&point!==source?'Check light at':'Select'} ${pointName(point,s)}${optic?'':`, port ${s.ports[point-1]}`}"`:''}>
    <rect class="ts-node-card" x="${cx-128}" y="34" width="256" height="${cardHeight}" rx="12"/>
    <text class="ts-node-title" x="${cx}" y="59">${remote?'Remote optic':point===0?'Local optic':`CAS ${point} · Port ${patchAt(s,point).port}`}</text>${art}${handle}
    <foreignObject x="${cx-124}" y="294" width="248" height="68"><div xmlns="http://www.w3.org/1999/xhtml" class="ts-hardware-caption"><div class="ts-connection-label ${mode==='plugged'?'':'open'}">${nodeCaption(s,point,mode,endpoint)}</div><div class="ts-node-caption">${result}</div></div></foreignObject>
  </g>`;
  return {drawing,flow:nodeFlow(s,coverage,point,cx,mode,test),mode};
}
function desktopBridge(s,point,centers,strand) {
  const left=isOptic(s,point-1)?endpoint(s,point-1,centers[point-1],strand):{x:centers[point-1]+121,y:casY(strand)};
  const right=endpoint(s,point,centers[point],strand),middle=(left.x+right.x)/2;
  return {path:`M${left.x} ${left.y} C${middle} ${left.y} ${middle} ${right.y} ${right.x} ${right.y}`,
    back:`M${right.x} ${right.y} C${middle} ${right.y} ${middle} ${left.y} ${left.x} ${left.y}`};
}
function spanName(s,point) {return point===1?'LC leg → MMC head':point===s.count+1?`CAS ${point-1} → Remote LC legs`:`CAS ${point-1} → CAS ${point}`;}
function spanLabel(s,coverage,point) {
  const span=coverage.spans[point-1];
  return `<div class="ts-cord-status" data-path-span="${point}"><span>${spanName(s,point)}</span><div>${['tx','rx'].map(strand=>`<span class="ts-cord-badge ${span.lanes[strand].status}">${coverageLabel(span.lanes[strand],strand)}</span>`).join('')}</div></div>`;
}
function mobileTail(s,point,strand,outgoing) {
  const p=outgoing?(isOptic(s,point)?endpoint(s,point,135,strand):{x:256,y:casY(strand)}):endpoint(s,point,135,strand);
  const tx=strand==='tx',side=outgoing?(tx?266:258):(tx?4:12),bend=Math.min(8,Math.abs(side-p.x)/2);
  if(outgoing)return {path:`M${p.x} ${p.y} H${side-bend} Q${side} ${p.y} ${side} ${p.y+bend} V${nodeHeight}`,
    back:`M${side} ${nodeHeight} V${p.y+bend} Q${side} ${p.y} ${side-bend} ${p.y} H${p.x}`};
  return {path:`M${side} 0 V${p.y-bend} Q${side} ${p.y} ${side+bend} ${p.y} H${p.x}`,
    back:`M${p.x} ${p.y} H${side+bend} Q${side} ${p.y} ${side} ${p.y-bend} V0`};
}
function mobileBridge(strand) {
  const tx=strand==='tx',right=tx?266:258,left=tx?4:12,y=tx?86:78;
  return {path:`M${right} 0 V${y-8} Q${right} ${y} ${right-8} ${y} H${left+8} Q${left} ${y} ${left} ${y+8} V104`,
    back:`M${left} 104 V${y+8} Q${left} ${y} ${left+8} ${y} H${right-8} Q${right} ${y} ${right} ${y-8} V0`};
}
export function workbenchDiagram(s,loopControls='',{stacked=false}={}) {
  const coverage=recordedContinuity(s),tests=supportedLoops(s,coverage);
  if(s.tool==='loop'&&loopResult(s)==='weak')tests.push({point:s.selected,source:loopSource(s),side:s.loopSide,result:'weak'});
  const centers=Array.from({length:s.count+2},(_,i)=>135+i*290),width=centers.at(-1)+135;
  const fault=point=>s.simulated&&s.fault.kind!=='none'&&s.fault.at===point?`<text class="ts-fault-label" x="135" y="17">Simulated fault ${isOptic(s,point)?'at optic':'in this section'} ↓</text>`:'';
  if(stacked)return `<div class="ts-stacked-path">${centers.map((_,point)=>{
    const node=hardwareNode(s,coverage,point,135,tests);
    let cords='',flows=node.flow;
    for(const strand of ['tx','rx'])for(const outgoing of [false,true]) {
      if(outgoing?point===s.count+1:point===0)continue;
      const paths=mobileTail(s,point,strand,outgoing),lane=section(s,coverage,outgoing?point+1:point,strand);
      cords+=`<g class="ts-external-cord">${cord(paths.path)}</g>`;flows+=flowOnCord(paths.path,paths.back,lane,strand);
    }
    const panel=s.selected===point?loopControls:'';
    const extensions=panel&&point<=s.count?`<svg class="ts-panel-cords" viewBox="0 0 18 100" preserveAspectRatio="none" aria-hidden="true">${['tx','rx'].map(strand=>{const x=strand==='tx'?14:6,lane=section(s,coverage,point+1,strand);return `<g class="ts-external-cord">${cord(`M${x} 0 V100`)}</g>`+flowOnCord(`M${x} 0 V100`,`M${x} 100 V0`,lane,strand);}).join('')}</svg>`:'';
    const bridge=point<=s.count?`<div class="ts-mobile-cord-junction"><svg class="ts-cord-bridge" viewBox="0 0 270 104" aria-hidden="true">${['tx','rx'].map(strand=>{const paths=mobileBridge(strand),lane=section(s,coverage,point+1,strand);return `<g class="ts-external-cord">${cord(paths.path)}</g>`+flowOnCord(paths.path,paths.back,lane,strand);}).join('')}</svg>${spanLabel(s,coverage,point+1)}</div>`:'';
    return `<div class="ts-stacked-node" data-path-node="${point}"><svg viewBox="0 0 270 ${nodeHeight}" role="group">${node.drawing}${cords}${flows}${fault(point)}</svg>${panel?`<div class="ts-mobile-loop-row">${panel}${extensions}</div>`:''}</div>${bridge}`;
  }).join('')}</div>`;
  const nodes=centers.map((cx,point)=>hardwareNode(s,coverage,point,cx,tests));
  const bridges=coverage.spans.map(span=>{
    const bundled=!isOptic(s,span.point-1)&&!isOptic(s,span.point);
    const jacket=bundled?`<g class="ts-cas-bridge">${cord(`M${centers[span.point-1]+121} ${casTop+233.6*casScale} H${centers[span.point]-121}`)}</g>`:'';
    return jacket+['tx','rx'].map(strand=>{const paths=desktopBridge(s,span.point,centers,strand);return (bundled?'':`<g class="ts-external-cord">${cord(paths.path)}</g>`)+flowOnCord(paths.path,paths.back,section(s,coverage,span.point,strand),strand);}).join('');
  }).join('');
  // Status badges sit beside their cable ends; there is no second light diagram.
  return `<div class="ts-path-scene" style="width:${width}px;--cord-sections:${s.count+1}"><svg viewBox="0 0 ${width} ${nodeHeight}" style="height:${nodeHeight}px" role="group">${nodes.map(node=>node.drawing).join('')}${bridges}${nodes.map(node=>node.flow).join('')}${centers.map((cx,point)=>`<g transform="translate(${cx-135} 0)">${fault(point)}</g>`).join('')}</svg><div class="ts-cord-summaries">${coverage.spans.map(span=>spanLabel(s,coverage,span.point)).join('')}</div>${loopControls?`<div class="ts-loop-slot" style="padding-left:${centers[s.selected]-128}px">${loopControls}</div>`:''}</div>`;
}
