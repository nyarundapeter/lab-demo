# BioTest Diagnostics4.0 — Scaffold Plan (3 apps)

Ties together the three build artifacts staged in this folder and the tree above it. Read this first — the three apps are not peers and don't follow the same build mechanism (that's AD-08, not an oversight).

## The three apps

| # | App | Lives at (once built) | Built how | Plan |
|---|---|---|---|---|
| 1 | Internal Servicing Workspace | `dbp_blueprint_build/apps/dws-07` — generator-scaffolded, co-deployed with the real backend | `node scripts/scaffold-solution.mjs catalog/DWS.07/SOLUTION.md`, run inside `dbp_blueprint_build` | [`DWS.07/SOLUTION.md`](DWS.07/SOLUTION.md) |
| 2 | Patient App | `Biotest/apps/patient-app` — standalone, npm-managed | Hand-built Next.js, no generator | [`client-apps-plan.md`](client-apps-plan.md) |
| 3 | Partner Portal | `Biotest/apps/partner-portal` — standalone, npm-managed | Hand-built Next.js, no generator | [`client-apps-plan.md`](client-apps-plan.md) |

## Why the asymmetry

Confirmed against the real factory (`dbp_blueprint_build`) and its reference build (`Hotel-Demo-DXP-DWS`): only one app per platform is the real backend — auth, RBAC, data, audit, notifications, all consumed by ID via `PS.*` SDKs. Everything else is a thin client that proxies in over HTTP. BioTest has one real backend (app #1) and two thin clients (#2, #3) — not three symmetric surfaces, which is what the BRS assumed before this correction (see HLAD AD-08, and the corrective note in BRS §4.1).

## Build order

1. **DWS.07 first, always.** Apps #2 and #3 have nothing to call until it exists and is reachable at some `BIOTEST_BASE_URL`. Building the client apps' UI shells before this can start in parallel, but their proxy routes (`/api/catalog`, `/api/bookings`, `/api/referrals`) are untestable until DWS.07 is live.
2. **The trusted-caller guard on DWS.07's side.** `apps/dxp`'s reference build needed a separate pass to add the `x-dbp-internal-key` shared-secret check to `apps/dws` — the manifest alone doesn't create it. DWS.07 needs the same addition before either client app's proxy calls will succeed.
3. **Patient App and Partner Portal**, in either order — they don't depend on each other.

## Open items carried from the last two passes (not yet resolved)

| # | Item | Blocks |
|---|---|---|
| 1 | `DWS.07` number not verified against live `REGISTRY.yaml` — only inferred from what `apps/` shows | Step 1 (could collide with an existing solution) |
| 2 | `journey` / `deploy_layer` / quickLink `tone` values follow DWS.06's precedent, not independently confirmed as valid enum values | Step 1 (generator may reject the manifest) |
| 3 | `lab-service` has no dedicated patient-visible / referrer-visible publish-scope field — only `status: active/draft` | Steps 2–3 (`/api/catalog` on both client apps needs a real filter field) |
| 4 | Trusted-caller guard doesn't exist on DWS.07 yet (see build order item 2) | Steps 2–3 |

## Repo safety note (from `dbp_blueprint_build/CLAUDE.md`, not my own house rule)

> "Any agent that runs the scaffold generator, a `--force` regen, or any destructive/bulk file operation MUST run in an isolated git worktree... Never run a regen/destructive agent directly in the main working tree."

This is `dbp_blueprint_build`'s own non-negotiable, learned from a real incident (their words: "LEARNED THE HARD WAY — 2026-06-13"). Step 1's generator run follows it — worktree first, generator second, never directly in `dbp_blueprint_build`'s main tree.
