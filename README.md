# Fiber troubleshooting

A Yes/No decision diagram for a reported low-RX condition, adapted from the supplied Fiberline guide and the user's optic-health workflow.

Live site: https://ironfaith.github.io/fiber-troubleshooting/

Every answered question retains both branches. A colored elbow connects the selected branch to the next question. Use Back, an earlier question, or either earlier branch to revise an answer; downstream answers are discarded. Start over clears the path. Progress survives refresh in the same tab when session storage is available. No account, analytics, or backend is used.

Start with the optic health report at both active ends. Check seating and cleanliness, then require both optics to pass a valid reference-link or supported optical-loopback test before tracing the production fiber. Failed optics go to a controlled known-good comparison. Once the optics pass, trace disconnected active-to-passive fiber segments with a VFL, checking misports, polarity, passive connections, and tight bends. Repeat for each segment and affected strand. Confirm end-to-end compatibility, reconnect, and recheck health; persistent issues lead to measured loss testing. Unavailable tests remain unanswered, not assumed to pass or fail. The final result retains relevant evidence and uncertainty.

The application does not connect to Cable Guy or contain actual reports, hostnames, or port IDs. It does not infer good health from a badge color, positive TX telemetry, or a universal dBm threshold. The source snapshot and the public site remain separate.

Use the user's connection layout alongside the diagram: match local/remote device interfaces from the health report, use the expected channel as the intended route, and verify the actual graph or location list in the field. The guide refers to generic active ports, passive/CAS ports, strands, and jumper serials; supplied layout screenshots and identifiers are not published.

## Development

Requires Node.js. No dependencies or build step.

```sh
npm run dev
npm run check
```

GitHub Pages serves `main` at the repository root. Runtime files are `index.html`, `styles.css`, `app.mjs`, `flow.mjs`, and `icon.svg`.
