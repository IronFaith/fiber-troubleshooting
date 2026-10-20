import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=5';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow} from './light-visuals.mjs?v=1';

const svg=(body,height=240,label='Worked example')=>`<svg viewBox="0 0 620 ${height}" role="img" aria-label="${label}">${body}</svg>`;
const label=(x,y,copy,extra='')=>`<text x="${x}" y="${y}" ${extra}>${copy}</text>`;
const face=(x,y,width=100,flipped=false)=>`<svg x="${x}" y="${y}" width="${width}" height="${width}" viewBox="0 0 360 354">${opticIllustration({optic:25,labels:false,flipped,id:`worked-${x}-${y}`}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'')}</svg>`;

export function readingLesson() {
  return `<section id="readings" class="lesson-section" aria-labelledby="range-title"><h3 id="range-title">Read a range, not a target number</h3>
    <p class="section-intro">Start with the installed optic’s lower and upper limits. TX and RX can have different limits.</p>
    <div class="reason-example"><p class="reason-caption">Worked example · RX allowed −3.00 to +3.00 dBm</p>
      ${svg(`<rect class="reason-range" x="170" y="55" width="280" height="24" rx="12"/><path class="reason-axis" d="M30 67 H590"/>
        ${label(30,104,'−6')}${label(170,104,'−3.00','text-anchor="middle"')}${label(310,104,'0','text-anchor="middle"')}${label(450,104,'+3.00','text-anchor="middle"')}${label(590,104,'+6','text-anchor="end"')}
        ${[[114,'−4.20','Too low'],[322,'+0.25','Within limits'],[487,'+3.80','Too high']].map(([x,value,note])=>`<path class="reason-pointer" d="M${x} 47 v34"/>${label(x,28,value,'text-anchor="middle"')}${label(x,135,note,'text-anchor="middle"')}`).join('')}`,160,'RX limits −3 to +3 dBm. −4.20 is below the minimum, +0.25 is inside, and +3.80 is above the maximum.')}
      <p>More negative means weaker power: <b>−4.20 is below −3.00</b>. Above the upper limit is also out of range. Zero is not a required target; TX and RX do not have to match.</p></div>
    <p class="lesson-takeaway">A −40 report is this site’s no-light indication, not a diagnosis. Check each required lane against its own limits, then check link status. These example limits are not universal.</p></section>`;
}

export function loopReasoningLesson() {
  return `<section id="compare-loops" class="lesson-section" aria-labelledby="compare-title"><h3 id="compare-title">Move the loop, grow the tested section</h3>
    <p class="section-intro">Start small, then add one section. Each new loop still returns to the same local RX. Compare what changed when you moved it.</p>
    <p class="picture-note">Worked case: same pair, valid loop mapping and attenuation, no other changes between tests. Explore each step.</p>
    <div class="lesson-options" role="group" aria-label="Worked loop sequence"><button type="button" data-worked-loop="0">1 · Direct loop</button><button type="button" data-worked-loop="1">2 · Loop at CAS 1</button><button type="button" data-worked-loop="2">3 · Loop at CAS 2</button></div>
    <figure id="worked-loop" class="reason-example" aria-live="polite"></figure>
    <p class="lesson-takeaway">Compare the last passing test with the next failure. Investigate the added fiber <b>and its connections</b>. Recheck the failed loop setup first. A failure does not prove a break or name its exact position.</p>
    <p class="picture-note">Only extend to passives you can access. Beyond the loop and the remote optic remain unverified; one pair does not prove every channel.</p></section>`;
}

export function faultReasoningLesson() {
  return `<section id="fault-evidence" class="lesson-section" aria-labelledby="fault-evidence-title"><h3 id="fault-evidence-title">One dark channel can have several causes</h3>
    <div class="reason-two-up"><div class="reason-example"><h4>MMC ferrule</h4>${svg(`<g transform="translate(120 20) scale(3)">${mmcHead(0,0,false)}</g>${label(310,200,'Ferrule aligns the fibers at the mating face','text-anchor="middle"')}`,225,'Enlarged MMC head. The ferrule at the mating face aligns the fibers.')}<p>The ferrule holds and aligns fibers. Dirt or damage at this interface can affect one or more paths.</p></div>
    <div class="reason-example"><h4>Fiber or splice</h4>${svg(`<path class="reason-fiber" d="M35 100 H277 M343 115 H585"/><rect class="reason-splice" x="255" y="62" width="110" height="100" rx="12"/>${label(310,202,'Illustrative poor alignment at a fiber joint','text-anchor="middle"')}`,225,'Two fiber ends with a misalignment inside an illustrative splice area.')}<p>A bend, break or poor splice can reduce or interrupt light. The same symptom can also come from seating or mapping.</p></div></div>
    <p class="lesson-takeaway">Working neighbors do not prove the affected channel is healthy. Track its own mapped route. A dark reading alone cannot distinguish dirt, ferrule damage, a fiber defect or a splice issue.</p><p class="picture-note">Reference: <a href="https://www.usconec.com/featured-products/mmc-connector-solutions/performance" target="_blank" rel="noopener noreferrer">US Conec · MMC ferrule performance ↗</a></p></section>
    <section id="change-evidence" class="lesson-section" aria-labelledby="change-title"><h3 id="change-title">Connect a change to its result</h3>
    <div class="reason-example"><div class="reason-sequence"><span>Record reading</span><b>→</b><span>Make one change</span><b>→</b><span>Retest + record</span></div>
    <p><b>Worked example:</b> RX is −8.00. You widen a tight bend <em>and</em> reseat the connector before measuring +0.25. The path improved, but you cannot tell which change helped or how much each contributed.</p>
    <p>If instead RX improves only to −4.00 with a −3.00 minimum, it is still too low. Keep investigating. Even an in-range reading leaves other required lanes and link status to check.</p></div></section>`;
}

export function vflReasoningLesson() {
  return `<section id="test-evidence" class="lesson-section" aria-labelledby="test-evidence-title"><h3 id="test-evidence-title">Two tests, two different pieces of evidence</h3>
    <div class="reason-two-up"><div class="reason-example"><h4>Isolated VFL trace</h4>${svg(`<rect class="reason-vfl" x="30" y="62" width="125" height="65" rx="20"/>${label(92,103,'VFL','text-anchor="middle"')}<path class="reason-red" d="M155 95 H500"/><circle class="reason-red-dot" cx="510" cy="95" r="16"/>${lightFlow('M155 95 H510','red')}${label(310,164,'Expected port + strand found','text-anchor="middle"')}`,195,'VFL light reaches the expected destination on an isolated strand.')}<p>This supports continuity and the mapped destination for that strand.</p></div>
    <div class="reason-example"><h4>Restored service reading</h4><div class="reason-power">RX <b>−4.40</b><small>dBm</small></div><p>Example limits: −3.00 to +3.00 dBm. Some light arrives, but it is below the minimum.</p></div></div>
    <p class="lesson-takeaway">A visible trace does not prove acceptable IR loss. Check connections and measure loss with the appropriate source / meter or loss test set. Restore the mapped path and verify the required readings and link.</p></section>`;
}

export function perspectiveLesson() {
  return `<section id="viewpoint" class="lesson-section" aria-labelledby="viewpoint-title"><h3 id="viewpoint-title">Change your viewpoint, keep the same light paths</h3>
    <div class="reason-example"><div class="reason-sequence"><span>A TX</span><b>→</b><span>Mapped fiber + passives</span><b>→</b><span>B RX</span></div>
    <p>At A, this is your outgoing path. Walk to B, and the same path becomes your incoming path. TX still sends; RX still receives.</p>
    <p><b>Worked example:</b> At B, TX is in range but RX is dark. Investigate A’s source → mapped fiber and interfaces → B’s receiver. B’s healthy TX report does not prove that A receives B’s outgoing light. Leave inaccessible sections unverified.</p></div></section>`;
}

function lldpDevice(name,port,role) {
  return `<div class="lldp-node lldp-device"><div class="lldp-hardware" aria-hidden="true"><div class="lldp-chassis"><i></i><svg viewBox="0 0 360 354">${opticIllustration({optic:port?.startsWith('25/')?25:7,labels:false,id:`lldp-${name}`}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'')}</svg></div></div><strong>${name==='?'?'Unknown device':`Device ${name}`}</strong><span>${port?`Port ${port}`:'Not identified'}</span><b class="lldp-role" data-role="${role}">${role==='local'?'Local':'Remote'}</b></div>`;
}

export function lldpLesson() {
  const passive=name=>`<div class="lldp-node"><div class="lldp-hardware hardware-art" aria-hidden="true"><svg viewBox="0 0 360 206">${cassetteFront({name,port:12,patched:true})}</svg></div><strong>${name}</strong><span>Passes fiber</span></div>`;
  return `<section id="lldp-neighbors" class="lesson-section" aria-labelledby="lldp-title">
    <h3 id="lldp-title">LLDP — Link Layer Discovery Protocol</h3>
    <p class="section-intro">Devices use LLDP to announce their <b>name + port</b> over the existing connection. It helps you confirm who is connected.</p>
    <ul class="lldp-uses" aria-label="What the LLDP acronym means">
      <li><span>Link Layer<b>On this direct link</b></span></li>
      <li><span>Discovery<b>Identify the other end</b></span></li>
      <li><span>Protocol<b>Shared messaging rules</b></span></li>
    </ul>
    <figure class="lldp-link" id="lldp-demo">
      <div class="lldp-demo-heading"><strong>Start with local and remote</strong><span>Local = the device you’re checking</span></div>
      <div class="lesson-options lldp-view-options" role="group" aria-label="Choose the local device">
        <button type="button" data-lldp-view="A" aria-controls="lldp-demo lldp-result">At Device A</button>
        <button type="button" data-lldp-view="B" aria-controls="lldp-demo lldp-result">At Device B</button>
      </div>
      <div class="lldp-message" id="lldp-message"></div>
      <div class="lldp-path">
        <div id="lldp-left"></div>${passive('CAS 1')}${passive('CAS 2')}<div id="lldp-right"></div>
        <span class="lldp-id-tag" aria-hidden="true">ID ←</span>
      </div>
      <div class="lldp-play-row"><button type="button" id="lldp-play" aria-controls="lldp-result">▶ Follow the name</button><span>Blue tag = LLDP message</span></div>
      <figcaption id="lldp-caption" aria-live="polite"></figcaption>
    </figure>
    <h4 class="lldp-check-title">Now read the neighbor in Cable Guy</h4>
    <p class="picture-note"><b>LLDP calls the remote device a neighbor:</b> the next active device on this link, even in another room. The CAS units only pass the fiber through.</p>
    <p class="picture-note">Compare the reported neighbor’s name + port with FIM. Does it match?</p>
    <div class="lesson-options lldp-options" role="group" aria-label="Try a different neighbor report">
      <button type="button" data-lldp-case="match" aria-controls="lldp-result">Match</button>
      <button type="button" data-lldp-case="different" aria-controls="lldp-result">Other device</button>
      <button type="button" data-lldp-case="port" aria-controls="lldp-result">Other port</button>
      <button type="button" data-lldp-case="missing" aria-controls="lldp-result">No neighbor</button>
    </div>
    <div id="lldp-result" class="lldp-result" aria-live="polite" aria-atomic="true"></div>
    <p class="picture-note">Teaching example. Use a fresh report; old neighbors can remain briefly.</p>
    <ul class="lldp-uses" aria-label="When LLDP helps">
      <li><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 6h15l11 10-11 10H3z"/><circle cx="8" cy="16" r="2"/><path d="M18 11v7m0 3v1"/></svg><span>Missing label?<b>Identify the other end.</b></span></li>
      <li><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 9h22l-5-5m5 5-5 5M29 23H7l5-5m-5 5 5 5"/></svg><span>Patch changed?<b>Check the destination.</b></span></li>
      <li><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="3" width="22" height="26" rx="3"/><path d="m10 16 4 4 8-9"/></svg><span>New connection?<b>Compare with FIM.</b></span></li>
    </ul>
    <p class="lesson-takeaway"><b>LLDP identifies the remote device. Your local report lists it as a neighbor.</b><br>Same connection, no extra cable. Check TX/RX separately for light health.</p>
    <p class="lesson-sources"><a href="https://developer.cisco.com/docs/sonic/lldp/" target="_blank" rel="noopener noreferrer">Cisco · LLDP reference ↗</a></p>
  </section>`;
}

export function mountLldpLesson(root) {
  const result=root.querySelector('#lldp-result');
  if(!result) return;
  const demo=root.querySelector('#lldp-demo'), play=root.querySelector('#lldp-play'), caption=root.querySelector('#lldp-caption');
  const devices={A:{name:'A',port:'25/1'},B:{name:'B',port:'7/1'}};
  let view='A',selected='match',timer;
  function currentReport() {
    const local=devices[view], expected=devices[view==='A'?'B':'A'];
    const examples={
      match:{...expected,status:'✓ Device and port match',next:'The expected device is on this link. Check TX/RX and link status too.'},
      different:{name:'C',port:expected.port,status:`≠ Expected ${expected.name}. Heard C.`,next:'Check the patching and FIM. A misport or an outdated record could explain this.'},
      port:{name:expected.name,port:expected.port.replace('/1','/5'),status:`≠ Expected ${expected.port}. Heard ${expected.port.replace('/1','/5')}.`,next:'Check the exact port and FIM before changing the patch.'},
      missing:{name:'?',port:'',status:'? No identity reported',next:'Check link status, optic readings and LLDP settings. This alone does not prove bad fiber.'}
    };
    return {local,expected,neighbor:examples[selected]};
  }
  function renderReport(pending=false) {
    const {local,expected,neighbor}=currentReport();
    result.dataset.state=selected;
    result.dataset.pending=String(pending);
    result.innerHTML=`<p class="lldp-report-location">Report at Device ${local.name} · local port <b>${local.port}</b></p><div class="lldp-compare"><div><span>FIM expects</span><strong>Device ${expected.name}</strong><b>Port ${expected.port}</b></div><div><span>LLDP neighbor</span><strong class="${!pending&&selected==='different'?'lldp-mismatch':''}">${pending?'Receiving…':neighbor.name==='?'?'Not reported':`Device ${neighbor.name}`}</strong><b class="${!pending&&selected==='port'?'lldp-mismatch':''}">${pending?'Name + port':neighbor.port?`Port ${neighbor.port}`:'Cause unknown'}</b></div></div><div class="lldp-verdict"><strong>${pending?`Message traveling to ${local.name}…`:neighbor.status}</strong><p>${pending?'Follow the blue ID tag on the existing fiber.':neighbor.next}</p></div>`;
  }
  function finish() {
    clearTimeout(timer);timer=undefined;
    demo.dataset.playing='false';
    play.disabled=selected==='missing';
    const {local,neighbor}=currentReport();
    caption.textContent=selected==='missing'?'No LLDP message reported from the remote end. The light condition is still unknown.':`${local.name} is local. It hears ${neighbor.name} / ${neighbor.port} from the remote end of this link.`;
    renderReport();
  }
  function show(key) {
    selected=key;
    const {local,neighbor}=currentReport();
    root.querySelector('#lldp-left').innerHTML=view==='A'?lldpDevice(local.name,local.port,'local'):lldpDevice(neighbor.name,neighbor.port,'remote');
    root.querySelector('#lldp-right').innerHTML=view==='B'?lldpDevice(local.name,local.port,'local'):lldpDevice(neighbor.name,neighbor.port,'remote');
    root.querySelector('#lldp-message').innerHTML=key==='missing'?'<strong>?</strong><span>No device identity received</span>':`<strong>“I’m ${neighbor.name}”</strong><span>My port is ${neighbor.port}</span>`;
    root.querySelector('.lldp-id-tag').textContent=view==='A'?'ID ←':'ID →';
    demo.dataset.view=view;
    demo.dataset.state=key;
    play.textContent=key==='missing'?'No message to follow':'▶ Follow the name';
    root.querySelectorAll('[data-lldp-case]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lldpCase===key)));
    root.querySelectorAll('[data-lldp-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lldpView===view)));
    finish();
  }
  play.addEventListener('click',()=>{
    if(selected==='missing') return;
    const {local,neighbor}=currentReport();
    if(root.classList.contains('light-paused')) {
      finish();
      caption.textContent=`Remote ${neighbor.name} / ${neighbor.port} → ${view==='A'?'CAS 2 → CAS 1':'CAS 1 → CAS 2'} → local ${local.name}.`;
      return;
    }
    clearTimeout(timer);
    demo.dataset.playing='true';play.disabled=true;
    caption.textContent=`${neighbor.name} sends its name and port through the same fiber to ${local.name}.`;
    renderReport(true);
    timer=setTimeout(finish,2400);
  });
  root.querySelectorAll('[data-lldp-case]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.lldpCase)));
  root.querySelectorAll('[data-lldp-view]').forEach(button=>button.addEventListener('click',()=>{
    if(view===button.dataset.lldpView) return;
    view=button.dataset.lldpView;
    show('match');
  }));
  root.querySelector('.lesson-motion')?.addEventListener('click',()=>{if(timer) finish();});
  root.addEventListener('coursevisibility',()=>{if(root.hidden&&timer) finish();});
  show('match');
}


export function patchTicketLesson() {
  return `<section id="worked-ticket" class="lesson-section" aria-labelledby="ticket-title"><h3 id="ticket-title">Read one complete patching ticket</h3>
    <div class="reason-ticket"><span>Mock position <b>QNO5.5C.16f.17.30</b></span><span>Ethernet <b>25/1</b></span><span>Follower <b>Leg 3</b></span><span>Head <b>S747885346FWL</b></span><span>Destination <b>CAS 2 / Port 28</b></span></div>
    <div class="reason-example">${svg(`${face(35,5,190,true)}<svg x="285" y="25" width="315" height="181" viewBox="0 0 360 206">${cassetteFront({name:'CAS 2',port:28,patched:true})}</svg>${label(130,221,'Tab below · 25/1 is now right','text-anchor="middle"')}${label(450,221,'Mapped MMC head → Port 28','text-anchor="middle"')}`,245,'Flipped optic with purple tab below, so 25/1 is on the right. MMC head is mapped to CAS 2 Port 28.')}
    <ol><li><b>Locate:</b> building QNO5, room 5C, row 16 front, rack 17, elevation 30. The rack number is not the elevation.</li>
    <li><b>Orient:</b> tab above gives /1 left and /5 right. Tab below swaps their physical sides, not their Ethernet identities.</li>
    <li><b>Map:</b> use leg 3 from the named head. Match CAS 2 / 28, on the 17–32 bottom row. A shared head serial does not make the legs interchangeable.</li>
    <li><b>Verify:</b> inspect / clean, seat the mapped connections and check health. Correct placement alone does not prove a working link.</li></ol></div></section>`;
}

export function mountReasoningLessons(root) {
  const host=root.querySelector('#worked-loop');
  if(!host) return;
  const steps=[
    ['Direct loop passes','TX returns to local RX. The external fiber and remote device are outside this test.'],
    ['CAS 1 loop passes','The same pair now passes through the LC leg, MMC head and connections up to CAS 1. The onward route is still untested.'],
    ['CAS 2 loop fails','Only the CAS 1 → CAS 2 section was added. Verify this loop setup, then investigate that section and its connections. The test does not identify the exact fault.']
  ];
  function draw(step) {
    const end=[95,310,525][step],path=`M95 198 H${end+12} Q${end+34} 198 ${end+34} 222 Q${end+34} 246 ${end+12} 246 H95`;
    host.innerHTML=svg(`${face(45,20)}<svg x="225" y="35" width="170" height="105" viewBox="0 0 360 220">${cassetteFront({name:'CAS 1',port:12,inserted:step===1})}</svg><svg x="440" y="35" width="170" height="105" viewBox="0 0 360 220">${cassetteFront({name:'CAS 2',port:12,inserted:step===2})}</svg>
      ${label(95,163,'Local optic','text-anchor="middle"')}${label(310,163,'CAS 1 / 12','text-anchor="middle"')}${label(525,163,'CAS 2 / 12','text-anchor="middle"')}
      <path class="reason-unverified" d="M95 198 H600 M95 246 H600"/><path class="${step===2?'reason-suspect':'reason-loop'}" d="${path}"/>${step<2?lightFlow(path):''}
      ${step===2?'<rect class="reason-suspect-area" x="327" y="178" width="180" height="88" rx="8"/>'+label(417,227,'Added section','text-anchor="middle"'):label(310,227,'TX → loop → RX','text-anchor="middle"')}`,285,steps[step].join('. '))+`<figcaption><b>${steps[step][0]}</b><span>${steps[step][1]}</span></figcaption>`;
    root.querySelectorAll('[data-worked-loop]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.workedLoop)===step)));
  }
  root.querySelectorAll('[data-worked-loop]').forEach(b=>b.addEventListener('click',()=>draw(Number(b.dataset.workedLoop))));
  draw(0);
}
