// Decision steps adapted from the supplied Fiberline troubleshooting guide.
const question = (phase, title, instruction, yes, no, details = [], note = '') =>
  ({ phase, title, instruction, yes, no, details, note });
const outcome = (title, instruction, details, success = false) =>
  ({ phase: success ? 'Complete' : 'Next action', title, instruction, details, success, terminal: true });

export const nodes = {
  start: question('Before you start', 'Is this the correct link, and are you cleared to test it?',
    'Confirm both endpoint ports, the fiber route, and permitted service impact with the link owner.',
    'inspect', 'hold', [
      'Record the optic model, link speed, alarms, and available TX/RX readings.',
      'Use the site procedure and the exact equipment limits throughout this guide.'
    ]),
  inspect: question('Inspect & clean', 'Do both connector endfaces pass inspection?',
    'Inspect both mating surfaces with an approved fiber inspection scope. They must be clean and undamaged.',
    'recovered', 'cleanable', [
      'Follow site isolation rules and verify dark with a suitable meter before inspection.',
      'Check cable ends, optic receptacles, accessible passives, and test equipment.',
      'Reconnect only when both mating surfaces pass inspection.'
    ]),
  cleanable: question('Inspect & clean', 'Is it contamination that you can safely clean?',
    'Check that the surface is dirty, rather than damaged, and that an approved cleaning method is available.',
    'clean', 'damaged', [], 'If damage is present or the condition is uncertain, choose No and get site support.'),
  clean: question('Inspect & clean', 'After cleaning, do both endfaces pass inspection?',
    'Use the correct cleaner, then reinspect both mating surfaces before reconnecting.',
    'recovered', 'damaged', [
      'Match the cleaner to the connector or optic receptacle.',
      'Reinspect after each cleaning attempt and protect passing endfaces.',
      'Do not reconnect a surface that remains dirty, damaged, or uncertain.'
    ]),
  recovered: question('Check the link', 'Is the link working now?',
    'After both surfaces pass inspection, restore the approved connection and check link status.',
    'verify', 'tx'),
  tx: question('Transmit light', 'Is local transmit power verified within limits?',
    'Check DOM/DDM readings, then verify output with the approved wavelength-matched optical power meter setup.',
    'loopbackAllowed', 'txSetup', [
      'Have the owner confirm port enable, optic recognition, transmitter state, speed, and lanes.',
      'Match the meter, adapter, wavelength, and method to the optic.',
      'Use the exact optic limits; distinguish per-lane readings from aggregate power.'
    ], 'Light being present does not prove a working data link. Choose No for low, absent, or unverified output.'),
  txSetup: question('Transmit light', 'Was the setup corrected and a retest approved?',
    'Have the owner verify the transmitter state, optic compatibility, wavelength, lane, and meter setup.',
    'tx', 'txHandoff', [
      'Record DOM readings separately from meter readings.',
      'Retry only after an approved setup or state correction.'
    ], 'Low output may involve the optic, port, transmitter state, or test setup; it does not isolate the cause.'),
  loopbackAllowed: question('Local optic', 'Is a compatible optical loopback test approved?',
    'Confirm that this optic supports the specific optical loopback and device test mode.',
    'loopback', 'pathAllowed', [
      'Confirm connector and polish, lane map, attenuation, and receiver power budget.',
      'Inspect both mating surfaces before connecting.',
      'Use the approved test mode and pass criteria.'
    ], 'Connector shape alone does not establish compatibility. Electrical or host loopback may bypass the optics.'),
  loopback: question('Local optic', 'Did the optical loopback test pass?',
    'Run the approved test and compare its result with the device procedure and optical limits.',
    'path', 'loopbackSetup', [
      'Record test mode, loopback model, optical readings, and result.',
      'Remove the loopback when testing is complete.'
    ], 'A pass supports local TX/RX function under this test. It does not clear the production route or remote end.'),
  loopbackSetup: question('Local optic', 'Is the failed loopback result valid?',
    'Confirm clean surfaces, correct mode, lane routing, attenuation, compatible loopback, and safe receive power.',
    'compareAllowed', 'loopbackRetry', [], 'A failed loopback alone does not identify a bad optic.'),
  loopbackRetry: question('Local optic', 'Can you correct the setup and retry with approval?',
    'Record the setup correction and repeat the same approved optical test.',
    'loopback', 'localHandoff'),
  compareAllowed: question('Local optic', 'Is a known-good optic comparison approved and available?',
    'Use a compatible replacement optic and keep the test mode, loopback, and host port unchanged.',
    'compareResult', 'localHandoff', ['Change one variable at a time and record exactly which optic changed.']),
  compareResult: question('Local optic', 'Does the replacement optic pass the same test?',
    'Repeat the valid local optical test after the approved optic-only change.',
    'path', 'localHandoff', [], 'A pass makes the original optic suspect. If only a different port passes, the port or host path needs owner review.'),
  pathAllowed: question('Fiber path', 'Are passive fiber-route checks approved?',
    'A supported optical loopback was not available. Keep local optic operation marked as unverified.',
    'path', 'handoff', ['Record why the loopback was unavailable and request an alternative local test.'],
    'Checking the fiber route does not prove the local receiver works.'),
  path: question('Fiber path', 'Are labels, polarity, and routing confirmed correct?',
    'Trace the documented route from the local TX lane to the intended remote RX lane.',
    'pathRecovered', 'routeFix', [
      'Check patch labels, lane mapping, and TX-to-RX polarity.',
      'Check accessible cords for pinching, excessive bends, and damage.',
      'Inspect both sides of any connection you open.'
    ]),
  routeFix: question('Fiber path', 'Can you make an approved routing correction?',
    'Have the owner confirm the required label, lane, polarity, or patching correction. Then check the route again.',
    'path', 'pathHandoff', [], 'Do not guess the intended route or move an unidentified connection.'),
  pathRecovered: question('Fiber path', 'Has the link recovered after the route checks?',
    'Restore approved patching and check the link after any correction.',
    'verify', 'vflAllowed'),
  vflAllowed: question('Continuity', 'Can this isolated passive path be tested with a VFL?',
    'Use a visual fault locator only when suitable and approved, with both ends disconnected from active equipment.',
    'vflResult', 'lossAllowed', [
      'Confirm the VFL, connectors, and passives are compatible.',
      'Use approved indirect detection. Never look into a fiber or connector.',
      'Do not send VFL light through active electronics.'
    ]),
  vflResult: question('Continuity', 'Is VFL light detected at the intended far end?',
    'Check the intended remote lane using the approved indirect detection method.',
    'lossAllowed', 'segmentAllowed', [
      'Record the tested lane, route, and far-end indication.',
      'Record visible light escape without looking into connectors.'
    ], 'Red light shows continuity, not acceptable optical loss. No light can also mean wrong routing, setup, or incompatible passives.'),
  lossAllowed: question('Optical loss', 'Is an approved referenced loss test available?',
    'Use an optical loss test set, or a referenced source and meter, matched to the path and site procedure.',
    'lossResult', 'segmentAllowed', [
      'Match wavelength, reference method, fiber type, and lane.',
      'Inspect test leads and mating connections; keep the path isolated.',
      'Test the required directions and lanes.'
    ]),
  lossResult: question('Optical loss', 'Does every required path meet its loss budget?',
    'Compare valid referenced measurements with the documented loss limits for this link.',
    'remoteTx', 'segmentAllowed', [
      'Save the loss readings, wavelengths, reference method, and lane IDs.',
      'Restore approved patching before device-side checks.'
    ], 'Passing loss supports the measured passive path. It does not prove the devices or configuration work.'),
  segmentAllowed: question('Isolate a section', 'Can you compare a known-good patch segment?',
    'With approval, replace one compatible, accessible segment at a time and repeat the same check.',
    'segmentResult', 'pathHandoff', [
      'Validate the test setup, routing, lane, and passive compatibility first.',
      'Match connector, polish, fiber type, and lane mapping.',
      'Inspect both mating surfaces before connecting.'
    ]),
  segmentResult: question('Isolate a section', 'Did that segment change restore the link?',
    'Compare results before and after the single approved segment change.',
    'verify', 'pathHandoff', ['Record the segment location and before/after readings.'],
    'Recovery points to that segment or its interfaces, without proving the exact defect. Partial improvement still needs further investigation.'),
  remoteTx: question('Remote end', 'Is remote transmit power verified within limits?',
    'Have the remote owner confirm port state, optic recognition, speed, lanes, and measured TX output.',
    'remoteRx', 'remoteHandoff', ['Record the remote TX reading, wavelength, lane, and equipment limits.']),
  remoteRx: question('Remote end', 'Is local receive power within the correct limits?',
    'Compare local RX with the exact optic limits and intended lane mapping.',
    'remoteRecovered', 'receiveHandoff', [], 'Good remote TX with low local RX calls for review of the receive path, polarity, or receiver.'),
  remoteRecovered: question('Remote end', 'Has the link recovered after an approved correction?',
    'Check link state and errors alongside the optical readings in both directions.',
    'verify', 'configHandoff', [], 'Normal power with a failed link can still involve configuration or optical-quality issues.'),
  verify: question('Final verification', 'Is the production link working and stable?',
    'Remove test equipment, restore approved patching and settings, and verify normal operation at both endpoints.',
    'done', 'handoff', [
      'Verify expected speed, lanes, receive levels, stability, and error limits.',
      'Have the owner confirm recovery and the required observation time.',
      'Record changes, retained replacements, test results, and the final route.'
    ], 'Light alone is not a successful closeout. Use the site acceptance criteria.'),
  hold: outcome('Pause and confirm the link.', 'Ask the site lead to confirm both endpoint ports, the route, and permitted testing.',
    ['Leave connections in their recorded state.', 'Capture the labels and alarms, then go back once the link is confirmed.']),
  damaged: outcome('Do not reconnect this surface.', 'Persistent contamination, damage, or an uncertain inspection needs site support.',
    ['Protect and record the affected endface.', 'Request an approved replacement or specialist inspection.', 'Inspect any replacement and its mating surface before returning to the inspection step.']),
  txHandoff: outcome('Escalate the transmit-power check.', 'Local output is low, absent, or unverified after checking the setup.',
    ['Share DOM and meter readings separately, plus wavelength, lane, optic, and port state.', 'The optic, host port, transmitter state, or setup may still be involved.']),
  localHandoff: outcome('Escalate the local optic test.', 'The local test is still failing or cannot be validated.',
    ['Share loopback compatibility, test mode, receive power, and comparison results.', 'If only a different port passes, flag the port or host path for review.', 'Do not label the optic defective from a failed loopback alone.']),
  pathHandoff: outcome('Escalate the fiber-path check.', 'The route needs further approved testing or fault location.',
    ['Share labels, lane mapping, continuity/loss results, and segment comparisons.', 'A specialist may use OTDR to locate remaining path events.', 'Record which checks remain unavailable or inconclusive.']),
  remoteHandoff: outcome('Ask the remote owner to check the source.', 'Remote transmit output is low, absent, or unverified.',
    ['Share remote port state, optic ID, wavelength, lane, and available readings.', 'Request an approved remote transmitter and measurement-setup check.']),
  receiveHandoff: outcome('Escalate the receive-path check.', 'Remote TX is verified, but local RX is outside its limits or unverified.',
    ['Share remote TX and local RX readings with lane mapping and the relevant limits.', 'Request review of the receive path, polarity, and receiver.']),
  configHandoff: outcome('Escalate configuration and optical quality.', 'Optical power is normal, but the production link still fails or shows errors.',
    ['Share link state, alarms, errors, speed, lane settings, and TX/RX readings.', 'Request owner review of configuration and optical quality.']),
  handoff: outcome('Hand off the unresolved fault.', 'Give the site lead the evidence collected and the checks still needed.',
    ['Include endpoint and optic IDs, lane mapping, alarms, readings, and test setup.', 'List only the cleaning, loopback, continuity, loss, or comparison tests actually completed.', 'Restore or preserve connections as the owner directs and record their state.']),
  done: outcome('Link restored and verified.', 'The production link has passed the site recovery checks.',
    ['Record what changed, the final readings, and which checks passed.', 'Save the final route and any retained replacement details.', 'Confirm closeout and monitoring with the owner.'], true)
};

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
