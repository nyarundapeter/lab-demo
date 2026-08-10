# Test Plan — BioTest Diagnostics Servicing (DWS.07)

This solution inherits the DBP factory's minimum test plan automatically — no setup required.
This document states exactly which gates apply to **this solution**, derived from its own
manifest (`consumes_platform_services`: PS.AUTH, PS.RBAC, PS.DATA, PS.AUDIT, PS.NOTIF, PS.SEARCH), not a generic checklist of everything the factory could theoretically enforce.

## Gates this solution inherits

- F1 — unit test per feature package
- F2 — render test + story per @dbp/ui component
- F7 — regen idempotence (byte-identical generator surface)
- F8 — negative-case heuristic (≥1 deny/invalid/error-shaped test per feature package)
- N4 — secret + dependency scan
- N5 — a11y smoke (`pnpm test:a11y`, warn-baseline)
- N6 — bundle/build budget (`pnpm test:bundle`, warn-baseline)
- N9 — coverage ratchet, fixed 98% floor (`pnpm test:coverage`, adoption mode)
- N7 — structured logging present (`pnpm test:structured-logs`, adoption mode)
- N2 — tenant isolation, mocked contract
- N8 — RBAC exhaustive matrix (role × action), auto-derived from the manifest
- F5 — E2E business-journey spec (required: consumes 6 platform service(s))

These run via `pnpm verify` (functional + build) and the standalone-parity commands
(`pnpm test:a11y`, `pnpm test:bundle`, `pnpm test:coverage`, `pnpm test:structured-logs`)
wired into this repo's own `.github/workflows/pr-checks.yml`. All NFR gates run in
warn-baseline/adoption mode today — they report gaps but do not fail CI until a solution owner
deliberately flips a gate to `--strict`.

## What's not covered here

- **Business/role-based sign-off (UAT)** is a human activity this factory cannot automate. See
  the generated [UAT Checklist](UAT-CHECKLIST.md) for a manifest-derived starting checklist to
  circulate to stakeholders before go-live.
- **Compliance/regulatory, third-party integration, or data-migration testing** specific to
  this solution's real-world deployment are per-solution extensions, not factory gates. Copy
  the `third-party-integration` and `compliance` `EXTENSION`-type worked examples from
  `quality-matrix.json` into your own exported copy and adapt them. For compliance work, the
  factory ships a starter script (`scripts/check-compliance-starter.mjs`) as a working
  template — it is not run by this solution's own CI until you wire it in deliberately.

## Full context

For the factory's complete minimum test plan — the full functional/non-functional checklist,
the applicability rule, and the factory-global vs per-solution-extension line — see the DBP
Blueprint factory's minimum test plan for full context
(`docs/04-testing/minimum-test-plan.md` in the factory monorepo; this solution ships as a
separate repo without a copy of that file, so it's referenced by path, not link).
