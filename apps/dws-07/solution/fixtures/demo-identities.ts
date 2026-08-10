// Demo identity accounts — shared source of truth for the login page hints,
// instrumentation.ts, and the PS.AUTH route's per-chunk bootstrap. Generator-owned
// (projected from the manifest); to change demo accounts, edit the manifest iam: block.
// Amira Khalid carries a second membership (tenant-beta-demo) so the shell's
// multitenant workspace switcher is demoable out of the box (T4 ruling).
export const DEMO_IDENTITIES = [
  { user: { id: "usr-alpha-platform-admin", email: "platform-admin@alpha.dev.local", displayName: "Amira Khalid", roles: ["platform-admin","owner","technician","front-desk"], tenantId: "tenant-alpha", memberships: ["tenant-alpha", "tenant-beta-demo"] }, password: "dbp-dev-password" },
  { user: { id: "usr-alpha-user-01", email: "user-01@alpha.dev.local", displayName: "Demo User", roles: ["user","platform-admin"], tenantId: "tenant-alpha" }, password: "dbp-dev-password" },
];
