// ── DWS.07 RBAC personas — SOLUTION-OWNED ─────────────────────────
// Maps this solution's declared roles (manifest.iam.roles) to a scoped
// capability-tier assignment ({ role, domain?, entityId?, orgUnitPath? }). A role
// id here is a persona name; the actual grant comes from the CapabilityRole tier
// (and optional domain/entityId/orgUnitPath scope) it's assigned below — never
// add permissions by inventing a new persona-named CASL role, always assign an
// existing tier with a scope.
// "platform-admin" -> admin and "viewer" -> viewer are the only two roles the
// generator defaults confidently; every other declared role defaults to an
// unscoped "contributor" — narrow it to "reviewer"/"approver" and/or add a
// domain/entityId/orgUnitPath scope as the solution's real persona needs it.
// orgUnitPath ("acme/engineering") is a department/business-unit hierarchy scope —
// a prefix match, not a nested-Group mechanism (see the Storybook guide: Layer 06
// — Platform Services/PS.RBAC/Tenants, Groups & Roles).
import type { RoleAssignment } from "@dbp/ps-rbac/server";

export const DWS07_PERSONAS: Record<string, RoleAssignment[]> = {
  "platform-admin": [{ role: "admin" }],
  "owner": [{ role: "contributor" }],
  "technician": [{ role: "contributor" }],
  "front-desk": [{ role: "contributor" }],
};
