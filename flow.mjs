// Actions stay short; the chosen loop location defines which section is tested.
const check = (phase, action, instruction, title, yes, no, visual = '', note = '') =>
  ({ phase, action, instruction, title, yes, no, visual, note });
const result = (action, instruction, success = false) =>
  ({ phase: 'Result', action, instruction, title: action, terminal: true, success });

export const nodes = {
  start: check('Optic', 'Loop the optic', 'Fit the supported optical loopback directly at the optic.',
    'RX within range on every tested lane?', 'bothEnds', 'clean', 'direct', 'Use the mapped lanes, test mode and safe RX limits.'),
  passiveLoop: check('Optic + patch', 'Loop at the passive', 'Use the mapped loop at your passive port, e.g. CAS 1 Port 12.',
    'RX within range on every tested lane?', 'bothEnds', 'isolate', 'passive', 'Use the mapped lanes, test mode and safe RX limits.'),
  isolate: check('Optic', 'Move the loop to the optic', 'Bypass the passive, MMC leader and LC legs with a supported direct loop.',
    'Does the direct loop pass?', 'patchCheck', 'clean', 'direct'),
  clean: check('Optic', 'Clean and reseat the test connections', 'Inspect, clean and reinspect. Check loop mapping and RX limits, then retry directly.',
    'Does the direct loop now pass?', 'bothEnds', 'compare', 'direct'),
  compare: check('Optic', 'Try a known-good optic', 'Keep the same validated direct-loop setup and port.',
    'Does the known-good optic pass?', 'badOptic', 'testFault'),
  patchCheck: check('Optic + patch', 'Check the leader and LC legs', 'Check the mapped group, seating, dirt and tight bends. Repeat the passive loop.',
    'Does the passive loop now pass?', 'bothEnds', 'patchFault', 'passive'),
  bothEnds: check('Optic', 'Check the other active end', 'Repeat the loop test at the other end before tracing the remaining fiber.',
    'Have both ends passed?', 'vfl', '$loop'),
  vfl: check('Fiber', 'VFL the next fiber segment', 'Trace the isolated segment to the exact port and strand in your layout.',
    'Light at the expected port and strand?', 'segments', 'wrongPort', 'fiber', 'Disconnect active equipment at both ends before using VFL.'),
  wrongPort: check('Fiber', 'Check nearby ports and LC legs', 'Compare where the light appears with the intended route and leader group.',
    'Light at a different port or leg?', 'routeFix', 'segmentCheck'),
  routeFix: check('Fiber', 'Correct the misport or polarity', 'Follow the port and lane map, then repeat the VFL trace.',
    'Light at the correct port now?', 'segments', 'routeFault'),
  segmentCheck: check('Fiber', 'Check this segment', 'Check seating, dirty ends, tight bends and damage. Correct any finding; retrace.',
    'Does this segment trace correctly now?', 'segments', 'fiberFault'),
  segments: check('Fiber', 'Follow the route to the remote end', 'Include every passive hop and both active-to-passive patches.',
    'All affected segments and strands traced?', 'reconnect', 'vfl'),
  reconnect: check('Health', 'Reconnect and check optic health', 'Remove test gear. Restore the mapped TX-to-RX path and check both ends.',
    'RX/TX in range and link stable?', 'done', 'loss'),
  loss: check('Fiber', 'Measure the fiber loss', 'Use a referenced loss test at the operating wavelength.',
    'Loss within the link budget?', 'remainingFault', 'lossFault', '', 'VFL continuity alone does not establish acceptable loss.'),
  badOptic: result('Original optic or mating connection suspect', 'The replacement passed. Inspect the interface, replace as needed and recheck health.'),
  testFault: result('Check the port or loop setup', 'The known-good optic also failed. Confirm compatibility, mapping and the host port.'),
  patchFault: result('Suspect the active-to-passive section', 'Direct loop passed; passive loop failed. VFL this section, verify the leader/leg map and compare a known-good patch.'),
  routeFault: result('Port or polarity mismatch remains', 'Reconcile the observed VFL port with the intended map before continuing.'),
  fiberFault: result('Suspect this fiber segment or connection', 'Verify the VFL setup, compare a known-good jumper and test the segment for loss or a break.'),
  lossFault: result('Excessive fiber loss', 'Locate the loss: connectors, seating, bends, damaged fiber or splices. Correct it and retest.'),
  remainingFault: result('Check compatibility and the active ports', 'Loss passed. Check optic/fiber type, lane mapping, actual incoming power and intermittent behavior.'),
  done: result('Optic / fiber health restored', 'Record the correction and final readings.', true)
};

export function startNode(mode = 'direct') { return mode === 'passive' ? 'passiveLoop' : 'start'; }
export function destination(id, answer, mode = 'direct') {
  const next = nodes[id][answer];
  return next === '$loop' ? startNode(mode) : next;
}
export function currentNode(history, mode = 'direct') {
  return history.length ? destination(history.at(-1).id, history.at(-1).answer, mode) : startNode(mode);
}
export function answerQuestion(history, answer, mode = 'direct') {
  if (!['yes', 'no'].includes(answer)) throw new Error('Choose Yes or No.');
  const id = currentNode(history, mode);
  return nodes[id].terminal ? history : [...history, { id, answer }];
}
export function goBack(history, index = history.length - 1) { return history.slice(0, Math.max(0, index)); }
export function restoreHistory(value, mode = 'direct') {
  if (!Array.isArray(value) || value.length > 500) return [];
  let valid = [];
  for (const entry of value) {
    if (!entry || entry.id !== currentNode(valid, mode) || nodes[entry.id]?.terminal || !['yes', 'no'].includes(entry.answer)) break;
    valid = answerQuestion(valid, entry.answer, mode);
  }
  return valid;
}
