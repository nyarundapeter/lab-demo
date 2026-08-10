# Runbook — Deployment

**Solution:** BioTest Diagnostics Servicing (`DWS.07`)

## Prerequisites
- Node 20+, pnpm
- Env vars set (see `.env.example`): `DBP_AUTH_SESSION_SECRET`, `DATABASE_URL` (when persistent), plus any provider keys.

## Build & deploy
```bash
pnpm --filter @dbp/app-dws-07 build
# deploy the build output via your platform (Vercel/containers/etc.)
```

## Post-deploy verification
1. App boots without errors (`/` and `/login` return 200).
2. Data endpoints return rows — curl `/api/platform/data/entities/<type>` with the tenant header.
3. Auth flow works (sign in, session persists across reload).

## Rollback
Redeploy the previous build artefact / git tag. No destructive data migrations run on deploy by default.
