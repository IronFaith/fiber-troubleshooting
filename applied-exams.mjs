import {connectedCaseQuestions} from './connected-case.mjs?v=3';
// Fictional cases taught in the linked chapters.
export const appliedTopics = ['Read the evidence', 'Follow the whole connection'];
export const appliedDescriptions = [
  'Work one case from both ends: loops, mapping, strands and final verification.',
  'Connect device data, direction, rack location, FIM and individual fiber paths.'
];
export const appliedQuestions = [
  ...connectedCaseQuestions,
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
