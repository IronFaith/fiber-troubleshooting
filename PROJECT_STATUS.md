# Project status

Updated: **2026-11-01**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md)

## Resume in another chat

Fetch the latest repository state and read AGENTS.md and this file before continuing.

- **Current objective:** Simplify the active/passive build into familiar connected boxes inside the fanout simulation.
- **Accepted scope:** Add a horizontal Device A/B route with A active-leg counts and P passive-MMC counts, the 192 ÷ 12 = 16 example, three/six-passive selection and the mapped passive highlighted. Preserve the five-step guide, generic examples, order-independent checklist, existing practice and saved progress. Ship all four languages together.
- **Implemented locally:** Step 2 displays A boxes with 192/192 legs and P boxes with 16/16 MMCs. The counts mean patched / required; the diagram is a fully patched example. One highlighted passive links to the demo MMC, whose twelve legs are the replacement scope. Mobile uses horizontal scrolling to preserve device-to-device order.
- **Verification:** Focused behavior/locale checks passed (15 tests), followed by `npm run check` with all 134 tests passing. Browser checks covered three/six-passive routes, unchanged numeric counts, keyboard scrolling, all four languages and 390/320px layouts without page overflow or browser errors. Missing translations for the existing Passive label and Arabic equation ordering were corrected and rechecked. Publication is pending.
- **Latest verified application release:** [f80d36e](https://github.com/IronFaith/fiber-troubleshooting/commit/f80d36e14b8b94af23a73b7618d80b770ad979f4). Its [exact Pages deployment](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/41348243392) succeeded. SHA-256 comparisons confirmed all 46 changed runtime files served by Pages match the commit. Live checks passed for all four languages, including leg-first checklist use, restart, translated headings and quiz text, with no page errors or horizontal overflow. Production counter requests were intercepted during browser verification.
- **Remaining work / next action:** Publish the block diagram and verify its exact Pages deployment and served files.
- **Blockers:** None known.

## Boundaries and retained behavior

- The checklist accounts for the head and all legs in any order. It does not perform real work, delete records, enforce software sequencing or certify link health.
- Port names do not define physical positions. Fictional practice tasks supply the position map separately and keep their existing correct answers and IDs.
- No-signal status is an observation; numeric values must be interpreted using reporting range and installed-transceiver limits. Course limits are fictional.
- All 23 lessons remain open in five stages. Existing lesson URLs, glossary IDs, scores, badges and saved attempts remain compatible; legacy internal identifiers are retained where needed.
- Troubleshooting retains source/strand evidence, conflicts, test history, Normalize behavior and unverified inaccessible equipment. No live equipment or record service is connected.
- The existing visitor counter and privacy behavior are outside this milestone and unchanged. See counter/README.md.
- This is a content revision, not legal clearance. No agreement, workplace screenshot or private source document is included. Historical repository copies and previous deployments are outside the approved cleanup scope; editing the current site does not erase them.

## Public technical basis

- [FOA: project documentation](https://www.thefoa.org/tech/ref/OSP/design.html): record cable/fiber identities, connections and test results and maintain documentation.
- [Cisco: optical troubleshooting](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html): interpret optical readings using the transceiver’s thresholds and test evidence.
- [US Conec: MMC connectors](https://www.usconec.com/featured-products/mmc-connector-solutions/performance): public connector characteristics. Original course drawings are schematic; actual assembly specifications govern.

## Maintaining this record

Refresh this handoff, AGENTS.md and relevant README passages for accepted changes. Verify claims against the repository and commit/push the notes with the authorized work. Record deployment evidence only after checking the exact commit and served files. Historical plans are not new scope.
