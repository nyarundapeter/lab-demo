# `/api/solution/` — solution-owned route namespace

This namespace is reserved for **solution-specific** API routes that are NOT
provided by a Layer 06 platform service. Platform services already mount under
`/api/platform/*` (auth, data, notif, workflow, …) — never duplicate those here.

## When to add a route here

- A bespoke aggregation or projection the solution needs that no platform
  service exposes.
- A solution-specific webhook receiver or integration callback.
- A composition endpoint that orchestrates several platform services for one
  solution-specific operation.

## When NOT to add a route here

- Anything that is generic CRUD over an entity — use PS.DATA (`/api/platform/data`).
- Anything that should be reusable across solutions — it belongs in a platform
  service (Layer 06), not here.

## Convention

Create `app/api/solution/<name>/route.ts`. Import platform services via their
public `@dbp/ps-*` packages; never import another solution's internals.

> This file is documentation only — it does not register a route.
