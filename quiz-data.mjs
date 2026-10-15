export const topics = ['Spot the problem', 'Simple checks', 'Understand the readings', 'Find the problem section'];
export const roundDescriptions = [
  'Recognize no light and the simple things that can cause it.',
  'Choose useful checks for dirt, seating, bends and the port label.',
  'Learn what an optic does, what TX/RX mean and how to read the numbers.',
  'Use local loops and red test light to narrow down the problem.'
];

// Numeric limits are training examples, not installed-optic specifications.
export const questions = [
  {
    id:'no-light', topic:0, visual:'simple-dark',
    prompt:'Cable Guy shows −40 in red. What does that tell us right away?',
    choices:['No light is being reported.', 'The connection is healthy.', 'We know exactly which part is broken.'], correct:0,
    explanation:'−40 is your report’s no-light indication. We still need to find out why.',
    lesson:'learn.html#readings'
  },
  {
    id:'no-light-cause', topic:0, visual:'simple-rx-dark',
    prompt:'No light is arriving. Which problems could cause this?',
    choices:['A dirty or loose connection.', 'A badly bent or damaged fiber.', 'Normal infrared light being invisible.', 'The wrong port or fiber pairing.', 'An optic or sending port that is not producing light.'], correct:[0,1,3,4],
    explanation:'Dirt, seating, bends, damage, patching and the light source are all possible causes. This reading alone cannot tell us which. Normal infrared light being invisible does not cause a no-light reading.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'dirt-blocks', topic:0, visual:'light-returns',
    prompt:'You clean and reseat a connection. Light returns. What does that suggest?',
    choices:['The optic was definitely broken.', 'Dirt or seating likely affected the connection.', 'Every part of the link is now proven healthy.'], correct:1,
    explanation:'Light returning points to the connection you worked on. Because you cleaned and reseated it, you cannot say which action helped. Recheck the readings and link health before calling it fixed.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'loose-connection', topic:0, visual:'recheck',
    prompt:'The connector is clean and fully seated, but the report still shows no light. What next?',
    choices:['Keep isolating the possible causes, one check at a time.', 'Replace the optic: this proves it is bad.', 'Stop: a seated connector proves the fiber is good.'], correct:0,
    explanation:'You checked one possible cause, not the whole path. Verify the mapped port and test the local optic with the approved loop setup. A passing loop helps you move outward through the fiber you can access.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'bend-cause', topic:0, visual:'bend',
    prompt:'After you relieve a tight bend correctly, the light reading improves. What have you learned?',
    choices:['The whole link must be healthy now.', 'The bend likely contributed; check the reading against the allowed limits.', 'The optic must be replaced anyway.'], correct:1,
    explanation:'A tight bend can let light escape or damage the fiber. Improvement after correcting it points to the bend, but improved does not always mean within limits. Recheck health before moving on.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'cleaning', topic:1, visual:'dirty',
    prompt:'Inspection finds dirt on the connector. What comes next?',
    choices:['Push it in harder.', 'Clean it with approved tools, then inspect again.', 'Wipe it on your shirt.'], correct:1,
    explanation:'Safely isolate the connection first. Inspect, clean if needed, and inspect again before reconnecting.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'seat-connection', topic:1, visual:'unseated',
    prompt:'The correct, clean connector is loose. What should you do?',
    choices:['Force it in at any angle.', 'Leave it partly connected.', 'Align it correctly and seat it fully.'], correct:2,
    explanation:'Follow the connector’s alignment and latch. Don’t force it. After reconnecting, check whether the light reading improves.',
    lesson:'patching.html#fim-path'
  },
  {
    id:'bend-check', topic:1, visual:'bend',
    prompt:'You find a very tight bend in the fiber. What should you do?',
    choices:['Carefully restore the allowed bend radius and check for damage.', 'Pull it tight to straighten it.', 'Ignore it if the jacket looks intact.'], correct:0,
    explanation:'Give the fiber a gentle route that meets the cable’s bend limit. Follow site handling procedures, then check the light again.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'match-port', topic:1, visual:'port-label',
    prompt:'The record says CAS 1 Port 12. Is a nearby empty port just as good?',
    choices:['Yes, any empty port will work.', 'No, match the exact port and fiber labels.'], correct:1,
    explanation:'A neighboring port can lead somewhere else. Match the device, fiber and passive port to the connection record in FIM.',
    lesson:'patching.html#fim-path'
  },
  {
    id:'one-change', topic:1, visual:'recheck',
    prompt:'You fix one connection. What should you do before changing something else?',
    choices:['Replace every remaining part.', 'Assume the whole link is fixed.', 'Check the health report again and note what changed.'], correct:2,
    explanation:'One change at a time helps you learn what made a difference. Keep track of what you checked and the result.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'optic-purpose', topic:2, visual:'optic',
    prompt:'What does the optic do for the device?',
    choices:['Turns device data into light, and arriving light back into data.', 'Cleans the fiber automatically.', 'Only holds the cable in place.'], correct:0,
    explanation:'Think of the optic as a translator. It lets the device send and receive data through fiber using light that is usually invisible. Never look into an optic or fiber end.',
    lesson:'learn.html#optics'
  },
  {
    id:'tx-rx', topic:2, visual:'link',
    prompt:'What do TX and RX mean?',
    choices:['TX receives; RX sends.', 'TX sends light; RX receives light.'], correct:1,
    explanation:'TX is light leaving this optic. RX is light arriving at it. That tells you which direction a missing-light reading refers to.',
    lesson:'learn.html#optics'
  },
  {
    id:'healthy-readings', topic:2, visual:'healthy',
    prompt:'These readings are inside the example limits. Do they need to be exactly zero?',
    choices:['Yes, only zero is healthy.', 'Yes, TX and RX must match.', 'No, they need to be within the allowed range.'], correct:2,
    explanation:'Healthy power is between the optic’s low and high limits. +0.25 is your good example, not a target for every optic. Too little or too much light can be a problem.',
    lesson:'learn.html#readings'
  },
  {
    id:'low-reading', topic:2, visual:'weak',
    prompt:'The example’s lowest allowed RX is −3.00. Is −4.20 too weak?',
    choices:['Yes, −4.20 is below the allowed minimum.', 'No, only −40 can be a problem.'], correct:0,
    explanation:'More negative means less light power: −4.20 is weaker than −3.00. These dBm numbers describe light power. Check the actual optic’s limits at work.',
    lesson:'learn.html#readings'
  },
  {
    id:'all-lanes', topic:2, visual:'lanes',
    prompt:'Three readings look good, but one lane shows −40. Are you finished checking?',
    choices:['Yes, most of them are good.', 'No, check the lane that still has no light.'], correct:1,
    explanation:'A lane is one light channel in the optic. Check every required lane; the good ones do not prove the dark one works. Check the link status too.',
    lesson:'learn.html#readings'
  },
  {
    id:'direct-loop', topic:3, visual:'direct-loop',
    prompt:'How can you test this local optic without the long fiber route?',
    choices:['Send VFL light into the live optic.', 'Use the correct LC loopback at the optic.', 'Move the cable to any open port.'], correct:1,
    explanation:'The loop brings the optic’s own light back to it. Follow the approved setup, lane mapping and any required light reduction (attenuation). If it fails, verify the setup and clean connections before blaming the optic.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'passive-loop', topic:3, visual:'passive-loop',
    prompt:'A correct loop at the next accessible passive passes. What have you checked?',
    choices:['The local optic and the path up to that loop.', 'Every fiber and the remote optic too.', 'Only the remote device.'], correct:0,
    explanation:'The MMC loop returns light from that passive. Work through the passives you can reach and record the last passing point. Beyond the loop remains untested.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'vfl-setup', topic:3, visual:'vfl',
    prompt:'A VFL sends red test light. How do you connect it to a fiber section?',
    choices:['Leave the section connected to live optics.', 'Look into the other end while it is on.', 'Isolate both ends from active gear and use the correct adapter.'], correct:2,
    explanation:'The VFL is a separate tracing tool. Verify the source works, follow site isolation steps and use the safe viewing method. Never look directly into a fiber end.',
    lesson:'learn.html#vfl'
  },
  {
    id:'wrong-port', topic:3, visual:'wrong-port',
    prompt:'Red test light appears at the wrong passive port. What should you check?',
    choices:['Whether the optic is the wrong color.', 'The fiber labels, patching and FIM port record.'], correct:1,
    explanation:'The fiber reaches a different place from the one expected. Check for a mispatch or a mismatch in the record before correcting it.',
    lesson:'patching.html#fim-path'
  },
  {
    id:'vfl-limits', topic:3, visual:'vfl-seen',
    prompt:'Red light reaches the correct port. Does that prove every health check will pass?',
    choices:['No, it confirms a path; loss and optic health still need checking.', 'Yes, visible red light proves the whole link is healthy.'], correct:0,
    explanation:'A VFL shows where the fiber connects. It does not measure whether enough network light gets through. Use the appropriate loss test, restore the mapped connection and recheck health.',
    lesson:'learn.html#vfl'
  }
];

export const roundQuestionIds = topic => questions.filter(question => question.topic === topic).map(question => question.id);

export function startAttempt(ids = roundQuestionIds(0)) {
  return { ids:[...new Set(ids)].filter(id => questions.some(question => question.id === id)), answers:{} };
}

export function recordAnswer(attempt, id, choice) {
  const question = questions.find(item => item.id === id);
  if (!question || !attempt.ids.includes(id) || Object.hasOwn(attempt.answers,id)) return attempt;
  const multiple = Array.isArray(question.correct);
  if (multiple !== Array.isArray(choice)) return attempt;
  const choices = multiple ? choice : [choice];
  if (!choices.length || choices.some(value => !Number.isInteger(value) || value < 0 || value >= question.choices.length)) return attempt;
  const answer = multiple ? [...new Set(choices)].sort((a,b) => a-b) : choice;
  return { ...attempt, answers:{...attempt.answers,[id]:answer} };
}

export function isCorrectAnswer(question, answer) {
  if (!Array.isArray(question.correct)) return answer === question.correct;
  if (!Array.isArray(answer)) return false;
  const selected = new Set(answer);
  return selected.size === question.correct.length && question.correct.every(choice => selected.has(choice));
}

export function resultsFor(attempt) {
  const answered = attempt.ids.filter(id => Object.hasOwn(attempt.answers,id));
  const missed = answered.filter(id => !isCorrectAnswer(questions.find(question => question.id === id),attempt.answers[id]));
  return { total:attempt.ids.length, answered:answered.length, correct:answered.length-missed.length, missed, complete:answered.length === attempt.ids.length };
}

export function roundProgress(topic, answers) {
  const result = resultsFor({ids:roundQuestionIds(topic),answers});
  const passed = result.complete && result.total === 5 && result.correct >= 4;
  return {...result, passed, nextRound:passed && topic < topics.length-1 ? topic+1 : null};
}

export function rookieRank(previousLevel, topic, answers) {
  const level = topic === previousLevel && roundProgress(topic,answers).passed ? previousLevel+1 : previousLevel;
  const numeral = ['','I','II','III','IV'][level];
  return {level, title:`Fiber Rookie${numeral ? ` ${numeral}` : ''}`, complete:level === topics.length};
}
