// Existing topic IDs remain stable for exam reviews, reference links and bookmarks.
export const lessonSupport = {
  optics:['Optics, TX / RX & VFL','Tell service light from a tracing tool.','Which source carries the device’s data?','The optic carries data as infrared light. The VFL supplies separate red light to trace an isolated fiber.'],
  path:['Fiber, LC & the passive path','Follow the connected parts without treating a passive as a light source.','Does a CAS create light to send onward?','No. It connects the mapped fiber path. The optic or VFL supplies the light.'],
  'trace-loops':['From device data to light','Follow data through both optics and the fiber between them.','Where does incoming light become device data again?','At the receiving optic. Fiber and passive connections carry light between the optics.'],
  ends:['Local, remote & the chain of passives','Follow every connection between the two devices.','Can you skip an intermediate passive when checking the route?','No. Follow the mapped route through every passive and connection; each is part of the path.'],
  viewpoint:['See the same path from either end','Keep TX and RX roles clear when changing ends.','At Device B, whose TX supplies B’s RX?','Device A’s TX supplies B’s RX through the mapped path. Changing viewpoint does not change that physical direction.'],
  'mmc-fanout':['Match the MMC head & followers','Recognize separate followers within one MMC assembly.','Does one working follower prove all followers work?','No. Each follower has its own mapped fibers. Check the assigned follower, head and destination.'],
  position:['Read a rack position','Use each part of the location to find the intended device.','Does a rack location identify the correct fiber connection by itself?','No. The location gets you to the device; FIM and the physical labels identify its assigned connections.'],
  ports:['Confirm the device and ports','Distinguish the physical location from the connection assignment.','After finding the device, what must you match?','Match the device, optic socket, LC follower, MMC head and CAS port to the connection record.'],
  'fim-path':['Read the FIM connection assignment','Follow one assignment from its LC leg to the mapped CAS port.','What should you do when the observed port differs from FIM?','Compare the physical labels, patching and record before correcting anything. A mismatch is not proof of a failed optic.'],
  'lc-position':['Choose the LC optic position','Use the installed orientation and labels to choose the LC position.','If the optic is flipped, does the identifier 5/1 become 5/5?','No. The displayed side changes, but the identifier and assigned connection stay the same.'],
  'rack-path':['Follow the fiber inside the rack','Trace the assigned LC leg to its MMC head and passive.','Is a nearby cable enough to identify the right route?','No. Follow the assigned leg and confirm its head and mapped port. Physical proximity does not establish identity.'],
  'worked-ticket':['Work through a complete ticket','Combine location, orientation and mapping before patching.','What should agree before seating the connector?','The device location, optic position, follower, head and destination port should match the assignment.'],
  'lldp-neighbors':['LLDP: did I connect to the right device?','Use the reported neighbor to check endpoint identity.','Does the correct LLDP neighbor prove healthy optical power?','No. It supports endpoint identity. Check required optical readings and link operation separately.'],
  readings:['Power readings & allowed limits','Compare every required reading with its installed optic’s limits.','Is −4.20 dBm acceptable when the minimum is −3.00 dBm?','No. −4.20 is below the minimum. Use the installed limits; zero is not a required target.'],
  'polarity-checks':['Polarity: connect TX to RX','Separate a pairing problem from a source that is not emitting.','Can the wrong TX-to-RX pairing explain a transmitter that is not emitting?','No. Pairing controls where light goes. Verify the source and its report separately when TX shows no light.'],
  'fault-evidence':['Ferrules, fiber & splice faults','Recognize several possible causes of the same dark-channel symptom.','Does one dark strand identify a damaged ferrule?','No. Mapping, seating, contamination, bends, fiber or splice defects can produce similar symptoms. More evidence is needed.'],
  cleaning:['Dirt, seating & tight bends','Check connection condition before judging a component.','After cleaning a connector, what comes next?','Inspect again, seat correctly, then retest and record the result. Cleaning alone does not prove recovery.'],
  vfl:['Trace with red VFL light','Trace the expected strand and destination on an isolated path.','Where does this site’s VFL attach?','To a disconnected LC leg with the matching adapter. CAS/MMC connections are viewing points for this kit.'],
  'test-evidence':['Continuity versus optical loss','Understand why visible continuity is only part of the evidence.','Both strands pass VFL, but restored RX is below its limit. Is the case finished?','No. Visible continuity does not prove acceptable service-wavelength loss. Investigate the low reading with appropriate loss testing.'],
  loopbacks:['LC & MMC loopbacks','Choose a loop location for the question you need to answer.','What does an MMC loop add after a direct LC loop passes?','It adds the mapped outgoing and return fibers and connections up to the passive. The route beyond the loop and the remote optic remain untested.'],
  'compare-loops':['Use loops to narrow the problem','Compare the last passing loop with the first failing loop.','CAS 1 passes and CAS 2 fails from the same optic. Where do you investigate?','Verify the failed setup, then investigate the added section and its connections between CAS 1 and CAS 2. The exact bad part is still unknown.'],
  'change-evidence':['Make one change, then retest','Connect an individual change to fresh evidence.','If you clean and repatch before retesting, can you tell which change helped?','No. Change one thing at a time and record a fresh result. Even an improved reading needs final service verification.'],
  'connected-case':['Work one case from both ends','Combine evidence and verify recovery before closing the case.','One RX reading improves into range. What still needs checking?','Check every required lane, link operation and the expected endpoint identity. Record the change and the final results.']
};

export const takeaways = {
  optics:'The optic carries device data as infrared light. A VFL supplies separate red light for tracing.',
  'trace-loops':'Devices exchange data; their optics convert it. The fiber and passives carry the light between them.',
  loopbacks:'A loopback checks the return path up to its location. Anything beyond that point is still untested.',
  'change-evidence':'Record the reading, change one thing, then retest. An improvement is not the same as a verified repair.',
  position:'Read the whole location: building, room, row, rack and elevation each narrow the search.',
  ends:'Follow every mapped passive between the devices. Local and remote each have a sending and a receiving path.',
  viewpoint:'Changing your viewpoint swaps the names local and remote, not the job of TX or RX.',
  'rack-path':'Follow the assigned LC leg from the optic to its MMC head and CAS port.',
  'worked-ticket':'Match location, optic orientation, follower, head and CAS port together, then verify health.'
};

export const chapters = [
  {key:'equipment',title:'Know the equipment',summary:'Recognize the parts and follow the light.',sections:['optics','path','trace-loops','ends','viewpoint','mmc-fanout'],
    practice:['Try both data directions','#trace-loops']},
  {key:'connection',title:'Identify the correct connection',summary:'Find the device, match FIM and confirm the destination.',sections:['position','ports','fim-path','lc-position','rack-path','worked-ticket','lldp-neighbors'],
    practice:['Practice LC & MMC patching','./simulations.html#patch-practice'],exam:['Hands-on patching','./simulations.html?exam=patching#practice']},
  {key:'readings',title:'Understand the readings',summary:'Read limits, separate symptoms and keep causes open.',sections:['readings','polarity-checks','fault-evidence'],
    practice:['Compare readings with limits','#readings'],exam:['Understand the light','./quiz.html#exam-understand-light']},
  {key:'tests',title:'Choose and use a test',summary:'Know why, where and how to test—and what remains untested.',sections:['cleaning','vfl','test-evidence','loopbacks'],
    practice:['Compare LC and MMC loops','#loopbacks'],exam:['Loopbacks','./quiz.html#exam-loopbacks']},
  {key:'isolation',title:'Isolate and verify',summary:'Narrow the section, retest changes and prove recovery.',sections:['compare-loops','change-evidence','connected-case'],
    practice:['Open troubleshooting','./index.html'],exam:['Read the evidence','./quiz.html#exam-read-evidence']}
].map(stage=>({...stage,groups:[{title:stage.title,topics:stage.sections.map(id=>[id,lessonSupport[id][0]])}]}));

export const legacyCourseAnchors = {optics:'optics',devices:'position',patching:'fim-path','chapter-1':'optics','chapter-2':'position','chapter-3':'fim-path'};

export function lessonNavigation(id) {
  const topics=chapters.flatMap(stage=>stage.sections), index=topics.indexOf(id);
  return index<0?{previous:null,next:null}:{previous:topics[index-1]??null,next:topics[index+1]??null};
}
