# Getting Started — BioTest Diagnostics Servicing

## Prerequisites

- Node.js 20+, pnpm 9+
- Access to the `dbp_blueprint_build` monorepo
- PostgreSQL instance (or configure DATABASE_URL to a hosted service)
- Microsoft Entra app registration (optional — local dev uses the credential form fallback)

## Environment setup

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

```env
DBP_AUTH_SESSION_SECRET=<generate with: openssl rand -hex 32>
# Entra SSO (optional — only needed for Microsoft OIDC login):
ENTRA_TENANT_ID=
ENTRA_CLIENT_ID=
ENTRA_CLIENT_SECRET=
DATABASE_URL=postgresql://localhost:5432/${solutionDir}
NOTIF_EMAIL_TRANSPORT=smtp   # or: msgraph
SMTP_URL=smtp://user:pass@mailhost:587
SMTP_FROM=noreply@example.com
# MS Graph transport:
MSGRAPH_TENANT_ID=
MSGRAPH_CLIENT_ID=
MSGRAPH_CLIENT_SECRET=
MSGRAPH_SENDER_UPN=
```

## Running locally (in the monorepo)

```bash
# From the repo root — install all packages
pnpm install

# Start this app only
pnpm --filter @dbp/app-dws-07 dev

# Or start all apps
pnpm dev
```

The app starts at `http://localhost:3000` (port may differ if running multiple apps).

## Regenerating the scaffold

Generator-owned files (`app/`, configs) should not be hand-edited. To update them:

1. Edit `docs/10-Solutions/DWS.07-SOLUTION.md` (the solution manifest)
2. Run: `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force`
3. Verify data endpoints still return rows (if PS.DATA is wired)

## Running tests

```bash
pnpm --filter @dbp/app-dws-07 test
```

## Building

```bash
pnpm --filter @dbp/app-dws-07 build
```

## See also

- [Overview & docs index](00-overview/README.md)
- [Architecture](01-architecture/README.md)
- [Customization guide](02-guides/customization.md)
- [Runbooks](03-runbooks/)
- [Resolved architecture](../solution/_arch/SOLUTION.md)
