# Project status

Updated: **2026-10-20**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Make exams check understanding of lessons and the purpose of actions, starting with the looping concepts beginners find difficult.
- **Accepted scope — 2026-10-20:** Explain why to loop, where to loop, what each location includes, what passing/failing supports and what remains untested. Align the existing Beginner loop questions and feedback with that lesson. Preserve five-question exams, earned scores and badges; include all four learner languages.
- **Implemented:** Chapter 1 now introduces loop purpose before the diagrams, compares direct LC and passive MMC scope, explains the direct-failure response and restored-link checks, and connects each new loop location to the added test section. The Beginner exam asks for both supported reasons to loop and interprets a failed added span. Its diagram uses Port 28 rather than the lesson’s Port 12 and reserves the suspect-section label for feedback.
- **Browser verification:** English lesson and exam feedback reviewed at desktop width; Spanish, French and Arabic lesson and loop-question text checked at 390 pixels without page overflow. An incomplete loop-purpose answer was marked for review; both correct reasons scored correctly. Reload resumed the attempt; language switching preserved both selected answers. No console errors were reported.
- **Automated verification:** The focused quiz/session/level/locale/course checks and final `npm run check` passed; all 120 existing tests pass. No new test framework or tests were needed for these content changes.
- **Compatibility:** `loop-purpose` replaces the old single-answer `direct-loop` question. Unfinished Narrow down the problem drafts using the old ID are intentionally discarded; saved scores and badges remain. Other valid exam drafts still resume.
- **Remaining work / next action:** Commit and publish this milestone, then verify the exact GitHub Pages deployment and served runtime files. Further lesson/exam expansions are not part of this milestone.
- **Blockers / missing input:** None.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

**Loop purpose and beginner comprehension** is verified locally and awaiting deployment verification. The prior verified application release is [`4051394`](https://github.com/IronFaith/fiber-troubleshooting/commit/4051394438a9c46fbc79bb747252da0ff616492f), the responsive troubleshooting layout.

- The new lesson and assessments are described in the handoff above and the README. The standing instruction is now to teach an action’s purpose and evidence limits before testing them.
- Loop principles were checked against [Juniper’s physical-loopback documentation](https://www.juniper.net/documentation/us/en/software/junos/interfaces-ethernet/topics/topic-map/ethernet-fast-and-gigabit-loopback-testing.html) and [interface troubleshooting guidance](https://www.juniper.net/documentation/us/en/software/junos/interfaces-fundamentals/topics/topic-map/troubleshooting-interfaces.html). LC/MMC and CAS arrangements remain this site’s conventions.
- Existing troubleshooting evidence, hardware geometry, saved cases, counters and Intermediate questions are unchanged. Changes in their importing modules only refresh versioned translation dependencies.

## What is in place

| Area | Current behavior |
| --- | --- |
| Learn | Three connected chapters covering optics/light/testing, device communication and locations/LLDP, and FIM/patching. Optional contents and a visual quick reference support navigation. |
| Simulations and Exams | Interactive LC/MMC patching, selectable five-question Beginner and Intermediate exams, saved attempts, local best scores and Fiber Apprentice badges. Questions are supported by lesson material. |
| Troubleshooting | One test workspace with local/remote tools, editable CAS points, physical identity checks, inline results and compact findings. The path stacks on mobile. |
| Evidence | Loop and VFL coverage remain separate. Findings identify what the evidence supports, possible causes and the next accessible test. Unknown sections and contradictory results stay visible. |
| Case continuity | Normalize changes the illustrated setup; it does not declare a repair. History retains earlier checks. Made a change · retest begins a fresh round in the same case. New case begins a separate investigation. |
| Languages | English, Spanish, French and Modern Standard Arabic. Physical port positions and identifiers keep their meaning when the language changes. |
| Progress and activity | Scores and badges are local to a browser, without accounts. The separate Cloudflare counter supplies shared visitor, completed-exam and estimated active-learning-time totals. |

## Recent completed updates

| Commit | Delivered change |
| --- | --- |
| [`4051394`](https://github.com/IronFaith/fiber-troubleshooting/commit/4051394438a9c46fbc79bb747252da0ff616492f) | Dedicated portrait cable channel and compact desktop path, attached result panels, aligned remote LC entry and correct installed-loop animation when both directions passed. |
| [`90b5abc`](https://github.com/IronFaith/fiber-troubleshooting/commit/90b5abc61ff1f753090eab979781461d89a44d79) | Normalize removes LC/MMC loopback drawings, reconnects service fibers and retains recorded passes and checked-path highlighting. |
| [`54e25f0`](https://github.com/IronFaith/fiber-troubleshooting/commit/54e25f0b1f7e15e21c351187f236532145f1da16) | Precise LC/VFL cable joins, centered MMC channels and viewing faces, consistent cassette bridge thickness and unobstructed translated captions. |
| [`b159a34`](https://github.com/IronFaith/fiber-troubleshooting/commit/b159a342af390256ad90a4a9de30c808ce8e8066) | Connected yellow hardware cords carry the passing-loop animation; removed duplicate lower light rails, preserved mapped ports and section findings, and resolved UI-01 in all four languages. |
| [`a98967d`](https://github.com/IronFaith/fiber-troubleshooting/commit/a98967d8f9594e517ae175ede937887ca1964319) | Corrected the screenshot-reported overlay regression: connected loop returns stay in the evidence diagram and leave cassette artwork clear. Saved automatic instruction/status updates and the resumption handoff policy. |
| [`ebf8c8e`](https://github.com/IronFaith/fiber-troubleshooting/commit/ebf8c8ed3a4e66ea669e294680c45eaadf2239b8) | Connected passing-loop animation through mapped hardware, with the return to the tested optic restored on desktop and mobile. Earlier span evidence remains visible. |
| [`989b711`](https://github.com/IronFaith/fiber-troubleshooting/commit/989b711a7bc8d3cd1057e8373690289fc6b5a2a5) | Explicit female-to-male MMC mating detail at the CAS. |
| [`989caa8`](https://github.com/IronFaith/fiber-troubleshooting/commit/989caa8) | Findings show evidence, possible causes and a specific next check. Earlier same-strand VFL passes narrow the added section; remote loop failures suggest an appropriate next tool; conflicting loops remain available for rechecking. |
| [`9b503fd`](https://github.com/IronFaith/fiber-troubleshooting/commit/9b503fd) | Physical path confirmations and concise guidance share the test workspace. History and supporting details are optional, rather than permanent separate panels. |
| [`4c70e0a`](https://github.com/IronFaith/fiber-troubleshooting/commit/4c70e0a) | Cumulative loop/VFL evidence appears along the path, with a vertically stacked mobile layout. |

See the [commit history](https://github.com/IronFaith/fiber-troubleshooting/commits/main/) for earlier work. Commit messages record implementation; this page records the current meaning and remaining work.

## Outstanding work

The looping content and assessment update is implemented and locally verified. Publication verification remains pending. No reproduced application defect remains open for this milestone.

This is the current agreed work list; it does not assert that every page is defect-free. New course features or integrations need separate agreed scope.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
