# Course contents and quick reference

**Goal:** Make the existing course easy to follow and look up without losing position.
**Approved design:** The four-part plan in this conversation: contents, consistent chapter sequence, searchable visual quick reference, and tappable lesson terms.
**Architecture:** Keep vanilla HTML, CSS and ES modules. Course topic metadata drives contents and section order. A shared native dialog provides definitions across all pages. Existing anchors, chapter storage and exam scores stay compatible.

## One implementation milestone

- [x] Add grouped topic metadata and expandable contents to `course.mjs`; retain all existing anchors and chapter continuation.
- [x] Add `reference-data.mjs` for definitions, aliases, lesson destinations and sources; add `reference.mjs` for the accessible searchable drawer, shared illustrations and inline term buttons.
- [x] Integrate the menu and lesson controls through `learning.mjs`; use existing palette and hardware art, mobile layouts and keyboard focus.
- [x] Verify search aliases, filtering and lesson navigation with no more than three focused new tests. Exercise contents, reference, close/focus, mobile and saved chapter behavior in the browser.
- [x] Run `npm run check` after stabilization and review the diff. Result: 55 tests passed; desktop/mobile navigation, definitions, focus restoration and existing progress verified. Publication uses the existing GitHub Pages workflow.

## Invariants and review focus

- Keep all three chapters, existing simulations, exams and troubleshooting behavior.
- Distinguish site labels/examples from universal terminology and optic limits.
- Preserve position when closing reference; use Escape, focus restoration and keyboard-accessible controls.
- Cross-chapter links mount the destination before scrolling. Contents and browser history remain usable.
- Search handles case, whitespace, aliases and no results. Input is never interpreted as HTML.
- Avoid an overloaded mobile toolbar or horizontally overflowing reference diagrams.
