// Generated API mount — PS.AUTH
// This file is the ONLY place in this app that imports @dbp/ps-auth/server.
// The narrow ESLint exception in packages/config/eslint/index.mjs covers
// apps/*/app/api/platform/** exclusively.
//
// Per-route bootstrap seam: Next.js production builds isolate route chunks (and on
// serverless platforms like Vercel each route is its own function), so the identity
// provider seeded in instrumentation.ts is NOT visible here — its in-memory store
// lives in a different chunk. Without seeding THIS chunk, loginHandler authenticates
// against an empty provider and every demo login returns 401. So this route seeds its
// own identity provider from the shared solution/fixtures/demo-identities.ts module
// (idempotent, memoized), mirroring how the PS.DATA route self-bootstraps its seed.
import { loginHandler, logoutHandler, sessionHandler, verifyHandler, providerHandler, authorizeHandler, callbackHandler, switchTenantHandler, usersHandler, AUTH_BASE_PATH, bootstrapAuthProvider, configureIdentityProvider, InMemoryIdentityProvider, configureMembershipProvider } from "@dbp/ps-auth/server";
import { type NextRequest } from "next/server";

type Handler = (req: Request) => Promise<Response>;

let _authBootstrap: Promise<void> | undefined;
async function bootstrapAuth(): Promise<void> {
  await bootstrapAuthProvider(process.env as Record<string, string | undefined>);
  try {
    // Shared demo accounts — same source the login page hints + instrumentation use.
    const mod = await import("../../../../../solution/fixtures/demo-identities.js");
    const identities = (mod as { DEMO_IDENTITIES?: unknown }).DEMO_IDENTITIES;
    if (Array.isArray(identities) && identities.length > 0) {
      configureIdentityProvider(new InMemoryIdentityProvider(identities as never));
      // Multitenant demo data (T4 ruling): derive the membership provider from the
      // SAME fixture so the workspace/tenant switcher works in this route's own
      // chunk, not just in instrumentation.ts (which isn't visible cross-chunk).
      const membershipsById: Record<string, string[]> = {};
      for (const entry of identities as Array<{ user: { id: string; memberships?: string[] } }>) {
        if (entry.user.memberships && entry.user.memberships.length > 1) {
          membershipsById[entry.user.id] = entry.user.memberships;
        }
      }
      configureMembershipProvider({
        getMemberships: async (userId: string) => membershipsById[userId] ?? [],
      });
    }
  } catch {
    // No demo-identities module (e.g. a real-IdP solution) — leave the provider as-is.
  }
}
function ensureAuthBootstrap(): Promise<void> {
  if (!_authBootstrap) _authBootstrap = bootstrapAuth();
  return _authBootstrap;
}

const ROUTES: Record<string, Partial<Record<string, Handler>>> = {
  [AUTH_BASE_PATH + "/login"]:          { POST: loginHandler },
  [AUTH_BASE_PATH + "/logout"]:         { POST: logoutHandler },
  [AUTH_BASE_PATH + "/session"]:        { GET: sessionHandler },
  [AUTH_BASE_PATH + "/verify"]:         { POST: verifyHandler },
  [AUTH_BASE_PATH + "/provider"]:       { GET: () => providerHandler() },
  [AUTH_BASE_PATH + "/authorize"]:      { GET: authorizeHandler },
  [AUTH_BASE_PATH + "/callback"]:       { GET: callbackHandler },
  [AUTH_BASE_PATH + "/switch-tenant"]:  { POST: switchTenantHandler },
  [AUTH_BASE_PATH + "/users"]:          { GET: usersHandler },
};

async function handle(req: NextRequest): Promise<Response> {
  await ensureAuthBootstrap();
  const { pathname } = new URL(req.url);
  const handler = ROUTES[pathname]?.[req.method];
  if (!handler) return new Response(null, { status: 404 });
  return handler(req as unknown as Request);
}

export { handle as GET, handle as POST, handle as DELETE, handle as PATCH, handle as PUT };
