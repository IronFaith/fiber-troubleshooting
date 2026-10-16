import {cassetteFront, loopIllustration} from './loop-visuals.mjs?v=3';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow} from './light-visuals.mjs?v=1';

const svg=(drawing,height,label)=>`<svg viewBox="0 0 360 ${height}" role="img" aria-label="${label}">${drawing}</svg>`;
const steps=[
  {label:'1 · Optic loop',title:'Direct loop: pass',explanation:'TX light returns to RX through the LC loop. The local optic passed this test; the fiber route is still untested.',next:'Next: remove the direct loop, restore the mapped fiber, and loop at the first accessible passive.'},
  {label:'2 · CAS 1 loop',title:'Loop at CAS 1: pass',explanation:'Light travels out through section A, turns around in the MMC loop at CAS 1, and returns to the local RX. This adds the fiber and connections up to CAS 1 to the test.',next:'Next: move the loop to CAS 2 and restore the onward connection at CAS 1. The added section is B.'},
  {label:'3 · CAS 2 loop',title:'Loop at CAS 2: fail',explanation:'The earlier tests passed, but extending the loop to CAS 2 fails. Section B and its connections are now suspect; the result does not identify an exact fault.',next:'First verify the CAS 2 loop, port and pairing. Then isolate section B, including its connections at both CAS ends. Beyond CAS 2 remains untested.'}
];

function route(selected) {
  const direct=loopIllustration('direct');
  const optic=selected===0 ? svg(direct.drawing+lightFlow(direct.lightPath),direct.height,'LC loop inserted at the local optic. TX travels around the loop to RX.') : svg(opticIllustration({labels:false,id:'loop-walk-optic'}).drawing,354,'Local optic connected to the fiber route.');
  const node=(art,title,status)=>`<div class="loop-route-node"><div class="loop-route-art">${art}</div><div><strong>${title}</strong><span>${status}</span></div></div>`;
  const span=(id,title,state,detail)=>`<div class="loop-route-span ${state}" data-section="${id}"><svg viewBox="0 0 70 84" aria-hidden="true"><path class="loop-route-wire" d="M24 0 V84 M46 84 V0"/>${state==='passing' ? lightFlow('M24 0 V84')+lightFlow('M46 84 V0','return-ir') : ''}</svg><div><strong>${title}</strong><span>${detail}</span></div></div>`;
  const cas=(number)=>svg(cassetteFront({name:`CAS ${number}`,port:12,inserted:selected===number,patched:selected>number}),190,`CAS ${number}, port 12. ${selected===number ? 'MMC loopback inserted.' : selected>number ? 'Patched onward to CAS 2.' : 'Not included in this test.'}`);
  return `<div class="loop-route">
    ${node(optic,'Local optic',selected===0 ? '✓ LC loop inserted · pass' : '✓ Direct loop passed earlier')}
    ${span('A','A · Optic → CAS 1',selected===1 ? 'passing' : selected===2 ? 'checked' : 'untested',selected===1 ? '↓ TX out · ↑ light returns to RX' : selected===2 ? '✓ Previously passed with the CAS 1 loop' : 'Not tested yet')}
    ${node(cas(1),'CAS 1 · Port 12',selected===1 ? '✓ MMC loop inserted · pass' : selected===2 ? 'Loop removed · patched onward' : 'Not tested yet')}
    ${span('B','B · CAS 1 → CAS 2',selected===2 ? 'suspect' : 'untested',selected===2 ? '? Investigate this added span + both connections' : 'Not tested yet')}
    ${node(cas(2),'CAS 2 · Port 12',selected===2 ? '× MMC loop inserted · fail' : 'Not tested yet')}
    ${span('C','C · Beyond CAS 2','untested','Not tested by these local loops')}
    <div class="loop-route-remote">Remote device · other room / building · not tested</div>
  </div>`;
}

export function mountLoopLesson(host) {
  host.innerHTML=`<div class="lesson-options" role="group" aria-label="Follow the loop tests">${steps.map((step,index)=>`<button type="button" data-loop-step="${index}" aria-controls="loop-walk-result loop-walk-route" aria-pressed="${index===0}">${step.label}</button>`).join('')}</div>
    <div id="loop-walk-result" class="loop-walk-result" role="status" aria-live="polite" aria-atomic="true"></div>
    <div id="loop-walk-route"></div>
    <p class="picture-note">Teaching example: Port 12 at each CAS. Use FIM for the actual ports and pair mapping. Blue/teal arrows show invisible IR on a passing test. Amber marks a suspect section, not a located break.</p>`;
  function show(selected) {
    const step=steps[selected];
    host.querySelector('#loop-walk-result').innerHTML=`<h4>${step.title}</h4><p>${step.explanation}</p><p><strong>${step.next}</strong></p>`;
    host.querySelector('#loop-walk-route').innerHTML=route(selected);
    host.querySelectorAll('[data-loop-step]').forEach((button,index)=>button.setAttribute('aria-pressed',String(index===selected)));
  }
  host.querySelectorAll('[data-loop-step]').forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.loopStep))));
  show(0);
}

export function passiveThroughPicture() {
  const out='M18 68 H342', back='M342 112 H18';
  return `<figure class="passive-through"><svg viewBox="0 0 360 182" role="img" aria-label="Enlarged passive connection. The outgoing and return fibers continue through the mapped connection as separate paths. The passive produces no light.">
    <rect class="hardware-detail" x="121" y="29" width="118" height="120" rx="6"/>
    <text x="180" y="19" text-anchor="middle">CAS · enlarged connection</text>
    <rect class="hardware-plug" x="113" y="53" width="48" height="74" rx="3"/>
    <rect class="cassette-adapter" x="161" y="46" width="38" height="88" rx="3"/>
    <rect class="hardware-plug" x="199" y="53" width="48" height="74" rx="3"/>
    <path class="hardware-grip" d="M125 59 V121 M133 59 V121 M221 59 V121 M229 59 V121"/>
    <path class="loop-jacket" d="${out} ${back}"/><path class="loop-cord" d="${out} ${back}"/>
    ${lightFlow(out)}${lightFlow(back,'return-ir')}
    <text x="9" y="49">TX →</text><text x="277" y="49">Onward →</text>
    <text x="9" y="144">RX ←</text><text x="268" y="144">← Return</text>
    <text x="180" y="175" text-anchor="middle">Connects paths · does not make or boost light</text>
  </svg><figcaption>One pair shown, not a connector pin map. A normal patch continues onward. A loopback turns the outgoing path back toward the same optic’s RX.</figcaption></figure>`;
}
