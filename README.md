# Optic / fiber health

Live site: https://ironfaith.github.io/fiber-troubleshooting/

A small, dependency-free Yes/No troubleshooting diagram. Start with a direct optic loop or a loop at a passive. Each screen shows one action, a short test-path sketch where useful, and one result question. Branches preview the next action. The compact trail retains the chosen answers and connects them to the current action. Click a previous step or Back to revise a result; later answers are discarded. Restart clears the path; changing loop location starts a fresh path. Session storage preserves the selected mode and valid history.

A passive loop covers the optic plus the fiber and connections to its loop point. A failed passive loop leads to direct optic isolation, not an immediate optic-failure conclusion. A valid direct-loop failure leads to inspection/cleaning and a controlled known-good comparison. Passing optic tests lead to VFL tracing, route/polarity checks, and loss testing when needed. A VFL pass does not prove an acceptable optical loss budget. Test availability is not assumed: answer only after a valid site-approved test.

The site's workflow uses an LC loopback directly at the optic and an MMC loopback at the passive. Blue outgoing and green returning paths show TX returning to RX. The MMC leader / LC follower illustration shows one test pair within a group, not a pin map, fiber count or connector specification. Use the site's exact lane mapping and supported loopback/attenuation. CAS 1 Port 12 is the user's generic example, not an actual connection record.

Color-coded RX/TX badges illustrate the user's reported no-light reading (−40) and a good reading (+0.25 dBm). They are examples, not live readings or universal pass/fail thresholds; each lane must meet the applicable site and optic limits. The app contains no uploaded photos or real device IDs and does not connect to Cable Guy. It has no link to the separate EOD app.

Technical references: [Cisco optical troubleshooting](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html), [Fluke fiber troubleshooting](https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber), [US Conec MMC polarity](https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment).

## Development

Requires Node.js; no dependencies or build step.

```sh
npm run dev
npm run check
```

GitHub Pages serves `main` at the repository root. Runtime files are `index.html`, `styles.css`, `app.mjs`, `flow.mjs`, and `icon.svg`. Versioned runtime URLs avoid mixing older cached scripts with a new diagram.
