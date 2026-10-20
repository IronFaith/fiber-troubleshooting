# Project status

Updated: **2026-10-20**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Clean up the troubleshooting diagram with dedicated desktop and mobile layouts, based on the user's two screenshots.
- **Accepted scope — 2026-10-20:** Keep the existing workflow and evidence. Desktop uses compact horizontal cards; mobile uses a straight cable channel beside stacked cards, with upright cassette maps and vertically arranged enlarged MMC connections. Keep cables out of result controls and retain Normalize behavior.
- **Implemented locally:** Responsive geometry, attached result panels, calmer card styling, direct remote LC cable entry on desktop and removal of idle tool-handle outlines. A reproduced dual-source defect is fixed: when both ends passed at one CAS, the animation must follow the currently installed loop's source.
- **Browser verification:** 320-pixel French/Arabic/Spanish and 390-pixel English mobile views have no page overflow or clipped hardware captions; 1024/1440-pixel desktop and one/four-CAS paths fit or scroll within the map. Normalize removed all loopbacks and retained recorded passes. VFL result recording retained its scroll position, and no console errors were reported.
- **Automated verification:** `npm run check` passed all 120 tests. One focused regression was added for the reproduced dual-source animation defect; existing Normalize coverage remains passing. `git diff --check` passed.
- **Remaining work / next action:** Publish the application commit and verify its exact Pages deployment and affected served files. The prior live application release remains listed below until that verification completes.
- **Blockers / missing input:** None.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

The latest application release is [`90b5abc`](https://github.com/IronFaith/fiber-troubleshooting/commit/90b5abc61ff1f753090eab979781461d89a44d79): **Remove loopback illustrations when the path is normalized**.

- Root cause: the renderer replaced a plugged connection with a historical loop whenever a supported earlier pass existed. Normalize had already reconnected the stored setup, but the illustration overrode it.
- Hardware now follows the actual connection state. An installed loop remains visible after recording Pass; Normalize removes it and draws the reconnected LC/MMC service path. Pass labels, recorded coverage, history and findings remain available.
- Applies to local and remote LC/MMC loops, desktop and stacked mobile. Existing translated connection labels are reused in all four languages. No evidence rules, storage formats or exam behavior changed.
- Verification: one focused regression checks installed-tool visibility, removal after Normalize and preserved history/coverage for both ends and both tool types. `npm run check` passed all 119 tests; `git diff --check` passed. Desktop and 390-pixel mobile browser checks showed no loopback after Normalize and retained the CAS pass and light highlighting; no JavaScript errors were reported.
- [The exact deployment succeeded](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39358897326). All four changed application files matched the live site. AGENTS.md and README.md now require current-setup drawings after Normalize.

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
