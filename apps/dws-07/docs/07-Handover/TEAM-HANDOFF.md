# BioTest Diagnostics Servicing — Team Handoff

**Solution:** DWS.07 — BioTest Diagnostics Servicing
**Built on:** Digital Business Platform (DBP) factory
**Source of truth:** the manifest (`solution/_arch/SOLUTION.md`; authored in the monorepo as `docs/10-Solutions/DWS.07-SOLUTION.md`)

---

## 1. Links

| What | Where |
|---|---|
| **Builder guide** | `docs/07-Handover/BUILDER-GUIDE.md` |
| **Architecture** | `docs/01-Architecture/README.md` |
| **Features** | `docs/03-Features/README.md` |
| **Agent rules** | `AGENTS.md` |
| **Overview** | `README.md` |

**Demo login:** `platform-admin@alpha.dev.local` / `dbp-dev-password`
> Only `/login` is public; everything else needs a session. `/` redirects to `/home`.

## 2. What's built

- **5** bespoke module(s) + the full standard navigation menu (demo pages).
- **4** bespoke entity type(s): `lab-service`, `exam-order`, `service-offering-request`, `reminder`.
- Platform services wired (not built): `PS.AUTH`, `PS.RBAC`, `PS.DATA`, `PS.AUDIT`, `PS.NOTIF`, `PS.SEARCH`.

## 3. Run it

```bash
pnpm install
pnpm build
node node_modules/next/dist/bin/next start -p 9030   # http://localhost:9030
```

## 4. How it's structured

- `app/` — generated Next.js routes + API mounts (generator-owned; do not hand-edit).
- `solution/` — entity schemas, fixtures/seed, `_arch` manifest (solution-owned).
- `docs/` — this spine (solution-owned; extend freely).

To change pages/features/theme, edit the manifest and regenerate — see the [Builder Guide](BUILDER-GUIDE.md).
