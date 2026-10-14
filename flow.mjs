// Check the optics first, then trace the passive fiber one segment at a time.
const question = (phase, title, instruction, yes, no, details = [], note = '') =>
  ({ phase, title, instruction, yes, no, details, note });
const outcome = (title, instruction, details, success = false) =>
  ({ phase: success ? 'Verified result' : 'Likely issue / next action', title, instruction, details, success, terminal: true });

export const nodes = {
  start: question('1 · Optic health check', 'Are RX and TX within limits at both ends?',
    'Refresh the optic health report. Check each affected lane against the limits for that optic.',
    'verify', 'seating', [
      'RX −40 can indicate missing light or the reporting floor. It does not tell you which component failed.',
      'A green badge or positive TX reading alone does not prove the optic is healthy.'
    ]),
  seating: question('1 · Check seating', 'Did reseating restore optic health?',
    'Check that the optics and fiber connectors are fully seated at both active ends. Recheck RX and TX.',
    'verify', 'cleaning', ['Use the site procedure for disconnecting and reseating. Check latches without forcing the connector.']),
  cleaning: question('1 · Inspect and clean', 'Did cleaning restore optic health?',
    'Inspect, clean if needed, and reinspect both mating surfaces at each active end. Reconnect and recheck.',
    'verify', 'opticTest', [
      'Include the fiber endfaces and optic receptacles. Use the correct inspection and cleaning tools.',
      'Do not reconnect dirty or damaged surfaces. If inspection is unavailable, pause here.'
    ]),
  opticTest: question('2 · Rule out the optics', 'Have the optics at both ends passed a valid test?',
    'Test the affected TX/RX lanes on a known-good reference link or a supported optical loopback.',
    'vfl', 'opticCompare', [
      'Use the correct test mode, lane mapping, wavelength, and receive-power limits, including attenuation where required.',
      'A reference link must use compatible known-good fiber and a known-good peer. Check both production optics.',
      'Choose No for a failed valid test. If a test is unavailable or uncertain, pause here.',
      'A passing test supports optic operation under those conditions; intermittent faults can still need further checks.'
    ], 'Only a passing optic test moves this diagram into tracing the production fiber.'),
  opticCompare: question('2 · Compare the failed optic', 'Does a known-good optic pass the same test?',
    'Keep the test fiber, port, and settings unchanged. Compare the failed optic with a compatible known-good optic.',
    'badOptic', 'opticUnresolved', [
      'Inspect the mating connection before the comparison.',
      'If no valid comparison is available, pause. Do not treat an untested optic as failed.'
    ]),
  vfl: question('3 · Trace the fiber', 'Does VFL light reach the expected port and strand?',
    'Start with the disconnected active-end fiber and its corresponding passive port. On each repeat, trace the next isolated segment.',
    'segments', 'wrongPort', [
      'Isolate the segment from active equipment at both ends. Never inject VFL light into an optic or look into a fiber.',
      'Use a compatible VFL, adapter, and approved indirect detection method.',
      'Start with active → first passive. Then trace each remaining passive section and the far-end patch, one segment and affected strand at a time.',
      'Record the actual start and end ports. VFL confirms the route; it does not prove acceptable operating-wavelength loss.'
    ]),
  wrongPort: question('3 · Check misport / polarity', 'Does the light appear at a different port or strand?',
    'Check the nearby passive ports and lane positions against the intended connection map.',
    'routeCorrection', 'segmentCheck', ['Light at another port suggests a misport or label error. Light on the wrong strand can indicate a polarity or lane-mapping issue.']),
  routeCorrection: question('3 · Correct the route', 'After correction, does light reach the intended port?',
    'Correct the confirmed misport, label, or polarity issue. Repeat the VFL trace on the same segment.',
    'segments', 'routeUnresolved', ['Use the approved map and lane assignments. Do not flip or move fibers at random.']),
  segmentCheck: question('3 · Check this fiber segment', 'After checking the segment, does the VFL trace pass?',
    'Check passive seating, dirty endfaces, tight bends, pinches, and visible damage. Correct any finding and retrace.',
    'segments', 'fiberUnresolved', [
      'Inspect and clean both mating surfaces before reconnecting at the passive.',
      'Follow the cable’s minimum bend radius. Relieve strain or replace visibly damaged jumpers.',
      'If no issue is found and light still does not reach the expected port, choose No.'
    ]),
  segments: question('3 · Follow the whole route', 'Have all segments and affected strands been traced?',
    'Include both active-to-passive patches and every passive section between them.',
    'mapping', 'vfl', ['If No, move the VFL to the next isolated segment and repeat. Keep the confirmed port-to-port route recorded.']),
  mapping: question('3 · Check the end-to-end match', 'Do the fiber, optics, and TX-to-RX mapping match?',
    'Confirm compatible fiber and connectors, matching optic standards, and the correct TX-to-RX path in both directions.',
    'recheck', 'mismatch', [
      'Check single-mode versus multimode, connector/polish, wavelength pairing, speed, and any breakout or parallel-lane mapping.',
      'Red light at the expected port alone does not prove the optic pair or fiber type is compatible.'
    ]),
  recheck: question('4 · Recheck optic health', 'Is optic health restored after reconnecting?',
    'Remove the VFL, restore the verified production route, and refresh RX/TX readings at both ends.',
    'verify', 'lossTest', ['Compare every affected lane with its actual operating limits.']),
  lossTest: question('4 · Check fiber loss', 'Does the fiber path pass its optical loss budget?',
    'Use a referenced light source and power meter or loss test set at the required operating wavelength.',
    'unresolved', 'excessLoss', [
      'VFL light can reach the end even when loss is too high for the link.',
      'Test the affected lanes and required directions against the specified path budget.',
      'If loss testing is unavailable, arrange that test before choosing Yes or No.'
    ]),
  verify: question('4 · Confirm recovery', 'Are both ends healthy and the link stable?',
    'Confirm RX/TX limits, affected lanes, expected link state, and the site observation period.',
    'done', 'unresolved', ['If readings pass but the link is still down or unstable, retain the results for a port, configuration, or optical-quality check.']),
  badOptic: outcome('The original optic or its connection is suspect.',
    'The known-good optic passed where the original failed. Inspect the interface and replace the suspect optic as needed.',
    ['Recheck optic health after replacement.', 'If the fault remains, restart the check and verify both optics before tracing the fiber.']),
  opticUnresolved: outcome('The optic fault is not isolated yet.',
    'The known-good optic also failed. Check the host port, test setup, and compatibility before blaming the production fiber.',
    ['Correct the test setup or compare on a known-good compatible port.', 'Return to the optic test once a valid result is available.']),
  routeUnresolved: outcome('The port or polarity mismatch is unresolved.',
    'Reconcile the labels, patching, and lane map with the actual VFL result.',
    ['Confirm the intended connection with the site lead.', 'Return to the route correction and retrace before continuing.']),
  fiberUnresolved: outcome('Isolate this fiber segment or connection.',
    'The expected VFL path is still missing. A break, bad jumper, connector fault, or unresolved misport is possible.',
    ['Verify the VFL and adapter with a known-good compatible jumper; no visible light alone does not prove a break.', 'Substitute the suspect jumper or test this segment for loss. Use suitable fault-location testing if needed.', 'Return to this segment’s check after correction.']),
  mismatch: outcome('Correct the confirmed mismatch.',
    'The fiber, connector, optic pair, or TX-to-RX lane mapping does not match the required link.',
    ['Correct the identified mismatch using the approved connection map and optic specifications.', 'Return to the end-to-end match question, then reconnect and recheck health.']),
  excessLoss: outcome('The fiber path has excessive loss.',
    'Locate the loss in the affected segment or connection.',
    ['Check dirty or damaged connectors, poor seating, tight bends, damaged fiber, and splices.', 'Use segment-by-segment loss measurements or suitable OTDR testing to locate the fault.', 'Correct it, retest loss, then recheck optic health.']),
  unresolved: outcome('Keep the test results and isolate the remaining fault.',
    'Health or link stability is still not confirmed. Do not declare the optic or fiber good from one reading.',
    ['Compare actual incoming optical power with the receiver limits and verify the report maps to the correct port and lane.', 'Review host port, configuration, compatibility, and intermittent behavior with the site lead.']),
  done: outcome('Optic health and link operation verified.',
    'Both ends meet the recovery checks.',
    ['Record the final readings and the correction that restored service.'], true)
};

nodes.seating.findings = { yes: 'Health recovered after reseating: seating or contact at the changed connection is implicated.' };
nodes.cleaning.findings = { yes: 'Health recovered after cleaning: contamination or contact at the changed connection is implicated.' };
nodes.opticTest.findings = { yes: 'Both optics passed a valid reference-link or supported optical-loopback test.' };
nodes.opticCompare.findings = { yes: 'A known-good optic passed the same test where the original failed.', no: 'A known-good optic also failed the test; an optic-only fault was not established.' };
nodes.wrongPort.findings = { yes: 'VFL light was found at a different port or strand.' };
nodes.routeCorrection.findings = { yes: 'Correcting the route restored the expected VFL trace.' };
nodes.segmentCheck.findings = { yes: 'The segment passed VFL tracing after work on its connections or cable condition.' };
nodes.segments.findings = { yes: 'All affected segments and strands were traced; VFL alone does not establish acceptable loss.' };
nodes.mapping.findings = { no: 'The end-to-end compatibility or TX-to-RX mapping check failed.' };
nodes.lossTest.findings = { yes: 'The referenced path-loss test passed its specified budget.', no: 'The referenced path-loss test exceeded its specified budget.' };

export function currentNode(history) {
  return history.length ? nodes[history.at(-1).id][history.at(-1).answer] : 'start';
}
export function answerQuestion(history, answer) {
  if (answer !== 'yes' && answer !== 'no') throw new Error('Choose Yes or No.');
  const id = currentNode(history);
  if (nodes[id].terminal) return history;
  return [...history, { id, answer }];
}
export function goBack(history, index = history.length - 1) {
  return history.slice(0, Math.max(0, index));
}
export function restoreHistory(value) {
  if (!Array.isArray(value) || value.length > 500) return [];
  let valid = [];
  for (const entry of value) {
    if (!entry || entry.id !== currentNode(valid) || nodes[entry.id]?.terminal || !['yes', 'no'].includes(entry.answer)) break;
    valid = answerQuestion(valid, entry.answer);
  }
  return valid;
}
