# Project status

Updated: **2026-11-01**. This is a maintained snapshot, not an automatic health monitor.

[Live course](https://ironfaith.github.io/fiber-troubleshooting/) · [Standing instructions](AGENTS.md) · [Current behavior](README.md) · [Counter operations](counter/README.md)

## Resume in another chat

Fetch the latest repository state and read AGENTS.md and this file before continuing.

- **Current objective:** Ground realistic fictional MMC assembly labels in public manufacturer references. The user rejected the invented dotted format and requested research from the MMC manufacturer.
- **Research completed:** US Conec's July 2025 MMC product guide covers connector specifications, components and part numbers; its searchable text does not specify assembly serial formatting. US Conec lists SYLEX as an MMC assembly collaborator. SYLEX's public MMC-to-LC fanout product page explicitly identifies unique serial labels at both assembly ends. Its ordering codes are separate from unique serials. These sources do not establish a universal prefix/suffix pattern.
- **Current application:** The earlier invented `SN.4827.0619` remains in the course, identified as fictional. This research update changes documentation only; no replacement serial has been selected or published. The dotted convention is no longer a standing preference. The connected A/P boxes, five-step guide and mapping checklist remain unchanged.
- **Application verification from the preceding release:** Focused behavior/locale checks passed (15 tests), followed by `npm run check` with all 134 tests passing. Learn and Simulations displayed the serial at 320px in all four languages, without page overflow or browser errors. English and Arabic hardware-label screenshots were inspected.
- **Latest verified application release:** [9b76627](https://github.com/IronFaith/fiber-troubleshooting/commit/9b76627bab0f8ca7869f349cd1bcdf4d8ca83dce). Its [exact Pages deployment](https://github.com/IronFaith/fiber-troubleshooting/actions/runs/41348825560) succeeded. SHA-256 comparisons confirmed all 35 changed runtime files served by Pages match the commit.
- **Remaining work / next action:** Public-reference research is complete. An exact supplier-specific format remains unverified; identify the cable-assembly manufacturer if that format is required. Keep any eventual example invented, and distinguish source-backed labeling principles from a fictional identifier.
- **Missing input:** The manufacturer of the user's particular cable assembly is not identified. The connector brand alone does not identify that supplier. Do not publish or search a potentially real workplace serial to resolve this.

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
