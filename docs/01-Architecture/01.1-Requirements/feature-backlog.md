# BioTest Feature Backlog

Platform: BioTest Diagnostics4.0 (DWS.02.03) — see `business-requirements-specification.md` for full context.

| ID | Feature | Purpose | Domain | Segments | Classify (Stage) | Classify (Priority) | Notes / User Flows |
|---|---|---|---|---|---|---|---|
| F-PF-01 | Identity & Access Management | Auth + RBAC across 3 tiers, multi-tenant isolation for Partners accounts | Platform | N/A | Foundation | P3 | Build-transition only. Not a prototype feature. |
| F-PF-02 | Core Data Model | Shared entities: exam-order, lab-service, accounts | Platform | N/A | Foundation | P3 | Build-transition only. Includes a `site_id` field on exam-order and staff accounts as P2 architectural insurance — second BioTest location is plausible within 12-24 months; UI stays single-site (hardcoded to Upper Hill) at launch, no build commitment beyond the field. |
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
| F-S02-05 | Back Office | Billing/insurance summary across the period | Operations & Workforce | Lab Owner | S02 | P1 | |
| F-S02-06 | External Account Approval | Approve new referral/clinic-user or patient accounts | Operations & Workforce | Lab Owner | S02 | P1 | |
| F-S02-07 | My Bookings | Track own order status, retrieve/download report | Patient Access | Patient | S02 | P0 | Flow: patient logs in → sees order status → downloads report once released. |
| F-S02-08 | My Referrals | Submit, track, and retrieve reports for own referrals | Referral & Partner Access | Doctor/Consultant, Referral Front Desk | S02 | P0 | Flow: clinic-user logs in → submits/tracks referral → retrieves report on release. Solo consultant and staffed-practice front desk both use this under the same role. |
| F-S03-01 | Operations Dashboard | KPI dashboard: SLA compliance, throughput, department load | Operations & Workforce | Lab Owner | S03 | P1 | |
| F-S04-01 | Audit & Compliance Log | Immutable audit trail viewer, regulatory evidence export | Compliance & Audit | Lab Owner | S04 | P1 | Flow: owner compiles evidence export ahead of a KENAS/KNRA inspection. |
