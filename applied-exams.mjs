// All scenarios are fictional. Their reasoning is taught in the linked chapters.
export const appliedTopics = ['Read the evidence', 'Follow the whole connection'];
export const appliedDescriptions = [
  'Compare loop results, trace limits and changes before choosing the next check.',
  'Connect device data, direction, rack location, FIM and individual fiber paths.'
];
export const appliedQuestions = [
  {
    id:'applied-loop-boundary',topic:4,visual:'case-loops',skill:'Bound the suspect section',
    prompt:'The same pair is tested with valid loops. Nothing else changes. Which conclusion is supported?',
    choices:['The failure is beyond CAS 2; both passives have now been tested.', 'The added CAS 1 → CAS 2 span and its connections need investigation; the exact cause is unknown.', 'The fiber between CAS 1 and CAS 2 is definitely broken.', 'The local optic must be intermittent because the CAS 2 loop failed.'],correct:1,
    explanation:'Compare what each loop adds. Passing at CAS 1 and failing at CAS 2 narrows the next investigation to the added section, including its connections. A valid loop result does not name the failed part.',
    choiceReasons:['The route beyond CAS 2 is outside all three loops.', 'This follows the boundary between the passed test and the failed test.', 'A break is one possibility; contamination, seating, mapping or loss can also fit.', 'There is no evidence of an intermittent optic in this unchanged, valid test sequence.'],
    reveal:'Investigate the added section; do not invent a cause.',lesson:'learn.html#compare-loops'
  },
  {
    id:'applied-vfl-loss',topic:4,visual:'case-loss',skill:'Separate continuity from loss',
    prompt:'VFL reaches the expected port and strand. After the mapped link is restored, RX is still low. Which two conclusions fit?',
    choices:['The visible trace supports continuity and mapping for the tested strand.', 'The trace proves the network-light loss is acceptable.', 'The reading is below the supplied limit; optical loss and connections still need investigation.', 'The passive must be failing to generate enough light.'],correct:[0,2],
    explanation:'The red-light test and the RX reading answer different questions. −4.40 is below this example’s −3.00 minimum. Trace success cannot replace an appropriate optical loss test or the final link-health check.',
    choiceReasons:['It reached the expected destination on the strand actually tested.', 'VFL does not measure acceptable loss at the service wavelength.', 'A correct route can still lose too much light. Inspect connections and measure loss as appropriate.', 'A passive passes light; it does not generate it.'],
    reveal:'Correct destination + weak RX: continuity is not enough.',lesson:'learn.html#test-evidence'
  },
  {
    id:'applied-polarity',topic:4,visual:'case-polarity',skill:'Know what a loop cannot prove',
    prompt:'A valid MMC loop returns light within limits. After restoring service, RX is dark. End-to-end strand pairing has not been checked. What is the best next check?',
    choices:['Repeat the identical successful loop; another pass will establish end-to-end polarity.', 'Replace the local optic because its service RX is dark.', 'Treat the remote device as failed because the passive loop passed.', 'Verify that each TX lands on the intended RX, using the FIM strand map.'],correct:3,
    explanation:'The loop established a return path for the tested pair. It did not prove the restored TX-to-RX assignments. Verify the unchecked mapping before concluding which component failed.',
    choiceReasons:['A repeat of the same loop does not test the missing end-to-end assignment.', 'Dark RX alone does not outweigh the passed loop or identify the cause.', 'The remote device was not included in the local loop.', 'This tests the remaining uncertainty. A pair can close a loop even with swapped end-to-end assignments.'],
    reveal:'A return loop and correct service polarity are different checks.',lesson:'learn.html#polarity-checks'
  },
  {
    id:'applied-channel-cause',topic:4,visual:'case-channel',skill:'Keep multiple causes open',
    prompt:'The optic passes its direct loop. One mapped channel fails when the external path is added. Which conclusions are justified? Select all that apply.',
    choices:['Other working channels prove the entire MMC head and every fiber are good.', 'Contamination or a damaged ferrule affecting this channel remains possible.', 'Damage, a bend, a poor splice or incorrect routing on this channel remains possible.', 'These results alone cannot distinguish the exact cause.'],correct:[1,2,3],
    explanation:'A fanout contains separate paths. A problem can affect a single channel while others work. Inspect and test the affected path and interfaces; a dark channel is not a diagnosis of ferrule damage or a splice failure.',
    choiceReasons:['Working channels do not verify an untested or failing channel.', 'The ferrule aligns fibers; contamination or damage can affect selected paths.', 'These faults can produce a similar symptom on the affected path.', 'The evidence narrows the investigation but does not identify a particular defect.'],
    reveal:'Follow the failed channel; keep its possible causes open.',lesson:'learn.html#fault-evidence',relatedLessons:[['Chapter 3 · separate fanout paths','patching.html#mmc-fanout']]
  },
  {
    id:'applied-change-log',topic:4,visual:'case-changes',skill:'Interpret improvements carefully',
    prompt:'After two changes, RX is within the supplied range. Link status and the other required lanes are still unchecked. Which report is accurate?',
    choices:['The observed RX improved; the exact contribution of each change is unknown. Check remaining lanes and link status.', 'The bend caused the issue because RX improved after the work.', 'The new reading proves the full link is repaired.', 'The connector was the cause because seating was the last action.'],correct:0,
    explanation:'Relieving a bend and reseating before measuring prevents you from separating their effects. The new reading is useful evidence, but closing the issue requires the remaining readings and link check.',
    choiceReasons:['It separates the observed improvement from assumptions and names the unfinished checks.', 'The reseat could also have contributed; neither action was measured on its own.', 'One reading does not cover all required lanes or confirm a working link.', 'Action order alone does not establish which change caused the improvement.'],
    reveal:'Record what improved and what remains unverified.',lesson:'learn.html#change-evidence'
  },
  {
    id:'applied-data-journey',topic:5,visual:'case-data',skill:'Explain data conversion',
    prompt:'Device A sends data to Device B through two cassettes. Which description correctly explains the conversions?',
    choices:['A’s optic makes light; each CAS turns it into data and back into new light before passing it on.', 'A’s optic sends visible red light; B’s optic turns it into electrical signals.', 'A’s optic turns electrical signals into IR light; the passives carry it; B’s optic turns received light into electrical signals.', 'A’s optic only forwards electrical signals; the first CAS converts them into IR light.'],correct:2,
    explanation:'The active optics perform the conversions. In this passive route, the cassettes connect the mapped fiber paths; they do not read the data or create a new source.',
    choiceReasons:['The passive CAS does not perform electrical-to-optical conversion.', 'Visible red tracing light comes from a VFL, not the service-light example.', 'This follows the complete device → optic → fiber → optic → device journey.', 'The device’s optic, not the passive, produces the service light.'],
    reveal:'Conversion happens at the optics; passives carry the path.',lesson:'learn.html#trace-loops'
  },
  {
    id:'applied-local-view',topic:5,visual:'case-perspective',skill:'Reason from either end',
    prompt:'You move from Device A to Device B. B reports healthy local TX but dark local RX. Which direction needs a no-light investigation?',
    choices:['B TX → A RX, because B is now local.', 'A TX → B RX, including its source, mapped fiber and receiving interface.', 'Both directions are proven dark because the two devices share a cable assembly.', 'Only B’s transmitter, because the TX/RX names reverse when you move.'],correct:1,
    explanation:'Local changes with your viewpoint; TX still sends and RX still receives. At B, the missing incoming light belongs to A TX → B RX. B’s TX report does not prove that A receives its outgoing light.',
    choiceReasons:['That is the outgoing direction from B; its receiver is at A.', 'This is the incoming direction measured by B’s RX. The symptom does not locate the fault.', 'Separate strands can have different conditions; the report does not prove both are dark.', 'Changing viewpoint does not change what a transmitter or receiver does.'],
    reveal:'At B, local RX is fed by A TX.',lesson:'devices.html#viewpoint'
  },
  {
    id:'applied-complete-ticket',topic:5,visual:'case-ticket',skill:'Combine location and FIM mapping',
    prompt:'Use the mock ticket and the optic orientation shown. Which complete patch matches the record?',
    choices:['Elevation 30; optic 7, right LC position; mapped leg 8; its head to CAS 2 / 28.', 'Elevation 17; optic 7, left LC position; mapped leg 8; its head to CAS 2 / 28.', 'Elevation 30; optic 7, left LC position; any leg with the same head serial; head to CAS 2 / 28.', 'Elevation 30; optic 7, left LC position; mapped leg 8; its head to CAS 2 / 28.'],correct:3,
    explanation:'In the position code, 17 is the rack and 30 is the elevation. With the purple tab below, this site’s 7/5 is on the left. The ticket assigns leg 8 and CAS 2 / 28; a matching head serial does not make its legs interchangeable.',
    choiceReasons:['7/5 is on the right when upright; the pictured optic is flipped.', '17 is the rack number, not the elevation.', 'Each follower has its own mapping. Matching the head alone is insufficient.', 'This matches location, flipped optic position, follower and passive destination.'],
    reveal:'Location + orientation + exact follower + mapped head destination.',lesson:'patching.html#worked-ticket',relatedLessons:[['Chapter 2 · read the rack position','devices.html#position']]
  },
  {
    id:'applied-fanout',topic:5,visual:'case-fanout',skill:'Keep fanout paths distinct',
    prompt:'Leg 3 is dark. Leg 8 on the same MMC head works. FIM assigns the affected optic to leg 3. Which two statements are supported?',
    choices:['Leg 8 working does not prove leg 3’s separate path is healthy.', 'Moving the affected optic to leg 8 is correct because both legs share a serial.', 'Trace leg 3 and its mapped channel through the head and passive.', 'The shared head splits leg 8’s working light into every other follower.'],correct:[0,2],
    explanation:'The serial identifies the assembly, not an interchangeable destination for every follower. Track the assigned leg through its own channel; do not treat a working neighbor as proof of that path.',
    choiceReasons:['Separate fibers can have different conditions within the same assembly.', 'Changing legs changes the mapped connection and requires an authorized mapping change.', 'This follows the affected circuit without assuming every leg shares the same path.', 'The fanout groups fiber paths; it does not split one optic’s light into all followers.'],
    reveal:'Shared assembly, separate mapped paths.',lesson:'patching.html#mmc-fanout'
  },
  {
    id:'applied-dark-source',topic:5,visual:'case-source',skill:'Separate source and route evidence',
    prompt:'The report shows −40 for local TX and RX. Someone blames both readings on reversed polarity. What should you check before accepting that diagnosis?',
    choices:['Swap the fibers first; a polarity mismatch always stops the local laser.', 'Verify local TX reporting, the selected lane, port / laser state and optic seating; polarity alone does not explain missing TX output.', 'Start with VFL only; continuity also measures the optic’s transmitter output.', 'Record a broken external fiber as the cause of both readings.'],correct:1,
    explanation:'TX describes the local source; RX describes incoming light. A pairing problem can leave RX dark while TX still emits. Verify the reported source condition, then isolate with the approved test instead of assigning a cause from −40 alone.',
    choiceReasons:['A routing mismatch does not by itself prove that the local transmitter stopped emitting.', 'This checks whether the source is producing light and whether the report is being read correctly.', 'VFL supplies separate red light and does not measure the service transmitter.', 'The report does not identify a break, and an external break alone does not establish absent local TX output.'],
    reveal:'Verify the source separately from the incoming route.',lesson:'learn.html#polarity-checks'
  }
];
