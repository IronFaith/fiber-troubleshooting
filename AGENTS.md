# Project instructions

Read [PROJECT_STATUS.md](PROJECT_STATUS.md) for the latest verified release and outstanding work. The [README](README.md) describes current behavior; [counter/README.md](counter/README.md) covers the separate Cloudflare counter. Direct user instructions take precedence over these project defaults.

## Scope and workflow

- Treat the existing static HTML, CSS and JavaScript modules as the stable baseline. Make the smallest change that delivers the requested result; do not introduce a framework, broad redesign or extra roadmap work without approval.
- Batch related edits into one milestone and commit. On "continue", "resume" or "proceed", continue the accepted work rather than restarting planning.
- Do not spawn subagents or independent reviewers unless the user explicitly requests delegation or parallel work. Perform a concise local self-review instead.
- Preserve existing behavior, lesson links, equipment identifiers, saved scores, badges and cases. Keep storage migrations compatible where possible; document intentional invalidation.
- Reuse existing tests. Add at most three focused tests per feature unless a reproduced regression or security issue justifies more. Do not add source-string or implementation-mirroring tests for cosmetic changes.
- After edits stabilize, run the narrowest relevant check, then one final `npm run check` for application changes. For documentation-only changes, verify claims, local links and the diff; no application test rerun is needed.
- Keep updates concise and report material decisions, blockers and results. Do not create extra approval checkpoints for already authorized work.
- Publish authorized site updates through `main` on GitHub Pages. Verify the exact commit's deployment and affected served files before claiming an update is live. The Cloudflare Worker is deployed separately; preserve its existing storage and totals.

## Product and interface decisions

- Use the Fiber Optics Fundamentals identity and creator credit Enrique Villalobos. Keep the separate EOD application unlinked.
- Keep lessons visual with short explanations, optional contents and quick definitions. Avoid a large contents block before the learning material or duplicate navigation.
- Keep interactive patching practice in Simulations and assessments under Exams. Teach every concept before testing it. Five-question exams and Fiber Apprentice I–IV are learning progress, not field certifications.
- Keep troubleshooting in **Your test path**: tools, relevant port edits, physical identity checks, results and concise findings belong in that workspace. Avoid new permanent sidebars or separate case-detail panels.
- Stack the test path on mobile so its continuity can be followed by scrolling. Recording a VFL result must preserve the current checking position. Support touch, keyboard, visible focus and reduced motion.
- Use **Normalize**, not Restore, for reconnecting the illustrated setup. Normalize preserves applicable recorded evidence and does not assert that the real link is healthy.

## Troubleshooting and site conventions

- Assume an unknown fault in Find my problem. Keep Practice a known fault separate; tool placement and animation never create a real test result.
- Show the evidence, possible causes and a specific next check. Distinguish untested, passing, failed and conflicting evidence. Do not identify a failed ferrule or optic from a symptom alone.
- Keep results separated by source device, strand, viewing point and test round. Support both local and remote checks, but leave inaccessible equipment unverified. Preserve contradictory observations for rechecking rather than silently clearing them with a farther pass.
- Use the last valid same-strand passing point to narrow the added section. VFL continuity does not certify acceptable infrared loss, optic health or restored service. Final link verification remains separate.
- Keep device/optic socket, LC follower/MMC head serial, CAS route/ports and strand mapping confirmations in the test panel. A passing test can still belong to the wrong path.
- The user's cassette layout is 32 ports: 1–16 on top and 17–32 below. At the rack CAS, the rear female MMC fanout head mates with the front male MMC onward connector. Mirror the remote rack as appropriate; do not assume all intermediate assemblies share these genders.
- This site's VFL kit attaches only to disconnected LC legs, not directly to CAS/MMC ports; no MMC VFL adapter is available. CAS ports and MMC ends are viewing points. Show disconnected service legs and substituted loopbacks clearly.
- In the site's optic example, the purple tab is above two adjacent vertical duplex LC pairs. Upright `5/1` is left and `5/5` is right; a physical flip reverses their displayed positions without changing the selected identifier.
- The site's `−40` no-light report and `+0.25 dBm` good-reading example are not universal thresholds. Use the applicable optic/site limits. Rack locations, serial examples and follower counts are illustrations, not invented FIM records or ferrule pin maps.
- Check primary technical documentation when adding new technical claims. Keep confirmed site conventions distinct from general fiber guidance. There is no live Cable Guy integration.

## Maintaining the project record

- Update PROJECT_STATUS.md in the same milestone when behavior, verified releases, known issues or agreed next work change. Include concise evidence and commit links for completed releases; do not mark deployment verified before it succeeds.
- Refresh affected README passages instead of only appending new descriptions that contradict older ones. Add lasting user decisions here so future work does not depend on conversation history.
- Separate observed defects, unverified questions and optional suggestions. Do not turn a proposed feature into approved work or claim an unperformed audit is complete.
- Keep creator/developer notes in these documents rather than adding explanatory clutter to learner pages. Contributor documentation is in English; learner-facing content follows the language rules below.

## Language coverage

- Supported learner languages: English, Spanish, French, and Modern Standard Arabic.
- Every new or changed learner-facing item must ship in all supported languages in the same change. This includes lessons, diagrams and accessible labels, exams and feedback, glossary entries, simulations, troubleshooting guidance, navigation, and badges.
- Maintain matching English keys in `spanish.mjs`, `french.mjs`, and `arabic.mjs`. Preserve numbered placeholders, equipment identifiers, serial numbers, port numbers, and technical values. Do not leave new material as an English-only fallback.
- Keep translations separate from equipment IDs, form values, grading, saved progress, and troubleshooting state. Switching language must preserve those values.
- Run the locale tests and check affected translated views at mobile width. Follow the existing lean development and testing scope; no additional framework is needed.
- Arabic uses right-to-left reading order. Preserve physical diagram coordinates, port numbering, numeric signs, and TX/RX directions; isolate technical text for display, never by changing identifiers or stored values.
