# Runbook — Feature Flags & Configuration

**Solution:** BioTest Diagnostics Servicing (`DWS.07`)

Most behaviour is manifest-driven (`docs/10-Solutions/DWS.07-SOLUTION.md`) and applied at generation
time. Runtime configuration lives in environment variables.

| Concern | Where | Notes |
|---------|-------|-------|
| Modules / pages | manifest `modules:` | Regen to apply |
| Platform services | manifest `consumes_platform_services:` | Regen to apply |
| Theme | manifest `theme:` | Regen to apply |
| Footer / shortcuts | manifest `footer:` | Regen to apply |
| Secrets / DB | `.env` | Runtime; never commit |
| Feature flags | `feature_flags:` block + env vars (below) | Manifest default regen; env var is runtime |

To change manifest-driven config: edit the manifest, run `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force`, verify.

## Feature Flags

_No feature flags declared in this solution's manifest._
