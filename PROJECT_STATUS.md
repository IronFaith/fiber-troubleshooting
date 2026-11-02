# Project status

Updated: **2026-11-01**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md)

## Resume in another chat

Fetch the latest repository state and read AGENTS.md and this file before continuing.

- **Current objective:** Match the reference photo's device/port/serial/CAS visual pattern using original educational examples and no named systems.
- **Implemented locally:** Step 2 now shows an active device-port list beside a boxed connection path. The highlighted Device A port 5/1 has leg serial DEMO-L07; its mapped passive shows CAS 1, port 12 and MMC head SN.4827.0619. Onward boxes show fictional CAS/port/head values and a Device B endpoint. Leg and head serials are distinct fields. The optional full A/P build and connection path both respond to the three/six-passive choice. The five-step overview stays compact. Product names were removed from displayed content and translation catalogs; the old internal glossary anchor remains for compatibility. All four languages are updated.
- **Verification:** Focused behavior/locale checks passed (15 tests), then `npm run check` passed all 134 tests. Desktop browser checks confirmed the highlighted fields, keyboard jump to the mapped CAS and both three/six-passive views. Spanish, French and Arabic labels were checked on mobile, including 320px Arabic; full serials remain on one line without page overflow. The five-step overview remains intact, the rendered guide contains no named systems, and no browser errors were recorded. Publication is pending.
- **Latest verified application release:** [0a71f43](https://github.com/IronFaith/fiber-troubleshooting/commit/0a71f437eff5fb9abf0be878019b819adc65eaaa). Its [exact Pages deployment](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/41355911337) succeeded. SHA-256 comparisons confirmed all 18 changed runtime files served by Pages match the commit.
- **Remaining work / next action:** Publish the generic connection view, then verify the exact deployment and served files.
- **Blockers:** None for the connection visual. The separate serial-format question remains unresolved below; new DEMO values are explicitly illustrative placeholders.

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
