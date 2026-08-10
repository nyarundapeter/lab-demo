# BioTest Diagnostics4.0 — Requirements Specification Report

**Version:** 1.0 (draft)
**Date:** 2026-08-05
**Status:** Draft — Pending Approval

---

## 1. Introduction

This Requirements Specification Report formalises the business, product, and technical requirements for BioTest Diagnostics4.0, a diagnostic servicing platform for BioTest, a Nairobi diagnostic imaging and lab business. It establishes the business context, platform vision, and strategic objectives against which every requirement in this document is traced.

### 1.1 Business Context

| # | Title | Description |
|---|---|---|
| 01 | Strategic Objectives | Give BioTest one system of record for diagnostic servicing — intake through release — with role-appropriate access for internal staff, patients, and referring clinics, and no clinical decision-making inside the platform itself. |
| 02 | Market Dynamics | Private outpatient diagnostics is an active growth segment in urban Nairobi, positioned against public-hospital wait times. Comparable platforms researched (Abbadox, EMSOW, Medicai, MedicsRIS, Simplirad) universally assume an internal clinical-review stage and a practice-linked referrer account — neither assumption holds for BioTest. |
| 03 | Stakeholder Segments | Six named segments across three tiers: Patient and Doctor/Consultant plus Referral Front Desk (External/Partners), and Front Desk, Lab Technician, and Lab Owner (Internal). |
| 04 | Current Challenges | Intake runs across four disconnected channels (walk-in, WhatsApp, phone, referral) with no shared record; the "same-day report" claim is currently unbacked by any turnaround tracking; referral relationships and audit trail are entirely undocumented today. |

### 1.2 Platform Vision

| # | Title | Description |
|---|---|---|
| 01 | Platform Objective | Provide a single diagnostic-servicing system of record covering intake, quality-controlled capture, and release, replacing ad hoc manual coordination across three intake channels. |
| 02 | Platform Strategy | Model BioTest as a capture-and-release utility, not a diagnosing provider — the referring doctor remains the sole clinical authority; the platform's role is turnaround, accuracy, and traceability. |
| 03 | Platform Technology | Three-tier application architecture: React/Next.js client tier, Express/BFF application tier, PostgreSQL via Supabase/PostgREST data tier, with Redis for cache and session state. |
| 04 | Platform Architecture | One SoA-level platform (DWS.02.03) serving three user tiers — Internal, External (Patient), Partners (Doctor/Referral Front Desk) — through tier-appropriate S00/S01 entry points onto a shared S02+ data model. |
| 05 | Platform Implementation | Feature-backlog-driven delivery, P0 features forming the prototype-critical path (Servicing Queue, Catalog, Referral and Patient self-service), P1 features completing initial release scope. |
| 06 | Platform Deployment | Single-site deployment at launch (Upper Hill, Nairobi); a `site_id` field is carried on core entities as architectural insurance against a plausible second location within 12–24 months. |

### 1.3 Strategic Objectives

| # | ID | Objective | Description |
|---|---|---|---|
| 01 | SO-01 | Same-day SLA compliance | The platform must achieve ≥90% of exam-orders released same calendar day as capture within 30–90 days of launch. |
| 02 | SO-02 | Referral channel adoption | The platform must achieve ≥50% of doctor-referred patients arriving via a tracked referral, not untracked paper, within 30–90 days of launch. |
| 03 | SO-03 | Patient self-booking adoption | The platform must achieve ≥30% of walk-in-eligible patients self-booking via the Patient App within 3–6 months of launch. |
| 04 | SO-04 | Complete audit coverage | The platform must carry a complete audit entry for 100% of releases from day one. |
| 05 | SO-05 | Recapture rate reduction | The platform must establish a baseline recapture rate within 90 days and reduce it 15% within 6 months. |
| 06 | SO-06 | Standalone referral-account differentiation | The platform must support a referring account with no linked practice — a capability absent from every comparable platform researched (Abbadox, EMSOW, Medicai, MedicsRIS, Simplirad). |

---

## 2. Solution Architecture

This section presents the platform-level architecture context — the three technology layers and the strategic model they serve — rendered identically to HLAD §2, since both documents share the same platform-context research.

### 2.1 Platform Context

BioTest Diagnostics4.0 centralises all diagnostic-servicing state in one data model, exposed through a single application layer to three distinct client surfaces. No tier has direct database access; every read and write passes through the Application & Integration Layer and is mediated at the Data & Intelligence Layer boundary.

| # | Layer | Role |
|---|---|---|
| 01 | Client Tier | The user-facing digital engagement layer — web (React/Next.js) applications for the three surfaces. Renders UI and calls APIs only; no business logic lives here. |
| 02 | Data & Intelligence Layer | The data backbone — PostgreSQL as the system of record accessed via Supabase/PostgREST, Redis for cache and session state. Row-level security and database roles are enforced at this boundary. |
| 03 | Application & Integration Layer | The operational foundation — Express/BFF APIs, domain services, and background jobs. Business logic, orchestration, validation, and access control live exclusively here. |

### 2.2 Client Tier

| # | Feature | Description |
|---|---|---|
| 01 | Internal Servicing Workspace | Desktop/tablet-oriented application for Front Desk, Lab Technician, and Lab Owner. |
| 02 | Patient App | Mobile-first application for booking, tracking, and report retrieval. |
| 03 | Partner Portal | Mobile-first application for Doctor/Consultant and Referral Front Desk. |

### 2.3 Data & Intelligence Layer

| # | Feature | Description |
|---|---|---|
| 01 | PostgreSQL system of record | Schema-partitioned per the platform stage model, one-way foreign key direction. |
| 02 | Data API (Supabase/PostgREST) | Mediates all database access; enforces RLS independently of application-tier auth. |
| 03 | Redis | Cache and session state; application instances remain stateless. |

### 2.4 Application & Integration Layer

| # | Feature | Description |
|---|---|---|
| 01 | API Gateway (Express/BFF) | Single entry point for all three client applications. |
| 02 | Foundation Services | Notification dispatch and audit logging, routed through the Data API. |
| 03 | Notification integrations | WhatsApp Business API and an SMS/Email gateway. |

---

## 3. Business and Product Requirements

This section formalises the business, people, process, and technology requirements sourced from the Business Requirements Specification, establishing the requirement baseline the platform delivery programme must satisfy.

### 3.1 Product Outcomes

This sub-section establishes the measurable outcomes the platform must deliver.

| # | Outcome | Detail | Metric or Signal | Phase Tag |
|---|---|---|---|---|
| 01 | Same-day SLA compliance | ≥90% of exam-orders released same day as capture | Orders released same-day ÷ total orders, weekly | Leading (30–90 days) |
| 02 | Referral channel adoption | ≥50% of doctor-referred patients via tracked referral | Orders with source=referral ÷ total doctor-referred | Leading (30–90 days) |
| 03 | Patient self-booking adoption | ≥30% self-book via Patient App | Orders with source=dxp ÷ total orders | Lagging (3–6 months) |
| 04 | Complete audit coverage | 100% of releases carry a complete audit entry | Audited releases ÷ total releases | Leading (30 days) |
| 05 | Recapture rate reduction | Baseline then 15% reduction | Recaptured orders ÷ total orders | Lagging (3–6 months) |

### 3.2 People / Personas

This sub-section identifies the stakeholder communities the platform must serve.

| Persona Group | Persona | Purpose |
|---|---|---|
| External | Patient | Books, tracks, and collects diagnostic results |
| Partners | Doctor / Consultant | Refers patients and reviews released results; the platform's only clinical authority |
| Partners | Referral Front Desk | Submits and tracks referrals, for a practice or standalone |
| Internal | Front Desk | Registers intake and manages patient handover |
| Internal | Lab Technician | Captures, judges accuracy, and releases exam-orders in one action |
| Internal | Lab Owner | Oversees operations, catalog, staff, and external-account approval |

### 3.3 Process Requirements

This sub-section establishes the process obligations the platform must satisfy across the exam-order lifecycle.

| # | Process Requirement | Description |
|---|---|---|
| 01 | Uniform intake registration | The platform must register an exam-order the same way regardless of source channel (walk-in, self-booked, referred), tagging its source. |
| 02 | Single-action release | The platform must let the capturing technician judge accuracy and release an order in one action, with no second internal reviewer. |
| 03 | Recapture handling | The platform must let a technician redo a capture themselves when judged inadequate, without a status escalation to a second party. |
| 04 | External-account approval | The platform must require Lab Owner approval before a new referral or patient account is activated. |

### 3.4 Service Requirements

This sub-section establishes the service capabilities the platform must provide across its catalog and marketplace surfaces.

| # | Service Requirement | Description |
|---|---|---|
| 01 | Department-structured catalog | The platform must organise services into named departments with independent SLA targets. |
| 02 | Tier-scoped publishing | The platform must let a service be published differently to Internal, Patient, and Partner tiers (internal-only, patient-visible, referrer-visible). |
| 03 | Standalone Partner accounts | The platform must let a `consultant` or `front-desk` account operate independently of any specific linked practice. |

### 3.5 Technology Requirements

This sub-section establishes the technology obligations that bound every implementation decision.

| # | Technology Requirement | Description |
|---|---|---|
| 01 | Three-tier separation | The platform must confine business logic to the Application & Integration Layer; the Client Tier must render UI only. |
| 02 | Mediated data access | The platform must route all database access through the Data API; no client or service may query PostgreSQL directly. |
| 03 | Stateless application instances | The platform must hold no session state in application-instance memory; Redis is the sole session store. |

### 3.6 Data Requirements

This sub-section establishes the data handling obligations for the platform's core entities.

| # | Data Requirement | Description |
|---|---|---|
| 01 | Universal transaction anchor | Every exam-order, from any source channel, must anchor to a single `s2_account.requests`-equivalent record. |
| 02 | Immutable audit log | The platform must log every capture, release, and recapture event immutably, undeletable at any permission level. |
| 03 | Multi-site insurance field | The platform must carry a `site_id` field on `exam-order` and staff accounts from launch, with no build commitment beyond the field. |

### 3.7 Experience Requirements

This sub-section establishes the experience obligations across the platform's three client surfaces.

| # | Experience Requirement | Description |
|---|---|---|
| 01 | Mobile-first Patient and Partner surfaces | The platform must render the Patient App and Partner Portal mobile-first, matching the WhatsApp/phone-first usage pattern already established. |
| 02 | Accessibility conformance | The platform must meet WCAG 2.1 AA across all three surfaces, AAA target for primary body text. |
| 03 | Scoped dark mode | The platform must offer dark mode only on the Internal Servicing Workspace; Patient and Partner surfaces remain light-mode only. |

---

## 4. Scope, Assumptions, and Constraints

This section defines the implementation boundary, the assumptions the programme relies on, and the constraints that govern delivery.

### 4.1 Implementation Scope

This sub-section defines the implementation boundary for BioTest Diagnostics4.0.

In scope: exam-order intake, capture, quality control, and release across all three source channels; the internal servicing queue, staff roles, and catalog; referring-clinic and solo-consultant self-service; patient self-booking and status tracking; audit trail and SLA/turnaround tracking. Out of scope: clinical diagnosis or treatment; DICOM viewing or PACS integration; LIS/RIS-grade lab equipment integration; live payment processing or financial rails; true multi-site operation at launch (though a `site_id` field is carried as insurance).

### 4.2 Assumptions and Dependencies

This sub-section records the assumption and dependency context the programme relies on.

| # | Type | Item | Description |
|---|---|---|---|
| 01 | Assumption | Greenfield build | No existing BioTest system integration is assumed; the platform replaces manual coordination, not another system. |
| 02 | Assumption | Single-site at launch | Deployment assumes one physical location (Upper Hill) at launch. |
| 03 | Dependency | Notification channels | WhatsApp Business API and an SMS/Email gateway are external dependencies for release and booking notifications. |

### 4.3 Key Assumptions

This sub-section states which assumptions are load-bearing for the programme and would require re-scoping if invalidated.

| # | Assumption | Description |
|---|---|---|
| 01 | No internal clinical review | The entire single-action release model depends on BioTest never performing clinical interpretation; if this changes, the workflow model requires redesign. |
| 02 | Standalone Partner accounts are the differentiator | The RFP tier's value proposition depends on supporting practice-less referral accounts; this is unconfirmed against real user testing. |
| 03 | Insurance/NHIF-SHA panel status | Back Office scope assumes no live insurance claims integration; if BioTest holds or pursues panel status, this assumption is invalidated. |

### 4.4 Constraints

This sub-section states the regulatory, contractual, technical, and operational constraints governing delivery.

| # | Constraint | Description |
|---|---|---|
| 01 | Kenya Data Protection Act 2019 | Patient health data is sensitive personal data; hosting/processing must support DPA compliance. |
| 02 | KENAS ACC-CD-37-01 | Facility accreditation criteria for diagnostic imaging facilities apply regardless of platform scope. |
| 03 | KNRA Act No. 29/2019 | Radiation safety licensing applies to any irradiating equipment, in-house or partner-brokered. |
| 04 | Single data model rule | Domain modularity across the three tiers must never fragment the shared `exam-order`/`lab-service` entities. |

### 4.5 Dependencies

This sub-section records the external systems and platform preconditions the programme relies on.

| # | Dependency | Description |
|---|---|---|
| 01 | WhatsApp Business API | Booking confirmation and status-messaging channel. |
| 02 | SMS/Email Gateway | Release notification channel. |
| 03 | Hosting/deployment decision | No environment or hosting provider has been selected — see HLAD AD-07. |

---

## 5. Requirement Areas

This section formalises the functional requirements and non-functional requirements for each delivery stage and platform quality area, sourced from the Business Requirements Specification and Feature Backlog.

### 5.1 Foundation

The Foundation stage is shared infrastructure — not a navigable stage — that every other stage depends on. Its objective is to provide IAM, the core data model, the API gateway, the design system, and the notification and audit pipelines once, for all three tiers. It does not include any tier-specific business logic.

#### Backlog

The following candidate requirements are registered for this stage, pending prioritisation and sprint assignment.

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Identity & Access Management | Auth + RBAC across 3 tiers, multi-tenant isolation for Partners | P1 |
| 02 | Core Data Model | Shared entities: exam-order, lab-service, accounts, `site_id` insurance | P1 |
| 03 | Application / API Gateway | Business logic, orchestration tier | P1 |
| 04 | Notification Engine | Multi-channel release + status alerts | P1 |
| 05 | Audit & Event Pipeline | Immutable audit log infrastructure | P1 |

#### Inclusions

The following capabilities are explicitly within the scope of this stage.

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Shared IAM | Single identity service consumed by all 3 tiers |
| 02 | Shared data model | One `exam-order`/`lab-service` schema, never forked |

#### Exclusions

The following capabilities are explicitly excluded from this stage.

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Tier-specific UI | No navigable screens — Foundation is infrastructure only |

### 5.2 S00 — Orientations

S00 is the entry-point stage per tier — post-login for Internal, pre-login for Patient and Partners. Its objective is orientation and routing, not transaction. It does not include catalog browsing or transactional capability.

#### Backlog

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Home — Internal Orientation | Post-login landing, personalized per Internal segment | P1 |
| 02 | Front Door — Patient | Pre-login marketing landing, booking CTA | P1 |
| 03 | Front Door — Partners | Pre-login landing for referring clinicians | P1 |

#### Inclusions

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Tier-shared entry | One S00 per tier, not per named segment |

#### Exclusions

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Transaction initiation | Booking or referral submission belongs to S01, not S00 |

### 5.3 S01 — Marketplace

S01 is the catalog-discovery stage, structured as 4 entries per tier (Discern/Design/Deploy/Drive). Its objective is to let each tier discover and initiate against BioTest's service catalog. It does not include ongoing operational task management.

#### Backlog

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Explore Services (Internal) | Browse internal 4-department catalog | P1 |
| 02 | Configure Catalog | Edit listings, SLA targets, department structure | P1 |
| 03 | New Order | Register an exam-order against a catalog service | P1 |
| 04 | Book a Visit (Patient) | Initiate booking, creates exam-order source=dxp | P1 |
| 05 | Start a Referral (Partners) | Gates into authenticated referral submission | P1 |

#### Inclusions

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Pre-login catalog browse | Patient and Partner tiers see SLA before authenticating |

#### Exclusions

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Order tracking | Belongs to S02, not S01 |

### 5.4 S02 — WorkSpaces

S02 is the authenticated, transactional stage — the Servicing Queue, My Bookings, My Referrals, and administrative surfaces. Its objective is to carry every exam-order from intake through release. It does not include cross-domain analytics, which belongs to S03.

#### Backlog

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Servicing Queue — Intake | Register arrivals, tag source, hand off | P1 |
| 02 | Servicing Queue — Capture & Release | Single-action release | P1 |
| 03 | Queue Oversight | Status/progress monitoring | P1 |
| 04 | My Bookings | Patient order tracking | P1 |
| 05 | My Referrals | Partner referral tracking | P1 |
| 06 | Staff & Roles | Manage technician/front-desk accounts | P2 |
| 07 | External Account Approval | Approve referral/patient accounts | P2 |

#### Inclusions

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Full exam-order lifecycle | Intake through release, one action, no review gate |

#### Exclusions

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Clinical interpretation | Never performed at this or any stage |

### 5.5 S03 — Fulfilment & Operations

S03 is the operator-facing analytics stage — the Operations Dashboard. Its objective is aggregate visibility into queue health and SLA compliance for the Lab Owner. It does not include per-order action capability.

#### Backlog

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Operations Dashboard | SLA compliance, throughput, department load KPIs | P2 |

#### Inclusions

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Aggregate KPI visibility | Queue-level, not order-level |

#### Exclusions

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Order-level gating | No approval action exists at this or any stage |

### 5.6 S04 — Specialised

S04 is the vertical-specific stage — Audit & Compliance, existing only because of BioTest's regulatory context. Its objective is to make compliance evidence exportable on demand. It does not include real-time regulator access.

#### Backlog

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | Audit & Compliance Log | Immutable audit trail viewer, regulatory evidence export | P2 |

#### Inclusions

| # | Inclusion Area | Description |
|---|---|---|
| 01 | Evidence export | On-demand export for KENAS/KNRA/DPA inspection |

#### Exclusions

| # | Exclusion Area | Description |
|---|---|---|
| 01 | Standing regulator account | Considered and declined this session — export capability only |

### 5.7 Stage Y

Stage Y is not applicable to BioTest Diagnostics4.0. The platform's stage model has five stages (Foundation, S00–S04); no seventh stage-type unit exists. This section is retained, structurally complete, to close out the RSR skeleton's stage-unit count rather than silently omitting it.

#### Backlog

The following candidate requirements are registered for this stage, pending prioritisation and sprint assignment.

| # | Feature | Description | Priority |
|---|---|---|---|
| 01 | N/A | No Stage Y exists in this platform's 5-stage model (Foundation, S00–S04) | N/A |

#### Inclusions

The following capabilities are explicitly within the scope of this stage.

| # | Inclusion Area | Description |
|---|---|---|
| 01 | None | No capabilities are scoped to a non-existent stage |

#### Exclusions

The following capabilities are explicitly excluded from this stage.

| # | Exclusion Area | Description |
|---|---|---|
| 01 | All capabilities | Everything BioTest Diagnostics4.0 delivers is scoped to Foundation or S00–S04 |

### 5.8 NFR — Security & Privacy

The platform must protect patient health data and enforce access control independently of any single tier's own auth checks.

| # | NFR-ID | Non-Functional Requirement | Description | Measurable Target |
|---|---|---|---|---|
| 01 | NFR-01 | Row-level security enforcement | The platform must enforce RLS at the Data & Intelligence Layer, independent of application-tier auth checks. | 100% of data access paths RLS-enforced |
| 02 | NFR-02 | Sensitive data protection | The platform must classify and protect patient health data as sensitive personal data under Kenya DPA 2019. | Zero unencrypted at-rest storage of health data |
| 03 | NFR-03 | Audit immutability | The platform must log every capture, release, and recapture event immutably. | 100% of release events audited, 0% deletable |

### 5.9 NFR — Performance & Availability

The platform must meet its own SLA claim with measurable turnaround tracking, not marketing assertion.

| # | NFR-ID | Non-Functional Requirement | Description | Measurable Target |
|---|---|---|---|---|
| 01 | NFR-04 | Same-day SLA compliance | The platform must support ≥90% same-day report release. | ≥90% within 30–90 days of launch |
| 02 | NFR-05 | Stateless application tier | Application instances must hold no session state in memory. | 100% session state in Redis |

### 5.10 NFR — Scalability & Growth

The platform must not preclude a second location or Partner-tier growth without a redesign.

| # | NFR-ID | Non-Functional Requirement | Description | Measurable Target |
|---|---|---|---|---|
| 01 | NFR-06 | Multi-site readiness | The platform must carry a `site_id` field on core entities without requiring a schema migration for a second location. | `site_id` present on exam-order and staff accounts at launch |
| 02 | NFR-07 | Multi-tenant Partner isolation | The platform must isolate each Partner account's data from every other Partner account. | 100% per-account data isolation |

### 5.11 NFR — Maintainability & Operability

The platform must keep Foundation services singular and its surfaces accessible.

| # | NFR-ID | Non-Functional Requirement | Description | Measurable Target |
|---|---|---|---|---|
| 01 | NFR-08 | No reimplemented Foundation | IAM, audit, and notification services must be consumed by every tier, never rebuilt per surface. | 0 duplicate Foundation implementations across 3 surfaces |
| 02 | NFR-09 | Accessibility conformance | The platform must meet WCAG 2.1 AA across all 3 surfaces. | 100% AA conformance, AAA target for body text |

### 5.12 NFR — Compliance & Governance

The platform must make regulatory evidence producible on demand.

| # | NFR-ID | Non-Functional Requirement | Description | Measurable Target |
|---|---|---|---|---|
| 01 | NFR-10 | KENAS/KNRA evidence support | The platform must support exporting audit and license evidence for facility inspection. | Evidence export available on demand; response time [TBD] |
| 02 | NFR-11 | Data residency | Hosting and processing must support Kenya DPA 2019 compliance. | [TBD] pending hosting decision — see HLAD AD-07 |

---

## 6. Appendices

This section records the source documents from which requirements were collected and the version history of this document.

### 6.1 Annex A — Requirement Collection References

This annex records the source documents from which requirements in this RSR were extracted.

| # | Title | Version | Date | Section References |
|---|---|---|---|---|
| 01 | Business Requirements Specification | 1.0 | 2026-08-05 | §2, §3, §4, §6, §7 |
| 02 | Feature Backlog | 1.0 | 2026-08-05 | Full |
| 03 | High Level Architecture Design | 1.0 | 2026-08-05 | §1, §2, §6 |
| 04 | biotest-DESIGN.md | 1.0.0 | 2026-08-05 | §9 Accessibility, Platform Surface Notes |

### 6.2 Annex B — Change Log

This annex records the version history of this document.

| # | Version | Date | Author | Description |
|---|---|---|---|---|
| 01 | 1.0 | 2026-08-05 | doc-rsr session | Initial RSR authored from BRS, feature backlog, and HLAD v1.0 |
