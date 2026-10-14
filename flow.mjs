// Actions stay short; the chosen loop location defines which section is tested.
const check = (phase, action, instruction, title, yes, no, visual = '', note = '') =>
  ({ phase, action, instruction, title, yes, no, visual, note });
const result = (action, instruction, success = false) =>
  ({ phase: 'Result', action, instruction, title: action, terminal: true, success });

export const nodes = {
  start: check('Optic', 'Loop the optic', 'Plug the LC loopback into the optic.',
    'RX within range on every tested lane?', 'nextPassive', 'clean', 'direct'),
  passiveLoop: check('Optic + patch', 'Loop at the passive', 'Fit the MMC loopback at the next reachable mapped passive, e.g. CAS 1 Port 12.',
    'RX within range on every tested lane?', 'nextPassive', 'isolate', 'passive'),
  isolate: check('Optic', 'Move the loop to the optic', 'Fit the LC loopback directly at the optic, bypassing the MMC leader and LC legs.',
    'Does the direct loop pass?', 'patchCheck', 'clean', 'direct'),
  clean: check('Optic', 'Clean and reseat the test connections', 'Inspect, clean and reinspect. Check mapping and RX limits, then retry the LC loop.',
    'Does the direct loop now pass?', 'nextPassive', 'compare', 'direct'),
  compare: check('Optic', 'Try a known-good optic', 'Keep the same validated LC loopback and port.',
    'Does the known-good optic pass?', 'badOptic', 'testFault'),
  patchCheck: check('Optic + patch', 'Check the path to this passive', 'Check mapped ports, leader/legs, seating, dirt and bends. Retry the MMC loop.',
    'Does the passive loop now pass?', 'nextPassive', 'patchFault', 'passive'),
  nextPassive: check('Local check', 'Local loop passed', 'The optic and tested path passed to this loop point. Keep going through the passives you can reach.',
    'Another accessible passive to loop?', 'passiveLoop', 'reconnect'),
  fiberAccess: check('Fiber', 'Check the fiber you can access', 'Use VFL only on a segment disconnected from active equipment at both ends.',
    'Can you isolate and trace a segment?', 'vfl', 'remoteCheck'),
  vfl: check('Fiber', 'VFL the next fiber segment', 'Trace the isolated segment to the exact port and strand in your layout.',
    'Light at the expected port and strand?', 'segments', 'wrongPort', 'fiber', 'Disconnect active equipment at both ends before using VFL.'),
  wrongPort: check('Fiber', 'Check nearby ports and LC legs', 'Compare where the light appears with the intended route and leader group.',
    'Light at a different port or leg?', 'routeFix', 'segmentCheck'),
  routeFix: check('Fiber', 'Correct the misport or polarity', 'Follow the port and lane map, then repeat the VFL trace.',
    'Light at the correct port now?', 'segments', 'routeFault'),
  segmentCheck: check('Fiber', 'Check this segment', 'Check seating, dirty ends, tight bends and damage. Correct any finding; retrace.',
    'Does this segment trace correctly now?', 'segments', 'fiberFault'),
  segments: check('Fiber', 'Follow the accessible route', 'Continue through the passive hops you can reach. Leave inaccessible sections unverified.',
    'All accessible segments traced?', 'recheck', 'vfl'),
  reconnect: check('Local health', 'Reconnect and check local health', 'Remove test gear. Restore the mapped TX-to-RX path and read health at your local optic.',
    'Local RX/TX in range and link stable?', 'done', 'fiberAccess'),
  recheck: check('Local health', 'Recheck after tracing', 'Remove the VFL. Restore the mapped TX-to-RX path and read health at your local optic.',
    'Local RX/TX in range and link stable?', 'done', 'lossAccess'),
  lossAccess: check('Fiber', 'Check loss on the tested section', 'A VFL trace shows the route. A loss test checks attenuation.',
    'Can you run a referenced loss test here?', 'loss', 'remoteCheck'),
  loss: check('Fiber', 'Measure the fiber loss', 'Use a referenced loss test at the operating wavelength.',
    'Loss within the link budget?', 'remainingFault', 'lossFault', '', 'VFL continuity alone does not establish acceptable loss.'),
  badOptic: result('Original optic or mating connection suspect', 'The replacement passed. Inspect the interface, replace as needed and recheck health.'),
  testFault: result('Check the port or loop setup', 'The known-good optic also failed. Confirm compatibility, mapping and the host port.'),
  patchFault: result('Suspect the fiber to this loop point', 'Direct loop passed; passive loop failed. Start beyond the last passing loop point: verify the map and test that section.'),
  routeFault: result('Port or polarity mismatch remains', 'Reconcile the observed VFL port with the intended map before continuing.'),
  fiberFault: result('Suspect this fiber segment or connection', 'Verify the VFL setup, compare a known-good jumper and test the segment for loss or a break.'),
  lossFault: result('Excessive fiber loss', 'Locate the loss: connectors, seating, bends, damaged fiber or splices. Correct it and retest.'),
  remainingFault: result('Tested section passed', 'Check local compatibility and port settings. Request checks beyond the tested section, including the remote end.'),
  remoteCheck: result('Local checks complete; rest unverified', 'Record the farthest passing loop point. Request checks of the remaining fiber and remote optic.'),
  done: result('Local health restored', 'Local readings and link look good. Record the readings and farthest loop point tested.', true)
};

export function startNode(mode = 'direct') { return mode === 'passive' ? 'passiveLoop' : 'start'; }
export function destination(id, answer, mode = 'direct') {
  return nodes[id][answer];
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
