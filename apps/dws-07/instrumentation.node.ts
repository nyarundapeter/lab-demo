// instrumentation.node.ts — Next.js Node-runtime instrumentation body for DWS.07.
// GENERATED TEMPLATE — solution-owned (create-if-missing; never overwritten by --force regen).
//
// HOST SEAM: The ONLY file outside app/api/platform/** allowed to import @dbp/ps-<svc>/server.
// ESLint boundary exception in packages/config/eslint/index.mjs covers this path.
//
// NOTE: Next.js isolates route chunks, so registering schemas/data here does NOT
// populate the PS.DATA route handler's chunk. The PS.DATA route handler bootstraps
// itself from solution/fixtures/seed.ts (same module, different chunk).
// See apps/dws-01/instrumentation.node.ts for the proven reference shape.
//
// Kept in a separate file from instrumentation.ts on purpose — see the comment in
// instrumentation.ts for why (edge-runtime bundle must never resolve this module).

export async function registerNode() {
  console.log(`[DWS.07 instrumentation] registerNode() called`);

  const [
    { getDataService },
    { getSearchService },
    { assertSessionSecret, bootstrapAuthProvider, configureIdentityProvider, InMemoryIdentityProvider, configureMembershipProvider },
    { registerAndSeedData },
  ] = await Promise.all([
    import("@dbp/ps-data/server"),
    import("@dbp/ps-search/server"),
    import("@dbp/ps-auth/server"),
    import("./solution/fixtures/seed.js"),
  ]);

  const dataSvc = getDataService();
  const searchSvc = getSearchService();

  // ── 1. Register entity schemas + seed demo data (shared source of truth) ──
  // registerAndSeedData() is generated from manifest.entities and shared with the
  // PS.DATA route chunk — each chunk has its own in-memory store (Next.js isolation).
  await registerAndSeedData(dataSvc as Parameters<typeof registerAndSeedData>[0]);

  // ── 3. Auth identity provider ─────────────────────────────────────────────
  // Fail-fast: assertSessionSecret() throws at boot if DBP_AUTH_SESSION_SECRET is
  // unset or < 32 chars — surfaces the misconfig here, not as a 500 at first login.
  assertSessionSecret();
  // bootstrapAuthProvider is async (the DB session-store path dynamically imports the
  // driver). It reads DBP_IDP_PROVIDER and wires the correct provider. When unset or
  // "password", the in-memory demo accounts below are seeded; for ldap/entra/entra-external
  // the provider is wired from env vars. MUST be awaited or the store may not be ready.
  await bootstrapAuthProvider(process.env as Record<string, string | undefined>);

  if (!process.env.DBP_IDP_PROVIDER || process.env.DBP_IDP_PROVIDER === "password") {
    // SP-MANIFEST-SOT / FN-1: accounts derived from manifest.dev.seed_users (or default).
    // These MUST match app/login/page.tsx SEED_USERS — both derive from the same source.
    try {
      configureIdentityProvider(new InMemoryIdentityProvider([
      { user: { id: "usr-alpha-platform-admin", email: "platform-admin@alpha.dev.local", displayName: "Amira Khalid", roles: ["platform-admin", "platform-admin", "owner", "technician", "front-desk"], tenantId: "tenant-alpha", memberships: ["tenant-alpha", "tenant-beta-demo"] }, password: "dbp-dev-password" },
      { user: { id: "usr-alpha-user-01",         email: "user-01@alpha.dev.local",         displayName: "Demo User",       roles: ["user", "platform-admin"],                  tenantId: "tenant-alpha" }, password: "dbp-dev-password" }
      ]));
    } catch { /* already configured */ }
    // Multitenant demo data (T4 ruling): at least one seed identity carries 2+
    // memberships so the shell's workspace/tenant switcher is demoable. Wired
    // from the SAME seed source above — see SP-MANIFEST-SOT.
    const DEMO_MEMBERSHIPS: Record<string, string[]> = {
    "usr-alpha-platform-admin": ["tenant-alpha","tenant-beta-demo"],
    };
    try {
      configureMembershipProvider({
        getMemberships: async (userId: string) => DEMO_MEMBERSHIPS[userId] ?? [],
      });
    } catch { /* already configured */ }
  }

  // ── 5. Index seeded data → PS.SEARCH ─────────────────────────────────────
  // TODO: iterate your seeded records and call searchSvc.adapter.index({ id, entityType, tenantId, title, body, fields }).
  void searchSvc;
}
