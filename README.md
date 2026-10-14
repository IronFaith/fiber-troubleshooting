# Fiber troubleshooting

A Yes/No decision diagram for a reported low-RX condition, adapted from the supplied Fiberline guide and the user's optic-health workflow.

Live site: https://ironfaith.github.io/fiber-troubleshooting/

Every answered question retains both branches. A colored elbow connects the selected branch to the next question. Use Back, an earlier question, or either earlier branch to revise an answer; downstream answers are discarded. Start over clears the path. Progress survives refresh in the same tab when session storage is available. No account, analytics, or backend is used.

Start with RX at −40 or below its model-specific limit. Work from the far-end TX through its intended lane and fiber path into the local RX. The flow distinguishes routing, dirty/damaged interfaces, cable conditions, measured input power, source output, path loss, local optical loopback, and controlled patch/optic substitutions. Available tests have explicit alternative routes. The final result retains relevant evidence and uncertainty.

The application does not connect to Cable Guy or contain actual reports, hostnames, or port IDs. It does not infer good health from a badge color, positive TX telemetry, or a universal dBm threshold. The source snapshot and the public site remain separate.

## Development

Requires Node.js. No dependencies or build step.

```sh
npm run dev
npm run check
```

GitHub Pages serves `main` at the repository root. Runtime files are `index.html`, `styles.css`, `app.mjs`, `flow.mjs`, and `icon.svg`.
