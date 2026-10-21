# Philosophy Atlas

A working Next.js + TypeScript + Cytoscape.js prototype. The dark constellation starts with **15 demo nodes**; Expand reveals three additional local nodes. No database, authentication, paid APIs, or MCP integrations are used by the app.

## Run and preview

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start
```

The server listens on all interfaces for workspace previews. Stop it with Ctrl+C.

## Explore

- Drag the map background to pan, scroll/pinch to zoom, or use + and −.
- Search by name or description in the left panel. Selecting a search result reveals that node even if it was initially undiscovered.
- Checkboxes filter map node types and search results. Relationships appear only when both endpoints are visible.
- Click a node for its description, connections, and Expand action. Expansion reveals immediate local neighbors; filters still apply.
- Click a line or a relationship in the details panel to read its explanation, evidence status, and references.
- Reset view fits the current visible graph; it preserves discovery and filters. Reload to restore the initial demo.
- The searchable list and relationship buttons provide keyboard alternatives to the canvas. On narrow screens, panels stack vertically.

## Key files and boundaries

- `lib/graph.ts`: shared node, relationship, reference types and neighbor helper.
- `lib/demo-data.ts`: all demo content, positions, initial visibility, and reference metadata.
- `lib/theme.ts`: centralized graph stylesheet, colors, zoom limits, and fit padding.
- `components/GraphRenderer.tsx`: Cytoscape lifecycle and drawing; it receives data and emits selection IDs, without importing demo content.
- `app/page.tsx`: search, filters, discovery state, and accessible details UI.
- `app/globals.css`: responsive layout and interface styling.
- `tests/atlas.spec.ts`: data integrity and browser interaction checks.

This is **separation of concerns**: data describes what exists, rendering describes how it looks, and UI state describes what the visitor is exploring. A future retrieval adapter can return the same typed records without rewriting the renderer. Expansion currently reads local neighbors; it does not perform retrieval.

## Evidence conventions

Every relationship has a type, explanation, source array, and evidence status:

- **sourced**: a supporting text and locator are attached.
- **inferred**: an editorial interpretation or comparison; references can support its premises without proving the comparison.
- **illustrative**: a demo navigation connection without an attached verified reference.

Solid lines represent sourced relationships; dashed lines represent illustrative or inferred ones. These labels describe editorial intent, not independent source verification. Some references point to a scholarly overview, clearly noted in the UI, rather than a primary-text edition. External reference availability has not been automatically verified. No citations are generated at runtime.

Spinoza–Sartre is a **comparison**, explicitly not historical influence. Its references concern the two accounts of freedom. Broad tradition groupings remain illustrative.

## Extend the dataset

Add a node with a unique ID, label, type, description, and x/y position. Set `initial: true` to show it at launch. Add an edge with existing endpoint IDs, a unique ID, type, explanation, evidence status, and source records (or an explicit empty array for unsourced links). A hidden node needs a connection to be reachable by Expand; it can also be found through search. Add genuine references with useful locators; never turn an interpretation into a historical influence claim without evidence.

## Checks

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm test
# Or use an already-installed Chromium:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Playwright starts a production server on port 3000, or uses an existing one. Screenshots are written to `test-results/` (ignored by Git).

## Small learning exercise

Add a hidden concept node named **Understanding**, connect it to Spinoza using an explicitly illustrative relationship, then reveal it with Expand. Which files need changing, and why can the renderer stay untouched? Try it before asking for a solution.

## Milestone verification

The production build and `npm run typecheck` passed. All five Playwright checks passed using system Chromium: dataset integrity; search, expansion, evidence details and filters; mobile overflow and selection; desktop rendering; real canvas node/edge clicks, wheel zoom, background panning and reset. Desktop (1440 × 1000) and mobile (390 × 844) screenshots were reviewed.

The bundled Playwright browser download was blocked by the environment's network policy, so the run used `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. External source-link availability, physical touch gestures, Safari, and Firefox have not been verified. This milestone contains local demonstration content, not comprehensive historical coverage or live retrieval.
