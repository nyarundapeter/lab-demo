# BioTest Diagnostics Servicing — RBAC Spec

Builder-owned spec for this solution's RBAC model. Generated once from
`SOLUTION.md` at first scaffold (create-if-missing — edit freely, it will
never be overwritten). For the general design pattern this implements
(subjects/verbs/tiers, tenancy, Groups, scoping) see the DBP factory's
Storybook guides: **Layer 06 — Platform Services/PS.RBAC/Ability Model
Guide** and **.../Tenants, Groups & Roles**. This file is the solution-
specific counterpart — what THIS solution actually declared, and why.

## Declared subjects (`solution/rbac/DWS.07-subjects.ts`)

One row per entity in `manifest.entities`. The verb set is the generator's
generic default — trim/extend it here in prose first, then in the `.ts`
file, so the two stay in sync.

| Subject | Default verbs | Notes (fill in) |
|---|---|---|
| `lab-service` | read, create, update-own, submit, approve | _—_ |
| `exam-order` | read, create, update-own, submit, approve | _—_ |
| `demo-record` | read, create, update-own, submit, approve | _—_ |
| `demo-catalog-item` | read, create, update-own, submit, approve | _—_ |
| `service-offering-request` | read, create, update-own, submit, approve | _—_ |
| `reminder` | read, create, update-own, submit, approve | _—_ |

## Declared personas (`solution/rbac/DWS.07-personas.ts`)

One row per role in `manifest.iam.roles`. `platform-admin`/`viewer` get a
confident default; every other persona defaults to an **unscoped
contributor** — this is a safe floor, not this client's real model. Fill in
the actual scope (`domain`, `entityId`, or `orgUnitPath` for department/
business-unit hierarchy) before this solution ships.

| Persona role id | Default tier | Real scope (fill in) |
|---|---|---|
| `platform-admin` | admin | _—_ |
| `owner` | contributor | _—_ |
| `technician` | contributor | _—_ |
| `front-desk` | contributor | _—_ |

## Client-specific notes

_Fill in for this deployment: the client's actual org structure (departments/
business units, if using `orgUnitPath`), any personas beyond `manifest.iam.roles`
that need a Group instead of a direct role, and any compliance/segregation-of-
duties requirements specific to this client._

## Extension checklist

1. Edit the subjects/personas tables above, then mirror the same change into
   the `.ts` files — the tables here are documentation, not a build input.
2. Set `RBAC_ADMIN_STORAGE=drizzle` + `DATABASE_URL` before relying on Groups
   in this deployment — see the Tenants, Groups & Roles guide §0 for the full
   runbook (tenant provisioning, env vars, admin onboarding).
3. Call `compileSolutionAbility(session.roles, { userId, tenantId })` from
   any route handler/server action that needs a domain/entity/org-unit-scoped
   check; keep `useCan`/`Gate` for simple tenant/ownership-scoped UI gating.
