# Project status

Updated: **2026-10-20**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Add a dedicated Loopbacks exam and MMC loopback badge, and fix overlapping loop IR / VFL markings reported in mobile and desktop screenshots.
- **Accepted scope — 2026-10-20:** Five questions aligned with the existing looping lessons; a separate 4/5 badge using existing MMC artwork; preserve Apprentice I–IV and all existing scores. Add an IR/VFL display selector on the existing hardware path, keeping recorded results and conflicts. Include English, Spanish, French and Arabic.
- **Completed and live:** [`83bbcae`](https://github.com/IronFaith/fiber-troubleshooting/commit/83bbcaef27f130442bc5040d420b05fcea36f5ec) adds Loopbacks under Beginner and My progress, bringing the badge count to eight. Two taught scenarios have independent exam IDs; three new questions cover location, failed-setup validation and restored service. The badge requires a complete attempt; retries remain practice. The location question reveals the connected test diagram only after an answer.
- **Overlap fix:** Light view shows either blue/teal IR coverage or red dashed VFL coverage. All section findings remain; Normalize removes the tool and preserves evidence plus the view. Tool placement chooses the matching view. Cases and the view survive reload.
- **Browser verification:** Completed the loop exam at 5/5, saw the MMC badge in My progress and confirmed the existing Apprentice I rank stayed unchanged. Recreated local-optic/CAS-1 passes with conflicting A evidence and passing B VFL to CAS 2. IR view showed three IR overlays and zero VFL overlays; VFL view showed six VFL overlays and zero IR overlays. Recorded labels stayed identical; Normalize left zero loopback drawings. Reviewed desktop and 390-pixel mobile layouts, the earned badge, translated light controls and Arabic exam without page overflow. Reload retained the selected VFL view; no console errors.
- **Automated verification:** Narrow quiz/session/locale/coverage checks passed after correcting the new resume test to put a pending selection on a multiple-answer question. Final `npm run check` passed all 123 tests. Three focused tests cover loop grading/translations, separate scores/badge threshold and attempt resume. No new framework.
- **Compatibility:** Existing storage keys and draft IDs remain. Loop progress uses `fiber-loop-progress-v1`; optional `lightLayer` is added to the existing tab case record. Old cases default to a view matching their tool. Existing Apprentice and Intermediate behavior remains.
- **Remaining work / next action:** This milestone is complete. The exact Pages deployment succeeded and all 21 changed runtime files matched their committed bytes. No additional work is queued.
- **Blockers / missing input:** None.

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
| Evidence | Loop and VFL coverage remain separate. Findings identify what the evidence supports, possible causes and the next accessible test. Unknown sections and contradictory results stay visible. |
| Case continuity | Normalize changes the illustrated setup; it does not declare a repair. History retains earlier checks. Made a change · retest begins a fresh round in the same case. New case begins a separate investigation. |
| Languages | English, Spanish, French and Modern Standard Arabic. Physical port positions and identifiers keep their meaning when the language changes. |
| Progress and activity | Scores and badges are local to a browser, without accounts. The separate Cloudflare counter supplies shared visitor, completed-exam and estimated active-learning-time totals. |

## Recent completed updates

| Commit | Delivered change |
| --- | --- |
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

The dedicated loop exam, MMC badge and light-view fix are complete and verified live. No reproduced defect or publication task remains open for this milestone.

This is the current agreed work list; it does not assert that every page is defect-free. New course features or integrations need separate agreed scope.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
