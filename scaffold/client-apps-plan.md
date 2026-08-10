# Patient App & Partner Portal — Scaffolding Plan

**Target build folder (both apps):** `C:\Users\mosep\Documents\Claude_Documents\Claude_Pro\Biotest\apps\`
**Pattern source:** `Hotel-Demo-DXP-DWS/apps/dxp` — a proven, real, working app, not a hypothetical. Both apps below are that pattern applied to BioTest's domain, not a new design.
**Backend:** `DWS.07` (`Biotest/scaffold/DWS.07/SOLUTION.md`, once scaffolded from `dbp_blueprint_build`) — per HLAD AD-08, neither app gets its own `SOLUTION.md` or platform-service access. Both are standalone, hand-built Next.js apps that proxy in.

---

## Shared pattern (applies to both apps)

### What each app owns vs. proxies

Directly copying `apps/dxp`'s split, which is the right split for BioTest too:

- **Owns** (own Postgres tables, own migration, never touches DWS.07's data): identity and session for its own user population.
- **Proxies** (zero local storage, every read/write is an HTTP call into DWS.07): everything that's actually BioTest's operational data — `lab-service` (catalog) and `exam-order`.

Neither app touches PostgreSQL, Redis, or any `PS.*` SDK directly. The only thing either app imports is `fetch`.

### The one seam: `lib/biotest-client.ts`

One file per app, modeled field-for-field on `apps/dxp/lib/dws-client.ts`:

```ts
// lib/biotest-client.ts — the only place this app talks to DWS.07 over HTTP.
const ENTITY_PATH = (type: string) => `/api/platform/data/entities/${type}`;

function biotestHeaders(): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-tenant-id": process.env.BIOTEST_TENANT_ID ?? "tenant-alpha",
    "x-dbp-internal-key": process.env.BIOTEST_INTERNAL_SHARED_SECRET ?? "",
  };
}

export class BiotestClientError extends Error {
  readonly status: number;
  readonly issues?: unknown;
  constructor(message: string, status: number, issues?: unknown) {
    super(message);
    this.name = "BiotestClientError";
    this.status = status;
    this.issues = issues;
  }
}
```

Same fail-closed behavior as the reference: an unset `BIOTEST_INTERNAL_SHARED_SECRET` sends an empty string, which DWS.07's trusted-caller guard should reject — a misconfigured deployment fails closed, not open. Same `DwsClientError` → `BiotestClientError` rename, same typed request/response shapes, same `dwsFetch`-style wrapper that turns a network failure into a catchable 502 rather than an unhandled rejection.

### Tech stack (identical for both — matches `apps/dxp` exactly, not the factory's heavier stack)

| Concern | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| UI | React 19 |
| Validation | Zod |
| Own DB access | plain `postgres` npm package — no Drizzle, no ORM |
| Styling | Tailwind CSS |
| Testing | Vitest (client mocked with `fetch` stubs; live-DWS.07 integration deferred until DWS.07 actually runs somewhere reachable) |
| Package manager | npm (not pnpm) — these are standalone apps, not workspace members |

Deliberately **not** using Turborepo, pnpm-workspace, or anything from `dbp_blueprint_build`'s `packages/`. That stack is for solutions the generator scaffolds; these two apps aren't generator output.

### Env vars (both apps, `.env.example`)

```
# Base URL of the DWS.07 backend this app proxies into.
BIOTEST_BASE_URL=http://localhost:3011

# Must match the tenant DWS.07's fixtures seed under (tenant-alpha).
BIOTEST_TENANT_ID=tenant-alpha

# Must match DWS_INTERNAL_SHARED_SECRET (or DWS.07's equivalent) on the backend side.
BIOTEST_INTERNAL_SHARED_SECRET=

# This app's own Postgres connection string — accounts/sessions only, never BioTest domain data.
DATABASE_URL=
```

### Deployment

Two independent deployments (e.g. two Vercel projects), same as `apps/dxp`/`apps/dws` — not two routes inside one app, not two folders inside the DWS.07 monorepo.

---

## App 1 — Patient App

**Build folder:** `Biotest/apps/patient-app`
**Serves:** BRS segment Patient (External tier) — F-S00-02, F-S01-05–08, F-S02-07 (My Bookings)

### Owns

`patient_accounts`, `patient_sessions` — one migration, mirroring `apps/dxp/db/migrations/0001_dxp_accounts_sessions.sql` field-for-field, renamed.

### Proxies

| Entity | Operations | Scope |
|---|---|---|
| `lab-service` | Read-only | Patient-visible published services only (never `draft` status) |
| `exam-order` | Create (`source: dxp`), Read | Filtered to the logged-in patient |

**Filtering "my bookings":** `apps/dxp` filters by `guestEmail` since that's the guest's natural identifier. BioTest's `exam-order` already has `patientPhone`, which serves the same role — usable as-is. A dedicated `patientAccountId` field would be cleaner long-term (avoids a phone-number-typo class of bug) but isn't required to ship; noting it as a follow-up, not a blocker.

### Routes

| Route | Purpose | Backing feature |
|---|---|---|
| `/` | Pre-login front door | F-S00-02 |
| `/marketplace` | Public catalog browse (Discern/Design) | F-S01-05, F-S01-06 |
| `/marketplace/[serviceCode]` | Service detail, SLA shown | F-S01-05 |
| `/book` | Booking flow → creates `exam-order` | F-S01-07 |
| `/my-bookings` | Status tracking, report retrieval | F-S02-07 |
| `/sign-in`, `/sign-up` | Own auth, own DB | — |

### API proxy routes

- `/api/auth/*` — own accounts/sessions, no DWS.07 involvement
- `/api/catalog` — proxies `GET .../entities/lab-service` (patient-visible filter applied server-side, never trust a client-supplied scope param)
- `/api/bookings` — proxies `POST`/`GET .../entities/exam-order`, `source: dxp` forced server-side (never trust a client-supplied `source`)

---

## App 2 — Partner Portal

**Build folder:** `Biotest/apps/partner-portal`
**Serves:** BRS segments Doctor/Consultant and Referral Front Desk (Partners tier) — F-S00-03, F-S01-09–12, F-S02-08 (My Referrals)

This app is the one place the AD-03 decision (two flat roles, standalone accounts, no admin hierarchy) actually has to be implemented in real code, not just described.

### Owns

`partner_accounts` (fields: identity + `role: 'consultant' | 'front-desk'` + nullable `practiceId`/`practiceName` — null is a **valid, first-class state**, not an error, since a standalone account has no practice to link), `partner_sessions`. Both roles get identical permissions at the account level — the role field is descriptive (who's behind the login), not a permission gate, per AD-03. Any user-management capability (inviting a colleague) is self-service within this app's own DB, not a DWS.07 concern.

### Proxies

| Entity | Operations | Scope |
|---|---|---|
| `lab-service` | Read-only | Referrer-visible published services only |
| `exam-order` | Create (`source: referral`), Read | Filtered to the logged-in Partner account |

**Filtering "my referrals" — the one manifest change this plan required:** `exam-order` had no field identifying which Partner account submitted a referral. Added `referrerAccountId` (string, optional) to the entity in `Biotest/scaffold/DWS.07/SOLUTION.md` to make this filterable at all — the same role `guestEmail` plays for `apps/dxp`. Set server-side from the authenticated session on create, never accepted from the client.

### Routes

| Route | Purpose | Backing feature |
|---|---|---|
| `/` | Pre-login front door | F-S00-03 |
| `/marketplace` | Referrer-visible catalog browse | F-S01-09, F-S01-10 |
| `/marketplace/[serviceCode]` | Service detail, SLA shown | F-S01-09 |
| `/refer` | Referral submission → creates `exam-order` | F-S01-11 |
| `/my-referrals` | Track submitted referrals, retrieve reports | F-S02-08 |
| `/sign-in`, `/sign-up` | Own auth — a solo consultant signs up once and gets both roles implicitly (no separate "admin" signup path, per AD-03) | — |

### API proxy routes

- `/api/auth/*` — own accounts/sessions
- `/api/catalog` — proxies `GET .../entities/lab-service`, referrer-visible filter applied server-side
- `/api/referrals` — proxies `POST`/`GET .../entities/exam-order`, `source: referral` and `referrerAccountId` both forced server-side from the session, never client-supplied

---

## Open items before either app can actually be scaffolded

| # | Item | Why it blocks |
|---|---|---|
| 1 | `DWS.07` must actually exist and be reachable at some URL | `BIOTEST_BASE_URL` needs a real target — even `localhost:3011` requires DWS.07 to be built and running first |
| 2 | Trusted-caller secret mechanism on DWS.07's side | `apps/dxp`'s reference notes a *separate* agent added `DWS_INTERNAL_SHARED_SECRET` guard to `apps/dws` — DWS.07 needs its own equivalent guard added before either client app's proxy calls can succeed, not assumed to exist from the manifest alone |
| 3 | Confirm the publish-scope filter fields on `lab-service` | Both apps' `/api/catalog` routes need a real field to filter "patient-visible" / "referrer-visible" on — the current manifest's `lab-service` entity has `status: active/draft` but no separate publish-scope field per tier; worth deciding whether `status` alone is sufficient or a dedicated field is needed |

None of these block writing the two apps' code — `apps/dxp`'s own reference notes it was built and tested with DWS mocked before wiring to a live backend. They block the *integration* phase, same sequencing `Hotel-Demo-DXP-DWS`'s handoff doc describes.
