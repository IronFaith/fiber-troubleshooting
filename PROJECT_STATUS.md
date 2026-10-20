# Project status

Updated: **2026-10-20**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Make troubleshooting isolation clearer and usable: identify where to check, explain the evidence, and give short next steps with required tools and alternatives when tools or access are missing.
- **Accepted scope — 2026-10-20:** Improve Case findings within the existing workspace, using the current evidence engine. Preserve source/strand/round boundaries, conflicting results, hardware, exams, badges and the separate IR/VFL display. Include English, Spanish, French and Arabic.
- **Implemented:** Findings now lead with the bounded area, source and strand. They show supporting observations, possible causes, ordered steps, required tools and outcome meanings. An unavailable reference remains unresolved; unavailable inspection/spares lead to an appropriate comparison or test handoff. Copy findings includes the area and action plan.
- **Retest:** Made a change · retest is available directly in findings for failed VFL or loop tests. It starts a fresh round at the failed source, strand and boundary; earlier checks remain in History. Conflicting observations require a recheck rather than this repair reset.
- **Browser verification:** Tested remote-source B light at CAS 2 followed by darkness at CAS 1: findings identify CAS 1 ↔ CAS 2 and both observations. Exercised unavailable inspection/spare paths and confirmed retest returned to remote B at CAS 1 with eight earlier checks retained and no current passes. Tested a missing local reference, reload, and resuming inspection after a real reference result. Reviewed desktop and 390-pixel mobile views in all four languages, including translated source/endpoints/tools and Arabic; no page overflow.
- **Automated verification:** Final `npm run check` passed all 126 tests. Three new focused tests cover unavailable reference handling, same-strand/source section guidance and fresh retest/history behavior. Existing locale, evidence, exam and diagram checks pass.
- **Compatibility:** No storage-key changes or score/badge migrations. The new reference-unavailable outcome is stored in existing scoped comparison records. Current evidence remains separate from prior rounds; physical layouts and Light view behavior are unchanged.
- **Remaining work / next action:** Publish this application change and verify its exact Pages deployment and served files.
- **Blockers / missing input:** No blocker. A fixed field-tool inventory was not confirmed; each action states its requirements and provides an unavailable-tool/access path.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

The latest application release is [`83bbcae`](https://github.com/IronFaith/fiber-troubleshooting/commit/83bbcaef27f130442bc5040d420b05fcea36f5ec): **Dedicated loop exam, MMC badge and separate IR/VFL coverage views**.

- This builds on the purpose-first looping lesson in [`cc163b4`](https://github.com/IronFaith/fiber-troubleshooting/commit/cc163b4f9bf76477d95854fa53236556849dd171). The new exam, badge and screenshot overlap fix are described in the handoff above and README.
- Loop principles were checked against [Juniper’s physical-loopback documentation](https://www.juniper.net/documentation/us/en/software/junos/interfaces-ethernet/topics/topic-map/ethernet-fast-and-gigabit-loopback-testing.html) and [interface troubleshooting guidance](https://www.juniper.net/documentation/us/en/software/junos/interfaces-fundamentals/topics/topic-map/troubleshooting-interfaces.html). LC/MMC and CAS arrangements remain this site’s conventions.
- Existing evidence rules, hardware geometry, scores, Apprentice ranks, counters and Intermediate questions are preserved. The new display selector filters signal overlays without changing observations. Runtime URL versions were refreshed for the changed modules and their importers.
- [The exact deployment succeeded](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39407630875). SHA-256 comparisons confirmed that all 21 changed runtime files served by GitHub Pages match this application commit. Final checks passed all 123 tests; the final illustration-only feedback adjustment also passed syntax and browser checks.

## What is in place

| Area | Current behavior |
| --- | --- |
| Learn | Three connected chapters covering optics/light/testing, device communication and locations/LLDP, and FIM/patching. Optional contents and a visual quick reference support navigation. |
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

The Case findings change is implemented and locally verified. Its exact deployment and served-file verification are pending. No additional feature work is queued.

This is the current agreed work list; it does not assert that every page is defect-free. New course features or integrations need separate agreed scope.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
