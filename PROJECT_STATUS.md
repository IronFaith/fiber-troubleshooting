# Project status

Updated: **2026-10-19**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Resume in another chat

Fetch the latest repository state, read AGENTS.md and this file, then consult the relevant README passages and code. Older plans remain historical references.

- **Current objective:** Consolidate the passing-loop animation onto the actual yellow fiber and hardware, with visibly joined LC/MMC cable ends and no duplicate lower light diagram.
- **Accepted scope — 2026-10-19:** The user's latest instruction supersedes the earlier separate evidence-rail layout. Keep mapped ports, source direction, recorded findings, motion controls and all four languages. After Normalize, a recorded historical setup is labeled as earlier; an installed tool shows its own actual connections and keeps earlier section findings. Continue automatically updating repository instructions/status whenever accepted preferences change.
- **In progress:** Branch `codex/hardware-loop-path` joins the hardware cords, draws the MMC/LC return on the actual loopback and removes the lower rails. Browser visual verification and final checks are pending; these changes are not live yet.
- **Open defect:** UI-01 was the narrow Spanish SVG caption overflow. Wrapping captions are included in this milestone and need rendered verification before marking it resolved.
- **Next action:** Inspect browser screenshots and physical cord joins, resolve any regressions, run the final repository check, publish the verified change and refresh this handoff with deployment evidence.
- **Blockers / missing input:** None.

Each future milestone must refresh this handoff with the latest objective, accepted scope, completed and verified work, work in progress, remaining defects, blockers or missing references, and the next agreed action.

## Current release

The latest application release is [`a98967d`](https://github.com/IronFaith/fiber-troubleshooting/commit/a98967d8f9594e517ae175ede937887ca1964319): **Keep loop animation clear of cassette visuals and maintain chat handoffs**.

- Removed the added overlay crossing the CAS grid. The connected TX-to-RX loop return stays on the evidence rails below desktop hardware cards; mobile returns join the lanes within their recorded section. Cassette grids, connector art and labels stay clear.
- Local and remote tests retain their direction, return point and evidence after Normalize or tool changes. VFL remains a separate red route; retests, conflicts and mapped-port changes still determine which loop evidence is supported. Existing four-language labels and saved state are preserved.
- Verification: final `npm run check` passed all 118 tests. [Browser verification](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39353077050) passed 52 scenarios at 1728, 1400 and 390 pixels, plus all four languages and motion controls. Checks establish that recorded loops meet without a gap, stay on their evidence rails and do not intersect cassette artwork. Screenshots of the user's normalized local-optic/CAS-1 passing state, mobile layout and combined loop/VFL results were inspected.
- [GitHub Pages deployment succeeded for the exact application commit](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39353360474). All 10 changed application files matched their served contents and the browser-verified version. The temporary browser workflow was removed before publication.
- Standing instructions now require automatic documentation updates for accepted instruction/decision changes and a maintained handoff so another chat can resume from the repository.

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
| [`a98967d`](https://github.com/IronFaith/fiber-troubleshooting/commit/a98967d8f9594e517ae175ede937887ca1964319) | Corrected the screenshot-reported overlay regression: connected loop returns stay in the evidence diagram and leave cassette artwork clear. Saved automatic instruction/status updates and the resumption handoff policy. |
| [`ebf8c8e`](https://github.com/IronFaith/fiber-troubleshooting/commit/ebf8c8ed3a4e66ea669e294680c45eaadf2239b8) | Connected passing-loop animation through mapped hardware, with the return to the tested optic restored on desktop and mobile. Earlier span evidence remains visible. |
| [`989b711`](https://github.com/IronFaith/fiber-troubleshooting/commit/989b711a7bc8d3cd1057e8373690289fc6b5a2a5) | Explicit female-to-male MMC mating detail at the CAS. |
| [`989caa8`](https://github.com/IronFaith/fiber-troubleshooting/commit/989caa8) | Findings show evidence, possible causes and a specific next check. Earlier same-strand VFL passes narrow the added section; remote loop failures suggest an appropriate next tool; conflicting loops remain available for rechecking. |
| [`9b503fd`](https://github.com/IronFaith/fiber-troubleshooting/commit/9b503fd) | Physical path confirmations and concise guidance share the test workspace. History and supporting details are optional, rather than permanent separate panels. |
| [`4c70e0a`](https://github.com/IronFaith/fiber-troubleshooting/commit/4c70e0a) | Cumulative loop/VFL evidence appears along the path, with a vertically stacked mobile layout. |

See the [commit history](https://github.com/IronFaith/fiber-troubleshooting/commits/main/) for earlier work. Commit messages record implementation; this page records the current meaning and remaining work.

## Outstanding work

### UI-01 — Spanish loop-status caption overflows a narrow mobile card

**Status:** Observed, not fixed. Next small UI correction; not part of this documentation change.

- Observed on 2026-10-19 at a 390 × 844 viewport, with Spanish selected and an MMC loop placed at CAS 1.
- The translated “Loop inserted · service fiber unplugged” status extends beyond the cassette card. The MMC mating detail itself fits.
- Reproduce: open Troubleshoot → choose Español → place an MMC loopback at CAS 1 → inspect the status beneath the cassette.
- Fix scope: let the status fit or wrap within its card without shrinking the entire path or moving the result controls into another panel.
- Acceptance: the complete caption remains readable within the card at narrow mobile widths; check the equivalent local/remote loop states in all four languages. Preserve the desktop layout and result-recording behavior.
- Relevant files: [troubleshoot-visuals.mjs](troubleshoot-visuals.mjs), [styles.css](styles.css), and the translation catalogs if wording needs adjustment.

No other unresolved defect was established by this documentation review; that is not a claim that the entire course has no defects. At the 2026-10-19 review, GitHub had no open issues or pull requests. This file is the current outstanding-work list; no separate tickets were created for this refresh.

## Boundaries to preserve

- The tool uses technician-entered observations. It does not read live equipment, query Cable Guy or determine an exact fault without evidence.
- VFL shows visible continuity/routing; optical-loss measurements and restored-link checks answer different questions. A single dark strand does not by itself prove ferrule damage.
- The site's MMC gender, optic orientation and port examples are confirmed conventions for these illustrations, not universal hardware specifications.
- Local progress does not sync across devices. The visitor counter approximates unique browser profiles, not unique people or physical devices. Counting and privacy details belong in [counter/README.md](counter/README.md).
- Accounts, live-report integrations and new curriculum are not queued by this document; future expansion needs a separate agreed scope.

## Keeping this current

For each accepted instruction or decision change, update AGENTS.md and this status automatically, including documentation-only milestones. For implementation milestones, refresh the relevant README description, add concise release evidence here, and move resolved issues out of Outstanding work with their fixing commit. Update the resumption handoff before concluding work, then commit and push the notes with the authorized milestone. Record any unpushed state or missing input if blocked. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
