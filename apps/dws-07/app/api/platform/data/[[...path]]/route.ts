// PS.DATA route mount — SOLUTION-OWNED (hand-edit me; never overwritten by --force).
// This file is the ONLY place in this app that imports @dbp/ps-data/server.
// Covered by the narrow ESLint exception in packages/config/eslint/index.mjs.
//
// Per-route bootstrap seam: Next.js production builds isolate route chunks, so the
// in-memory data service in this chunk is distinct from instrumentation.ts. Both
// this route and instrumentation.ts call registerAndSeedData() from the shared
// solution/fixtures/seed.ts module — the single source of truth for entity schemas
// and demo seed data. This guarantees both chunks see the same data on first request.
import { dispatch, getDataService } from "@dbp/ps-data/server";
import { type NextRequest } from "next/server";

let _dataBootstrap: Promise<void> | null = null;
async function bootstrapData(): Promise<void> {
  // Import the shared seed module — generated from manifest.entities.
  // Both this chunk and instrumentation.ts call this; each chunk gets its own
  // in-memory store (Next.js isolation), so registration + seeding is idempotent.
  const { registerAndSeedData } = await import("../../../../../solution/fixtures/seed.js");
  await registerAndSeedData(getDataService() as Parameters<typeof registerAndSeedData>[0]);
}

async function handle(req: NextRequest): Promise<Response> {
  if (!_dataBootstrap) {
    _dataBootstrap = bootstrapData().catch((e) => {
      _dataBootstrap = null;
      throw e;
    });
  }
  await _dataBootstrap;
  // ── PS.DATA interception seam ────────────────────────────────────────────────
  // Most requests pass straight through to the platform data service. To run
  // solution-specific logic on a write — enforce a lifecycle transition guard,
  // stamp an audit event, fan out a notification, recompute a derived field —
  // intercept BEFORE dispatch(). Keep the platform contract intact: return the
  // same Response shape dispatch() would, or fall through to it.
  //
  //   if (req.method === "PATCH" && req.nextUrl.pathname.includes("/entities/<type>/")) {
  //     // 1. read the pending patch:    const body = await req.clone().json();
  //     // 2. guard the transition:      assertTransitionAllowed(current.status, body.data.status);
  //     // 3. emit side-effects:         await audit(...); await notify(...);
  //   }
  //
  // Pattern guide: docs/03-Features/specs/PS-DATA-PATTERNS.md (interception seam).
  // Lifecycle guards belong in solution/adapters/<type>-lifecycle.ts (see GAP-10 / Wave 2).
  return dispatch(req as unknown as Request);
}

export { handle as GET, handle as POST, handle as DELETE, handle as PATCH, handle as PUT };
