# Project instructions

At the start of project work or when resuming in another chat, fetch the latest repository state and read this file and [PROJECT_STATUS.md](PROJECT_STATUS.md) before making changes. The [README](README.md) describes current behavior; [counter/README.md](counter/README.md) covers the separate Cloudflare counter. Direct user instructions take precedence over these project defaults.

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
- Teach the purpose of each action before assessing it. Beginner questions should check why a test is useful, where it applies, what its result supports, what remains untested and the next justified step. Use looping as the first focused improvement; keep lesson explanations and assessed concepts aligned.
- Keep the dedicated five-question Loopbacks exam under Beginner. Its separate badge reuses the existing MMC loopback artwork and requires 4/5 on a full attempt. Preserve the four Apprentice levels and their existing scores; missed-question practice does not change the Loopbacks best score.
- Keep troubleshooting in **Your test path**: tools, relevant port edits, physical identity checks, results and concise findings belong in that workspace. Avoid new permanent sidebars or separate case-detail panels.
- Use dedicated responsive test-path layouts: a compact horizontal view on desktop and a stacked mobile view with a straight cable channel alongside upright cassette maps and labels. Keep cables out of result controls; attach the loop result panel to its hardware card. The enlarged mobile MMC connection may turn vertically to follow the path without changing gender, source direction or port numbering. Recording a VFL result must preserve the current checking position. Support touch, keyboard, visible focus and reduced motion.
- Use **Normalize**, not Restore, for reconnecting the illustrated setup. Normalize preserves applicable recorded evidence and does not assert that the real link is healthy.
- Keep loop IR and VFL coverage visually separate with the **Light view** selector on the existing hardware diagram. Show one signal type at a time, retain all section results and conflicts, and preserve the view through Normalize and reload. Placing a test tool selects its matching light view.

## Troubleshooting and site conventions

- Assume an unknown fault in Find my problem. Keep Practice a known fault separate; tool placement and animation never create a real test result.
- Show the evidence, possible causes and a specific next check. Distinguish untested, passing, failed and conflicting evidence. Do not identify a failed ferrule or optic from a symptom alone.
- Keep results separated by source device, strand, viewing point and test round. Support both local and remote checks, but leave inaccessible equipment unverified. Preserve contradictory observations for rechecking rather than silently clearing them with a farther pass.
- Use one animation view on the actual yellow fiber, LC legs, MMC mating heads and loopback cord. Join the illustrated cable ends at their connectors; a passing test must visibly return from TX through the loopback to RX. Do not restore a separate lower light-path diagram or route signals across cassette port grids. Keep mapped ports and compact section results visible. Normalize must remove every LC/MMC loopback and reconnect the illustrated service fibers. Never recreate a loopback from a saved pass after Normalize. Keep saved results and supported checked-path highlighting; while a tool is installed, show its actual test connections and retain earlier section findings; retain observations without claiming a live repaired link. Conflicting and untested sections remain unconfirmed. Check rendered desktop and stacked mobile views, the user's normalized local-optic/CAS-1 case, source direction and exact cord joins before publishing.
- Use the last valid same-strand passing point to narrow the added section. VFL continuity does not certify acceptable infrared loss, optic health or restored service. Final link verification remains separate.
- Keep device/optic socket, LC follower/MMC head serial, CAS route/ports and strand mapping confirmations in the test panel. A passing test can still belong to the wrong path.
- The user's cassette layout is 32 ports: 1–16 on top and 17–32 below. At the rack CAS, the rear female MMC fanout head mates with the front male MMC onward connector. Mirror the remote rack as appropriate; do not assume all intermediate assemblies share these genders.
- This site's VFL kit attaches only to disconnected LC legs, not directly to CAS/MMC ports; no MMC VFL adapter is available. CAS ports and MMC ends are viewing points. Show disconnected service legs and substituted loopbacks clearly.
- In the site's optic example, the purple tab is above two adjacent vertical duplex LC pairs. Upright `5/1` is left and `5/5` is right; a physical flip reverses their displayed positions without changing the selected identifier.
- The site's `−40` no-light report and `+0.25 dBm` good-reading example are not universal thresholds. Use the applicable optic/site limits. Rack locations, serial examples and follower counts are illustrations, not invented FIM records or ferrule pin maps.
- Check primary technical documentation when adding new technical claims. Keep confirmed site conventions distinct from general fiber guidance. There is no live Cable Guy integration.

## Maintaining the project record

- Automatically record every accepted change to project instructions, user preferences, scope or lasting decisions in this file and PROJECT_STATUS.md, including instruction-only changes. Do this as part of the current milestone without waiting for the user to ask again. Revise superseded instructions so the current rules remain clear.
- Update PROJECT_STATUS.md in the same milestone when behavior, verified releases, known issues or agreed next work change. Include concise evidence and commit links for completed releases; do not mark deployment verified before it succeeds.
- Refresh affected README passages instead of only appending new descriptions that contradict older ones. Add lasting user decisions here so future work does not depend on conversation history.
- Keep a concise resumption handoff in PROJECT_STATUS.md: the latest user objective and accepted scope, completed work and verification, work still in progress, open defects, blockers or missing inputs, and the next agreed action. Record enough context to resume without the prior conversation; identify any reference material that is still unavailable.
- Before reporting a milestone complete or handing off authorized project work, verify the notes against the actual repository state, commit and push the relevant documentation to GitHub along with the work. If publication is blocked, record the local state and blocker and tell the user what is still unpushed. Instruction-only updates follow the documentation verification rule above.
- A resuming chat must use the current instructions and handoff, inspect relevant changes since the recorded release, and continue accepted work. Keep this project's record scoped to this repository; other projects retain their own instructions. Historical plans and inaccessible prior chats are not evidence of new approved scope.
- Separate observed defects, unverified questions and optional suggestions. Do not turn a proposed feature into approved work or claim an unperformed audit is complete.
- Keep creator/developer notes in these documents rather than adding explanatory clutter to learner pages. Contributor documentation is in English; learner-facing content follows the language rules below.

## Language coverage

- Supported learner languages: English, Spanish, French, and Modern Standard Arabic.
- Every new or changed learner-facing item must ship in all supported languages in the same change. This includes lessons, diagrams and accessible labels, exams and feedback, glossary entries, simulations, troubleshooting guidance, navigation, and badges.
- Maintain matching English keys in `spanish.mjs`, `french.mjs`, and `arabic.mjs`. Preserve numbered placeholders, equipment identifiers, serial numbers, port numbers, and technical values. Do not leave new material as an English-only fallback.
- Keep translations separate from equipment IDs, form values, grading, saved progress, and troubleshooting state. Switching language must preserve those values.
- Run the locale tests and check affected translated views at mobile width. Follow the existing lean development and testing scope; no additional framework is needed.
- Arabic uses right-to-left reading order. Preserve physical diagram coordinates, port numbering, numeric signs, and TX/RX directions; isolate technical text for display, never by changing identifiers or stored values.
