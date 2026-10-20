# Project status

Updated: **2026-10-19**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Fix misaligned fibers, connectors and light in the troubleshooting hardware and VFL views.
- **Accepted scope — 2026-10-19:** Small visual corrections on the existing tool. Preserve the newer connected loop animation, earlier-setup labels after Normalize, section findings, all four languages and stacked mobile layout. No changes to evidence rules, stored cases or exams.
- **Completed and live:** [`54e25f0`](https://github.com/IronFaith/fiber-troubleshooting/commit/54e25f0b1f7e15e21c351187f236532145f1da16) aligns LC cable exits with their connector boots and light overlays, smooths cassette-to-cassette cable joins, centers VFL/MMC channels and clears overlapping VFL captions. Integrated upstream changes through 75f56d1 before publication. Final checks passed all 118 tests; desktop/mobile visuals and translated captions were inspected. The exact Pages deployment succeeded and all 10 changed application files matched their served contents.
- **Resolved defect:** UI-01 now uses wrapping captions within the hardware card; all four languages and both loop directions passed rendered checks.
- **Remaining work / next action:** This alignment milestone is complete. No implementation or blocker remains for this request; continue from this release when a new change is accepted.
- **Blockers / missing input:** None.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

The latest application release is [`54e25f0`](https://github.com/IronFaith/fiber-troubleshooting/commit/54e25f0b1f7e15e21c351187f236532145f1da16): **Align LC fibers, VFL channels and cassette cable joins**.

- The optic drawing and its animated light now use the same LC boot exit, including disconnected legs. The VFL output meets the LC tip precisely.
- Cassette-to-cassette bridges use one consistent cable jacket around the two channel paths, removing thick seams at card edges. Intermediate connections distinguish incoming and onward MMCs.
- The VFL close-up centers the MMC body, adapter and viewing face around its two channels. Desktop channel B is level with its destination; mobile fibers enter the connector boot. Head captions stay clear of result controls and cable bends.
- Preserved the latest connected-loop implementation and historical-setup labeling from upstream through [75f56d1](https://github.com/IronFaith/fiber-troubleshooting/commit/75f56d1e2ca2cccaf4bfc6ad4637ed28ec74ffe3). The earlier UI-01 wrapping fix remains in place.
- Verification after integration: `npm run check` passed all 118 tests and `git diff --check` passed. Rendered desktop loop/Normalize and mobile VFL views were inspected; Spanish mobile and French/Arabic caption fit were checked. No browser JavaScript errors were reported. No new learner wording or storage changes were introduced.
- [The exact application deployment succeeded](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39358073594). All 10 changed HTML/CSS/JavaScript files matched the live served contents. README and this handoff describe the final merged implementation.

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

No unresolved defect is recorded for the current milestone. UI-01 (the Spanish loop-status caption overflow at 390 × 844) is resolved by wrapping connection captions in a larger card area. Local and remote passing-loop views in English, Spanish, French and Arabic passed rendered caption checks in [browser verification](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39356294893).

This is the current agreed work list; it does not assert that every page is defect-free. New course features or integrations need separate agreed scope.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
