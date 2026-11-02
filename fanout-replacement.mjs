import {mmcHead} from './loop-visuals.mjs?v=2026110103';
import {lcConnector} from './test-tool-visuals.mjs?v=20261101';
import {newFanoutReplacement,changeFanoutReplacement,canCompleteFanout} from './fanout-replacement-state.mjs?v=20261101';

// Original educational connection view; all records and labels are fictional.
export const fanoutGuideMarkup = `<section id="fanout-replacement" class="lesson-section" aria-labelledby="fanout-title"><div id="fanout-guide">
  <div class="fg-viz-row"><span class="fg-viz-badge">Guided simulation</span><span class="fg-text-small">Fictional example · 12 LC legs</span></div>
  <h2 id="fanout-title">Fanout replacement</h2>
  <p>Replace one MMC and all 12 legs. Keep every connection matched.</p>
  <ol class="fg-steps">
    <li>
        <div class="fg-step-heading"><span class="fg-number">1</span><h3>Find the damaged leg</h3></div>
        <p>Find the broken leg. Follow its label to the MMC and match the full serial.</p>
      <details class="fg-details"><summary>Show example: leg to MMC</summary>
      <div class="fg-identity-example"><div>
        <div class="fg-flow" aria-label="Trace the damaged leg to its assembly">
          <div><span class="fg-text-small">Damaged leg</span><strong>Leg 7</strong></div><span aria-hidden="true">→</span>
          <div><span class="fg-text-small">MMC head serial</span><strong>SN.4827.0619</strong></div>
        </div>
        <p class="fg-text-small">One head groups separate fiber paths; each leg keeps its own assignment.</p>
      </div>
      <div>  <div class="fg-diagram">
    <svg id="fg-fanout" class="fg-hardware" role="img" aria-label="One MMC head connects to twelve LC legs. Leg 7 is the damaged example; the replacement includes the entire assembly."></svg>
  </div>
  <div class="fg-viz-row"><span class="fg-key"><span class="fg-line"></span> Same assembly</span><span class="fg-key"><span class="fg-line fg-fault"></span> Leg 7 · damaged example</span></div>
  <p class="fg-text-small fg-text-muted">One line represents one leg, not a strand or ferrule pin map. LC is the connector type in this example; confirm the actual assembly specification.</p>
</div></div>
      </details>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">2</span><h3>Find its connection record</h3></div>
      <p>Find the device port and leg serial. Follow the record to its MMC, CAS and passive port.</p>
      <details class="fg-details"><summary>Show example: trace the connection</summary>
      <div class="fg-build">
        <div class="fg-system-heading"><h4>Connection records</h4><span class="fg-viz-badge">Illustrative view</span></div>
        <div class="fg-system-route"><span>Device relationship</span><strong>Device A → Device B</strong></div>
      </div>
      <div class="fg-record-lists">
        <section class="fg-record-panel fg-active-panel" id="fg-active-records" tabindex="-1" aria-labelledby="fg-active-list-title">
          <div class="fg-record-heading"><span class="fg-list-badge" aria-hidden="true">A</span><div><h4 id="fg-active-list-title">Device A</h4><span class="fg-text-small">Active leg list</span></div></div>
          <p>Find the port, then read the leg serial.</p>
          <table class="fg-record-table"><caption>Example device ports</caption><thead><tr><th scope="col">Device port</th><th scope="col">Leg serial</th></tr></thead><tbody>
            <tr><th scope="row"><bdi>4/2</bdi></th><td><bdi>DEMO-L06</bdi><span class="fg-row-note">Leg 6</span></td></tr>
            <tr class="fg-record-match"><th scope="row"><bdi>5/1</bdi><span class="fg-row-note">Find this leg</span></th><td><bdi>DEMO-L07</bdi><span class="fg-row-note">Leg 7</span></td></tr>
            <tr><th scope="row"><bdi>5/2</bdi></th><td><bdi>DEMO-L08</bdi><span class="fg-row-note">Leg 8</span></td></tr>
          </tbody></table>
          <p class="fg-text-small">3 example ports shown. The path follows the highlighted leg.</p>
          <a class="fg-list-jump" href="#fg-passive-records">Find its MMC and CAS port</a>
        </section>
        <section class="fg-trace-panel" aria-labelledby="fg-trace-title">
          <h4 id="fg-trace-title">Selected connection path</h4>
          <p class="fg-text-small">Follow the boxes to the matching CAS and port.</p>
          <ol id="fg-connection-path" class="fg-connection-path"></ol>
        </section>
      </div>
      <div class="fg-record-link"><strong>Leg serial → MMC head serial → CAS and port</strong><span class="fg-text-small">Fictional records. Serial formats are examples only.</span></div>
      <p class="fg-text-small">If the labels or map do not match, stop and resolve the mismatch.</p>
      <details class="fg-details"><summary>Show the full active/passive build</summary>
        <div class="fg-viz-row"><strong>Fully patched example</strong><span class="fg-text-small">A = active legs. P = passive MMCs.</span></div>
        <div class="fg-build-equation" role="img" aria-label="192 legs ÷ 12 legs per MMC = 16 MMCs"><span dir="auto">192 legs</span><span aria-hidden="true">÷</span><span dir="auto">12 legs per MMC</span><span aria-hidden="true">=</span><span dir="auto">16 MMCs</span></div>
        <div class="fg-viz-controls"><label class="fg-form-label">Illustrated room layout<select class="fg-form-select" id="fg-passive-count"><option value="3">3 passive locations</option><option value="6">6 passive locations</option></select></label></div>
        <p class="fg-text-small fg-text-muted">Follow the boxes from Device A to Device B. Scroll sideways to see the full route.</p>
        <div class="fg-route-scroll" tabindex="0" role="region" aria-label="Active and passive block diagram"><div id="fg-route" class="fg-route" role="list"></div></div>
        <p class="fg-text-small">Counts show patched / required. Each P shows 16/16 MMCs in this example.</p>
        <p class="fg-text-small">Replace one of the 16 MMCs and its 12 legs.</p>
      </details>
      </details>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">3</span><h3>Save all 12 connections</h3></div>
      <p>Save the MMC location and port, plus all 12 leg destinations. Match the installed labels.</p>
      <details class="fg-details"><summary>See the mapping example</summary>
              <table class="fg-table fg-table-sm">
        <caption class="fg-sr-only">Fictional connection map</caption>
        <thead><tr><th scope="col">Match</th><th scope="col">Worked example</th></tr></thead>
        <tbody>
          <tr><th scope="row">Device relationship</th><td>Device A → Device B</td></tr>
          <tr><th scope="row">Head / destination</th><td>SN.4827.0619 → CAS 1 · port 12</td></tr>
          <tr><th scope="row">Leg / endpoint</th><td>Leg 7 → Device A · 5/1</td></tr>
          <tr><th scope="row">Leg serial</th><td><bdi>DEMO-L07</bdi></td></tr>
          <tr><th scope="row">Whole assembly</th><td>Record each of the 12 leg IDs and its assigned device / port</td></tr>
        </tbody>
      </table>

              <div class="fg-cassette" role="img" aria-label="CAS 1, 32 ports. Ports 1 to 16 are on top; 17 to 32 below. Port 12 is the example destination.">
        <div class="fg-cassette-label"><span>CAS 1 · front port reference</span><span>32 ports</span></div>
        <div class="fg-port-row" id="fg-ports-top"></div><div class="fg-port-row" id="fg-ports-bottom"></div>
      </div>

        <p class="fg-text-small fg-text-muted">This fictional route illustrates connectivity. Passive count and fanout leg count are independent.</p>
        <p class="fg-text-small fg-text-muted">All devices, assignments and serials in this example are fictional.</p>
      </details>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">4</span><h3>Replace and update</h3></div>
      <p>Replace the fanout using the approved procedure, then update its MMC and 12 leg records.</p>
      <details class="fg-details"><summary>Replacement reminders</summary>
      <p>Confirm authorization, affected services and a compatible replacement. Follow the approved isolation, inspection, cleaning and installation procedure.</p>
      <div class="fg-rule"><strong>Keep every leg matched to its recorded destination.</strong></div>
      <p>Record the installed head and leg identifiers, destinations and required change history using the authorized process.</p>
      </details>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">5</span><h3>Check every link</h3></div>
      <p>Match the new labels and ports. Run the required site tests on every affected link before closing.</p>
      <details class="fg-details"><summary>Practice checking the map</summary>
        <div class="fg-card" id="fg-demo">
          <div class="fg-viz-row"><strong>Account for the head and every leg</strong><span class="fg-viz-badge">Fictional checklist</span></div>
          <div class="fg-leader-action"><div><span class="fg-text-small">Head · SN.4827.0619</span><div id="fg-leader-state">Not checked</div></div><button class="fg-btn" type="button" id="fg-remove-leader">Check head mapping</button></div>
          <div class="fg-followers-label"><span>Legs 1–12</span><span id="fg-follower-count" class="fg-tabular-nums">12 remaining</span></div>
          <div class="fg-follower-grid" id="fg-followers"></div>
          <hr>
          <div class="fg-viz-row"><button class="fg-btn fg-btn-primary" type="button" id="fg-patch-new" disabled>Finish checklist</button><span id="fg-gate-label">Mapping checks remain</span></div>
          <p id="fg-status" aria-live="polite">Check the head and all 12 legs in any order.</p>
        </div>
        <p class="fg-text-small fg-text-muted">These buttons mark a fictional checklist. They do not change records, disconnect fibers or verify a live link.</p>
        <button class="fg-btn" type="button" id="fg-restart">Restart this simulation</button>
      </details>
    </li>
  </ol>
</div></section>`;

export function mountFanoutReplacement(host) {
 host.innerHTML=fanoutGuideMarkup;
 const root=host.querySelector('#fanout-guide');
 const q=selector=>root.querySelector(selector);
 function drawFanout(){
   const svg=q('#fg-fanout'),width=Math.max(256,svg.getBoundingClientRect().width),tip=width-34;
   let drawing='<title>One head, twelve legs</title><desc>The damaged example is leg 7. All twelve legs belong to MMC SN.4827.0619; the full assembly is replaced.</desc>';
   drawing+=`<text x="12" y="20">MMC head</text><text x="${width-143}" y="20">LC legs</text>`;
   for(let i=0;i<12;i++){
     const y=44+i*25,startY=171+i*1.2,end=tip-64*.62;
     drawing+=`<path d="M133 ${startY} C${Math.min(width*.48,190)} ${startY} ${end-24} ${y} ${end} ${y}" fill="none" stroke="${i===6?"#a34c22":"#aa851d"}" stroke-width="${i===6?3:1.5}" ${i===6?'stroke-dasharray="5 3"':''}/>`;
     drawing+=lcConnector(tip,y,{scale:.62});
     drawing+=`<text x="${width-19}" y="${y+4}" text-anchor="middle">${i+1}${i===6?'*':''}</text>`;
   }
   drawing+=`<g transform="translate(112 202) rotate(180)">${mmcHead(0,0,false)}</g>`;
   drawing+='<text x="12" y="223">SN.4827.0619</text><text x="12" y="242">Entire assembly</text><text x="12" y="259">replaced together</text>';
   svg.setAttribute('viewBox',`0 0 ${width} 350`);svg.innerHTML=drawing;
 }
 function drawRoute(){
   const count=Number(q('#fg-passive-count').value),route=q('#fg-route');
   const passivePorts=[12,8,4,10,6,2];
   const deviceCard=(device,port,serial)=>`<li class="fg-trace-device"><strong>${device}</strong><dl><div><dt>Device port</dt><dd><bdi>${port}</bdi></dd></div><div><dt>Leg serial</dt><dd><bdi>${serial}</bdi></dd></div></dl></li>`;
   q('#fg-connection-path').innerHTML=deviceCard('Device A','5/1','DEMO-L07')+Array.from({length:count},(_,i)=>`<li ${i===0?'id="fg-passive-records" tabindex="-1" aria-label="Mapped passive" data-target="true"':''}><div class="fg-trace-heading"><strong>CAS ${i+1}</strong><span class="fg-text-small">P${i+1}</span></div><dl><div><dt>Passive port</dt><dd><bdi>${passivePorts[i]}</bdi></dd></div><div><dt>MMC head serial</dt><dd><bdi>${i===0?'SN.4827.0619':`DEMO-MMC-${String(i+1).padStart(2,'0')}`}</bdi></dd></div></dl>${i===0?'<span class="fg-row-note">This MMC holds the 12 legs to replace.</span>':''}</li>`).join('')+deviceCard('Device B','3/1','DEMO-R07');
   const active=(device,showList=false)=>`<div class="fg-route-node fg-route-active" role="listitem"><strong class="fg-route-letter">A</strong><span>${device}</span><bdi class="fg-route-count" dir="ltr">192/192</bdi><span class="fg-text-small">Legs patched</span>${showList?'<a class="fg-list-jump" href="#fg-active-records">View leg list</a>':''}</div>`;
   route.innerHTML=active('Device A',true)+Array.from({length:count},(_,i)=>`<div class="fg-route-node" role="listitem" ${i===0?'data-target="true"':''}><strong class="fg-route-letter">P${i+1}</strong><span>${i===0?'CAS 1':'Passive'}</span><bdi class="fg-route-count" dir="ltr">16/16</bdi><span class="fg-text-small">MMCs patched</span>${i===0?'<span class="fg-route-target">Mapped passive</span><a class="fg-list-jump" href="#fg-passive-records">View MMC list</a>':''}</div>`).join('')+active('Device B');
 }
 for(const [selector,start] of [['#fg-ports-top',1],['#fg-ports-bottom',17]])q(selector).innerHTML=Array.from({length:16},(_,i)=>`<span class="fg-port"${i+start===12?' data-selected="true"':''}>${i+start}</span>`).join('');

 let state=newFanoutReplacement();
 const legs=q('#fg-followers');
 function renderFollowers(){
   legs.innerHTML=state.legsVerified.map((verified,i)=>`<div class="fg-follower-cell"><button class="fg-btn" type="button" data-leg="${i+1}" aria-label="Check mapping for leg ${i+1}" ${verified?'disabled':''}>${verified?(i+1)+' ✓':'Leg '+(i+1)}</button><span class="fg-text-small" data-leg-status="${i+1}">${verified?'Checked':'Not checked'}</span></div>`).join('');
 }
 function updateGate(){
   const remaining=state.legsVerified.filter(verified=>!verified).length;
   q('#fg-follower-count').textContent=`${remaining} remaining`;
   q('#fg-patch-new').disabled=!canCompleteFanout(state);
   q('#fg-gate-label').textContent=state.completed?'Checklist complete':canCompleteFanout(state)?'Ready to finish':'Mapping checks remain';
   q('#fg-remove-leader').disabled=state.headVerified;
   q('#fg-remove-leader').textContent=state.headVerified?'Head checked':'Check head mapping';
   q('#fg-leader-state').textContent=state.headVerified?'Checked':'Not checked';
 }
 q('#fg-remove-leader').addEventListener('click',()=>{
   state=changeFanoutReplacement(state,{type:'verifyHead'});
   q('#fg-status').textContent='Head mapping checked. Account for every leg before finishing.';updateGate();
 });
 legs.addEventListener('click',event=>{
   const button=event.target.closest('button[data-leg]');if(!button||button.disabled)return;
   const leg=Number(button.dataset.leg);state=changeFanoutReplacement(state,{type:'verifyLeg',leg});
   button.disabled=true;button.textContent=`${leg} ✓`;q(`[data-leg-status="${leg}"]`).textContent='Checked';
   const remaining=state.legsVerified.filter(verified=>!verified).length;
   q('#fg-status').textContent=`Leg ${leg} checked. Legs remaining: ${remaining}.`;updateGate();
 });
 q('#fg-patch-new').addEventListener('click',()=>{
   if(!canCompleteFanout(state))return;
   state=changeFanoutReplacement(state,{type:'complete'});
   q('#fg-status').textContent='Checklist complete. Real work still requires the approved tests and verification of every affected link.';updateGate();
 });
 q('#fg-restart').addEventListener('click',()=>{
   state=newFanoutReplacement();renderFollowers();
   q('#fg-status').textContent='Check the head and all 12 legs in any order.';updateGate();
   q('#fg-remove-leader').focus();
 });
 q('#fg-passive-count').addEventListener('change',drawRoute);
 renderFollowers();drawRoute();drawFanout();new ResizeObserver(drawFanout).observe(q('#fg-fanout'));
}
