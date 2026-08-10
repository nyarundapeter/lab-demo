// ── DWS.07 RBAC policy — SOLUTION-OWNED ───────────────────────────
// Composes @dbp/ps-rbac's tiered-ability engine over this solution's own
// subjects (DWS.07-subjects.ts) and personas (DWS.07-personas.ts).
// Never reimplement generateCapabilityMatrix/compileScopedAbilityFromAssignments
// here — extend the subjects/personas files instead.
import {
  generateCapabilityMatrix,
  compileScopedAbilityFromAssignments,
  resolveEffectiveAssignments,
  getGroupRoleResolver,
  getUserRoleResolver,
  type AbilityContext,
  type GroupRoleResolver,
  type UserRoleResolver,
} from "@dbp/ps-rbac/server";
import { DWS07_SUBJECTS } from "./DWS.07-subjects";
import { DWS07_PERSONAS } from "./DWS.07-personas";

export type Ability = ReturnType<typeof compileScopedAbilityFromAssignments>;

/** The full generated capability matrix for this solution's declared subjects. */
export const DWS07_MATRIX = generateCapabilityMatrix(DWS07_SUBJECTS);

/**
 * Compiles a ready-to-use Ability for a session's flat roles[]. Direct roles
 * are merged with Group-inherited and directly-user-assigned roles (via
 * @dbp/ps-rbac's resolveEffectiveAssignments — the Groups-aware primitive),
 * then resolved through DWS.07-personas.ts into scoped
 * assignments, before compiling against ctx's userId/tenantId (ownership +
 * tenant-scoping conditions).
 *
 * groupResolver/userResolver default to whatever this process last passed to
 * setGroupRoleResolver()/setUserRoleResolver() (@dbp/ps-rbac/server) — under
 * RBAC_ADMIN_STORAGE=drizzle, bootstrapAdminStorage() wires those
 * automatically, so Groups work with zero extra code here. Pass an explicit
 * resolver only to override that default (e.g. in a test).
 */
export async function compileSolutionAbility(
  roles: readonly string[],
  ctx: AbilityContext = {},
  groupResolver: GroupRoleResolver | undefined = getGroupRoleResolver(),
  userResolver: UserRoleResolver | undefined = getUserRoleResolver(),
): Promise<Ability> {
  const assignments = await resolveEffectiveAssignments(
    roles,
    ctx.userId ?? "",
    ctx.tenantId ?? "",
    DWS07_PERSONAS,
    groupResolver,
    userResolver,
  );
  return compileScopedAbilityFromAssignments(DWS07_MATRIX, assignments, ctx);
}
