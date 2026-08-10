// ── DWS.07 canonical roles — SOLUTION-OWNED ────────────────────────
// Single typed source for role names (projected from the manifest iam: block at
// first scaffold). Import Role/ROLES from here — never retype role strings inline.
export const ROLES = ["platform-admin","user","owner","technician","front-desk"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}
