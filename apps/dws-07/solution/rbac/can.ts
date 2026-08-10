// ── DWS.07 ability surface — SOLUTION-OWNED ───────────────────────
// Public RBAC entry point for this solution. Pages/components import from here,
// never from @dbp/ps-rbac directly, so the composition seam stays in one place.
//
// Two ability paths coexist, same as the platform base package itself:
//   - compileSolutionAbility() — this solution's generated, domain/entity-scoped
//     tiered ability (server-side; call it from route handlers/server actions).
//   - useCan/Gate — the platform's flat, session-scoped packed-rules ability
//     (client-side; wired to the PS.RBAC HTTP API, tenant/ownership-only scope).
// Use the scoped path once a feature needs domain/entity conditions; the flat
// client path remains the default for simple action-gating in "use client" code.
export { compileSolutionAbility, DWS07_MATRIX, type Ability } from "./DWS.07-policy";
export { DWS07_SUBJECTS } from "./DWS.07-subjects";
export { DWS07_PERSONAS } from "./DWS.07-personas";
export { can, compileAbility } from "@dbp/ps-rbac/server";
// Client-side helpers (use inside "use client" components):
export { useCan, useAbility, Gate } from "@dbp/ps-rbac/client";
// Canonical role names (typed) — never retype role strings inline.
export { ROLES, isRole, type Role } from "./roles";
