import { describe, it, expect } from "vitest";
// DEF-8 (blueprint-2026-07-05-release-defects.md): import directly from the policy
// module this test exercises, not via "./can" — can.ts is create-if-missing like every
// other file here, so on a solution that already has its own solution/rbac/can.ts
// (a real, wired RBAC engine under this same conventional filename), the generator
// preserves it untouched while still additively creating this test — and a test that
// depended on "./can" would then be silently coupled to whatever THAT file happens to
// export, which need not match this freshly-scaffolded policy at all.
import { DWS07_MATRIX, compileSolutionAbility } from "./DWS.07-policy";
import { ROLES } from "./roles";

describe("DWS.07 RBAC policy", () => {
  it("generates a capability matrix from the declared subjects", () => {
    expect(Array.isArray(DWS07_MATRIX)).toBe(true);
  });

  it("compiles an ability for every declared role without throwing", async () => {
    for (const role of ROLES) {
      const ability = await compileSolutionAbility([role], { userId: "u1", tenantId: "tenant-alpha" });
      expect(ability).toBeDefined();
    }
  });

  it("denies an unknown subject/verb for a freshly compiled ability", async () => {
    const ability = await compileSolutionAbility(["viewer"], { tenantId: "tenant-alpha" });
    expect(ability.can("manage", "not-a-real-subject-or-verb")).toBe(false);
  });
});
