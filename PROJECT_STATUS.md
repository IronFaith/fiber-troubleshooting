# Project status

Updated: **2026-11-01**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md)

## Resume in another chat

Fetch the latest repository state and read AGENTS.md and this file before continuing.

- **Current objective:** Simplify fanout replacement so learners can see the overall actions before opening detailed visuals.
- **Completed and published:** Five numbered actions now each show one short instruction: find the damaged leg, find its MMC in MyPatch, save all twelve connections, replace and update, then check every link. Each step has a closed-by-default example or guidance disclosure. The existing fanout drawing, A/P boxes, highlighted lists, map, replacement guidance and order-independent checklist are retained on the separate page. All four languages are updated.
- **Verification:** Focused behavior/locale checks passed (15 tests), followed by `npm run check` with all 134 tests passing. Browser checks confirmed five visible headings and closed examples, keyboard expansion, correct fanout sizing after opening, the six-passive layout and passive-list link, checklist state through close/reopen, and restart. Desktop and mobile Spanish/Arabic layouts were inspected, with translated headings in all four languages and no French/Arabic page overflow (Arabic at 320px). No browser errors were recorded. The published page was refreshed and its five updated actions and closed examples verified.
- **Latest verified application release:** [0a71f43](https://github.com/IronFaith/fiber-troubleshooting/commit/0a71f437eff5fb9abf0be878019b819adc65eaaa). Its [exact Pages deployment](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/41355911337) succeeded. SHA-256 comparisons confirmed all 18 changed runtime files served by Pages match the commit.
- **Remaining work / next action:** The simplified-overview milestone is complete and live. No further overview changes are queued.
- **Blockers:** None for the simplified overview. The separate serial-format question remains unresolved below.

## Serial research retained

The user rejected the invented dotted serial convention. US Conec's July 2025 guide covers components and part numbers without specifying assembly serial formatting. Its collaborator SYLEX documents unique serial labels at both assembly ends, separately from ordering codes. These sources do not establish a universal prefix/suffix pattern. The earlier fictional `SN.4827.0619` remains unchanged; no replacement was selected. The actual cable-assembly manufacturer is still unidentified. Keep any eventual example invented; do not publish or search a potentially real workplace serial to resolve that question.

The preceding generic-content release [f80d36e](https://github.com/IronFaith/fiber-troubleshooting/commit/f80d36e14b8b94af23a73b7618d80b770ad979f4) was verified through [its exact Pages deployment](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/41348243392) and all 46 changed runtime files. Its generic records, fictional examples and order-independent checklist remain the baseline.

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
- [US Conec: MMC Product Solutions Guide, July 2025](https://www.usconec.com/media/nr1n3pm1/tn-1110_mmc-psg-rev_10.pdf): connector components and their part numbers; no assembly serial format was found in the reviewed text.
- [US Conec: MMC collaborators](https://www.usconec.com/collaborators): identifies SYLEX as a supplier of assemblies using US Conec MMC connectors.
- [SYLEX: MMC-to-LC Duralino fanout](https://www.sylex.sk/product/1x16f-mmc-to-1x16f-lc-16-fiber-duralino-fanout/): unique serial labels at both ends, separately listed ordering codes. This particular product is 16-fiber; it is a reference for assembly identification, not evidence for the course's illustrative twelve-leg arrangement. Link to public documentation without copying its drawings or treating publication as a reuse license.

## Maintaining this record

Refresh this handoff, AGENTS.md and relevant README passages for accepted changes. Verify claims against the repository and commit/push the notes with the authorized work. Record deployment evidence only after checking the exact commit and served files. Historical plans are not new scope.
