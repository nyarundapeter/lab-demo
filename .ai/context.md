# Project Context — BioTest Diagnostics4.0

> Read by `plan-feature-spec` and `feature-delivery-orchestrator` as the required pre-flight input. Keep this filled in and current — do not let it drift back to placeholder text.

## What the project is

BioTest Diagnostics4.0 (DBP ID: `DWS.02.03`) is a diagnostic servicing platform for BioTest, a diagnostic imaging and lab business. It gives BioTest one system of record for exam-order intake, quality-controlled capture, and release — replacing four disconnected manual intake channels (walk-in, WhatsApp, phone, referral) with tracked turnaround, an audit trail, and role-appropriate access for staff, patients, and referring clinics.

The platform does **not** perform clinical diagnosis or treatment. BioTest captures and releases diagnostic data; the referring doctor is the sole clinical authority. This is the single most load-bearing fact about the business model — every downstream design decision (no internal review stage, single-action technician release, standalone referral accounts) follows from it.

## Who the client is

BioTest — a single-site diagnostic imaging and lab operator (5th Floor, Prof. Nelson Awori Building, Upper Hill, Nairobi). Core owned capability is ultrasound (10 sub-types); CT/MRI/X-Ray/Endoscopy/ECG/EEG/Colonoscopy are offered but treated uniformly by the platform whether performed in-house or brokered to a partner facility (explicit scope decision — not distinguished at the software level).

Business model: licensed SaaS, BioTest is the anchor tenant. Same-day report turnaround is the marketing claim the platform exists to actually back with data, not just assert.

## Target users and personas

Six named segments across three tiers — see BRS §4.2 for full detail:

| Tier | Segment | Role |
|---|---|---|
| External | Patient | Books, tracks, and collects results (self-booked, walk-in, or referred) |
| Partners | Doctor / Consultant | Independent or hospital-based physician, not contracted to BioTest — the only clinical authority in the system |
| Partners | Referral Front Desk | A doctor's staff, or a standalone referral coordinator with no linked practice |
| Internal | Front Desk | On-site intake/reception, no release rights |
| Internal | Lab Technician | Captures, judges accuracy, and releases in one action — no second reviewer |
| Internal | Lab Owner | Full administrative rights — catalog, staff, external-account approval, KPIs |

## Domain and industry

Healthcare / diagnostic imaging and pathology services, Kenya. Regulatory context: KENAS ACC-CD-37-01 (facility accreditation), Kenya Nuclear Regulatory Authority Act No. 29/2019 (radiation safety), Radiographers Act Cap 28/2022, Medical Practitioners and Dentists Act Cap 253, Kenya Data Protection Act 2019 (patient health data is sensitive personal data).

## Business objectives

Five measurable outcomes (BRS §2.2), all currently unmet because no system exists today to measure or achieve them:

1. ≥90% same-day SLA compliance (30–90 days post-launch)
2. ≥50% of doctor-referred patients arriving via a tracked referral, not untracked paper (30–90 days)
3. ≥30% patient self-booking adoption via the Patient App (3–6 months)
4. 100% audit coverage on every release, from day one
5. Baseline recapture rate established, then reduced 15% within 6 months

## Platform architecture at a glance

Three client surfaces on one shared data model — not three separate platforms: Internal Servicing Workspace (staff), Patient App (self-booking), Partner Portal (referrals — 2 flat roles, `consultant`/`front-desk`, both support standalone accounts with no linked practice, a real market differentiator no researched competitor offers). Three-tier stack: React/Next.js client, Express/BFF application, PostgreSQL via Supabase/PostgREST + Redis data tier. No internal clinical-review workflow exists anywhere in the design — technician release is single-action by deliberate choice (AD-02).

## Architecture documents (this session's output)

All under `docs/01-Architecture/`:

| Doc | Path | What it's for |
|---|---|---|
| BRS | `01.1-Requirements/business-requirements-specification.md` | Full business requirements — read this first for anything not covered above |
| Feature Backlog | `01.1-Requirements/feature-backlog.md` | 25 features across Foundation + S00–S04, P0–P3 priority |
| RSR | `01.1-Requirements/rsr-v1.0-draft.md` | Formal requirements baseline — 11 sequential NFRs, stage-by-stage scope |
| HLAD | `01.2-High-Level-Design/hlad-v1.0-draft.md` | Architecture design — 8 principles (AP-01–08), 7 decisions (AD-01–07), 13 architecture views |
| C4 diagrams | `01.2-High-Level-Design/system-context.md`, `containers.md` | System context (L1) and container (L2) views |
| User Journeys | `01.2-High-Level-Design/user-journeys.md` | 2 goal-level journeys, multi-actor merged |
| LLAD | `01.3-Low-Level-Design/llad-architecture-v1.0-draft.md` | Target-design low-level architecture — see its scope note, no code exists yet |
| Design System | `design-system/biotest-DESIGN.md` + 4 token CSVs | Navy/teal/slate palette, Manrope/Public Sans/IBM Plex Mono type |

## Known open decisions — do not silently resolve these

Tracked consistently across BRS §8, HLAD AD-07, and LLAD BIOTEST-G-01 through G-04:

- **Deployment/hosting/CI-CD** — no provider, environment topology, or pipeline tooling selected (blocks Build mode entry)
- **Observability tooling** — no APM/logging stack selected
- **Resilience/DR strategy** — no backup, RTO/RPO, or failover strategy defined
- **Test strategy** — no toolchain defined; blocks Build mode entry per `plan-feature`'s own pre-flight
- **Timeline and budget** — never provided, deferred throughout
- **Insurance/NHIF-SHA panel status** — unconfirmed; affects Back Office feature scope (F-S02-05)

## Standards

No project-specific `AGENTS.md`, `CLAUDE.md`, or `docs/standards/` exists yet in this repo. Until one is authored, `plan-feature-spec`/`feature-delivery-orchestrator` should fall back to their own bundled `references/coding-standards.md`.
