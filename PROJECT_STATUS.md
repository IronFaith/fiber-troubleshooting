# Project status

Updated: **2026-10-20**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Improve the lesson structure so beginners learn each action’s purpose, interpretation and limits before assessment.
- **Accepted scope — 2026-10-20:** The user approved the five-stage progression proposed in the course review. Reuse all 23 lessons and existing artwork, move the combined case last, add consistent objectives and unscored checks, and connect practice/exams. Preserve bookmarks, scores, badges and cases.
- **Completed locally:** Five stages with one visible lesson, selector, Previous/Next, optional contents and exact-lesson resume. All 23 lessons include a short objective and revealable explanation. Stage links target existing practice and exams; saved attempts remain available. New learner content is translated into Spanish, French and Arabic.
- **Verification:** Final `npm run check` passed all 129 tests. Browser checks covered all 23 lessons, cross-stage navigation, explanations, fanout selection/seating, flipped LC mapping, LLDP, polarity, loop comparison, the final case and stopping playback when leaving a lesson. Mobile explanations fit in English, Spanish, French and Arabic without page overflow. The exam handoff retained an existing 5/5 score and resumed its unfinished second question; the old Chapter 3 link opened FIM.
- **Latest verified application baseline:** Case findings release [`de62030`](https://github.com/IronFaith/fiber-troubleshooting/commit/de620306d0d621a2652c989d2625af1c876781e3), with 126 passing tests and exact Pages runtime verification.
- **Remaining work / next action:** Publish this verified milestone and confirm the exact Pages deployment and served runtime files.
- **Blockers / missing input:** No implementation blocker. Field-tool inventory remains unconfirmed; Case findings already states requirements and offers unavailable-tool/access guidance.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

The latest application release is [`de62030`](https://github.com/IronFaith/fiber-troubleshooting/commit/de620306d0d621a2652c989d2625af1c876781e3): **Clearer isolation findings with actionable checks and tool requirements**.

- Case findings identifies the tested area, source and strand; it explains the supporting observations and provides steps, required tools, result meanings and a missing-tool/access path. A new explicit unavailable-reference outcome cannot substitute for a passing test.
- Guidance was checked against [Fluke’s fiber troubleshooting documentation](https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber) and [Cisco’s inspect/clean/reinspect procedures](https://www.cisco.com/c/en/us/support/docs/optical/synchronous-digital-hierarchy-sdh/51834-cleanfiber2.html). LC/MMC and CAS arrangements remain this site’s conventions. Visible continuity, measured loss and restored service remain separate conclusions.
- Existing evidence rules, hardware geometry, Light view, scores, badges, counters and exams are preserved. A repair retest returns to the failed setup, including the first failing loop boundary from the tested end, while keeping earlier rounds in History. Runtime URL versions were refreshed for changed modules and their importers.
- [The exact deployment succeeded](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39412096880). SHA-256 comparisons confirmed that all 20 changed runtime files served by GitHub Pages match this application commit. Final `npm run check` passed all 126 tests. Browser checks covered remote B isolation between CAS 1 and CAS 2, missing inspection/spares/reference tools, fresh retest with eight earlier checks retained, reload, desktop and 390-pixel mobile layouts, all four languages and the live release.

## What is in place

| Area | Current behavior |
| --- | --- |
| Learn | Five stages covering equipment, connection identity, readings, tests, and isolation. All 23 lessons have objectives and unscored explanation checks; one lesson is visible at a time, with optional contents, reference, resume and practice/exam links. |
| Simulations and Exams | Interactive LC/MMC patching, selectable five-question Beginner and Intermediate exams, saved attempts, local best scores and Fiber Apprentice badges. Questions are supported by lesson material. |
| Troubleshooting | One test workspace with local/remote tools, editable CAS points, physical identity checks, inline results and compact findings. The path stacks on mobile. |
| Evidence | Loop and VFL coverage remain separate. Findings show the bounded area, source/strand, observations, possible causes, ordered steps, required tools, outcome meanings and unavailable-tool/access guidance. Unknown sections and contradictory results stay visible. |
| Case continuity | Normalize changes the illustrated setup; it does not declare a repair. History retains earlier checks. Made a change · retest in findings starts fresh evidence at the failed setup. New case begins a separate investigation. |
| Languages | English, Spanish, French and Modern Standard Arabic. Physical port positions and identifiers keep their meaning when the language changes. |
| Progress and activity | Scores and badges are local to a browser, without accounts. The separate Cloudflare counter supplies shared visitor, completed-exam and estimated active-learning-time totals. |

## Recent completed updates

| Commit | Delivered change |
| --- | --- |
| [`83bbcae`](https://github.com/IronFaith/fiber-troubleshooting/commit/83bbcaef27f130442bc5040d420b05fcea36f5ec) | Five-question Loopbacks exam, separate MMC badge at 4/5 and IR/VFL Light view selector. Apprentice scores preserved; 123 tests passed, exact Pages deployment succeeded and all 21 changed runtime files matched. |
| [`cc163b4`](https://github.com/IronFaith/fiber-troubleshooting/commit/cc163b4f9bf76477d95854fa53236556849dd171) | Purpose-first looping lesson, explicit test boundaries and follow-up, two-reason Beginner assessment and clearer added-span reasoning in all four languages. |
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

The Case findings change is complete and verified live. The lesson-structure review is complete; its proposed reorganization is awaiting the user's chosen scope. No course implementation is approved or in progress.

This is the current agreed work list; it does not assert that every page is defect-free. New course features or integrations need separate agreed scope.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
