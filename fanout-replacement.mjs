import {mmcHead} from './loop-visuals.mjs?v=5';
import {lcConnector} from './test-tool-visuals.mjs?v=1';
import {newFanoutReplacement,changeFanoutReplacement,canPatchFanout} from './fanout-replacement-state.mjs?v=1';

// Teaching identifiers and navigation are examples, not live FIMspect records.
export const fanoutGuideMarkup = `<section id="fanout-replacement" class="lesson-section" aria-labelledby="fanout-title"><div id="fanout-guide">
  <div class="fg-viz-row"><span class="fg-viz-badge">Guided simulation</span><span class="fg-text-small">Worked example · 12 LC legs</span></div>
  <h3 id="fanout-title">Fanout replacement</h3>
  <p>One MMC leader. All of its followers. One complete replacement.</p>
  <div class="fg-diagram">
    <svg id="fg-fanout" class="fg-hardware" role="img" aria-label="One MMC head connects to twelve LC legs. Leg 7 is the damaged example; the replacement includes the entire assembly."></svg>
  </div>
  <div class="fg-viz-row"><span class="fg-key"><span class="fg-line"></span> Same assembly</span><span class="fg-key"><span class="fg-line fg-fault"></span> Leg 7 · damaged example</span></div>
  <p class="fg-text-small fg-text-muted">One line represents one leg, not a strand or ferrule pin map. LC is the connector type in this example; confirm the actual assembly specification.</p>

  <ol class="fg-steps">
    <li>
      <div class="fg-step-heading"><span class="fg-number">01</span><h4>Identify the damaged leg and its MMC</h4></div>
      <div class="fg-flow" aria-label="Trace the damaged leg to its assembly">
        <div><span class="fg-text-small">Device / optic port</span><strong>SSW · 5/1</strong></div><span aria-hidden="true">→</span>
        <div><span class="fg-text-small">Damaged follower</span><strong>Leg 7</strong></div><span aria-hidden="true">→</span>
        <div><span class="fg-text-small">MMC leader serial</span><strong>S747885346FWL</strong></div>
      </div>
      <p>Read the physical labels. Trace that leg to its head; match the full serial.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">02</span><h4>Confirm and save the FIMspect mapping</h4></div>
      <table class="fg-table fg-table-sm">
        <caption class="fg-sr-only">Illustrative mapping to capture before unpatching</caption>
        <thead><tr><th scope="col">Match</th><th scope="col">Worked example</th></tr></thead>
        <tbody>
          <tr><th scope="row">Device relationship</th><td>SSW → STSW</td></tr>
          <tr><th scope="row">Leader / destination</th><td>S747885346FWL → CAS 1 · port 12</td></tr>
          <tr><th scope="row">Follower / endpoint</th><td>Leg 7 → SSW · 5/1</td></tr>
          <tr><th scope="row">Whole assembly</th><td>Save each of the 12 follower IDs and its assigned device / port</td></tr>
        </tbody>
      </table>
      <p>Keep the complete mapping before clearing records. Include room, rack, passive and port identifiers.</p>
      <p class="fg-text-small fg-text-muted">Teaching values combined from the existing course and your example; these are not live FIMspect records.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">03</span><h4>Find the matching route in MyPatch</h4></div>
      <div class="fg-viz-controls"><label class="fg-form-label">Illustrated room layout<select class="fg-form-select" id="fg-passive-count"><option value="3">3 passive locations</option><option value="6">6 passive locations</option></select></label></div>
      <div class="fg-route-title">SSW → STSW</div>
      <div id="fg-route" class="fg-route" role="img" aria-label="SSW active endpoint, three passive locations, then STSW active endpoint"></div>
      <div class="fg-viz-row"><span><strong>A</strong> · active / device-side legs</span><span><strong>P</strong> · passive / MMC location</span></div>
      <p>Match the device relationship and room / building. Follow the mapped passive to the correct MMC.</p>
      <p class="fg-text-small fg-text-muted">Schematic navigation based on the site workflow. The number of passives is not the number of fanout legs.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">04</span><h4>Match the exact leader inside the passive</h4></div>
      <div class="fg-location"><span class="fg-viz-badge">P · mapped passive</span><strong>CAS 1 → port 12 → S747885346FWL</strong></div>
      <div class="fg-cassette" role="img" aria-label="CAS 1, 32 ports. Ports 1 to 16 are on top; 17 to 32 below. Port 12 is the example destination.">
        <div class="fg-cassette-label"><span>CAS 1 · front port reference</span><span>32 ports</span></div>
        <div class="fg-port-row" id="fg-ports-top"></div><div class="fg-port-row" id="fg-ports-bottom"></div>
      </div>
      <div class="fg-flow fg-scope"><div><span class="fg-text-small">P · leader record</span><strong>1 matching MMC</strong></div><span aria-hidden="true">↔</span><div><span class="fg-text-small">Associated A · followers</span><strong>12 matching legs</strong></div></div>
      <p>Cross-check the serial, passive and port against the physical labels and FIMspect. Identify every follower belonging to that leader.</p>
      <p class="fg-text-small fg-text-muted">A mismatch means stop and reconcile the mapping. Only this assembly is in scope—not every MMC along the route.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">05</span><h4>Unpatch the old leader, then every follower</h4></div>
      <p>In MyPatch, clear the selected MMC leader. Then clear each of its associated leg records, using the saved mapping.</p>
      <div class="fg-card" id="fg-demo">
        <div class="fg-viz-row"><strong>Try the record-removal sequence</strong><span class="fg-viz-badge">Illustration only</span></div>
        <div class="fg-leader-action"><div><span class="fg-text-small">Old leader · S747885346FWL</span><div id="fg-leader-state">Patched</div></div><button class="fg-btn" type="button" id="fg-remove-leader">Unpatch leader</button></div>
        <div class="fg-followers-label"><span>Old followers · legs 1–12</span><span id="fg-follower-count" class="fg-tabular-nums">12 remaining</span></div>
        <div class="fg-follower-grid" id="fg-followers"></div>
        <hr>
        <div class="fg-viz-row"><button class="fg-btn fg-btn-primary" type="button" id="fg-patch-new" disabled>Patch replacement leader</button><span id="fg-gate-label">Blocked · old records remain</span></div>
        <p id="fg-status" aria-live="polite">First unpatch the old leader. All 12 followers must also be cleared.</p>
      </div>
      <div class="fg-rule"><strong>Old leader cleared + zero old followers = replacement leader can be patched</strong></div>
      <p class="fg-text-small fg-text-muted">“Unpatch” here means a system-record action. This practice does not operate MyPatch or disconnect physical fibers. Button wording is illustrative.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">06</span><h4>Install and register the replacement fanout</h4></div>
      <div class="fg-replace" role="img" aria-label="Replace the old complete assembly with a compatible new assembly, preserving every mapped destination.">
        <div><span class="fg-text-small">OLD assembly</span><strong>Old MMC + all 12 legs</strong><span>Records cleared</span></div><span class="fg-replace-arrow" aria-hidden="true">→</span>
        <div><span class="fg-text-small">NEW assembly</span><strong>New MMC + all 12 legs</strong><span>Actual new serials</span></div>
      </div>
      <div class="fg-action-pair"><div><h5>At the rack</h5><p>Under the approved work / isolation procedure: confirm a compatible assembly, inspect and clean as required, then seat the MMC and every leg at its mapped destination.</p></div><div><h5>In MyPatch</h5><p>Once all old records are cleared, patch the new leader at the correct passive, then patch its followers to their recorded device / port assignments.</p></div></div>
      <p class="fg-text-small fg-text-muted">Coordinate physical and system changes using the site procedure. A whole-fanout replacement affects every associated leg, including the undamaged ones.</p>
    </li>
    <li>
      <div class="fg-step-heading"><span class="fg-number">07</span><h4>Verify the whole bundle before closing</h4></div>
      <div class="fg-verify">
        <div><strong>Identity</strong><span>New head and follower labels match the records.</span></div>
        <div><strong>Mapping</strong><span>Every leg is at its assigned device and port.</span></div>
        <div><strong>Service</strong><span>Check every affected link with the required site tests and readings.</span></div>
      </div>
      <p>Confirm the old assembly records are cleared and the replacement records are complete. Resolve any failed link before closing the work.</p>
    </li>
  </ol>
  <button class="fg-btn" type="button" id="fg-restart">Restart this simulation</button>
</div></section>`;

export function mountFanoutReplacement(host) {
 host.innerHTML=fanoutGuideMarkup;
 const root=host.querySelector('#fanout-guide');
 const q=selector=>root.querySelector(selector);
 function drawFanout(){
   const svg=q('#fg-fanout'),width=Math.max(256,svg.getBoundingClientRect().width),tip=width-34;
   let drawing='<title>One head, twelve followers</title><desc>The damaged example is leg 7. All twelve legs belong to MMC S747885346FWL; the full assembly is replaced.</desc>';
   drawing+=`<text x="12" y="20">P · MMC leader</text><text x="${width-143}" y="20">A · LC followers</text>`;
   for(let i=0;i<12;i++){
     const y=44+i*25,startY=171+i*1.2,end=tip-64*.62;
     drawing+=`<path d="M133 ${startY} C${Math.min(width*.48,190)} ${startY} ${end-24} ${y} ${end} ${y}" fill="none" stroke="${i===6?"#a34c22":"#aa851d"}" stroke-width="${i===6?3:1.5}" ${i===6?'stroke-dasharray="5 3"':''}/>`;
     drawing+=lcConnector(tip,y,{scale:.62});
     drawing+=`<text x="${width-19}" y="${y+4}" text-anchor="middle">${i+1}${i===6?'*':''}</text>`;
   }
   drawing+=`<g transform="translate(112 202) rotate(180)">${mmcHead(0,0,false)}</g>`;
   drawing+='<text x="12" y="223">S747885346FWL</text><text x="12" y="242">Entire assembly</text><text x="12" y="259">replaced together</text>';
   svg.setAttribute('viewBox',`0 0 ${width} 350`);svg.innerHTML=drawing;
 }
 function drawRoute(){
   const count=Number(q('#fg-passive-count').value),route=q('#fg-route');
   route.innerHTML=`<div class="fg-route-node"><strong>A</strong><span>SSW</span></div>${Array.from({length:count},(_,i)=>`<div class="fg-route-node" ${i===0?'data-target="true"':''}><strong>P${i+1}</strong><span>${i===0?'CAS 1':'Passive'}</span>${i===0?'<span class="fg-text-small">Target</span>':''}</div>`).join('')}<div class="fg-route-node"><strong>A</strong><span>STSW</span></div>`;
   route.setAttribute('aria-label',`SSW active endpoint, ${count} passive locations, then STSW active endpoint. The target assembly in this example is at CAS 1, the first passive. The fanout still has 12 legs.`);
 }
 for(const [selector,start] of [['#fg-ports-top',1],['#fg-ports-bottom',17]])q(selector).innerHTML=Array.from({length:16},(_,i)=>`<span class="fg-port"${i+start===12?' data-selected="true"':''}>${i+start}</span>`).join('');

 let state=newFanoutReplacement();
 const followers=q('#fg-followers');
 function renderFollowers(){
   followers.innerHTML=state.followers.map((patched,i)=>`<div class="fg-follower-cell"><button class="fg-btn" type="button" data-leg="${i+1}" aria-label="Unpatch old follower leg ${i+1}" ${!state.leaderCleared||!patched?'disabled':''}>${patched?'Leg '+(i+1):(i+1)+' ✓'}</button><span class="fg-text-small" data-leg-status="${i+1}">${patched?'Patched':'Cleared'}</span></div>`).join('');
 }
 function updateGate(){
   const remaining=state.followers.filter(Boolean).length;
   q('#fg-follower-count').textContent=`${remaining} remaining`;
   q('#fg-patch-new').disabled=!canPatchFanout(state);
   q('#fg-gate-label').textContent=state.newLeaderPatched?'New leader patched':canPatchFanout(state)?'Ready · all old records cleared':'Blocked · old records remain';
 }
 q('#fg-remove-leader').addEventListener('click',()=>{
   state=changeFanoutReplacement(state,{type:'clearLeader'});
   q('#fg-remove-leader').disabled=true;q('#fg-remove-leader').textContent='Leader cleared';q('#fg-leader-state').textContent='Unpatched';
   followers.querySelectorAll('button').forEach(button=>button.disabled=false);
   q('#fg-status').textContent='The old leader is cleared, but 12 followers remain. The replacement is still blocked. Select each leg to unpatch it.';updateGate();
 });
 followers.addEventListener('click',event=>{
   const button=event.target.closest('button[data-leg]');if(!button||button.disabled)return;
   const leg=Number(button.dataset.leg);state=changeFanoutReplacement(state,{type:'clearFollower',leg});
   button.disabled=true;button.textContent=`${leg} ✓`;q(`[data-leg-status="${leg}"]`).textContent='Cleared';
   const remaining=state.followers.filter(Boolean).length;
   q('#fg-status').textContent=remaining?`Leg ${leg} cleared. Old followers remaining: ${remaining}.`:'Old leader cleared. All 12 old followers cleared. The replacement leader can now be patched.';updateGate();
 });
 q('#fg-patch-new').addEventListener('click',()=>{
   if(!canPatchFanout(state))return;
   state=changeFanoutReplacement(state,{type:'patchNew'});
   q('#fg-patch-new').textContent='New leader patched';q('#fg-status').textContent='Example: the new leader is patched. Next, patch every NEW follower to its saved destination. The replacement is not complete until all legs and affected links are verified.';updateGate();
 });
 q('#fg-restart').addEventListener('click',()=>{
   state=newFanoutReplacement();renderFollowers();
   q('#fg-remove-leader').disabled=false;q('#fg-remove-leader').textContent='Unpatch leader';q('#fg-leader-state').textContent='Patched';
   q('#fg-patch-new').textContent='Patch replacement leader';
   q('#fg-status').textContent='First unpatch the old leader. All 12 followers must also be cleared.';updateGate();
   q('#fg-remove-leader').focus();
 });
 q('#fg-passive-count').addEventListener('change',drawRoute);
 renderFollowers();drawRoute();drawFanout();new ResizeObserver(drawFanout).observe(q('#fg-fanout'));
}
