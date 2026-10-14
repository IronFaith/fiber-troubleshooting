# Optic / fiber health

Live site: https://ironfaith.github.io/fiber-troubleshooting/

A small, dependency-free Yes/No troubleshooting diagram. Start with a direct optic loop or a loop at a passive. Each screen shows one action, a short test-path sketch where useful, and one result question. Branches preview the next action. The compact trail retains the chosen answers and connects them to the current action. Click a previous step or Back to revise a result; later answers are discarded. Restart clears the path; changing loop location starts a fresh path. Session storage preserves the selected mode and valid history.

A passive loop covers the optic plus the tested fiber and connections to its loop point. A passing local loop leads to the next accessible passive; the remote optic is never a prerequisite. When no further passive is reachable, restore the path and check local health. If the link still fails, trace only segments that can be isolated and accessed, then measure loss where possible. Inaccessible sections and the remote optic remain unverified, with a result that records the limit of local testing. A failed passive loop leads to direct optic isolation, not an immediate optic-failure conclusion. A valid direct-loop failure leads to inspection/cleaning and a controlled known-good comparison. A VFL pass does not prove an acceptable optical loss budget. Test availability is not assumed: answer only after a valid site-approved test.

The site's workflow uses an LC loopback directly at the optic and an MMC loopback at the passive. Blue outgoing and green returning paths show TX returning to RX. A moving arrow follows the light path, with a pause/play control; reduced-motion preferences start the animation paused, with Play available. The animation illustrates the test, not live telemetry. The MMC leader / LC follower illustration shows one test pair within a group, not a pin map, fiber count or connector specification. Use the site's exact lane mapping and supported loopback/attenuation. CAS 1 Port 12 is the user's generic example, not an actual connection record.

Color-coded RX/TX badges illustrate the user's reported no-light reading (−40) and a good reading (+0.25 dBm). They are examples, not live readings or universal pass/fail thresholds; each lane must meet the applicable site and optic limits. The app contains no uploaded photos or real device IDs and does not connect to Cable Guy. It has no link to the separate EOD app.

The fiber steps retain a schematic of the current isolated segment: disconnected optic, VFL source, expected port and alternate port. Answers distinguish untested, light seen, no light at the expected port, and light at another port. A missing-light result highlights the whole span and its connections without inventing a break location. Confirmed traces advance the segment count; the next section starts unverified. Back, answer edits and reloads reconstruct the picture from history. Segment numbers follow the user's trace sequence, not actual CAS identifiers; use the site layout for real port mapping. VFL shows continuity, not acceptable attenuation.

Technical references: [Cisco optical troubleshooting](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html), [Fluke fiber troubleshooting](https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber), [US Conec MMC polarity](https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment).

## Development

The top-right Learn menu links to each chapter. Chapter 1, Optics, fiber & light (`learn.html`), keeps related sections on one page, with optional jump links (including the old chapter hashes). Animated blue paths represent invisible optic IR; red paths represent VFL test light. A single play/pause control respects reduced-motion preferences. Interactive figures compare loop locations, clean/dirty/unseated connections, excessive bending and VFL outcomes. Returning to troubleshooting restores the existing session path. These are educational illustrations, not live measurements, literal jacket glow or site pin maps.

Requires Node.js; no dependencies or build step.

Chapter 2 (`devices.html`) explains the user-provided position `QNO5.5C.16f.17.30`: building QNO5, room 5C, row 16 front, rack 17, elevation 30. Tapping each component changes the location drawing. The elevation is labeled as supplied, without assuming rack-unit conventions or total rack height. A local/remote viewpoint control swaps the labels while keeping A TX → B RX and B TX → A RX fixed. The remote location is unspecified; drawings are examples, not a discovered topology. The position locates a device; the connection record supplies exact device and passive ports. Chapter 1 remains one chapter, and the existing troubleshooting flow is unchanged.

```sh
npm run dev
npm run check
```

GitHub Pages serves `main` at the repository root. Runtime files are `index.html`, `learn.html`, `devices.html`, `styles.css`, `app.mjs`, `flow.mjs`, `learning.mjs`, and `icon.svg`. Versioned runtime URLs avoid mixing older cached scripts with a new diagram.
