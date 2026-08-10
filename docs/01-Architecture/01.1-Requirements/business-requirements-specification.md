# BioTest Diagnostics4.0 — Business Requirements Specification

## 1. Cover & Document Control

### 1.1 Document Information

| Field | Value |
|---|---|
| Platform name | BioTest Diagnostics4.0 |
| DBP ID | DWS.02.03 |
| Version | 1.0 |
| Status | Draft — Pending Approval |
| Owner | BioTest (Lab Owner) |
| Classification | Internal — Confidential (references patient-data handling context) |
| Date | 2026-08-05 |

### 1.2 Version History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-08-05 | platform-prd (this session) | Initial BRS — Phases 0 through 6 |

---

## 2. Platform Vision

### 2.1 Platform Purpose

Give BioTest one system of record for diagnostic servicing — from intake through release — with role-appropriate access for internal staff, patients, and referring clinics, and no clinical decision-making inside it.

BioTest today runs intake across three disconnected channels — walk-in with a paper order, phone/WhatsApp booking, and doctor referral — with no shared record, no tracked turnaround, and no audit trail. It doesn't replace any existing software (there isn't one); it replaces ad hoc manual coordination. What no comparable RIS/imaging platform researched in Phase 3 (Abbadox CareFlow, EMSOW, Medicai, MedicsRIS, Simplirad) does: support a referring account that stands alone, with no linked practice — the solo-consultant case that's common in this market and unsupported by every researched competitor.

### 2.2 Platform Outcomes

| Outcome | Target | Measurement method | Timing |
|---|---|---|---|
| Same-day SLA compliance | ≥ 90% of exam-orders released same calendar day as capture | (orders released same-day ÷ total orders), weekly, from Operations Dashboard | Leading (30–90 days) |
| Referral channel adoption | ≥ 50% of doctor-referred patients arrive via a tracked referral (not untracked paper) | (orders with source = referral ÷ total doctor-referred orders) | Leading (30–90 days) |
| Patient self-booking adoption | ≥ 30% of walk-in-eligible patients self-book via DXP.0X rather than pure walk-in | (orders with source = dxp ÷ total orders) | Lagging (3–6 months) |
| Complete audit coverage | 100% of releases carry a complete audit entry (technician, timestamp, department) | (audited releases ÷ total releases), from Compliance & Audit log | Leading (30 days — built in from launch) |
| Recapture rate reduction | Establish baseline in first 90 days, then reduce 15% within 6 months | (recaptured orders ÷ total orders), from Servicing & Fulfilment data | Lagging (3–6 months) |

### 2.3 Explicit Non-Goals

| Non-goal | Rationale |
|---|---|
| Clinical diagnosis or treatment inside the platform | BioTest doesn't practice medicine — established directly this session. The referring doctor is the only clinical authority; the platform captures, quality-checks, and releases, nothing more. |
| DICOM viewing / PACS integration | A real imaging-center need, but not this platform's job at MVP scope. |
| LIS/RIS-grade lab equipment integration | BioTest is positioned sub-hospital-scale — full lab-equipment interfacing is out of scope. |
| Live payment processing / financial rails | The platform records what was charged and collected at intake; it does not process payment or integrate a payment gateway. |
| Multi-site operation at launch | Single-site (Upper Hill) at launch. A `site_id` field is carried on core entities as architectural insurance (§6), but no multi-site UI or operational capability ships now. |

Insurance/NHIF-SHA claims-submission integration is **not yet decided** — deferred to §8, not asserted as a non-goal here.

### 2.4 Plan

| Stage | Activity | Output | Target date |
|---|---|---|---|
| Spec | Define intent, capabilities, segments, features, requirements | This BRS + Feature Backlog | — (deferred, §8) |
| Prototype Shell | Clickable shell: navigation, landing pages, key surfaces, end-to-end flow | Prototype shell | — |
| Full Prototype | All screens, workflows, interactions — no live data | Functioning prototype | — |
| Functioning Platform | Production build against approved requirements | Production-ready platform | — |
| Release | Phased rollout by domain and segment | Live platform | — |

Not linear — Spec and Prototype Shell may overlap. No target dates recorded; timeline is a deferred open question (§8).

---

## 3. Business Context

### 3.1 Organisation Context

| BMC Domain | Description |
|---|---|
| What they do | Diagnostic imaging center in Nairobi (Upper Hill). Ultrasound is the owned, in-house core service across ten sub-types (obstetric, pelvic, abdominal, prostate, breast, thyroid/neck, soft tissue, doppler, musculoskeletal, general). CT, MRI, X-Ray, Endoscopy, ECG, EEG, and Colonoscopy are also offered — whether performed in-house or brokered to a partner facility is treated uniformly by this platform, by explicit decision this session. |
| Value Proposition | Same-day report turnaround, broad service range under one roof, walk-in accessibility, professional environment — positioned against both hospital-scale wait times and informal/unstructured alternatives. |
| Customer / Beneficiary Segments | Self-pay and insured patients; referring physicians and clinics without in-house imaging capability. Corporate/insurance panel contracts unconfirmed (§8). |
| Key Activities | Performing procedures across all listed service types; capturing and quality-checking results; releasing reports; intake/scheduling; billing. |
| Key Resources | Imaging/procedure equipment; qualified radiographers/technicians; single physical premises (5th Floor, Prof. Nelson Awori Building, Upper Hill); same-day-report operational capability. |
| Key Partners | Referring physicians, clinics, and hospitals; equipment maintenance vendors; any partner facilities used for offloaded services, treated uniformly per the scope decision above. |
| Revenue / Funding | Fee-for-service, paid at point of service (cash/card). Insurance/NHIF-SHA panel status unconfirmed (§8). |
| Cost Structure | Equipment purchase/lease and maintenance; staff salaries (technicians, front desk, owner); Upper Hill commercial rent; consumables; utilities. |
| Channels | Walk-in; WhatsApp (QR code on marketing flyer); phone; email; physician referral. |
| Customer Relationships | Direct/personal at front desk; recurring via referring-doctor relationships; self-service for booking-channel patients. |
| Regulatory & Compliance Context | KENAS ACC-CD-37-01 accreditation criteria for medical diagnostic imaging facilities; Kenya Nuclear Regulatory Authority Act No. 29/2019 (radiation safety licensing); Radiographers Act (Cap 28) of 2022; Medical Practitioners and Dentists Act (Cap 253); Kenya Data Protection Act 2019 (health data as sensitive personal data). |

### 3.2 Primary Drivers

| Driver | Description | Type | Evidence / source |
|---|---|---|---|
| Fragmented intake with no shared record | Walk-in, WhatsApp, phone, and referral run as parallel, disconnected channels today, with no shared record tying them together | Operational | Flyer shows all four as separate, unlinked contact paths |
| Unbacked SLA claim | "Same-day reports" is a headline marketing claim with no system tracking whether it's actually met | Operational / Market | Flyer's "SAME-DAY REPORTS AVAILABLE" badge; no turnaround tracking exists today |
| No referral-relationship record | Referring doctors and their front desks have no account or status visibility into patient orders they've sent | Operational | Established this session — doctor/referral-front-desk journeys are entirely offline today |
| No audit trail on capture/release | Nothing today records who captured or released a given exam, or when | Operational / Regulatory | Established this session; also a Data Protection Act exposure for health-data handling |
| Growing private outpatient diagnostics demand in Nairobi | Urban private diagnostics is an active growth segment against public-hospital wait times | Market | Sector context |

---

## 4. Platform Specification

### 4.1 Platform Architecture

**DBP hierarchy:** SoA (Solution of Applications) — DWS.02.03, "Diagnostics4.0" — parented under DWS.02 (Specialised, Work.Sector4.0 – Service4.0), Core stream. Parallels DWS.02.01 (Plant4.0) and DWS.02.02 (Bank4.0) as sibling sector verticals.

**Reframe from earlier informal naming:** this is one platform with three user tiers (Internal / External-Patient / Partners-Clinic), not three separately-numbered platforms. The DWS.0X / RFP.0X / DXP.0X labels used during journey-mapping were informal diagram labels, not DBP taxonomy IDs.

**Correction (HLAD AD-08, post-BRS):** "one platform, three tiers" describes the requirements picture correctly but understated the deployment topology. Confirmed against the actual DBP platform factory and its reference build: only the Internal Servicing Workspace is co-deployed with the real backend (API Gateway, data layer) as one scaffolded solution — Patient App and Partner Portal are independently deployed thin clients with no platform-service access of their own, proxying every call through the backend. See HLAD §2.4/§5.7/§6.1 AD-08 for the corrected architecture; this section's requirements-level framing above still holds.

```
Platform Foundation (built once)
  → IAM, Core Data Model, API Gateway, Design System,
    Notification Engine, Audit & Event Pipeline, CI/CD, AI Infrastructure

S00 — Orientations       (1 per tier: Internal post-login, Patient + Partners pre-login)
S01 — Marketplace        (4 per tier — Discern/Design/Deploy/Drive, all 3 tiers)
S02 — WorkSpaces         (Servicing Queue, My Bookings, My Referrals, Staff & Roles, Back Office)
S03 — Fulfilment & Ops   (Operations Dashboard — Internal only)
S04 — Specialised        (Audit & Compliance Log — Internal only)
```

**Domain-to-stage activation:**

| Domain | Question it answers | Active stages |
|---|---|---|
| Service Catalog | What does BioTest offer, and on what terms? | S01 (all 3 tiers) |
| Servicing & Fulfilment | How does a request move from intake to a released report? | S01 (New Order), S02 (Intake, Capture & Release, Oversight) |
| Referral & Partner Access | How does an external clinician get BioTest's services for their patient? | S01, S02 (Partners) |
| Patient Access | How does a patient book, track, and receive their own results? | S01, S02 (Patient) |
| Operations & Workforce | How does BioTest run itself day to day? | S02 (Staff, Back Office, Account Approval), S03 (Dashboard) |
| Compliance & Audit | Can BioTest prove who did what, when, to which record? | S04 |

No Workflow & Approval Engine exists in this architecture — a deliberate absence. There is no internal clinical-review gate: the technician judges accuracy and releases in a single action (§6, §11).

**Target application architecture (three-tier):**

| Tier | Technology | Rule |
|---|---|---|
| Client | React / Next.js / React Native | Renders UI only. No business logic. |
| Application | Express / BFF | Business logic, orchestration, validation, access control. |
| Data | Data API (Supabase / PostgREST / Hasura) + PostgreSQL + Redis | All DB access via Data API. No raw SQL from application code. |

**Universal anchor:** `s2_account.requests` — every exam-order at S02+ creates a request record regardless of source (walk-in / dxp / referral). S04's Audit & Compliance Log reads from this anchor; it does not rebuild the request lifecycle.

**Dependency rule:** downward only. Higher stages reference lower; lower stages never reference higher.

### 4.2 User Segments

| Segment | Tier | Who fits here | Primary domains | Platform activities | Key need | Access pattern | Permissions |
|---|---|---|---|---|---|---|---|
| Patient | External | Self-referred or consultant-sent individuals seeking a service | Patient Access; Service Catalog (read); Servicing & Fulfilment (own order, read) | Browse services + SLA, book, check status, retrieve report | Know the wait time, get the report without chasing anyone | Event-triggered (per visit) | Read/write own record only |
| Doctor / Consultant | Partners | Independent or hospital-based physician, not contracted to BioTest | Referral & Partner Access; Service Catalog (read) | Order a test (directly or via front desk), review results, diagnose off-platform | Trust the result comes back complete and on time, unchased | Event-triggered; periodic if solo | Read own referrals, write/submit requests |
| Referral Front Desk | Partners | A doctor's staff, or a standalone referral coordinator with no linked practice | Referral & Partner Access; Service Catalog (read) | Browse marketplace, submit referrals, schedule, track, file reports | One place to submit and track every referral | Daily or event-triggered | Read/write — same role as Doctor |
| Front Desk (BioTest) | Internal | On-site intake/reception staff | Servicing & Fulfilment; Operations (limited) | Register any of 3 intake paths, collect payment, hand off, track, notify | One registration flow regardless of channel | Daily, continuous | Read queue, write intake — no release rights |
| Lab Technician | Internal | Radiographer / sonographer / lab tech | Servicing & Fulfilment | View queue, perform procedure, judge accuracy, release, close out | Release in one action, no second sign-off | Daily, continuous | Read/write own dept. queue, release own captures |
| Lab Owner | Internal | BioTest's owner-operator | Operations & Workforce; Service Catalog (admin); Compliance & Audit; cross-domain analytics | Monitor status/progress, review KPIs, manage catalog/staff, approve external accounts | See the whole operation's health without gating individual orders | Daily | Read/write/approve — full admin |

**Considered and declined:** a Regulator/Auditor segment (KENAS/KNRA inspector, DPA auditor). Kenya facility inspections are on-site, evidence-handed-over events, not standing logins — modeled as an export capability under Lab Owner's Compliance & Audit permissions, not a seventh account type.

**Segment-to-domain coverage matrix** (✦ primary, ◦ secondary):

| Segment | Servicing & Fulfilment | Service Catalog | Referral & Partner Access | Patient Access | Operations & Workforce | Compliance & Audit |
|---|---|---|---|---|---|---|
| Patient | ◦ | ◦ | — | ✦ | — | — |
| Doctor / Consultant | ◦ | ◦ | ✦ | — | — | — |
| Referral Front Desk | ◦ | ◦ | ✦ | — | — | — |
| Front Desk (BioTest) | ✦ | — | — | — | ◦ | — |
| Lab Technician | ✦ | — | — | — | — | — |
| Lab Owner | ◦ | ✦ | ◦ | — | ✦ | ✦ |

**Stage coverage per tier:**

| Tier | S00 | S01 |
|---|---|---|
| Internal (Front Desk, Technician, Owner) | 1, post-login, shared, personalized per segment | 4 entries, post-login |
| External (Patient) | 1, pre-login front door | 4 entries, pre-login catalogue |
| Partners (Doctor, Referral Front Desk) | 1, shared between both | 4 entries |

### 4.3 AI Use Cases

AI in this platform stays strictly operational and descriptive — it never produces or influences a clinical interpretation. Every use case below assists capture, scheduling, or operational visibility; none feed into a diagnosis, which stays entirely with the external referring doctor. Human override is assumed at every generative/agentic touchpoint.

| Rank | ID | Use case | Mode | Domains | User segments | Deploy timing | Data dependency | Pain point addressed |
|---|---|---|---|---|---|---|---|---|
| 1 | AI-01 | SLA breach alerting | Analytical | Servicing & Fulfilment, Operations | Lab Owner, Front Desk | At launch | Queue timestamps | Unbacked SLA claim |
| 2 | AI-02 | WhatsApp booking assistant | Agentic | Patient Access | Patient | At launch | Catalog + calendar | WhatsApp is already the real booking channel |
| 3 | AI-03 | Referral intake auto-structuring | Generative | Referral & Partner Access | Referral Front Desk, Doctor | Shortly after launch | Referral text/photo | Manual re-typing of paper orders |
| 4 | AI-04 | Report drafting assist (measurements/findings, not diagnosis) | Generative | Servicing & Fulfilment | Lab Technician | Shortly after launch | Procedure capture data | Manual report typing slows release |
| 5 | AI-05 | No-show prediction | Analytical | Patient Access | Front Desk | Post-launch | Booking history | Wasted capacity |
| 6 | AI-06 | Recapture-risk flagging | Analytical | Servicing & Fulfilment | Lab Technician, Lab Owner | Post-launch | Historical capture data | Unmeasured recapture rate |
| 7 | AI-07 | SLA target recommendation | Analytical | Service Catalog | Lab Owner | Post-launch | Turnaround history | SLA targets currently a guess |
| 8 | AI-08 | Compliance evidence auto-compilation | Generative | Compliance & Audit | Lab Owner | Post-launch | Audit log + license records | Manual evidence assembly for inspections |
| 9 | AI-09 | Natural-language KPI query | Generative | Operations & Workforce | Lab Owner | Post-launch | Mature dashboard data | Dashboard literacy/time |
| 10 | AI-10 | Duplicate standalone-account matching | Analytical | Referral & Partner Access | Lab Owner | Post-launch | Account records | Standalone accounts have no practice anchor to verify against |

**AI infrastructure (Foundation):** LLM API connector, rule engine, event pipeline, opt-in/consent management, human-override workflow, AI audit trail.

---

## 5. Shell Prototype Specification

One flow per named segment — the minimum set the prototype must demonstrate before full prototyping begins.

| Flow ID | Segment | Entry point | Key action(s) | Outcome / exit state |
|---|---|---|---|---|
| SF-01 | Patient | Front Door (pre-login) or walk-in arrival | Browse services → book or arrive → get checked in → procedure performed | Report released; patient returns to their own doctor with it |
| SF-02 | Doctor / Consultant | Front Door — Partners (pre-login), or their own practice | Sees patient → arranges test (self, if solo, or via front desk) → reviews result once released | Diagnosis formed off-platform; patient treated |
| SF-03 | Referral Front Desk | Front Door — Partners (pre-login) | Browses marketplace → submits referral → schedules patient → tracks status → retrieves report | Report filed for the doctor |
| SF-04 | Front Desk (BioTest) | Home (post-login) | Registers arriving patient via any of 3 source paths → collects payment → hands off to department → tracks status → notifies patient | Report handed over; order closed |
| SF-05 | Lab Technician | Home (post-login) | Views assigned queue → picks up order → performs procedure → judges accuracy → finalizes and releases | Order released in a single action; notification fires |
| SF-06 | Lab Owner | Home (post-login) | Opens dashboard → checks status/progress across the whole queue → reviews KPIs → manages catalog/staff as needed | Full operational visibility without gating any individual order |

---

## 6. Design Constraints

| Constraint | Rationale |
|---|---|
| Single data model rule | `exam-order` and `lab-service` are shared entities read and written across all 3 tiers' front doors (DWS/RFP/DXP surfaces). No tier gets its own forked copy — domain modularity cannot fragment them. |
| Three-tier architecture | Client (React/Next.js) renders only; Application (Express/BFF) holds all business logic and access control; Data tier is accessed only via Data API, never raw SQL from application code. |
| `s2_account.requests` universal anchor | Every exam-order, from any of the 3 source channels, anchors here. S04 (Audit & Compliance) reads from this anchor rather than rebuilding request state. |
| Dependency direction | Downward only — S02+ features may reference S01/S00, never the reverse. |
| Immutable audit trail | Every capture, release, and recapture event is logged and cannot be deleted under any permission level, including Lab Owner's — this is what F-S04-01 and the Compliance & Audit domain exist to guarantee. |
| ADR requirement | Every significant architectural decision (e.g., the `site_id` insurance field below, the deliberate absence of a workflow/approval engine) gets an ADR before build. |
| White-labelling | N/A — single-brand BioTest platform, no white-label requirement identified. |
| Data sovereignty | Patient health data is sensitive personal data under Kenya's Data Protection Act 2019. Hosting/processing must support DPA compliance — local hosting preferred, or a documented cross-border transfer safeguard if not. |
| Single-site at launch, multi-site insurance | Single-site (Upper Hill) operationally and in the UI. A `site_id` field is carried on `exam-order` and staff accounts from day one (P2, no build commitment) because a second location is plausible within 12–24 months — resolved explicitly this session rather than left as a silent assumption. |
| No workflow/approval engine | Deliberate absence. The technician judges capture accuracy and releases in one action — there is no internal clinical-review gate for any other role to approve or reject against. |

**NFR statements (prototype-guiding only — full detail deferred to LLAD):**

- **Authentication:** phone/email OTP or magic-link across all tiers — no SSO needed at this scale.
- **Primary device target:** responsive web, mobile-first for Patient/Partners; tablet-friendly for Internal operational screens.
- **Multi-tenancy:** single-org for Internal; Partners tier is multi-tenant with per-account data isolation (each clinic or solo consultant isolated from every other).
- **Accessibility:** WCAG 2.1 AA.
- **Data residency:** see Data sovereignty row above.

---

## 7. Information Architecture & Feature Backlog

### 7.1 Navigation Model

**Layered** (global layer + domain layer) — chosen over Domain-led or Role-led because personas cross domains (Front Desk touches Servicing + Catalog; Lab Owner touches nearly everything) while still needing tier-appropriate entry points.

```
Global layer: Home · My Work · Intelligence · Global Tools
Domain layer (contextual to tier): Service Catalog · Servicing & Fulfilment ·
  Referral & Partner Access · Patient Access · Operations & Workforce · Compliance & Audit
```

Cross-cutting feature approach: **Hybrid** — domain-level reporting within each domain (e.g., Catalog Performance inside Service Catalog) plus a global Intelligence layer for cross-domain KPIs (Operations Dashboard).

### 7.2 Menu Structure

**Internal** (post-login S00/S01):
```
GROUP: Orientation — Home
GROUP: Marketplace — Explore Services | Configure Catalog | New Order | Catalog Performance
GROUP: Servicing — Servicing Queue (Intake | Capture & Release | Oversight)
GROUP: Operations — Staff & Roles | Back Office | External Account Approval | Operations Dashboard
GROUP: Compliance — Audit & Compliance Log
```

**Patient** (pre-login S00/S01, post-login S02):
```
GROUP: Orientation — Front Door
GROUP: Marketplace — Explore Services | Choose Your Service | Book a Visit | Visit & Report Guide
GROUP: My Account — My Bookings
```

**Partners** (pre-login S00/S01, post-login S02):
```
GROUP: Orientation — Front Door
GROUP: Marketplace — Explore Services | Plan a Referral | Start a Referral | Partner Guide
GROUP: My Account — My Referrals
```

### 7.3 Feature Backlog

| ID | Feature | Purpose | Domain | Segments | Classify (Stage) | Classify (Priority) | Notes / User Flows |
|---|---|---|---|---|---|---|---|
| F-PF-01 | Identity & Access Management | Auth + RBAC across 3 tiers, multi-tenant isolation for Partners accounts | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-02 | Core Data Model | Shared entities: exam-order, lab-service, accounts | Platform | N/A | Foundation | P3 | Includes a `site_id` field on exam-order and staff accounts as P2 architectural insurance — second location plausible within 12–24 months; UI stays single-site at launch. |
| F-PF-03 | Application / API Gateway | Business logic + orchestration tier | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-04 | Design System | Shared UI tokens/components across all 3 tiers | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-05 | Notification Engine | Multi-channel (SMS/WhatsApp/email) release + status alerts | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-06 | Audit & Event Pipeline | Immutable audit log infrastructure | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-07 | CI/CD & Environment Pipeline | Build/deploy infrastructure | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-PF-08 | AI Infrastructure | LLM connector, rule engine, consent management | Platform | N/A | Foundation | P3 | Build-transition only. |
| F-S00-01 | Home — Internal Orientation | Post-login landing, personalized per Internal segment | Global | Front Desk, Lab Technician, Lab Owner | S00 | P0 | Post-login. Flow: staff logs in → sees role-relevant queue snapshot → routes to Servicing Queue or Dashboard. |
| F-S00-02 | Front Door — Patient | Pre-login marketing landing, booking CTA | Global | Patient | S00 | P0 | Pre-login. Flow: visitor lands → learns services/SLA → books or finds walk-in info. |
| F-S00-03 | Front Door — Partners | Pre-login landing for referring clinicians | Global | Doctor/Consultant, Referral Front Desk | S00 | P0 | Pre-login. Flow: clinician/front desk lands → learns referral process → signs in or registers. |
| F-S01-01 | Explore Services (Discern) | Browse internal 4-department catalog, SLA targets | Service Catalog | Front Desk, Lab Technician, Lab Owner | S01 | P0 | Post-login. |
| F-S01-02 | Configure Catalog (Design) | Edit listings, SLA targets, department structure | Service Catalog | Lab Owner | S01 | P0 | Post-login. |
| F-S01-03 | New Order (Deploy) | Register an exam-order against a catalog service | Service Catalog, Servicing & Fulfilment | Front Desk | S01 | P0 | Post-login. |
| F-S01-04 | Catalog Performance (Drive) | SLA compliance/throughput per service | Service Catalog, Operations & Workforce | Lab Owner | S01 | P1 | Post-login. |
| F-S01-05 | Explore Services (Discern) | Public catalog browse, SLA shown | Service Catalog | Patient | S01 | P0 | Pre-login. |
| F-S01-06 | Choose Your Service (Design) | Compare/select specific service sub-type | Service Catalog | Patient | S01 | P0 | Pre-login. |
| F-S01-07 | Book a Visit (Deploy) | Initiate booking → creates exam-order, source: dxp | Patient Access, Servicing & Fulfilment | Patient | S01 | P0 | Pre-login entry, gates into account creation. |
| F-S01-08 | Visit & Report Guide (Drive) | What to expect, hours, how reports are delivered | Patient Access | Patient | S01 | P1 | Pre-login. |
| F-S01-09 | Explore Services (Discern) | Referrer-visible catalog browse, SLA shown | Service Catalog | Doctor/Consultant, Referral Front Desk | S01 | P0 | Pre-login. |
| F-S01-10 | Plan a Referral (Design) | Compare services, understand referral requirements | Service Catalog | Doctor/Consultant, Referral Front Desk | S01 | P0 | Pre-login. |
| F-S01-11 | Start a Referral (Deploy) | CTA gating into authenticated referral submission | Referral & Partner Access | Doctor/Consultant, Referral Front Desk | S01 | P0 | Pre-login entry, gates into account creation. |
| F-S01-12 | Partner Guide (Drive) | SLA expectations; standalone vs practice-linked account explained | Referral & Partner Access | Doctor/Consultant, Referral Front Desk | S01 | P1 | Pre-login. |
| F-S02-01 | Servicing Queue — Intake | Register walk-in / DXP / referral arrivals, collect payment, hand off | Servicing & Fulfilment | Front Desk | S02 | P0 | Flow: patient arrives via one of 3 paths → front desk registers, tags source → hands to department. |
| F-S02-02 | Servicing Queue — Capture & Release | View assigned queue, perform procedure, judge accuracy, finalize/release | Servicing & Fulfilment | Lab Technician | S02 | P0 | Flow: technician picks up order → performs procedure → judges result → releases in one action, no second sign-off. |
| F-S02-03 | Queue Oversight | Status & progress monitoring across the whole queue | Servicing & Fulfilment, Operations & Workforce | Lab Owner | S02 | P0 | Flow: owner scans queue → flags stalled/overdue orders. Not a per-order gate. |
| F-S02-04 | Staff & Roles | Manage technician/front-desk accounts and roles | Operations & Workforce | Lab Owner | S02 | P1 | |
| F-S02-05 | Back Office | Billing/insurance summary across the period | Operations & Workforce | Lab Owner | S02 | P1 | Scope depends on §8 open question re: insurance/NHIF-SHA panel status. |
| F-S02-06 | External Account Approval | Approve new referral/clinic-user or patient accounts | Operations & Workforce | Lab Owner | S02 | P1 | |
| F-S02-07 | My Bookings | Track own order status, retrieve/download report | Patient Access | Patient | S02 | P0 | Flow: patient logs in → sees order status → downloads report once released. |
| F-S02-08 | My Referrals | Submit, track, and retrieve reports for own referrals | Referral & Partner Access | Doctor/Consultant, Referral Front Desk | S02 | P0 | Flow: clinic-user logs in → submits/tracks referral → retrieves report on release. Solo consultant and staffed-practice front desk both use this under the same role. |
| F-S03-01 | Operations Dashboard | KPI dashboard: SLA compliance, throughput, department load | Operations & Workforce | Lab Owner | S03 | P1 | |
| F-S04-01 | Audit & Compliance Log | Immutable audit trail viewer, regulatory evidence export | Compliance & Audit | Lab Owner | S04 | P1 | Flow: owner compiles evidence export ahead of a KENAS/KNRA inspection. |

### 7.4 Default Landing per Segment

| Segment | Default landing |
|---|---|
| Patient | My Bookings |
| Doctor / Consultant | My Referrals |
| Referral Front Desk | My Referrals |
| Front Desk (BioTest) | Servicing Queue — Intake |
| Lab Technician | Servicing Queue — Capture & Release |
| Lab Owner | Home (dashboard snapshot) |

---

## 8. Open Questions

| # | Question | Why deferred | Owner | Blocking? |
|---|---|---|---|---|
| 1 | Target dates for Spec / Prototype Shell / Full Prototype / Build / Release | No timeline provided | Business | No — §2.4 Plan left blank, doesn't block spec content |
| 2 | Budget or resourcing constraints | Not provided | Business | No — no scope decision currently depends on it |
| 3 | Insurance/NHIF-SHA panel participation, and any existing systems (accounting tool, WhatsApp Business API) BioTest needs this platform to integrate with | Not confirmed — Back Office (F-S02-05) and the Foundation integration surface were scoped assuming greenfield/no live integration, but this is an assumption, not a decision | Business | Potentially — should resolve before F-S02-05 and Foundation integration scope enter Build mode |

---

## 9. Appendix

### 9.1 Capability Framework — Comparable Platforms & Standards

| Reference | Type | Covers | Gaps relative to this platform |
|---|---|---|---|
| Abbadox CareFlow RIS | Comparable platform | Referral management, scheduling, billing, physician/patient portals | Assumes an internal radiologist reads and signs before release — doesn't fit BioTest's model |
| EMSOW | Comparable platform | PACS, DICOM viewer, physician + technologist portals, RCM | Assumes DICOM/PACS infrastructure — heavier than BioTest's MVP scope |
| Medicai | Comparable platform | Patient image-sharing portal, per-study SaaS pricing | No referring-clinic self-service tier; no standalone/solo-consultant account model |
| MedicsRIS | Comparable platform | Secure report transmission, physician/patient engagement portal | Same clinical-review assumption; US-centric billing/compliance |
| Simplirad | Comparable platform | AI-enabled cloud RIS+PACS, secure image sharing | Full enterprise RIS/PACS scope — not sized for a single-site, walk-in-heavy operation |
| KENAS ACC-CD-37-01 | Kenya accreditation standard | Facility/equipment accreditation criteria for diagnostic imaging | Facility-level, not software — platform supports evidencing compliance, doesn't encode it as a feature |
| ISO 15189 | International standard | Quality/competence for medical labs — traceability across pre-examination, examination, post-examination phases | Relevant to the Sample Collection/lab side; generic, not Kenya-specific |
| Kenya Nuclear Regulatory Authority Act No. 29/2019 | Kenya regulation | Radiation safety licensing for irradiating equipment | Applies uniformly given the in-house/brokered scope decision |
| Radiographers Act (Cap 28) of 2022 | Kenya regulation | Practitioner licensing for radiographers/technicians | Platform holds practitioner license status as a data field |
| Kenya Data Protection Act 2019 | Kenya regulation | Sensitive personal data (health data) handling | Drives the Compliance & Audit domain and the data-residency constraint (§6) |

### 9.2 Glossary

| Term | Meaning |
|---|---|
| exam-order | The shared entity representing a single requested service, from intake through release. Tagged with a `source` (walk-in / dxp / referral). |
| source | Field on exam-order recording which of the 3 intake channels created it — a data tag only, never implies different clinical oversight. |
| release | The technician's single action confirming accuracy and making a report available — not a clinical sign-off. |
| recapture | A redo of a procedure the technician judges inadequate before release — decided and executed by the technician alone, not a second reviewer. |
| clinic-user | The single RFP-tier role held by both Doctor/Consultant and Referral Front Desk — same permissions regardless of which person is behind it. |
| site_id | P2 insurance field on core entities anticipating a plausible second BioTest location; inert in the UI until that happens. |
| S00–S04 | DBP generic stage codes: Orientations, Marketplace, WorkSpaces, Fulfilment & Operations, Specialised. |
