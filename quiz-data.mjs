export const topics = ['Spot the problem', 'Check the connection', 'Understand the light', 'Narrow down the problem'];
export const roundDescriptions = [
  'Read the signs and consider what could cause them.',
  'Inspect connections, match FIM and check your changes.',
  'Follow TX and RX, compare limits and check every lane.',
  'Use local loops and VFL observations to choose the next check.'
];

// Site examples and fictional training readings, not installed-optic limits.
export const questions = [
  {
    id:'no-light', topic:0, visual:'simple-dark', skill:'Read the signal',
    prompt:'The report shows −40 in red. What do we know so far?',
    choices:['No light is being reported; the cause is still unknown.', 'The optic has failed and needs replacing.', 'The fiber is broken somewhere beyond the first passive.'], correct:0,
    explanation:'In this Cable Guy example, −40 means no light is reported. It does not identify the failed part. Start checking the possible causes.',
    reveal:'No light reported ≠ a diagnosis', lesson:'learn.html#readings'
  },
  {
    id:'no-light-cause', topic:0, visual:'simple-rx-dark', skill:'Consider possible causes',
    prompt:'No light is arriving. Which problems could explain it?',
    choices:['A dirty or partly seated connection.', 'A badly bent or damaged fiber.', 'Normal infrared light being invisible to our eyes.', 'A misport or incorrect fiber pairing.', 'The far-end optic or sending port is not producing light.'], correct:[0,1,3,4],
    explanation:'Connections, fiber, mapping and the sending source are all candidates. Invisible infrared is normal—the receiver detects it even though our eyes cannot.',
    reveal:'Several causes fit the same symptom', lesson:'learn.html#cleaning'
  },
  {
    id:'dirt-blocks', topic:0, visual:'light-returns', skill:'Interpret a change',
    prompt:'You clean and reseat one connection. Light returns. What can you conclude?',
    choices:['Cleaning alone definitely fixed it.', 'Dirt or seating likely contributed; recheck health.', 'The whole fiber path and both optics are proven good.'], correct:1,
    explanation:'You changed both cleanliness and seating, so either could have helped. Light returning is useful evidence; check the limits and link status before closing the issue.',
    reveal:'The connection improved; the full link still needs checking', lesson:'learn.html#cleaning'
  },
  {
    id:'loose-connection', topic:0, visual:'connections', interaction:'visual', skill:'Notice connection problems',
    prompt:'Which connection needs a closer seating check?',
    choices:['Connection A', 'Connection B'], correct:1,
    explanation:'B has a visible gap at the adapter. After the required isolation and inspection, align and seat it fully, then recheck. Appearance alone does not prove optical health.',
    reveal:'B: check the gap, seating and latch', lesson:'learn.html#cleaning'
  },
  {
    id:'bend-cause', topic:0, visual:'bend-change', skill:'Interpret a change',
    prompt:'You give a tightly bent fiber a wider curve, and its light reading improves. What should you check before calling the issue fixed?',
    choices:['Nothing else—any improvement means the link is healthy.', 'Check that the new reading is within the optic’s allowed range and the link is working.', 'Keep adjusting the cable until the reading is exactly zero.'], correct:1,
    explanation:'A better reading means more light is getting through, but it may still be too weak. Recheck the required lanes against the optic’s limits and confirm the link is working. Exactly zero is not the goal.',
    reveal:'Improved does not always mean within limits', lesson:'learn.html#cleaning'
  },
  {
    id:'cleaning', topic:1, visual:'dirty', skill:'Check connections',
    prompt:'Inspection finds contamination. What should happen before reconnecting?',
    choices:['Reconnect if the connector looks clean without magnification.', 'Clean with approved tools, then inspect again.', 'Clean once and reconnect without another inspection.'], correct:1,
    explanation:'With the connection safely isolated, clean it and inspect again. A cleaning attempt alone does not confirm the end face is clean.',
    reveal:'Inspect → clean if needed → inspect again', lesson:'learn.html#cleaning'
  },
  {
    id:'seat-connection', topic:1, visual:'seated-dark', skill:'Check connections',
    prompt:'Clean and fully seated, but still −40. What is the useful next step?',
    choices:['Replace the optic immediately; the fiber is ruled out.', 'Keep reseating the same connector until the reading changes.', 'Verify the FIM mapping, then use the approved local optic test.'], correct:2,
    explanation:'A clean, seated connector rules out neither a mispatch nor a source problem. Confirm the mapping and isolate the local optic using the correct approved loop setup.',
    reveal:'One checked connection does not prove the whole path', lesson:'learn.html#loopbacks'
  },
  {
    id:'bend-check', topic:1, visual:'bend', skill:'Handle fiber carefully',
    prompt:'A fiber cable is squeezed under a cable-management clip. Its outer covering is not torn. What should you do first?',
    choices:['Carefully relieve the pressure, check the cable for damage, and recheck the light reading.', 'Leave it—the outside looks fine, so the fiber inside must be fine.', 'Replace the optic—the squeezed cable cannot affect the light.'], correct:0,
    explanation:'The jacket is the cable’s outer covering. It can look fine while pressure or a sharp bend affects the fiber inside. Follow site handling procedures: release the pressure, route the cable with a wide enough curve for its bend limit, inspect for damage, and retest.',
    reveal:'Check the route and the result', lesson:'learn.html#cleaning'
  },
  {
    id:'match-port', topic:1, visual:'cassette', interaction:'visual', skill:'Match the FIM destination',
    prompt:'FIM calls for CAS 2, Port 28. Select that port.',
    choices:Array.from({length:32},(_,i)=>`CAS 2 Port ${i+1}`), correct:27,
    explanation:'Port 28 is on the bottom row, which runs 17–32. Match the exact CAS, port and fiber labels; the nearest empty port may lead elsewhere.',
    reveal:'CAS 2 / 28: the mapped destination', lesson:'patching.html#fim-path'
  },
  {
    id:'one-change', topic:1, visual:'recheck', skill:'Verify a change',
    prompt:'You reseat the mapped connector. What should you do before changing another part?',
    choices:['Replace the next jumper so two possible causes are covered.', 'Mark it fixed because the latch is now engaged.', 'Recheck the report and record what changed.'], correct:2,
    explanation:'Check the result after each change. That connects an action to its effect and helps you decide whether another check is needed.',
    reveal:'One change → observe → decide', lesson:'learn.html#cleaning'
  },
  {
    id:'optic-purpose', topic:2, visual:'optic', skill:'Understand the optic',
    prompt:'What job does the optic do between the device and fiber?',
    choices:['Converts device data to light, and received light back to data.', 'Only strengthens light coming from the passive cassette.', 'Sends the visible red tracing light used by a VFL.'], correct:0,
    explanation:'The optic translates between electrical data and optical signals. A passive connects paths; a VFL is a separate red-light test tool.',
    reveal:'Device data ↔ optic ↔ light in fiber', lesson:'learn.html#optics'
  },
  {
    id:'tx-rx', topic:2, visual:'directions', interaction:'visual', skill:'Follow TX and RX',
    prompt:'You are at the local device. Which path is its RX?',
    choices:['A · light leaving the local device', 'B · light arriving at the local device'], correct:1,
    explanation:'RX receives light from the other end. TX sends light outward. The remote TX feeds the local RX; blue arrows illustrate invisible infrared light.',
    reveal:'B: remote TX → local RX', lesson:'learn.html#optics'
  },
  {
    id:'healthy-readings', topic:2, visual:'healthy', skill:'Compare readings with limits',
    prompt:'Use the limits shown. Which statement fits these readings?',
    choices:['RX must reach exactly zero before it is acceptable.', 'TX and RX must match each other.', 'Both are within these limits; they do not need to match.'], correct:2,
    explanation:'Each reading is compared with its own lower and upper limits. These powers are within the example range; also check required lanes and link status.',
    reveal:'Within range—not an exact-zero target', lesson:'learn.html#readings'
  },
  {
    id:'low-reading', topic:2, visual:'weak', skill:'Compare readings with limits',
    prompt:'RX is −4.20. The example allows −3.00 to +3.00. What does that mean?',
    choices:['Some light is present, but RX is below this allowed range.', 'It is acceptable because it is not −40.', 'It is too strong because 4.20 is greater than 3.00.'], correct:0,
    explanation:'−4.20 is more negative, so it is weaker than −3.00. Investigate why the received power is low; the reading alone does not locate the cause.',
    reveal:'Below the lower limit; cause still unknown', lesson:'learn.html#readings'
  },
  {
    id:'all-lanes', topic:2, visual:'lanes', interaction:'visual', skill:'Check every lane',
    prompt:'Which receive lane still needs a no-light check?',
    choices:['RX lane 1: +0.25 dBm', 'RX lane 2: +0.28 dBm', 'RX lane 3: −40 dBm', 'RX lane 4: +0.21 dBm'], correct:2,
    explanation:'Lane 3 still reports no light. The other lanes cannot prove that this lane works. Follow its mapped path and check the link status too.',
    reveal:'Lane 3: −40 needs investigation', lesson:'learn.html#readings'
  },
  {
    id:'direct-loop', topic:3, visual:'direct-loop', skill:'Interpret local loop results',
    prompt:'The approved direct optic loop passes. The restored link still fails. What next?',
    choices:['Mark the remote optic healthy because the local loop passed.', 'Extend the test to the next accessible passive using the mapped loop.', 'Replace the local optic before checking any connected fiber.'], correct:1,
    explanation:'The local optic passed this test. Extend outward through the fiber and connections you can reach. A direct loop does not test the long route or remote optic.',
    reveal:'Checked locally; extend the tested path', lesson:'learn.html#trace-loops'
  },
  {
    id:'passive-loop', topic:3, visual:'sections', interaction:'visual', skill:'Interpret local loop results',
    prompt:'Read the loop results. Which section should you investigate next?',
    choices:['A · local optic to CAS 1', 'B · CAS 1 to CAS 2, including its connections', 'C · beyond CAS 2 toward the remote device'], correct:1,
    explanation:'The direct loop and CAS 1 loop passed. The CAS 2 loop failed, so first verify that loop setup, then investigate the added span and its connections. This does not locate a break. Beyond CAS 2 is untested.',
    reveal:'B is suspect. Verify the loop setup, then isolate this span.', lesson:'learn.html#trace-loops'
  },
  {
    id:'vfl-setup', topic:3, visual:'vfl-setup', skill:'Use VFL observations',
    prompt:'Before connecting a VFL (red-light tester), what must you confirm about the fiber section you will trace?',
    choices:['Only the near end is disconnected; the far end can stay connected to an optic.', 'The VFL adapter fits; the far-end connection can remain unchecked.', 'Both ends are disconnected from active equipment, and the VFL adapter matches the connector.'], correct:2,
    explanation:'Check both ends of the section—not just the end in your hand. Disconnect them from active equipment under your site’s procedure, then use the matching VFL adapter. The VFL supplies its own red light; do not send it into an optic. Detect it using the approved method, never by looking into a fiber end.',
    reveal:'Both ends disconnected + matching adapter', lesson:'learn.html#vfl'
  },
  {
    id:'wrong-port', topic:3, visual:'wrong-port', skill:'Use VFL observations',
    prompt:'FIM expects Port 12. VFL light is detected at Port 13. What next?',
    choices:['Replace the optic because the light reached the wrong port.', 'Compare fiber labels, actual patching and the FIM record.', 'Update FIM to Port 13 immediately without checking the route.'], correct:1,
    explanation:'The observation and expected route disagree. Check the labels and actual path before deciding whether the patch or record needs correction.',
    reveal:'Observed 13 ≠ expected 12: verify the mapping', lesson:'patching.html#fim-path'
  },
  {
    id:'vfl-limits', topic:3, visual:'vfl-seen', skill:'Use VFL observations',
    prompt:'VFL light reaches the expected port. What still needs checking?',
    choices:['Optical loss and link health after restoring the mapped connection.', 'Nothing—the visible light proves every network lane is healthy.', 'Only the remote device; this proves all local fiber loss is acceptable.'], correct:0,
    explanation:'VFL supports continuity and mapping. It does not measure acceptable network-light loss. Use the appropriate loss test when needed, restore the path and recheck optic and link health.',
    reveal:'Path found. Loss and link health remain unverified.', lesson:'learn.html#vfl'
  }
];

export const roundQuestionIds = topic => questions.filter(question => question.topic === topic).map(question => question.id);

export function skillsFor(topic, answers) {
  const skills=new Map();
  for(const question of questions.filter(item=>item.topic===topic)) {
    if(!Object.hasOwn(answers,question.id)) continue;
    const correct=isCorrectAnswer(question,answers[question.id]);
    skills.set(question.skill,(skills.get(question.skill) ?? true) && correct);
  }
  return {
    checked:[...skills].filter(([,correct])=>correct).map(([skill])=>skill),
    review:[...skills].filter(([,correct])=>!correct).map(([skill])=>skill)
  };
}

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

export function rookieRank(scores) {
  const level = scores.filter(score => score >= 4).length;
  const numeral = ['','I','II','III','IV'][level];
  return {level, title:`Fiber Rookie${numeral ? ` ${numeral}` : ''}`, complete:level === topics.length};
}

const progressKey = 'fiber-quiz-progress-v1';
const emptyScores = () => topics.map(() => null);

export function loadQuizProgress(storage) {
  let raw;
  try { raw = storage.getItem(progressKey); }
  catch { return {scores:emptyScores(),canSave:false}; }
  let saved;
  try { saved = JSON.parse(raw); } catch { /* An unreadable record starts fresh. */ }
  const scores = topics.map((_,i) => {
    const score = saved?.scores?.[i];
    return Number.isInteger(score) && score >= 0 && score <= 5 ? score : null;
  });
  return {scores,canSave:true};
}

export function saveQuizProgress(storage, scores) {
  try { storage.setItem(progressKey,JSON.stringify({scores})); return true; }
  catch { return false; }
}

export function recordRoundProgress(scores, topic, answers) {
  const result = roundProgress(topic,answers);
  if (!result.complete || result.total !== 5) return scores;
  return scores.map((score,i) => i === topic ? Math.max(score ?? 0,result.correct) : score);
}
