# Runbook — Incident Response

**Solution:** BioTest Diagnostics Servicing (`DWS.07`)

## Triage
1. Confirm scope — one page, one service, or app-wide?
2. Check the platform-service mounts (`/api/platform/*`) for 5xx.
3. Check recent deploys / config changes first.

## Common failure modes
- **"Entity not registered"** → the route chunk didn't bootstrap schemas/seed. Verify `instrumentation.ts` and the data route self-bootstrap.
- **Auth logout loop** → session shape mismatch; `/session` must return `{ session, user }`.
- **Empty surfaces** → entity declared but not seeded; check the manifest `entities:` block.

## Escalation
Capture the failing request (URL, status, response body) and the deploy SHA before escalating.
