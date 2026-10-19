import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=4';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow} from './light-visuals.mjs?v=1';
const text=(x,y,value,extra='')=>`<text x="${x}" y="${y}" ${extra}>${value}</text>`;
const svg=(body,height=210,label='Scenario evidence')=>`<svg viewBox="0 0 600 ${height}" role="img" aria-label="${label}">${body}</svg>`;
const optic=(x,y,size=100,flipped=false)=>`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 360 354">${opticIllustration({optic:7,labels:false,flipped,id:`case-${x}-${y}`}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'')}</svg>`;
const fact=(title,value)=>`<div class="case-fact"><span>${title}</span><b>${value}</b></div>`;
function linkDiagram({perspective=false,answered=false}={}) {
  return svg(`<rect class="case-device" x="8" y="20" width="138" height="145" rx="8"/><rect class="case-device" x="454" y="20" width="138" height="145" rx="8"/>
    ${optic(26,35,104)}${optic(471,35,104)}${text(77,185,'Device A','text-anchor="middle"')}${text(523,185,'Device B','text-anchor="middle"')}
    <path class="case-path" d="M146 76 H454 m-9 -6 9 6 -9 6 M454 127 H146 m9 -6 -9 6 9 6"/>
    ${text(300,57,'A TX → B RX','text-anchor="middle"')}${text(300,150,'B TX → A RX','text-anchor="middle"')}
    ${perspective?text(523,16,'You are here','text-anchor="middle"'):text(300,105,'Mapped passives','text-anchor="middle"')}
    ${answered&&!perspective?lightFlow('M146 76 H454'):''}`,210,'Two device optics and separate paths: A TX to B RX, B TX to A RX.');
}
export function caseVisual(question,answered=false) {
  const kind=question.visual;
  if(kind==='case-loops') return `<p class="q-report-label">Same pair · valid test setups · no other changes</p><div class="case-loop-stops">
    <figure>${svg(optic(150,5,300),310,'Local optic with a passed direct loop.')}<figcaption><b>Local optic</b><span>Direct loop: pass</span></figcaption></figure>
    ${[1,2].map(i=>`<span class="case-arrow" aria-hidden="true">→</span><figure><svg viewBox="0 0 360 206" role="img" aria-label="CAS ${i}, port 12">${cassetteFront({name:`CAS ${i}`,port:12,inserted:true})}</svg><figcaption><b>CAS ${i} / 12</b><span>Loop: ${i===1?'pass':'fail'}</span></figcaption></figure>`).join('')}</div><p class="q-observation">Beyond CAS 2 and the remote device: not tested.</p>`;
  if(kind==='case-loss') return `<div class="case-facts">${fact('Isolated VFL trace','Expected port + strand')}${fact('Restored service RX','−4.40 dBm')}${fact('Example RX limits','−3.00 to +3.00 dBm')}</div>
    ${svg(`<rect class="case-vfl" x="22" y="50" width="104" height="42" rx="15"/>${text(74,78,'VFL','text-anchor="middle"')}<path class="case-red" d="M126 71 H478"/><circle class="case-red-dot" cx="486" cy="71" r="12"/>${text(486,112,'Expected port','text-anchor="middle"')}${answered?lightFlow('M126 71 H486','red'):''}`,135,'Red VFL light was detected at the expected destination during the isolated trace.')}`;
  if(kind==='case-polarity') return `<div class="case-facts">${fact('MMC loop','Pass · within limits')}${fact('Restored service RX','−40 · no light reported')}${fact('End-to-end pairing','Not verified')}</div>${linkDiagram()}`;
  if(kind==='case-channel') return `<div class="case-facts">${fact('Direct optic loop','Pass on the tested pair')}${fact('External mapped path','One channel fails')}</div>
    ${svg(`<g transform="translate(210 20) scale(2)">${mmcHead(0,0,false)}</g>${text(300,145,'Other channels work · cause on this path unknown','text-anchor="middle"')}`,170,'MMC head with evidence of one failed mapped channel; no physical defect is identified in the picture.')}`;
  if(kind==='case-changes') return `<div class="case-log"><div>${fact('Before · RX','−6.20 dBm')}</div><div class="case-log-action">Bend widened + connector reseated<br><small>No reading between these two changes</small></div><div>${fact('After · RX','+0.50 dBm')}</div></div>
    <p class="q-observation">Example RX limits: −3.00 to +3.00 dBm. Other required lanes and link status: not checked.</p>`;
  if(kind==='case-data') return `<p class="q-report-label">Device A is sending data to Device B</p>${linkDiagram({answered})}<div class="case-facts">${fact('At A','Device + installed optic')}${fact('Between devices','Fiber → CAS 1 → CAS 2 → fiber')}${fact('At B','Installed optic + device')}</div>`;
  if(kind==='case-perspective') return `${linkDiagram({perspective:true,answered})}<p class="q-observation">Arrows show the intended directions, not confirmed light arrival.</p><div class="case-facts">${fact('B · local TX','Within limits')}${fact('B · local RX','−40 · no light reported')}${fact('A’s current readings','Not available')}</div>`;
  if(kind==='case-ticket') return `<div class="reason-ticket"><span>Position <b>QNO5.5C.16f.17.30</b></span><span>Ethernet <b>7/5</b></span><span>Follower <b>Leg 8</b></span><span>Head <b>S747885346FWL</b></span><span>Destination <b>CAS 2 / Port 28</b></span></div>
    ${svg(`${optic(25,5,185,true)}<svg x="270" y="23" width="310" height="178" viewBox="0 0 360 206">${cassetteFront({name:'CAS 2',port:null})}</svg>${text(117,222,'Optic 7 · purple tab below','text-anchor="middle"')}${text(425,222,'Destination cassette','text-anchor="middle"')}`,245,'Mock ticket calls for Ethernet 7/5, leg 8, CAS 2 port 28. Optic is flipped with purple tab below.')}`;
  if(kind==='case-fanout') return `<p class="q-report-label">Head serial S747885346FWL · 12 followers</p>${svg(`<g transform="translate(420 58) scale(1.5)">${mmcHead(0,0,false)}</g>
    <path class="case-path" d="M140 51 C320 51 300 88 420 88 M140 135 C320 135 300 100 420 100"/>
    ${text(40,44,'Leg 3: dark')}${text(40,151,'Leg 8: works')}${text(300,185,'Two separate paths shown from the same fanout','text-anchor="middle"')}`,210,'Separate leg 3 and leg 8 paths join the same MMC assembly. Leg 3 is dark; leg 8 works.')}<p class="q-observation">FIM assigns the affected optic to leg 3. No mapping change is authorized.</p>`;
  return `<div class="q-report-label">Local device · reported values</div><div class="quiz-reading-pair"><div class="quiz-reading reading-alert"><span>TX</span><strong>−40</strong><small>dBm</small></div><div class="quiz-reading reading-alert"><span>RX</span><strong>−40</strong><small>dBm</small></div></div><p class="q-observation">Source state and end-to-end pairing have not yet been verified.</p>`;
}
