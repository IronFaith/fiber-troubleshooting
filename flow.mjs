// Troubleshoot a reported low-RX condition in one direction, using the supplied guide.
const question = (phase, title, instruction, yes, no, details = [], note = '') =>
  ({ phase, title, instruction, yes, no, details, note });
const outcome = (title, instruction, details, success = false) =>
  ({ phase: success ? 'Verified result' : 'What to do next', title, instruction, details, success, terminal: true });

export const nodes = {
  start: question('Check the source', 'Is the far-end TX reading within its specified range?',
    'Pick the end with low RX. In the refreshed report, check the TX lanes at the opposite end that feed it.',
    'route', 'sourceState', [
      'Confirm the intended endpoints, affected lanes, units, and permitted testing.',
      'Use the exact optic TX limits. Do not substitute RX alarm limits.',
      'If both ends show low RX, repeat this flow in the opposite direction afterward.'
    ], 'Your local TX sends light away from you. The far-end TX supplies the light your local RX is missing. A positive TX number alone is not a pass.'),
  sourceState: question('Far-end source', 'After checking the far-end port, is TX within limits?',
    'Have the owner check port enable, optic recognition, compatibility, speed, and lane state. Refresh the reading after an approved correction.',
    'route', 'sourceHandoff', [], 'If TX remains low or cannot be verified, investigate the transmitting side before blaming the receive fiber.'),
  route: question('Confirm the path', 'Are the intended endpoints and TX-to-RX lanes connected correctly?',
    'Check labels, patching, lane mapping, polarity, and fully seated connectors against the intended route.',
    'inspect', 'routeFix', ['Confirm the exact connector, fiber type, and lane mapping for this optic.'],
    'Light can go to the wrong port or lane. A missing neighbor does not identify a broken fiber.'),
  routeFix: question('Correct the path', 'After an approved routing correction, is RX back within limits?',
    'Correct the confirmed patching or lane error, then refresh the affected RX readings. If the route cannot be confirmed, choose No.',
    'verify', 'routeHandoff', [], 'An identified routing correction followed by RX recovery supports a path or lane-mapping issue.'),
  inspect: question('Inspect both ends', 'Do the mating surfaces at both ends pass inspection?',
    'Inspect accessible fiber ends and optic receptacles using the approved isolation and inspection procedure.',
    'bends', 'clean', [
      'Never look into a fiber or optic. Verify dark with a suitable meter before inspection.',
      'Inspect both sides of any connection you open, including test leads.',
      'If inspection is unavailable or uncertain, choose No and arrange inspection before reconnection.'
    ], 'Contamination at the sending or receiving connection can reduce light. A dirty patch end can also contaminate its mating surface.'),
  clean: question('Clean, then reinspect', 'Do all affected surfaces pass after cleaning or replacement?',
    'Use the approved connector-specific cleaning method and reinspect. Damaged surfaces need approved replacement or site support.',
    'cleanResult', 'connectorHandoff', ['Reconnect only when both mating surfaces pass inspection.'],
    'A cleaning attempt alone does not establish a clean connection. If inspection cannot pass, stop at that connection.'),
  cleanResult: question('Retest after cleaning', 'Is RX now within its operating range?',
    'Restore the intended connections, refresh the report, and compare each affected RX lane with its actual operating limits.',
    'verify', 'bends', [], 'Recovery after work on these connections points to contamination or contact at the changed interface; record exactly what changed.'),
  bends: question('Follow the cable', 'Do you find a tight bend, pinch, strain, or visible damage?',
    'Inspect the accessible route and patch cords against the cable bend-radius and handling requirements.',
    'bendResult', 'meterAvailable', [], 'A cable can lose too much light without being fully broken. A normal-looking route can still contain a hidden fault.'),
  bendResult: question('Correct the visible issue', 'After the approved correction, is RX within limits?',
    'Relieve improper routing or replace the damaged accessible segment as permitted. Retest without changing other variables.',
    'verify', 'meterAvailable', ['Use the manufacturer bend radius. Do not force, stretch, or sharply bend the fiber to test it.'],
    'Recovery after this single change supports the changed cable section or its connections as the cause.'),
  meterAvailable: question('Separate fiber from receiver', 'Can you measure the incoming light with a suitable power meter?',
    'Use an approved meter, adapter, wavelength, and lane-specific method at the low-RX endpoint.',
    'incomingPower', 'loopbackAvailable', [], 'This checks what actually reaches the receiver, independently of its reported RX reading. If unavailable, use an approved local optic test instead.'),
  incomingPower: question('Measure at the receiving end', 'Is measured incoming power within the receiver limits?',
    'Measure the intended incoming lane at the receiver connection and compare with the exact optic receive range.',
    'swapAvailable', 'powerHigh', [
      'Inspect the meter connection and test leads, and confirm the wavelength and lane.',
      'For parallel or multiplexed optics, use the approved measurement method; aggregate power may hide a failed lane.'
    ], 'If suitable light reaches the correct lane but the optic still reports low RX, focus on its mating connection, receiver, compatibility, or telemetry.'),
  powerHigh: question('Classify the measurement', 'Is incoming power above the receiver maximum?',
    'Compare the measured value with both receive limits. An unavailable or invalid measurement is not a confirmed low-power result.',
    'highPowerHandoff', 'sourceMeasure', [], 'Above-limit light requires a different correction from missing or weak light. Do not treat every out-of-range measurement as attenuation.'),
  sourceMeasure: question('Verify actual source output', 'Is measured far-end output within its transmit limits?',
    'Have the far end verify actual output on the corresponding lane with an approved optical measurement, not only report telemetry.',
    'vflAvailable', 'sourceHandoff', ['Confirm both the receive-side and source measurements are valid before proceeding.'],
    'Confirmed good source output with low arriving power narrows the investigation to the route, connections, or measurement mapping. If unverified, choose No.'),
  vflAvailable: question('Check route continuity', 'Is an approved VFL check suitable and available?',
    'Use a visual fault locator only on a compatible passive path isolated from active equipment at both ends.',
    'continuity', 'lossAvailable', ['Use approved indirect detection. Never look into a fiber or send VFL light into active equipment.'],
    'A VFL can help trace the intended fiber and reveal some breaks or bends. It does not measure operating-wavelength loss.'),
  continuity: question('Trace the intended fiber', 'Is VFL light detected at the correct far-end lane?',
    'Use the approved indirect method to verify the intended endpoint and note any visible light escape along the accessible route.',
    'lossAvailable', 'patchAvailable', [], 'No indication can mean wrong mapping, a break, excessive loss, or test incompatibility. Red light reaching the end still does not prove acceptable loss.'),
  lossAvailable: question('Measure attenuation', 'Is a referenced optical loss test available?',
    'Use an approved source and meter or optical loss test set at the required wavelength, lane, and reference method.',
    'lossResult', 'patchAvailable', [], 'An actual loss measurement helps distinguish a continuous but lossy route from a path that meets its loss budget.'),
  lossResult: question('Compare with the loss budget', 'Does the affected path pass its specified loss budget?',
    'Compare valid referenced measurements with the path budget in each required direction and lane.',
    'measurementHandoff', 'patchAvailable', ['Record measured loss in dB, wavelength, reference method, and lane.'],
    'If the path passes but the earlier measurements still show missing input light, reconcile the source, mapping, and test setup before replacing an optic.'),
  patchAvailable: question('Isolate one segment', 'Can you substitute a compatible known-good patch segment?',
    'With approval, change one accessible segment at a time. Keep the same endpoints, optics, and lane mapping.',
    'patchResult', 'fiberHandoff', ['Inspect both mating surfaces and match fiber type, connector, polish, and lane mapping.'],
    'A controlled substitution narrows the problem to the replaced segment or its interfaces.'),
  patchResult: question('Retest the substituted segment', 'Did this single patch change restore RX within limits?',
    'Restore the approved route and refresh the report. Compare the same RX lanes before and after the change.',
    'verify', 'fiberHandoff', [], 'If RX recovers, the changed segment or its connections are suspect. If not, other route sections or unresolved source/receiver issues remain.'),
  loopbackAvailable: question('Test the local optic', 'Is a supported optical loopback test available and approved?',
    'Use only the exact compatible optical loopback, attenuation, lane routing, and device test mode for this optic.',
    'loopbackResult', 'patchAvailable', ['Inspect test connections and confirm receive power stays within the supported range.', 'Do not assume an electrical or host loopback tests the optics.'],
    'This is an alternative when incoming light cannot be measured. It tests local TX/RX under that setup, not the production fiber or far end.'),
  loopbackResult: question('Read the optic test result', 'Does the local optic pass the approved optical loopback?',
    'Use the device test criteria and record mode, loopback model, lanes, and optical readings. Remove the loopback after testing.',
    'patchAvailable', 'loopbackValid', [], 'A pass supports local optic function under the test. A failure needs a validated setup before it can implicate the optic.'),
  loopbackValid: question('Validate a failed test', 'Is the loopback setup confirmed correct despite the failure?',
    'Check mating surfaces, compatibility, attenuation, safe receive power, lane map, and the exact device test mode.',
    'swapAvailable', 'testSetupHandoff', [], 'A bad test setup can look like a bad optic. Correct the setup and repeat before interpreting the failure.'),
  swapAvailable: question('Compare the receiving optic', 'Can you test a compatible known-good optic in the same port?',
    'Use an approved replacement while keeping the same incoming fiber and host port. Inspect both mating surfaces first.',
    'swapResult', 'receiverHandoff', [], 'Holding the fiber and port constant makes the comparison useful. Without the comparison, the receiver-side cause remains unisolated.'),
  swapResult: question('Retest with the replacement', 'Does the replacement restore normal RX on the same connection?',
    'Recheck the production RX lanes using the same fiber and port. Record exactly which optic changed.',
    'verify', 'receiverHandoff', [], 'Recovery supports the original optic or its mating interface being suspect. No recovery means the optic has not been isolated as the cause.'),
  verify: question('Verify the recovery', 'Are RX lanes within limits and the link stable at both ends?',
    'Remove test equipment, restore approved production patching, refresh both endpoints, and confirm service with the owner.',
    'done', 'unresolved', ['Check expected speed, lane status, errors, and the required observation time.', 'A reading above −40 or a green report badge alone is not a pass.'],
    'The outcome is the evidence-supported result of your checks. It does not certify every aspect of optic health.'),
  sourceHandoff: outcome('Far-end source still needs verification.', 'Do not conclude the receive fiber or local optic is defective from this result.',
    ['Record far-end port state, TX readings, wavelength, and lane.', 'Request valid source-output testing or an approved transmitter/port comparison.', 'Correct the source issue and return to the first question.']),
  routeHandoff: outcome('Confirm or correct the route first.', 'The intended endpoints or lane mapping remain uncertain, or RX did not recover after the correction.',
    ['Have the owner reconcile labels, patching, and TX-to-RX lanes.', 'Once the route is confirmed, return to its question and continue to inspection.']),
  connectorHandoff: outcome('Resolve the failing connection surface.', 'A dirty, damaged, or unverified mating surface must be addressed before reconnection.',
    ['Protect the endface and record its location.', 'Arrange inspection, approved cleaning, or replacement.', 'When both surfaces pass, return and retest RX.']),
  highPowerHandoff: outcome('Incoming power is too high.', 'Review source compatibility and the receiver power budget with the owner.',
    ['Use the equipment-approved correction or attenuation method.', 'Do not reconnect until the receiver input is within its supported range.']),
  measurementHandoff: outcome('The measurements need to be reconciled.', 'The path passed its loss test, but earlier checks indicated missing or low input light.',
    ['Recheck the same lane, wavelength, reference, source state, and measurement points.', 'Consider intermittent behavior or incorrect report mapping; do not declare an optic failed from conflicting evidence.']),
  fiberHandoff: outcome('Continue isolating the fiber route.', 'The completed checks have not identified a restoring segment change.',
    ['Check remaining patch sections, panels, and mating surfaces one at a time.', 'Use referenced loss testing or specialist OTDR to investigate excessive loss, bends, or breaks.', 'If output or local optic testing was unavailable, keep those causes open as well.']),
  testSetupHandoff: outcome('Correct the loopback setup and retest.', 'The failed test is not valid evidence of a defective optic yet.',
    ['Confirm the approved loopback, test mode, mapping, and power limits.', 'Return to the loopback result after a valid retest.']),
  receiverHandoff: outcome('Receiver-side fault is not isolated yet.', 'Keep the optic, mating interface, host port, compatibility, and report telemetry under review.',
    ['Record whether incoming light was independently measured or a valid loopback failed.', 'Request an approved optic/port comparison and confirm report-to-port/lane mapping.', 'If a replacement also failed, do not label both optics defective.']),
  unresolved: outcome('Recovery is incomplete.', 'RX levels, lane status, errors, or stability still fail the site criteria.',
    ['Record what improved and what still fails.', 'If RX is now normal, request configuration and optical-quality checks.', 'If RX is still low, continue on the affected lane and direction.']),
  done: outcome('Receive light and link operation verified.', 'Both ends pass the agreed recovery checks under the current operating conditions.',
    ['Save final RX/TX readings, affected lanes, test results, and the exact correction.', 'Record any remaining uncertainty about the original defect.', 'Complete the site observation and closeout procedure.'], true)
};

nodes.routeFix.findings = { yes: 'RX recovered after an approved route or lane-mapping correction.' };
nodes.cleanResult.findings = { yes: 'RX recovered after work on the connection surfaces; contamination or contact is implicated.' };
nodes.bendResult.findings = { yes: 'RX recovered after correcting the identified cable condition or replacing that section.' };
nodes.incomingPower.findings = { yes: 'Incoming light was independently measured within the receiver limits.' };
nodes.sourceMeasure.findings = { yes: 'Actual far-end output was measured within its transmit limits.' };
nodes.continuity.findings = { yes: 'VFL continuity was observed; operating-wavelength loss was not established by that check.', no: 'VFL did not verify the intended continuity; a break is not proven by this alone.' };
nodes.lossResult.findings = { no: 'The referenced path-loss check did not establish a passing loss budget.' };
nodes.patchResult.findings = { yes: 'RX recovered after changing one patch segment; that segment or its interfaces are suspect.' };
nodes.loopbackAvailable.findings = { no: 'An approved local optical loopback was unavailable; local optic operation was not verified by that test.' };
nodes.loopbackResult.findings = { yes: 'The local optic passed the supported optical loopback test.' };
nodes.swapResult.findings = { yes: 'A compatible optic replacement restored RX on the same fiber and port; the original optic or its mating interface is suspect.', no: 'The replacement did not restore normal RX; the optic was not isolated as the cause.' };

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
