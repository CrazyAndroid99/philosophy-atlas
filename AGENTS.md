# Philosophy Atlas project conventions

- Before major changes, briefly explain the approach. After each task, summarize changes, preview commands, key files, one engineering concept, and a small exercise. Let the user attempt the exercise before giving its solution.
- Use Next.js App Router, strict TypeScript, and Cytoscape.js. Keep this milestone local: no database, authentication, paid APIs, or MCP in the application.
- Keep graph records separate from the renderer. `lib/graph.ts` defines the contract; `lib/demo-data.ts` supplies demo content. Renderer props must remain independent of the demo source.
- Centralize graph colors, fit padding, and zoom bounds in `lib/theme.ts`. Interface styling belongs in `app/globals.css`.
- Every edge needs a unique ID, valid endpoints, relationship type, explanation, evidence status, and a source array. Sourced edges require real reference records with locators. Never invent citations.
- Distinguish historical influence from editorial comparison. Retain explicit demo and evidence labels. Use illustrative for unsourced navigation groupings and inferred for editorial interpretations.
- Maintain keyboard alternatives to canvas interaction, responsive panels, visible focus states, and readable empty states.
- Expansion reveals local immediate neighbors and preserves active filters. Reset view fits the current graph without clearing discovery.
- Run production build, TypeScript checking, and relevant browser/data checks after meaningful changes. Report anything unverified. Do not add tests that simply restate styling.
- Avoid generated build artifacts and test screenshots in Git. Commit the npm lockfile for reproducible installs.
