# Project status

Updated: **2026-10-19**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md) · [Deployment history](https://github.com/IronFaith/fiber-troubleshooting/actions)

## Current release

The latest application release is [`989b711`](https://github.com/IronFaith/fiber-troubleshooting/commit/989b711a7bc8d3cd1057e8373690289fc6b5a2a5): **Show MMC female and male connectors mating at the CAS port**.

- The female fanout head and front male MMC meet at the selected CAS port. Unplugging shows a gap; a loopback replaces the onward connection; a reported VFL pass illuminates the exposed face.
- English, Spanish, French and Arabic include the clarified labels and accessible descriptions. Local and remote rack orientation is preserved.
- Verification: `npm run check` passed all 118 tests; desktop and translated mobile views were inspected. [GitHub Pages deployment succeeded](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39348505818), and all 17 changed application files matched their deployed contents.
- This documentation refresh changes no application behavior. It records the standing instructions, corrects stale README descriptions and establishes the outstanding-work list below.

## What is in place

### Pending release — connected passing-loop animation

- Restored the connected optic → mapped CAS ports → loopback → optic return animation lost when cumulative evidence replaced the manual diagram with separate span indicators.
- Local and remote routes follow their recorded source and return point; Normalize and tool changes preserve supported evidence. Conflicting or unrecorded tests do not draw a confirmed loop.
- [Browser verification](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/39350514842) passed 26 desktop/mobile, evidence, language and motion scenarios. Both halves meet without a gap; routes fit their rendered bounds. The four learner languages retain their existing labels and state.
- Final `npm run check` passed all 118 tests, including existing coverage, case history and locale checks.
- Exact GitHub Pages deployment verification is pending publication of this milestone.

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

For each completed milestone, update the relevant README description, add a concise release entry here, and move resolved issues out of Outstanding work with their fixing commit. Record new lasting decisions in AGENTS.md. Only label a release live after its exact deployment and affected files are verified. Keep old design plans as historical records, not current instructions.
