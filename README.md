# Fiber troubleshooting

A simple Yes/No decision diagram for fiber troubleshooting, adapted from the supplied Fiberline guide.

Live site: https://ironfaith.github.io/fiber-troubleshooting/

Each question shows both branches and previews their next step. The chosen path remains visible. Use Back or select an earlier question to revise an answer; Start over clears the path. The current path survives refresh in the same tab using session storage when available. No account, analytics, or backend is used.

The guide covers inspection and cleaning, local transmit power, optical loopback, routing, continuity, loss, segment comparisons, remote checks, and final verification. Equipment-specific limits and test approval come from the site procedure. Unsupported tests stay unverified; escalation does not claim a definitive fault.

## Development

Requires Node.js. No dependencies or build step.

```sh
npm run dev
npm run check
```

GitHub Pages serves `main` at the repository root. Runtime files are `index.html`, `styles.css`, `app.mjs`, `flow.mjs`, and `icon.svg`.
