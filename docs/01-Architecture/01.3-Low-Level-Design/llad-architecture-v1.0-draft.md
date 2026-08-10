# BioTest Diagnostics4.0 Low Level Architecture Design

**Document ID:** LLAD-DWS.02.03-ARCH
**Version:** 1.0 (draft)
**Date:** 2026-08-05
**Status:** Draft — Pending Approval

> **Scope note, read before the rest of this document:** No code exists yet for BioTest Diagnostics4.0 — this LLAD documents *target* design, not as-built architecture. The research protocol this document type normally follows (`doc-research-architecture.md`) is code-graph-driven — it queries an actual repo's `src/` tree, `.env.example`, `package.json`, and route config files. None of that exists here. Every §3/§5 fact below traces to the BRS, HLAD v1.0, RSR v1.0, or `biotest-DESIGN.md` instead, and any fact that can only come from real code (folder structure, exact library names, environment variable names) is marked `[!] Target design — not yet implemented` rather than invented. Also flagging, as with the HLAD run: no `workspace/llad-annex/` traceability infrastructure is reachable in this session — Fit-Gap and Governance sections below summarise gaps and decisions inline rather than pointing to an annex CSV that doesn't exist. Finally, §5 follows this skeleton's own "13 Architecture Views" structure (Functional Decomposition through Frontend Architecture) rather than `doc-author-architecture.md`'s alternate "Feature Modules" interpretation of §5 — that interpretation requires `docs/feature-delivery/{stage}/{slug}/SPEC.md` files, which don't exist for a platform with no build yet. This is the documented waiver path for that exact blocker: "waive §5 Feature Modules — no SPECs exist."

---

# 1. Overview and Introduction

## 1.1 Business Context

| # | Title | Description |
|---|---|---|
| 1 | Strategic Context | BioTest Diagnostics4.0 replaces ad hoc manual coordination across four intake channels with one diagnostic-servicing system of record. |
| 2 | Sponsoring Organisation | BioTest, a single-site diagnostic imaging and lab business in Upper Hill, Nairobi. |
| 3 | User Communities | Six named segments across three tiers: Patient (External), Doctor/Consultant and Referral Front Desk (Partners), Front Desk, Lab Technician, and Lab Owner (Internal). |
| 4 | Data Sensitivity | Patient health data is sensitive personal data under Kenya's Data Protection Act 2019. |
| 5 | Document Scope | This LLAD covers the full BioTest Diagnostics4.0 system as a single in-scope system — architecture, data, integration, security, deployment, and quality views. |

## 1.2 Platform Vision

| # | Title | Description |
|---|---|---|
| 1 | Platform Objective | One system of record for diagnostic servicing, with no clinical decision-making inside the platform. |
| 2 | Platform Strategy | Model BioTest as a capture-and-release utility; the referring doctor remains the sole clinical authority. |
| 3 | Technology Foundation | Three-tier architecture: React/Next.js client, Express/BFF application, PostgreSQL via Supabase/PostgREST data tier, Redis cache/session. |
| 4 | Architecture Model | One SoA-level platform (DWS.02.03) serving three tiers through tier-appropriate S00/S01 entry points onto a shared S02+ data model. |

## 1.3 Document Scope and References

### 1.3.1 Design Scope

| # | System | Stage coverage |
|---|---|---|
| 1 | BioTest Diagnostics4.0 | Foundation, S00, S01, S02, S03, S04 |

### 1.3.2 Platform Architecture Document Set

| ID | Document | System / Scope | Type | Status |
|---|---|---|---|---|
| BRS-01 | Business Requirements Specification | BioTest Diagnostics4.0 | Requirements | Approved v1.0 |
| BL-01 | Feature Backlog | BioTest Diagnostics4.0 | Requirements | Approved v1.0 |
| HLAD-01 | High Level Architecture Design | BioTest Diagnostics4.0 | Architecture | Approved v1.0 |
| RSR-01 | Requirements Specification Report | BioTest Diagnostics4.0 | Requirements | Approved v1.0 |
| DS-01 | biotest-DESIGN.md | BioTest Diagnostics4.0 (3 surfaces) | Design System | Approved v1.0.0 |
| GAP-ANNEX | LLAD Traceability Annex | Cross-cutting | Traceability and Decision Register | Not reachable this session — see scope note above |

### 1.3.3 Baseline References

| # | Document | Version | Formal Title |
|---|---|---|---|
| 1 | HLAD | 1.0 | BioTest Diagnostics4.0 — High Level Architecture Design |
| 2 | RSR | 1.0 | BioTest Diagnostics4.0 — Requirements Specification Report |

---

# 2. Platform Context

## 2.1 Platform Architecture Model

BioTest Diagnostics4.0 is a Solution of Applications (SoA), DWS.02.03, parented under DWS.02 (Specialised, Work.Sector4.0 – Service4.0), Core stream — reproduced from HLAD §1.2/§4.1. It follows the DBP Foundation + 5-stage model (Foundation, S00–S04).

## 2.2 Solution Landscape

### 2.2.1 The Hub

BioTest Diagnostics4.0 is itself the hub for this engagement — there is no parent aggregating platform in scope for this LLAD. All three client surfaces (Internal Servicing Workspace, Patient App, Partner Portal) and the Application & Integration Layer sit within this single system boundary.

### 2.2.2 Application Spokes

| # | Spoke | Role |
|---|---|---|
| 1 | Internal Servicing Workspace | Front Desk, Lab Technician, Lab Owner client surface |
| 2 | Patient App | Patient client surface |
| 3 | Partner Portal | Doctor/Consultant, Referral Front Desk client surface |

### 2.2.3 Platform Service Spokes

| # | Spoke | Role |
|---|---|---|
| 1 | WhatsApp Business API | Booking and status messaging, 3rd-party |
| 2 | SMS/Email Gateway | Release notifications, 3rd-party SaaS |

## 2.3 User Communities

Reproduced from HLAD §5.2 System Actors: Patient (External), Doctor/Consultant and Referral Front Desk (Partners), Front Desk, Lab Technician, and Lab Owner (Internal) — 6 named segments, no change at LLAD level.

---

# 3. System Architecture

This section describes the architecture of BioTest Diagnostics4.0, covering its structural, data, behavioural, integration, security, deployment, and quality dimensions, as target design — no implementation exists to document as-built.

## 3.1 Design Principles

| # | ID | Principle | Rationale | Implication | Baseline reference |
|---|---|---|---|---|---|
| 1 | AP-01 | Single Data Model | Shared `exam-order`/`lab-service` entities must never fork per tier | Every client surface calls the same API Gateway and data model | HLAD §1.3 |
| 2 | AP-02 | Three-Tier Architecture | Business logic confined to the Application & Integration Layer | Client Tier is UI-only across all 3 surfaces | HLAD §1.3 |
| 3 | AP-03 | Universal Anchor | Every exam-order anchors to one transaction record regardless of source | S04 reads from this anchor, never rebuilds request state | HLAD §1.3 |
| 4 | AP-05 | Immutable Audit Trail | Every capture/release/recapture event logged, undeletable | Compliance Ledger has no delete path at any permission level | HLAD §1.3 |
| 5 | AP-08 | No Internal Clinical Review | BioTest does not diagnose | No workflow/approval engine exists; single-actor release | HLAD §1.3, RSR §3.3 |

## 3.2 Component and Structural Architecture

`[!] Target design — not yet implemented.` The tier model below is fixed by HLAD §2 and the design-system surface split in `biotest-DESIGN.md`; the actual `src/` folder structure, adapter organisation, and file layout have not been authored in any repository yet.

| # | Directory | Role | Key contents |
|---|---|---|---|
| 1 | `[!] apps/internal-workspace` | Client — Internal surface | Servicing Queue, catalog admin, dashboard UI (planned) |
| 2 | `[!] apps/patient-app` | Client — Patient surface | Booking, tracking, report retrieval UI (planned) |
| 3 | `[!] apps/partner-portal` | Client — Partner surface | Referral submission and tracking UI (planned) |
| 4 | `[!] services/api-gateway` | Application — Express/BFF | Business logic, orchestration, access control (planned) |
| 5 | `[!] services/foundation` | Application — background | Notification dispatch, audit logging (planned) |

| # | Tier | Type | Description |
|---|---|---|---|
| 1 | Client Tier | React / Next.js | 3 surfaces, no business logic |
| 2 | Application & Integration Layer | Express / BFF | API Gateway + Foundation Services |
| 3 | Data & Intelligence Layer | PostgreSQL via Supabase/PostgREST, Redis | System of record, RLS boundary |

## 3.3 Data Architecture

BioTest Diagnostics4.0 owns its full data domain — there is no upstream system of record it delegates to. Residency is constrained by Kenya's Data Protection Act 2019 (AP-07), which governs where patient health data may be hosted and processed.

| # | Store | Owner | What this system owns | What this system may not do |
|---|---|---|---|---|
| 1 | PostgreSQL (`platform`, `s1_discovery`, `s2_account`, `s3_ops`, `s4_diagnostics`) | BioTest Diagnostics4.0 | Full system of record — exam-order, lab-service, accounts, audit log | Allow any foreign key to point against the one-way schema direction (G-04) |
| 2 | Redis | BioTest Diagnostics4.0 | Session state, cache | Hold data the system treats as durable — Redis is not the system of record |

Client-side state management approach: `[!] Target design — not yet implemented.` No specific state-management library has been selected for the three Next.js client surfaces; this is deferred to implementation planning, not invented here.

## 3.4 Behaviour and Dynamic View

| # | Attribute | Value | Source |
|---|---|---|---|
| 1 | Auth guard model | Post-login for all S02+ routes across all 3 tiers; S00/S01 post-login for Internal, pre-login for Patient/Partners | BRS §7.1, HLAD §2 |
| 2 | Routing strategy | `[!] Target design — not yet implemented`; Next.js file-based routing is the platform default per HLAD §4.1, no route table authored yet | HLAD §4.1 |

| # | Flow | Type | Trigger | Steps | Outcome |
|---|---|---|---|---|---|
| 1 | Exam-order release | Platform-level state transition | Technician finalizes capture | Technician judges accuracy, submits, status flips in-progress to released | Notification fires, order closed |
| 2 | Session expiry | Platform-level | OTP/magic-link session times out | Client detects expired session, redirects to auth entry, re-issues link/OTP | User re-authenticates, session state cleared from Redis |

## 3.5 Integration and Interoperability

BioTest Diagnostics4.0 has two upstream integrations, both outbound-only from Foundation Services — no inbound 3rd-party integration exists.

| # | Service | Env var | Protocol | Direction | Auth mechanism |
|---|---|---|---|---|---|
| 1 | WhatsApp Business API | `[!] Target design — not yet implemented` | HTTPS/REST | Outbound (async) | API key/token (mechanism TBD) |
| 2 | SMS/Email Gateway | `[!] Target design — not yet implemented` | HTTPS/REST | Outbound (async) | API key (mechanism TBD) |

Both integrations are invoked exclusively from Foundation Services, never directly from the API Gateway or any client — consistent with AP-06 (No Reimplemented Foundation).

## 3.6 Security and Access Architecture

| # | Attribute | Value | Source |
|---|---|---|---|
| 1 | Identity provider | Phone/email OTP or magic-link, no external IdP | BRS §6, RSR §5.8 |
| 2 | Auth flow | `[!] Target design — not yet implemented` — OTP/magic-link mechanics not yet specified at library level | BRS §6 |
| 3 | Token storage mechanism | Session state in Redis (AP-02, G-05) — never application-instance memory | HLAD §5.10 |

| # | Role | Permissions | Enforcement point |
|---|---|---|---|
| 1 | `platform-admin` | Full cross-tier administration | API Gateway + RLS |
| 2 | `front-desk` (Internal) | Read queue, write intake, no release rights | API Gateway + RLS |
| 3 | `technician` (Internal) | Read/write own department queue, release own captures | API Gateway + RLS |
| 4 | `owner` (Internal) | Read/write/approve — full admin | API Gateway + RLS |
| 5 | `consultant` (Partners) | Browse, create, track own referrals; standalone account supported | API Gateway + RLS, tenant-isolated |
| 6 | `front-desk` (Partners) | Same rights as `consultant`, same role — see AD-03 | API Gateway + RLS, tenant-isolated |
| 7 | `patient` | Read/write own record only | API Gateway + RLS |

## 3.7 Deployment and Environment Strategy

`[!] Target design — not yet implemented.` No hosting provider, environment topology, or deployment mechanism has been selected — this is the same open decision as HLAD AD-07, surfacing again here rather than being silently resolved.

| # | Environment | Runtime | Hosting | Env var injection |
|---|---|---|---|---|
| 1 | Development | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 2 | Staging | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 3 | Production | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |

## 3.8 DevOps and CI/CD

`[!] Target design — not yet implemented.` Same open decision as §3.7 — no pipeline tooling chosen.

| # | Stage | Trigger | Action | Gate |
|---|---|---|---|---|
| 1 | Build | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 2 | Test | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 3 | Deploy | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |

## 3.9 Performance, Observability, and Quality Constraints

| # | NFR ID | Constraint | Threshold | Mechanism |
|---|---|---|---|---|
| 1 | NFR-04 | Same-day SLA compliance | ≥90% within 30–90 days of launch | Operations Dashboard, queue timestamps |
| 2 | NFR-05 | Stateless application tier | 100% session state in Redis | No in-memory session storage permitted (G-05) |
| 3 | NFR-07 | Multi-tenant Partner isolation | 100% per-account data isolation | RLS enforced at Data & Intelligence Layer (G-03) |

Observability tooling (logging, tracing, alerting) is `[!] Target design — not yet implemented` — no APM or logging stack has been selected. The only operational visibility specified so far is the Compliance Ledger (audit trail) and the Operations Dashboard (KPI/SLA view), both functional requirements, not infrastructure-level observability.

## 3.10 Test Strategy

`[!] Target design — not yet implemented.` No prototype or codebase exists yet against which to define a test pyramid or toolchain. This is honestly deferred rather than invented — a real test strategy requires the prototype stage (`plan-feature-spec`) to exist first.

| # | Test type | Tool | Gate | Evidence artefact |
|---|---|---|---|---|
| 1 | Unit | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 2 | Integration | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |
| 3 | Journey/UAT | `[!]` Decision required | `[!]` Decision required | `[!]` Decision required |

---

# 4. Fit-Gap Analysis

## 4.1 Methodology

This section assesses BioTest Diagnostics4.0's target design against the architecture principles (AP-01–AP-08, HLAD §1.3) and platform guardrails (G-01–G-07). Because no implementation exists yet, "conformance" here means the target design does not preclude the principle — not that running code has been observed to satisfy it.

## 4.2 Baseline Traceability

Full requirement-level traceability is normally recorded in `workspace/llad-annex/annex-requirement-traceability-*.csv` — not reachable in this session. Summary counts only: 8 architecture principles, 11 NFRs (RSR §5.8–5.12), 7 architectural decisions (HLAD §6.1), all traced inline across §3 and §5 of this document rather than in a separate matrix.

## 4.3 NFR Coverage

| NFR-ID | Covered in this LLAD | Status |
|---|---|---|
| NFR-01–03 (Security & Privacy) | §3.6 | Conformant by design |
| NFR-04–05 (Performance & Availability) | §3.9 | Conformant by design |
| NFR-06–07 (Scalability & Growth) | §3.3, §3.6 | Conformant by design |
| NFR-08–09 (Maintainability & Operability) | §3.2 | Conformant by design |
| NFR-10–11 (Compliance & Governance) | §5.12 | Deferred — hosting/evidence-export mechanics not yet decided |

## 4.4 Design Gaps

Design gaps identified during this fit-gap assessment are summarised below rather than recorded in an annex, per the scope note.

| Gap ID | Title | Priority | Status |
|---|---|---|---|
| BIOTEST-G-01 | No deployment environment, hosting provider, or CI/CD tooling selected | High | Open — same as HLAD AD-07 |
| BIOTEST-G-02 | No observability/APM tooling selected | Medium | Open |
| BIOTEST-G-03 | No resilience/DR strategy defined | Medium | Open |
| BIOTEST-G-04 | No test strategy or toolchain defined | High | Open — blocks Build mode entry per `plan-feature` pre-flight |

---

# 5. Architecture Views

## 5.1 Functional Decomposition

<!-- gate: G5 -->

### 5.1.1 View Scope

This view decomposes BioTest Diagnostics4.0 into its functional component groups, reproduced from HLAD §5.5–§5.6.

### 5.1.2 Design

Seven component groups: Servicing Queue, Service Catalog, Referral Access, Patient Access, Operations Console, Compliance Ledger, Notification Dispatch — organised into Presentation, Application, Domain, and Infrastructure layers per HLAD §5.6.

### 5.1.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | Single system, 7 component groups across 4 logical layers | `containers.md` (HLAD Implementation Architecture) | Conformant by design |

### 5.1.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | AP-01 Single Data Model | HLAD §1.3 | All component groups | Data fragmentation across tiers, defeats the universal anchor |

### 5.1.5 Architecture Decisions and Open Items

No gap or deviation items are recorded in this sub-section.

## 5.2 Data Architecture

<!-- gate: G6 -->

### 5.2.1 View Scope

This view specifies the platform's schema partitioning and entity ownership, reproduced from HLAD §5.9.

### 5.2.2 Design

`platform` (IAM, audit), `s1_discovery` (published catalog), `s2_account` (exam-order, the universal anchor), `s3_ops` (queue state), `s4_diagnostics` (compliance export) — strictly one-way foreign key direction (G-04).

### 5.2.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | 5-schema partition, single Postgres instance | HLAD §5.9 data_rows | Conformant by design |

### 5.2.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | G-04 one-way schema dependency | `platform-context.md` §4 | All 5 schemas | Circular dependency, breaks stage-model integrity |

### 5.2.5 Architecture Decisions and Open Items

No gap or deviation items are recorded in this sub-section.

## 5.3 Integration Architecture

<!-- gate: G7 -->

### 5.3.1 View Scope

This view specifies BioTest's two outbound integrations, reproduced from HLAD §5.8 and detailed further in §3.5 above.

### 5.3.2 Design

Foundation Services is the sole caller of both WhatsApp Business API and the SMS/Email Gateway, both async, both routed through the Data API for account/order context rather than direct database access (AD-05).

### 5.3.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | 2 outbound integrations, 0 inbound | HLAD §5.8 integration_rows | Conformant by design |

### 5.3.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | G-02 API contracts only | `platform-context.md` §4 | Foundation Services | Direct DB access from a background worker |

### 5.3.5 Architecture Decisions and Open Items

**Table 1 — Governing decisions**

| # | Decision | ADR ref | Status |
|---|---|---|---|
| 1 | Foundation Services routes through Data API, never PostgreSQL directly | AD-05 | Accepted |

No open items are recorded for this view.

## 5.4 Security Architecture

<!-- gate: G8 -->

### 5.4.1 View Scope

This view specifies the platform's access control and data protection model, detailed in §3.6 above.

### 5.4.2 Design

RLS enforced at the Data & Intelligence Layer (G-03), 7-role RBAC model across 3 tiers, DPA 2019 compliance obligation on all patient health data.

### 5.4.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | 7 roles, RLS-enforced, standalone Partner accounts supported | HLAD §5.10 | Conformant by design |

### 5.4.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | Kenya DPA 2019 | BRS §3.1 | All patient health data | Regulatory non-compliance |

### 5.4.5 Architecture Decisions and Open Items

**Table 1 — Governing decisions**

| # | Decision | ADR ref | Status |
|---|---|---|---|
| 1 | Two flat RFP roles, standalone accounts supported, no admin hierarchy | AD-03 | Accepted |

No open items are recorded for this view.

## 5.5 Deployment Architecture

<!-- gate: G9 -->

### 5.5.1 View Scope

This view would specify hosting topology, environments, and network boundaries.

### 5.5.2 Design

`[!]` No design exists — see §3.7.

### 5.5.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | No hosting decision made | — | Gap |

### 5.5.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | Kenya data residency (AP-07) | HLAD §1.3 | Hosting provider selection | Non-compliant hosting location |

### 5.5.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the Deployment Architecture view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Select hosting provider and environment topology | BIOTEST-G-01 (Staging blocker) | Business/Engineering | Before Build mode entry |

## 5.6 Observability and Operations

<!-- gate: G10 -->

### 5.6.1 View Scope

This view would specify logging, tracing, and alerting infrastructure.

### 5.6.2 Design

`[!]` No design exists — see §3.9. The Compliance Ledger and Operations Dashboard are functional requirements, not an observability stack.

### 5.6.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | No APM/logging tooling selected | — | Gap |

### 5.6.4 Constraints and Obligations

No gap or deviation items are recorded in this sub-section beyond the open item below.

### 5.6.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the Observability and Operations view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Select logging/APM tooling | BIOTEST-G-02 | Engineering | Before Build mode entry |

## 5.7 Resilience and Recovery

<!-- gate: G11 -->

### 5.7.1 View Scope

This view would specify backup, failover, and disaster-recovery strategy.

### 5.7.2 Design

`[!]` No design exists — not addressed anywhere upstream (BRS, HLAD, RSR).

### 5.7.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | No backup/DR strategy defined | — | Gap |

### 5.7.4 Constraints and Obligations

No gap or deviation items are recorded in this sub-section beyond the open item below.

### 5.7.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the Resilience and Recovery view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Define backup frequency, RTO/RPO, and failover strategy | BIOTEST-G-03 | Business/Engineering | Before Production launch |

## 5.8 Performance and Scalability

<!-- gate: G12 -->

### 5.8.1 View Scope

This view specifies throughput and scale obligations, detailed in §3.9 above.

### 5.8.2 Design

Same-day SLA (NFR-04) as the primary performance obligation; stateless application instances (NFR-05) and multi-tenant Partner isolation (NFR-07) as the scalability model; `site_id` insurance (NFR-06) as the growth path.

### 5.8.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | SLA-driven, stateless, tenant-isolated, site-insured | RSR §5.9–5.10 | Conformant by design |

### 5.8.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | G-05 stateless instances | `platform-context.md` §4 | Application & Integration Layer | Horizontal scaling breaks |

### 5.8.5 Architecture Decisions and Open Items

**Table 1 — Governing decisions**

| # | Decision | ADR ref | Status |
|---|---|---|---|
| 1 | `site_id` architectural insurance added to core entities | AD-04 | Accepted |

No open items are recorded for this view.

## 5.9 Identity and Access

<!-- gate: G13 -->

### 5.9.1 View Scope

This view specifies the platform's identity and RBAC model, detailed in §3.6 above.

### 5.9.2 Design

Phone/email OTP or magic-link authentication, no external IdP, 7-role RBAC across 3 tiers, 2 flat roles for Partners (AD-03), standalone accounts supported without a parent-role dependency.

### 5.9.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | 7-role RBAC, single IAM service (AP-06) | §3.6 above | Conformant by design |

### 5.9.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | G-06 no reimplemented Foundation | `platform-context.md` §4 | IAM across all 3 tiers | Duplicated identity logic per surface |

### 5.9.5 Architecture Decisions and Open Items

**Table 1 — Governing decisions**

| # | Decision | ADR ref | Status |
|---|---|---|---|
| 1 | Two flat RFP roles, standalone accounts supported | AD-03 | Accepted |

No open items are recorded for this view.

## 5.10 Test Architecture

<!-- gate: G14 -->

### 5.10.1 View Scope

This view would specify the test pyramid and toolchain, detailed in §3.10 above.

### 5.10.2 Design

`[!]` No design exists — no prototype or codebase exists yet against which to define a test strategy.

### 5.10.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | No test strategy defined | — | Gap |

### 5.10.4 Constraints and Obligations

No gap or deviation items are recorded in this sub-section beyond the open item below.

### 5.10.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the Test Architecture view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Define test pyramid and toolchain | BIOTEST-G-04 (Staging blocker) | Engineering | Before `plan-feature` Build mode entry |

## 5.11 DevOps and CI/CD

<!-- gate: G15 -->

### 5.11.1 View Scope

This view would specify the build/deploy pipeline, detailed in §3.8 above.

### 5.11.2 Design

`[!]` No design exists — same open decision as §5.5 Deployment Architecture (HLAD AD-07).

### 5.11.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | No CI/CD tooling selected | — | Gap |

### 5.11.4 Constraints and Obligations

No gap or deviation items are recorded in this sub-section beyond the open item below.

### 5.11.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the DevOps and CI/CD view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Select CI/CD tooling and pipeline stages | BIOTEST-G-01 (Staging blocker) | Engineering | Before Build mode entry |

## 5.12 Compliance and Regulatory

<!-- gate: G16 -->

### 5.12.1 View Scope

This view specifies BioTest's regulatory obligations, reproduced from HLAD §5.10.

### 5.12.2 Design

KENAS ACC-CD-37-01 (facility accreditation), KNRA Act No. 29/2019 (radiation safety, applies uniformly per in-house/brokered scope decision), Radiographers Act Cap 28/2022, Kenya DPA 2019.

### 5.12.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | Compliance Ledger supports evidence export, on-demand | HLAD §5.10 | Deferred — response-time mechanics not yet decided (NFR-10) |

### 5.12.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | KENAS ACC-CD-37-01 | BRS §3.1 | Facility/equipment accreditation | Loss of accreditation |
| 2 | KNRA Act No. 29/2019 | BRS §3.1 | Radiation safety licensing | Regulatory penalty |

### 5.12.5 Architecture Decisions and Open Items

No governing decisions exist yet for this view.

> "The items below record unresolved design and implementation questions arising from the Compliance and Regulatory view. Items flagged as resolving a registered gap are Staging promotion blockers; the resolution gate in each row defines the mandatory closure point before the associated promotion or dependent artefact delivery."

**Table 2 — Open items**

| # | Open item | Gap ref | Owner | Resolution gate |
|---|---|---|---|---|
| 1 | Define evidence-export response-time target (NFR-10) | — | Business | Before S04 feature build |

## 5.13 Frontend Architecture

<!-- gate: G17 -->

### 5.13.1 View Scope

This view specifies the 3-surface client design system, reproduced from `biotest-DESIGN.md`.

### 5.13.2 Design

Navy/teal/slate color system, Manrope/Public Sans/IBM Plex Mono typography, dark mode scoped to the Internal Servicing Workspace only (AD-06), mobile-first Patient/Partner surfaces.

### 5.13.3 Per-System Application

| # | System | How concern applies | Key artefact | Conformance status |
|---|---|---|---|---|
| 1 | BioTest Diagnostics4.0 | 3 surfaces, 1 shared design system, split dark-mode support | `biotest-DESIGN.md` | Conformant by design |

### 5.13.4 Constraints and Obligations

| # | Constraint | Source | Applies to | Consequence of breach |
|---|---|---|---|---|
| 1 | WCAG 2.1 AA (NFR-09) | RSR §5.11 | All 3 surfaces | Accessibility non-conformance |

### 5.13.5 Architecture Decisions and Open Items

**Table 1 — Governing decisions**

| # | Decision | ADR ref | Status |
|---|---|---|---|
| 1 | Teal accent divergence from public brand | AD-01 | Accepted |
| 2 | Dark mode scoped to Internal Workspace only | AD-06 | Accepted |

No open items are recorded for this view.

---

# 6. Architecture Governance

## 6.1 Architecture Principles Conformance

All 8 architecture principles from HLAD §1.3 are conformant-by-design at the target-design level assessed in this LLAD — none are violated by anything specified in §3 or §5. AP-04 (Downward-Only Dependency) and AP-07 (Data Sovereignty) are conformant in schema/hosting *intent* but AP-07's hosting mechanics remain open pending BIOTEST-G-01.

## 6.2 Architecture Decision Records

Architecture decisions governing this system are recorded in full in HLAD §6.1. The following are relevant to this LLAD.

| ID | Title | Status | Decision summary |
|---|---|---|---|
| AD-01 | Accent color divergence | Accepted | Teal accent introduced, diverges from flyer's same-hue blue |
| AD-02 | Single-action release model | Accepted | No internal clinical-review stage |
| AD-03 | Two-role RFP model | Accepted | Flat `consultant`/`front-desk` roles, standalone accounts supported |
| AD-04 | `site_id` architectural insurance | Accepted | Multi-site readiness field added, no build commitment |
| AD-05 | Foundation Services routes through Data API | Accepted | No direct PostgreSQL access from background services |
| AD-06 | Dark mode scoped to Internal Workspace | Accepted | Patient/Partner surfaces light-mode only |
| AD-07 | Deployment topology and repository strategy | Decision required | Not yet decided — root cause of BIOTEST-G-01 |

## 6.3 Non-Functional Requirements Summary

All 11 NFRs (NFR-01 through NFR-11) are reproduced in full in RSR §5.8–§5.12. This LLAD's §4.3 maps each to its covering §3/§5 section.

## 6.4 Open Items Summary

| Gap ID | Title | Priority | Resolution gate |
|---|---|---|---|
| BIOTEST-G-01 | Deployment/hosting/CI-CD not selected | High | Before Build mode entry |
| BIOTEST-G-02 | Observability/APM tooling not selected | Medium | Before Build mode entry |
| BIOTEST-G-03 | Resilience/DR strategy not defined | Medium | Before Production launch |
| BIOTEST-G-04 | Test strategy/toolchain not defined | High | Before `plan-feature` Build mode entry |

## 6.5 Configuration Record Backlog (CRD/AB-XC)

| # | Item | Design reference | Gate |
|---|---|---|---|

No Type 2 (build/evidence) configuration items exist yet — nothing has been built against which to record deployment evidence.

---

# Appendix A — Glossary

Reproduced from HLAD §6.3 — see that document for the full 16-term glossary (exam-order, source, release, recapture, clinic-user, `site_id`, S00–S04).

# Appendix B — Acronyms

See Appendix A above; this LLAD does not introduce acronyms beyond those already defined in HLAD §6.3.

# Appendix C — Reference Documents

| # | Document | Version |
|---|---|---|
| 1 | Business Requirements Specification | 1.0 |
| 2 | Feature Backlog | 1.0 |
| 3 | High Level Architecture Design | 1.0 |
| 4 | Requirements Specification Report | 1.0 |
| 5 | biotest-DESIGN.md | 1.0.0 |

# Appendix D — Architecture Decision Records (Full)

Full ADR text (Decision Area, Decision Statement, Rationale, Impact, Status) for AD-01 through AD-07 is recorded in HLAD §6.1 — not duplicated here per the cross-link-don't-duplicate convention.

# Appendix E — Diagram Source Files

| # | File | Notation |
|---|---|---|
| 1 | `system-context.md` | C4 L1, Mermaid |
| 2 | `containers.md` | C4 L2, PlantUML |
| 3 | `user-journeys.md` | Mermaid journey |
