import { type NextRequest, NextResponse } from "next/server";
import { InMemoryRateLimitStorageAdapter, checkRateLimit, isRateLimitedRoute } from "@dbp/ps-apigw/server";

const SESSION_COOKIE = "dbp_session";
const AUTH_VERIFY_PATH = "/api/platform/auth/verify";

// Module-scope singleton — one edge-function instance per deployment (middleware.ts,
// unlike API routes, is not split into per-route chunks), so this is safe without the
// globalThis-store pattern ps-audit/ps-data use to survive Next.js route-chunk isolation.
// In-memory only (single-instance semantics) — see rate-limit-storage.ts doc comment for
// the multi-instance caveat; a Drizzle/Redis adapter is a v2 (spec §3 out-of-scope).
const rateLimiter = new InMemoryRateLimitStorageAdapter();

const RATE_LIMIT_DEFAULTS = {
  enabled: process.env.DBP_RATE_LIMIT_ENABLED !== "false",
  authWindowSeconds: Number(process.env.DBP_RATE_LIMIT_AUTH_WINDOW_S ?? 60),
  authMaxRequests: Number(process.env.DBP_RATE_LIMIT_AUTH_MAX ?? 10),
  defaultWindowSeconds: Number(process.env.DBP_RATE_LIMIT_DEFAULT_WINDOW_S ?? 60),
  defaultMaxRequests: Number(process.env.DBP_RATE_LIMIT_DEFAULT_MAX ?? 120),
};


/**
 * DBP session middleware — session-verify and tenant-resolve only.
 *
 * Security contract:
 *   1. Strip inbound x-dbp-session unconditionally — it is an internal-only header
 *      that only this middleware may set. Any caller-supplied value is forged identity.
 *   2. If a dbp_session cookie or Authorization bearer is present, call the app's own
 *      PS.AUTH verify endpoint (POST /api/platform/auth/verify) to validate the JWT.
 *      On success, set x-dbp-session = base64(JSON.stringify(session)) as PS.RBAC,
 *      PS.WORKFLOW, and PS.NOTIF expect per their SERVICE.md contracts.
 *      On failure, treat as unauthenticated.
 *   3. Auth enforcement (redirect to /login for unauthenticated requests to protected
 *      routes) is delegated to the app/(authenticated)/layout.tsx server component.
 *      Middleware no longer enumerates protected prefixes (ADR-0027).
 *   4. Tenant is resolved from dbp_tenant cookie or x-tenant-id header and
 *      forwarded as x-dbp-tenant for downstream platform services.
 *
 * Cannot import @dbp/ps-auth/server — middleware runs in the edge runtime (Node subset).
 * Plain fetch to the app's own auth endpoint is the only legal verification path.
 *
 * Performance note: the per-request verify subrequest adds one loopback HTTP call.
 * This is acceptable for the blueprint. A cached in-memory verifier is a future optimisation.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // Always start from a clean header set — strip any caller-supplied x-dbp-session
  // and x-dbp-pathname (both are internal-only; caller-supplied values are forged).
  const headers = new Headers(req.headers);
  headers.delete("x-dbp-session");
  headers.delete("x-dbp-pathname");
  // Forward the request path so the server-side auth gate in
  // app/(authenticated)/layout.tsx can preserve the intended destination.
  headers.set("x-dbp-pathname", pathname + req.nextUrl.search);

  // Auth mount itself must not trigger a recursive verify subrequest.
  if (pathname.startsWith("/api/platform/auth/")) {
    return NextResponse.next({ request: { headers } });
  }

  const token =
    req.cookies.get(SESSION_COOKIE)?.value ??
    req.headers.get("authorization")?.replace(/^[Bb]earer\s+/, "") ??
    null;

  let session: Record<string, unknown> | null = null;

  if (token) {
    try {
      const verifyUrl = `${req.nextUrl.origin}${AUTH_VERIFY_PATH}`;
      const verifyRes = await fetch(verifyUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (verifyRes.ok) {
        const body = (await verifyRes.json()) as { valid: boolean; session: Record<string, unknown> | null };
        if (body.valid && body.session !== null) {
          session = body.session;
        }
      }
    } catch {
      // Verify subrequest failed (app not ready, network error) — treat as unauthenticated.
    }
  }

  if (session !== null) {
    headers.set("x-dbp-session", Buffer.from(JSON.stringify(session)).toString("base64"));
  }

  // Resolve tenant: prefer dbp_tenant cookie, fall back to x-tenant-id header.
  const tenant =
    req.cookies.get("dbp_tenant")?.value ??
    req.headers.get("x-tenant-id") ??
    null;
  if (tenant) {
    headers.set("x-dbp-tenant", tenant);
  }

  // Auth enforcement (redirect to /login for unauthenticated requests to protected
  // routes) is handled by app/(authenticated)/layout.tsx — NOT here. This keeps
  // the middleware thin and avoids maintaining an enumerated prefix list.

  // (GAP-BRS-5) App-level rate limiting — defence-in-depth only, WAF/API-gateway
  // remains the primary control. Two coarse classes (auth vs. everything else under
  // /api/platform/*); per-route granular limits are a v2 (spec §3 out-of-scope).
  if (RATE_LIMIT_DEFAULTS.enabled && isRateLimitedRoute(pathname)) {
    const sessionUserId =
      session && typeof session["userId"] === "string" ? (session["userId"] as string) : undefined;
    const clientKey = sessionUserId ?? req.headers.get("x-forwarded-for") ?? "anonymous";
    const decision = await checkRateLimit(rateLimiter, {
      tenantId: tenant ?? "default",
      clientKey,
      pathname,
      defaults: RATE_LIMIT_DEFAULTS,
    });
    if (decision.limited) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { "content-type": "application/json", "retry-after": String(decision.windowSeconds) },
      });
    }
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Match all routes except Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
