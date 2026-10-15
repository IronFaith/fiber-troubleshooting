export const topics = ['Optic basics', 'Reading light levels', 'Testing the optic', 'Tracing the fiber'];

// Limits below are deliberately labeled training examples, not site specifications.
export const questions = [
  {
    id:'optic-purpose', topic:0, visual:'optic',
    prompt:'What is an optic, and what does it do?',
    choices:['A small module that turns device data into light, and received light back into data.', 'A connector that splits one light signal equally into every fiber.', 'A tool that only reports whether a fiber is dirty.'], correct:0,
    explanation:'Think of it as a translator. The device uses electrical signals; the optic sends and receives light so data can travel through fiber.',
    lesson:'learn.html#optics'
  },
  {
    id:'tx-rx', topic:0, visual:'link',
    prompt:'In an optic health report, what do TX and RX mean?',
    choices:['TX is the temperature; RX is the rack position.', 'TX is light leaving this optic; RX is light arriving at this optic.', 'TX and RX both show the light leaving this optic.'], correct:1,
    explanation:'TX = transmit = send. RX = receive = arrive. In normal service, the arriving light comes from the other optic through the mapped fiber path.',
    lesson:'learn.html#optics'
  },
  {
    id:'invisible-light', topic:0, visual:'optic',
    prompt:'You cannot see any glow from the fiber. Does that prove the optic is off?',
    choices:['Yes. Working optics always make visible red light.', 'Yes. A good fiber jacket should glow.', 'No. Network optic light is usually invisible infrared.'], correct:2,
    explanation:'Check the health report or an approved instrument. Your eyes cannot confirm infrared light. Never look into an optic or fiber end.',
    lesson:'learn.html#optics'
  },
  {
    id:'polarity', topic:0, visual:'link',
    prompt:'For this duplex fiber link, which connection lets the devices talk?',
    choices:['Local TX → remote RX, and remote TX → local RX.', 'Local TX → remote TX, and local RX → remote RX.', 'Both fibers into the same TX connection.'], correct:0,
    explanation:'A sender needs a receiver at the other end. Correct polarity means the light reaches the right receive path; follow the actual lane and port mapping.',
    lesson:'devices.html'
  },
  {
    id:'passive-role', topic:0, visual:'passive',
    prompt:'What does a passive, such as a CAS port, do with the optic’s light?',
    choices:['Makes a fresh light signal for the next section.', 'Connects the mapped fiber paths; it does not generate light.', 'Automatically fixes a weak signal.'], correct:1,
    explanation:'The optic produces the signal. The passive connects fibers along its route. Dirty or poor connections there can reduce the light that gets through.',
    lesson:'learn.html#path'
  },
  {
    id:'healthy-readings', topic:1, visual:'healthy',
    prompt:'Using the example limits shown, what do these TX and RX readings tell you?',
    choices:['They are bad because neither number is exactly zero.', 'RX is bad because it is lower than TX.', 'Both power readings are within the example limits.'], correct:2,
    explanation:'TX is sending and RX is receiving an acceptable amount of light in this example. They do not need to match or equal zero. Check every lane and the link status too.',
    lesson:'learn.html#readings'
  },
  {
    id:'no-light', topic:1, visual:'dark',
    prompt:'Cable Guy shows RX −40 in red, your site’s no-light indication. What do you know?',
    choices:['The report is not detecting usable incoming light; the cause still needs testing.', 'The local optic is definitely broken.', 'The fiber must be broken exactly in the middle.'], correct:0,
    explanation:'−40 is a symptom in your report, not a diagnosis. A dirty or loose connection, wrong path, polarity, severe loss, or missing source light can all need investigation.',
    lesson:'learn.html#readings'
  },
  {
    id:'low-reading', topic:1, visual:'weak',
    prompt:'This example needs RX at least −3.00 dBm. RX is −4.20 dBm. Is it within range?',
    choices:['Yes. A more negative number means stronger light.', 'No. −4.20 is below −3.00, so the received light is too weak for this example.', 'Yes. Only −40 can be a problem.'], correct:1,
    explanation:'More negative means less optical power: −4.20 is weaker than −3.00. dBm describes light power, not a percentage. Use the actual optic’s lower and upper limits on the job.',
    lesson:'learn.html#readings'
  },
  {
    id:'high-reading', topic:1, visual:'high',
    prompt:'This example allows RX up to +3.00 dBm. RX is +4.00 dBm. Is more light always better?',
    choices:['Yes. Any positive number is healthy.', 'Yes. Only low light matters.', 'No. This reading is above the example’s upper limit.'], correct:2,
    explanation:'Healthy power sits between the low and high limits. Too much light can overload a receiver. Neither zero nor +0.25 is a universal target for every optic.',
    lesson:'learn.html#readings'
  },
  {
    id:'all-lanes', topic:1, visual:'lanes',
    prompt:'Three RX lanes read near +0.25, but one reads −40. Can you call the whole optic healthy?',
    choices:['No. Investigate the dark lane and its mapped connection.', 'Yes. Most lanes are green.', 'Yes. Average the four numbers together.'], correct:0,
    explanation:'Each required lane needs its own check. One good lane does not prove the others work. Compare each TX and RX reading with its limits; then check link status and errors.',
    lesson:'learn.html#readings'
  },
  {
    id:'direct-loop', topic:2, visual:'direct-loop',
    prompt:'You want to test the local optic with the long fiber route excluded. What do you use here?',
    choices:['A VFL plugged into the live optic.', 'The correct LC loopback, returning this optic’s TX to its RX.', 'Any spare fiber connected to a nearby port.'], correct:1,
    explanation:'A direct loop gives the optic a short return path. Follow the approved procedure, lane mapping and required attenuation. Recheck its TX/RX readings and test result.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'passive-loop', topic:2, visual:'passive-loop',
    prompt:'A correct MMC loop at CAS 1 Port 12 passes. What has that test covered?',
    choices:['Every fiber and both active devices in the complete link.', 'Only the remote optic in the other building.', 'The local optic and the fiber/connections up to that loop point.'], correct:2,
    explanation:'The light went out from the local optic and came back from that passive. This supports that tested path working. Anything beyond the loop, including the remote optic, remains untested.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'failed-loop', topic:2, visual:'direct-loop',
    prompt:'The direct LC loop still fails. What is the best next step?',
    choices:['Verify the test setup, inspect/clean/reseat, then use a compatible known-good comparison.', 'Replace the long fiber route immediately.', 'Declare the optic bad after this one reading.'], correct:0,
    explanation:'A wrong or dirty loopback can also fail. Check the enabled port, mapping and test setup. If a valid test still fails, compare with known-good parts one change at a time.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'cleaning', topic:2, visual:'dirty',
    prompt:'Inspection shows dirt on a connector end face. What should you do?',
    choices:['Push it in harder to move the dirt.', 'Use the approved cleaning method, inspect again, then reconnect when clean.', 'Wipe it with your shirt and skip the recheck.'], correct:1,
    explanation:'A tiny speck can block or scatter light. Isolate safely, inspect, clean if needed, and inspect again. Use the approved tools for the connector and fully seat it.',
    lesson:'learn.html#cleaning'
  },
  {
    id:'known-good', topic:2, visual:'comparison',
    prompt:'With the same verified setup, the original optic repeatedly fails but a compatible known-good optic passes. What is the strongest suspect?',
    choices:['Every passive in the building.', 'The remote room’s rack number.', 'The original optic, based on this controlled comparison.'], correct:2,
    explanation:'Changing one thing at a time helps isolate the cause. Record the comparison and follow the replacement process. A passing local test still does not verify the whole remote path.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'accessible-path', topic:3, visual:'sections',
    prompt:'The local optic passes. The remote active device is in another building. What can you do next?',
    choices:['Work through reachable passives in order, recording the last passing point and first failing section.', 'Stop; no useful testing is possible locally.', 'Replace the local optic again without checking the fiber.'], correct:0,
    explanation:'Test what you can access. Check seating, dirt, allowed bend radius and FIM mapping along that section. A later failed loop makes the added section suspect; record any inaccessible parts.',
    lesson:'learn.html#loopbacks'
  },
  {
    id:'vfl-setup', topic:3, visual:'vfl',
    prompt:'How should you set up a VFL to trace a fiber section?',
    choices:['Send it into a connected live optic.', 'Isolate both ends from active equipment and attach it with the correct adapter.', 'Look directly into the other fiber end while it is on.'], correct:1,
    explanation:'A VFL is a separate red-light tracing tool. Follow site isolation and safe viewing procedures. Verify the source and adapter work before interpreting a missing-light result.',
    lesson:'learn.html#vfl'
  },
  {
    id:'wrong-port', topic:3, visual:'wrong-port',
    prompt:'The VFL’s red light is found at a different passive port from the one listed in FIM. What does that suggest?',
    choices:['The optic produces the wrong color.', 'The intended route is confirmed.', 'A mispatch or mapping mismatch that needs to be checked.'], correct:2,
    explanation:'You have traced a path, but it is not the expected destination. Check device, port, follower and MMC head labels against FIM before correcting the connection or record.',
    lesson:'patching.html#fim-path'
  },
  {
    id:'dark-section', topic:3, visual:'dark-section',
    prompt:'The source and adapter are verified, but no VFL light is detected at the expected next passive. What should you inspect?',
    choices:['That isolated section and its connections, including alternate mapped ports.', 'Only the remote optic, regardless of where the test stops.', 'A break at an exact distance you have not measured.'], correct:0,
    explanation:'Check dirt, seating, tight bends, damage and mapping. Missing light does not pinpoint a break. If the VFL result is inconclusive, use the appropriate loss or fault-location test.',
    lesson:'learn.html#vfl'
  },
  {
    id:'vfl-limits', topic:3, visual:'vfl-seen',
    prompt:'Red VFL light reaches the correct passive. Does that prove the fiber can carry the network signal within its loss limits?',
    choices:['Yes. Visible red light proves all optical health checks pass.', 'No. It supports continuity and mapping; loss and live optic health still need checking.', 'Yes. It also proves the remote optic is healthy.'], correct:1,
    explanation:'The VFL helps answer “does this path connect here?” It does not measure acceptable loss. Use the appropriate optical test equipment, restore the mapped link, and recheck health.',
    lesson:'learn.html#vfl'
  }
];

export function startAttempt(ids = questions.map(question => question.id)) {
  return { ids:[...new Set(ids)].filter(id => questions.some(question => question.id === id)), answers:{} };
}

export function recordAnswer(attempt, id, choice) {
  const question = questions.find(item => item.id === id);
  if (!attempt.ids.includes(id) || Object.hasOwn(attempt.answers,id) || !Number.isInteger(choice) || !question?.choices[choice]) return attempt;
  return { ...attempt, answers:{...attempt.answers,[id]:choice} };
}

export function resultsFor(attempt) {
  const answered = attempt.ids.filter(id => Object.hasOwn(attempt.answers,id));
  const missed = answered.filter(id => attempt.answers[id] !== questions.find(question => question.id === id).correct);
  return { total:attempt.ids.length, answered:answered.length, correct:answered.length-missed.length, missed, complete:answered.length === attempt.ids.length };
}
