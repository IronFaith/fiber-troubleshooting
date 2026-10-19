import {cassetteFront} from './loop-visuals.mjs?v=5';
import {opticIllustration} from './patching-visuals.mjs?v=1';

// One supplied case, in chronological order. Answers never invent test results.
export const connectedCaseQuestions = [
  {
    id:'case-middle', skill:'Combine tests from both ends',
    prompt:'Both end loops pass. Which section has not been covered by these tests?',
    choices:['Local optic through its LC leg to CAS 1.', 'CAS 1 to CAS 2, including the connections between them.', 'CAS 2 through its LC leg to the remote optic.'], correct:1,
    explanation:'The local loop ends at CAS 1; the remote loop ends at CAS 2. Neither includes the middle section. Investigate that gap without assuming a particular part is faulty.',
    reveal:'Two passing ends leave the middle untested.'
  },
  {
    id:'case-destination', skill:'Verify an observed destination',
    prompt:'The VFL trace reaches a different port from FIM. Which check addresses this new evidence?',
    choices:['Compare actual ports, fanout labels and the route against FIM.', 'Repeat the direct optic loop to check the local light source.', 'Measure optical loss before checking the destination mismatch.'], correct:0,
    explanation:'Expected Port 12 and observed Port 13 disagree. Verify the actual patching and the record before an authorized correction. A wrong destination does not identify a failed optic.',
    reveal:'Resolve the mapping mismatch before trusting the route.'
  },
  {
    id:'case-one-strand', skill:'Keep strand evidence separate',
    prompt:'The mapping is corrected and each strand is traced again. What do these results support?',
    choices:['Strand A proves both paths through the shared MMC are healthy.', 'The dark strand confirms that its MMC ferrule is damaged.', 'Strand B needs more checks; its failed part is still unknown.'], correct:2,
    explanation:'A and B are separate paths. With the VFL and LC connection checked, investigate B’s mapped fiber and interfaces for seating, contamination, damage or loss. These observations do not distinguish a bad leg from a ferrule or another connection.',
    reveal:'One passing strand does not clear the other.'
  },
  {
    id:'case-remaining-loss', skill:'Separate a trace from service health',
    prompt:'A loose connection is corrected. Both strands now trace correctly. After Normalize, RX is still low. What next?',
    choices:['Repeat the same VFL trace to confirm the already-matched destination.', 'Investigate connections and attenuation with an appropriate optical loss test.', 'Check the LLDP device name and close the case if it matches.'], correct:1,
    explanation:'−4.40 dBm is below the supplied −3.00 minimum. Red light reaching the expected port supports continuity and mapping, but does not establish acceptable service-wavelength loss. Keep investigating the weak service reading.',
    reveal:'A correct trace can still leave excessive optical loss.'
  },
  {
    id:'case-finish', skill:'Verify the complete restored connection',
    prompt:'Further approved work brings this RX into range. Which two checks are still needed before closing the case?',
    choices:['Check every required TX and RX lane against its installed limits.', 'Confirm link operation and the expected remote device and port.', 'Use the earlier end loops as the final check of every service lane.', 'Record this one RX reading as proof that the entire link is healthy.'], correct:[0,1],
    explanation:'One improved RX is only one observation. Verify all required readings and link operation, and compare the reported endpoint with the assignment. Record what changed and the final results; do not claim one part caused everything.',
    reveal:'Close with verified readings, link operation and endpoint identity.'
  }
].map((question,index)=>({...question,topic:4,caseStudy:'two-ended',caseStep:index+1,visual:'connected-case',lesson:'learn.html#connected-case'}));

const art=(body,viewBox)=>`<svg viewBox="${viewBox}" aria-hidden="true">${body}</svg>`;
const withoutLabels=body=>body.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'');
const optic=id=>art(withoutLabels(opticIllustration({labels:false,id:`case-route-${id}`}).drawing),'0 0 360 354');
const cas=name=>art(withoutLabels(cassetteFront({name,port:null})),'0 0 360 206');
const fact=(title,value)=>`<div class="case-fact"><span>${title}</span><b>${value}</b></div>`;

function endLoops(explained) {
  const node=(picture,title)=>`<div class="connected-node">${picture}<strong>${title}</strong></div>`;
  return `<div class="connected-route" role="group" aria-label="Loop coverage from both ends">
    ${node(optic('local'),'Local optic')}
    <div class="connected-span checked"><span aria-hidden="true">↕</span><div><b>Local loop: pass</b><small>LC leg + connections to CAS 1</small></div></div>
    ${node(cas('CAS 1'),'CAS 1')}
    <div class="connected-span${explained?' unknown':''}"><span aria-hidden="true">↕</span><div><b>CAS 1 ↔ CAS 2</b><small>${explained?'No test across this section yet':'Between the two end loops'}</small></div></div>
    ${node(cas('CAS 2'),'CAS 2')}
    <div class="connected-span checked"><span aria-hidden="true">↕</span><div><b>Remote loop: pass</b><small>LC leg + connections to CAS 2</small></div></div>
    ${node(optic('remote'),'Remote optic')}
    </div><p class="q-observation">Each loop used its assigned pair and a valid setup.</p>`;
}

export function connectedCaseVisual(step,{lesson=false,answered=false}={}) {
  const expected=lesson?8:12, observed=lesson?9:13;
  if(step===1) return endLoops(lesson||answered);
  if(step===2) return `<p class="q-report-label">Earlier checks: both end loops passed</p>
    <div class="connected-vfl"><b>VFL</b><span>Disconnected local LC leg</span><span class="connected-red-route" aria-hidden="true">↓</span><span>Through CAS 1 → toward CAS 2</span></div>
    <div class="connected-port-check">${[['FIM expects',expected,false],['Light detected',observed,true]].map(([label,port,lit])=>`<div class="case-fact"><span>${label}</span><i class="connected-port-face${lit?' port-lit':''}" aria-hidden="true"></i><b>CAS 2 / ${port}</b></div>`).join('')}</div>
    <p class="q-observation">Active optics are disconnected. VFL stays on the LC leg; CAS is the observation point. Detect light indirectly.</p>`;
  if(step===3) return `<p class="q-report-label">Authorized mapping correction completed; retest at the expected port</p>
    <div class="connected-strands"><div><b>LC · A</b><span class="strand-seen" aria-hidden="true">→</span><strong>Light detected</strong></div><div><b>LC · B</b><span class="strand-dark" aria-hidden="true">⇢</span><strong>No light detected</strong></div></div>
    <p class="connected-destination">CAS 2 / ${expected}</p><p class="q-observation">VFL moved between disconnected LC strands A and B. The VFL and LC connection passed a known-good reference check.</p>`;
  if(step===4) return `<p class="q-report-label">Loose connection corrected → both strands traced → Normalize</p>
    <div class="case-facts">${fact('Expected port',`CAS 2 / ${expected}`)}${fact('VFL result','A and B: light detected')}</div>
    <div class="connected-reading"><span>Restored service RX</span><strong>${lesson?'−4.60':'−4.40'} <small>dBm</small></strong><p>Example RX limits: −3.00 to +3.00 dBm</p></div>`;
  return `<p class="q-report-label">After further approved work · service restored for verification</p>
    <div class="connected-reading"><span>One measured RX</span><strong>${lesson?'+0.35':'+0.50'} <small>dBm</small></strong><p>Example RX limits: −3.00 to +3.00 dBm</p></div>
    <div class="case-facts">${fact('Other required lanes','Not yet checked')}${fact('Link + endpoint identity','Not yet checked')}</div>`;
}

const lessonSteps=[
  ['1 · Compare loops','Combine the coverage, not the conclusions. A local loop to CAS 1 and a remote loop to CAS 2 leave the section between the cassettes untested. A passing end does not verify that gap.'],
  ['2 · Check destination','Trace from a disconnected LC leg, with active optics isolated. If the observed port differs from FIM, compare the labels and physical route with the assignment. Verify which is wrong before making an authorized correction.'],
  ['3 · Check both strands','After correcting the mapping, test each assigned strand. A working strand does not clear its neighbor. Verify the VFL and LC connection with a known-good reference, then isolate the dark path and its interfaces. Do not name a ferrule or leg as faulty from this observation alone.'],
  ['4 · Check service light','After correcting a connection, both strands can pass red light while service RX remains low. Normalize restores the assigned patching; it does not declare the link healthy. Inspect remaining connections and use an appropriate optical loss test.'],
  ['5 · Verify before closing','An improved reading is progress. Check all required TX/RX lanes against the installed limits, verify link operation and the expected device and port, then record the final results. Each check answers a different question.']
];
export function connectedCaseLesson() {
  return `<section id="connected-case" class="lesson-section" aria-labelledby="connected-case-title"><h3 id="connected-case-title">Work one case from both ends</h3>
    <p class="section-intro">Follow the new evidence. The next check changes as you learn more.</p>
    <div class="lesson-options connected-steps" role="group" aria-label="Worked case steps">${lessonSteps.map(([title],i)=>`<button type="button" data-case-step="${i+1}" aria-pressed="${i===0}">${title}</button>`).join('')}</div>
    <div id="connected-case-example" aria-live="polite"></div></section>`;
}
export function mountConnectedCase(root) {
  const host=root.querySelector('#connected-case-example');
  if(!host) return;
  const draw=step=>{
    host.innerHTML=`<div class="reason-example">${connectedCaseVisual(step,{lesson:true})}</div><p class="lesson-takeaway">${lessonSteps[step-1][1]}</p>`;
    root.querySelectorAll('[data-case-step]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.caseStep)===step)));
  };
  root.querySelectorAll('[data-case-step]').forEach(button=>button.addEventListener('click',()=>draw(Number(button.dataset.caseStep))));
  draw(1);
}
