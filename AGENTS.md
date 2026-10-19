# Language coverage

- Supported learner languages: English, Spanish, and French.
- Every new or changed learner-facing item must ship in all supported languages in the same change. This includes lessons, diagrams and accessible labels, exams and feedback, glossary entries, simulations, troubleshooting guidance, navigation, and badges.
- Maintain matching English keys in `spanish.mjs` and `french.mjs`. Preserve numbered placeholders, equipment identifiers, serial numbers, port numbers, and technical values. Do not leave new material as an English-only fallback.
- Keep translations separate from equipment IDs, form values, grading, saved progress, and troubleshooting state. Switching language must preserve those values.
- Run the locale tests and check affected translated views at mobile width. Follow the existing lean development and testing scope; no additional framework is needed.
