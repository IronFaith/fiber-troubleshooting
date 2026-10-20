# Course progression implementation plan

Approved in chat: reuse the lessons in five stages, make their pattern consistent, move the combined case last, and link relevant practice/exams. Execute inline as one milestone under the lean project instructions.

- [x] Reorganize the existing 23 topic IDs into equipment, connection identity, readings, tests, and isolation stages. Show one topic at a time with a lesson selector and previous/next links. Keep old chapter URLs and saved positions mapped to their original starting topics.
- [x] Retain original lesson markup and artwork, initialize interactions after placing each topic in its new stage, and preserve motion controls. Add a short learning objective and unscored question with a revealable explanation to each topic.
- [x] Link stage practice and existing exams directly. Exam links highlight the requested exam without starting it or replacing a saved attempt.
- [x] Translate new text in Spanish, French and Arabic. Preserve identifiers, physical diagram directions, scores and badges.
- [x] Adapt course tests; add at most three focused tests for navigation, exam destinations and translated lesson support. Check actual diagrams, next/back, old links, checks, exam handoff and mobile layouts in the browser.
- [x] Run the narrow checks, one final `npm run check`, update affected documentation and runtime versions, and publish/verify the exact Pages release.

Implementation: `course.mjs` owns navigation; a small course data module holds stage/topic learning support. Existing `learning.mjs` templates provide the lesson bodies. No new framework or dependencies.

Completed in application commit `0ec2d71`; exact Pages deployment and all 24 changed runtime files verified. Final check: 129 passing tests. See PROJECT_STATUS.md for release evidence.
