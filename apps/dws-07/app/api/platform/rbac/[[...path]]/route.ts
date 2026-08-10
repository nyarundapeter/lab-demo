// Generated API mount — PS.RBAC
// This file is the ONLY place in this app that imports @dbp/ps-rbac/server.
// Covered by the narrow ESLint exception in packages/config/eslint/index.mjs.
//
// Per-route bootstrap seam: PS.RBAC's admin API requires setAdminRepository()
// at startup. instrumentation.ts seeds one for the Node runtime, but Next.js
// isolates route chunks (each route is its own function on serverless
// platforms), so that repository is NOT visible here — mirrors the PS.AUTH
// route's self-bootstrap below. Storage backend selection (RBAC_ADMIN_STORAGE
// env var — "drizzle" | unset/"memory") goes through bootstrapAdminStorage(),
// the same selection seam as PS.AUDIT/PS.NOTIF; in-memory mode additionally
// seeds demo-identity role assignments so the admin UI has something to show.
import { dispatch, setAdminRepository, InMemoryAdminRepository, bootstrapAdminStorage, selectRbacAdminStorage } from "@dbp/ps-rbac/server";
import { type NextRequest } from "next/server";

let _rbacBootstrap: Promise<void> | undefined;
async function bootstrapRbac(): Promise<void> {
  await bootstrapAdminStorage(process.env as Record<string, string | undefined>);
  if (selectRbacAdminStorage(process.env as Record<string, string | undefined>).kind === "drizzle") {
    // bootstrapAdminStorage() already wired the Drizzle-backed repository.
    return;
  }
  try {
    const mod = await import("../../../../../solution/fixtures/demo-identities.js");
    const identities = (mod as { DEMO_IDENTITIES?: Array<{ user: { id: string; roles?: string[] } }> }).DEMO_IDENTITIES;
    const adminRepo = new InMemoryAdminRepository();
    if (Array.isArray(identities)) {
      adminRepo.seedUserRoles(
        identities.flatMap((entry) => (entry.user.roles ?? []).map((roleId) => ({ userId: entry.user.id, roleId }))),
      );
    }
    setAdminRepository(adminRepo);
  } catch {
    // No demo-identities module — seed an empty repository so admin mutations
    // at least don't 500 (real deployments wire RBAC_ADMIN_STORAGE=drizzle).
    setAdminRepository(new InMemoryAdminRepository());
  }
}
function ensureRbacBootstrap(): Promise<void> {
  if (!_rbacBootstrap) _rbacBootstrap = bootstrapRbac();
  return _rbacBootstrap;
}

async function handle(req: NextRequest): Promise<Response> {
  await ensureRbacBootstrap();
  return dispatch(req as unknown as Request);
}

export { handle as GET, handle as POST, handle as DELETE, handle as PATCH, handle as PUT };
