import {assessment,isOptic,pointName,fiberPointName,loopEntries,nextCheckActions} from './troubleshoot-state.mjs?v=22';

// Explain the existing evidence decision without turning instructions into results.
export function caseGuidance(s,a=assessment(s)) {
  const observation=a.observation, comparison=s.comparisons?.[observation?.key]??{};
  const source=a.source??observation?.from??a.check?.from??(
    a.suggestion?.tool==='loop'&&isOptic(s,a.suggestion.point)?a.suggestion.point:a.suggestion?.side==='remote'?s.count+1:0);
  const strand=observation?.strand??a.isolation?.strand??a.check?.strand;
  const area=a.from==null||a.to==null?null:a.from===a.to?pointName(a.from,s):`${pointName(a.from,s)} ↔ ${pointName(a.to,s)}`;
  const guide={
    area:comparison.source==='fail'?'VFL and LC reference connection':area??'Not isolated yet',
    source:a.source===undefined&&!a.check&&!observation&&!['loop','vfl'].includes(a.suggestion?.tool)?null:pointName(source,s),
    strand:strand?strand==='tx'?'A':'B':null,
    heading:'Do this next',steps:[a.next],tools:[],outcomes:a.branches??[],
    unavailable:'Keep this area unverified. Copy the findings and request the listed tools or access before continuing.'
  };
  const plan=(heading,steps,tools,outcomes=guide.outcomes)=>Object.assign(guide,{heading,steps,tools,outcomes});
  if(a.complete) return {...guide,area:'Restored service verified',heading:'Finish the case',steps:[a.next]};
  if(a.needsIdentity) return plan('Confirm the path first',[
    'Match the device and optic socket to FIM.',
    'Match the LC follower, MMC head serial, CAS ports and strand at the tested ends.',
    'Check only the identity boxes you have confirmed.'
  ],['FIM record and readable hardware labels'],[
    ['Mapping matches','Continue with the next isolation check.'],
    ['Mapping differs','Correct the confirmed misport, then retest.']
  ]);
  if(a.diagnostic?.step==='source'&&comparison.source==='unavailable') return plan(
    'Get the next test arranged',[a.next],['VFL and compatible known-good LC reference'],[]);
  if(a.diagnostic?.step==='source') return plan('Check the test source',[
    'Keep the same VFL and LC attachment. Connect a compatible known-good reference lead.',
    'Use the approved light-detection method. Record whether the reference has light.'
  ],['VFL and compatible known-good LC reference'],[
    ['Reference has light','Continue with mapping and connector checks.'],
    ['Reference also dark','Check the VFL, its battery, LC attachment and reference lead first.']
  ]);
  if(a.diagnostic?.step==='inspection'||a.issue==='dark'&&a.isolation?.kind==='mmc-cas-contact') return plan('Inspect this section',[
    'Switch off the VFL and isolate the tested section from active equipment.',
    'Inspect both mating end faces in this section. Clean if needed, then inspect again; check seating and bends.',
    'After a change, start a retest on the same source, strand and route. Enter the new result.'
  ],['Compatible inspection probe and approved cleaning tools'],[
    ['Light returns','Check both strands, then verify restored optical readings and service.'],
    ['Still dark','Compare one compatible known-good cable or connection.']
  ]);
  if(a.diagnostic?.step==='substitute') return plan('Compare one component',[
    'Replace only the suspect cable or mating assembly with a compatible known-good one.',
    'Keep the source, LC attachment, strand and mapped ports unchanged. Record the comparison result.'
  ],['Compatible known-good cable or mating assembly'],[
    ['Replacement has light','The original assembly or its connection is suspect.'],
    ['Replacement also dark','Check what both tests share; the original part is not cleared.']
  ]);
  if(comparison.inspection==='damage'||comparison.substitute==='light') return plan('Repair, then prove the result',[
    'Record the damaged or substituted component and use the approved repair procedure.',
    'Start a fresh retest. Check both strands and the restored link before closing the case.'
  ],['Approved repair or compatible replacement'],[
    ['Retest passes','Normalize and verify the required readings and service.'],
    ['Retest fails','Keep isolating; the recorded change did not prove recovery.']
  ]);
  if(comparison.substitute==='unavailable'||comparison.substitute==='dark') return plan('Get the next test arranged',[
    comparison.substitute==='dark'?'Recheck the source and mapping shared by both assemblies.':'Keep the original fiber and connections suspect.',
    'Arrange optical loss testing for this section. Use a suitable OTDR if the fault location remains unknown.',
    'Copy the findings with the tested source, strand and endpoints for the person continuing the checks.'
  ],['Light source and power meter / loss-test kit; suitable OTDR if needed']);
  if(a.issue==='conflict') return plan('Recheck the conflicting result',[
    'Keep the source, pair, ports and test setup unchanged.',
    a.next,
    'Record the repeat result before replacing a part.'
  ],[a.check?'VFL and access to the recorded viewing point':'Approved loopback and optic readings']);
  if(a.issue==='polarity') return plan(a.title,[a.next],['FIM record and readable hardware labels']);
  if(a.issue==='loop'&&a.tone==='suspect'&&a.from===a.to&&isOptic(s,a.from)) return plan('Check the optic test setup',[
    'Verify the loop pair, seating and required attenuation against the approved setup.',
    'Inspect, clean if needed and reinspect the connections.',
    'Repeat the direct loop. If it still fails, compare one compatible known-good loop or optic at a time.'
  ],['Approved LC loopback, inspection/cleaning tools and compatible spare'],[
    ['Known-good setup passes','Compare the original optic / loop setup one change at a time.'],
    ['Still fails','Check the optic, host state and test compatibility before tracing fiber.']
  ]);
  if(a.suggestion?.tool==='loop') return plan(a.suggestion.point===source?'Test the optic first':'Test the next boundary',[
    ...(a.tone==='suspect'?['Verify the failed loop setup before extending the test.']:[]),
    `Use the approved loop at ${pointName(a.suggestion.point,s)} with the mapped pair.`,
    'Compare TX and returning RX with the optic limits. Record Pass, Weak return or No return light.'
  ],[isOptic(s,a.suggestion.point)?'Approved LC loopback and optic readings':'Approved MMC loopback, CAS access and optic readings']);
  if(a.check||a.suggestion?.tool==='vfl') return plan(a.issue==='weak'?'Check the weak-light observation':'Trace the next point',[
    ...(a.issue==='loop'?['Verify the failed loop setup before extending the test.']:[]),
    'Isolate both ends from active equipment. Attach the VFL only to the mapped LC leg.',
    a.check?.label??`Check for light at ${fiberPointName(a.suggestion.point,s)} from the same source.`,
    a.issue==='weak'?'Brightness alone cannot measure loss. Arrange an optical loss test if the weak result remains.':'Keep the source and strand unchanged; record the observed channel and light result.'
  ],['VFL with LC adapter and access to the viewing point']);
  if(a.suggestion?.tool==='link') return plan('Normalize and verify service',[
    'Remove the test tools and reconnect the mapped service path.',
    'Check required lanes against each optic’s limits and confirm link status at the accessible ends.'
  ],['Access to current optic readings and link status'],[
    ['Link works','Record the readings and work performed.'],
    ['Link still fails','Keep the case open and check the remaining unverified path.']
  ]);
  if(a.issue==='service') return plan('Separate optical loss from device settings',[
    'Compare current TX/RX and every required lane with the installed optic’s limits.',
    'If optical power is outside limits, arrange loss testing of the suspect path.',
    s.reach===s.count+1?'If power is within limits, verify the endpoint mapping, optic compatibility, port state, speed and FEC.':'Request readings and checks from the inaccessible end. That section is still unverified.'
  ],['Optic readings and device access; optical loss-test kit if needed']);
  return guide;
}

// A repair starts a new evidence round, then returns to the actual failed test.
// Prior passes remain in history, never silently reused as post-repair proof.
export function retestFindingActions(s) {
  const a=assessment(s);
  if(a.complete||a.issue==='conflict') return [];
  if(a.observation) {
    const actions=nextCheckActions(s,{...a.observation,tool:'vfl'});
    return actions.length?[{type:'retest'},...actions]:[];
  }
  if(a.issue==='loop') {
    const failed=loopEntries(s).filter(e=>e.result!=='pass'&&(a.source===undefined||e.side===(a.source===0?'local':'remote')))
      .sort((left,right)=>Math.abs(left.point-(a.source??0))-Math.abs(right.point-(a.source??0)))[0];
    if(failed&&failed.point<=s.reach) return [{type:'retest'},{type:'place',kind:isOptic(s,failed.point)?'lc':'mmc',point:failed.point},{type:'loop-side',value:failed.side}];
  }
  return [];
}
