---
solution: DWS.07
name: BioTest Diagnostics Servicing
platform: DWS
blueprint_version: platform/v1.5.0
generated_at: 2026-08-10T08:39:24.516Z
generator_rev: 7673816b
---

# AI Context — BioTest Diagnostics Servicing

This file gives AI agents working in this app enough context to make good decisions without reading the full codebase.

## What this app is

BioTest Diagnostics Servicing (`DWS.07`) is a DWS solution built on the DBP Blueprint.
It is a **generated app** — the `app/` directory and config files are owned by the scaffold generator.
Hand-authored code lives in `solution/` and `instrumentation.ts`.

## Platform services in scope

- **PS.AUTH** → `@dbp/ps-auth` at `/api/platform/auth`
- **PS.RBAC** → `@dbp/ps-rbac` at `/api/platform/rbac`
- **PS.DATA** → `@dbp/ps-data` at `/api/platform/data`
- **PS.AUDIT** → `@dbp/ps-audit` at `/api/platform/audit`
- **PS.NOTIF** → `@dbp/ps-notif` at `/api/platform/notif`
- **PS.SEARCH** → `@dbp/ps-search` at `/api/platform/search`

## Routes

- **/dashboard** — My Dashboard (`SH.02`)
- **/my-work** — My Work (`SH.02`)
- **/transactions/enquiries** — Enquiries (`SH.02`)
- **/transactions/requests** — Requests (`SH.02`)
- **/transactions/support-tickets** — Support Tickets (`SH.02`)
- **/transactions/wallet** — Wallet (`SH.02`)
- **/collaboration/calendar** — Calendar (`SH.02`)
- **/collaboration/forums** — Forums (`SH.02`)
- **/manage-work/cases** — Cases (`SH.02`)
- **/manage-work/assignments** — Assignments (`SH.02`)
- **/manage-work/reviews** — Reviews (`SH.02`)
- **/manage-work/escalations** — Escalations (`SH.02`)
- **/monitor-work/queue** — Work Queue (`SH.02`)
- **/monitor-work/alerts** — Alerts (`SH.02`)
- **/manage-services/catalogue** — Service Catalogue (`SH.02`)
- **/manage-services/requests** — Service Requests (`SH.02`)
- **/manage-services/lifecycle** — Service Lifecycle (`SH.02`)
- **/manage-services/quality** — Service Quality (`SH.02`)
- **/manage-relationships/customers** — Customers / Participants (`SH.02`)
- **/manage-relationships/partners** — Partners (`SH.02`)
- **/manage-relationships/providers** — Providers (`SH.02`)
- **/manage-relationships/accounts** — Account Management (`SH.02`)
- **/manage-delivery/plans** — Delivery Plans (`SH.02`)
- **/manage-delivery/tasks** — Tasks (`SH.02`)
- **/manage-delivery/cases** — Cases (`SH.02`)
- **/manage-delivery/incidents** — Incidents (`SH.02`)
- **/manage-delivery/escalations** — Escalations (`SH.02`)
- **/manage-delivery/fulfilment** — Fulfilment Tracking (`SH.02`)
- **/dashboards/operational** — Operational Dashboards (`SH.02`)
- **/dashboards/executive** — Executive Dashboards (`SH.02`)
- **/dashboards/custom** — Custom Dashboards (`SH.02`)
- **/dashboards/alerts** — Alerts & Notifications (`SH.02`)
- **/dashboards/scorecards** — KPI Scorecards (`SH.02`)
- **/analytics/adhoc** — Ad-hoc Analysis (`SH.02`)
- **/analytics/trends** — Trend Analysis (`SH.02`)
- **/analytics/root-cause** — Root Cause Analysis (`SH.02`)
- **/analytics/cohort** — Cohort Analysis (`SH.02`)
- **/analytics/benchmarking** — Benchmarking (`SH.02`)
- **/reports/standard** — Standard Reports (`SH.02`)
- **/reports/custom** — Custom Reports (`SH.02`)
- **/reports/scheduled** — Scheduled Reports (`SH.02`)
- **/reports/subscriptions** — Report Subscriptions (`SH.02`)
- **/reports/export** — Export & Sharing (`SH.02`)
- **/admin/organisation** — Organisation Setup (`SH.02`)
- **/admin/workspace-settings** — Workspace Settings (`SH.02`)
- **/admin/branding** — Branding (`SH.02`)
- **/admin/regional** — Regional & Language (`SH.02`)
- **/admin/business-hours** — Business Hours (`SH.02`)
- **/admin/defaults** — Default Values (`SH.02`)
- **/admin/users** — User Management (`SH.02`)
- **/admin/roles** — Role Management (`SH.02`)
- **/admin/access-control** — Access Control (`SH.02`)
- **/admin/auth** — Authentication Settings (`SH.02`)
- **/admin/form-builder** — Form Builder (`SH.02`)
- **/admin/workflow-builder** — Workflow Builder (`SH.02`)
- **/admin/rules** — Rule Management (`SH.02`)
- **/admin/data-model** — Data Model (`SH.02`)
- **/admin/master-data** — Master Data (`SH.02`)
- **/admin/reference-data** — Reference Data (`SH.02`)
- **/admin/data-quality** — Data Quality Rules (`SH.02`)
- **/admin/data-lineage** — Data Lineage (`SH.02`)
- **/admin/apis** — API Management (`SH.02`)
- **/admin/connectors** — Connectors (`SH.02`)
- **/admin/data-flows** — Data Flows (`SH.02`)
- **/admin/data-import** — Data Import (`SH.02`)
- **/admin/policies** — Policy Management (`SH.02`)
- **/admin/controls** — Control Register (`SH.02`)
- **/admin/risks** — Risk Register (`SH.02`)
- **/admin/security-logs** — Security Logs (`SH.02`)
- **/servicing** — Servicing Queue (`SH.03`)
- **/marketplace/discern** — Imaging & Radiology (`SH.01`)
- **/marketplace/design** — Diagnostic Procedures (`SH.01`)
- **/marketplace/deploy** — Sample Collection (`SH.01`)
- **/marketplace/drive** — Back Office (`SH.01`)

## File ownership

- **Generator-owned** (regen with `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force`): `app/`, `package.json`, `next.config.ts`, `middleware.ts`, `solution/_arch/`
- **Solution-owned** (hand-edit freely): `solution/entities/`, `solution/workflows/`, `instrumentation.ts`, `docs/`, this file

## Key patterns

- Entity types are declared in `solution/entities/<type>.ts` as Zod schemas. Never hand-write TypeScript interfaces for data models.
- The data bootstrap (`instrumentation.ts`) calls `registerAndSeedData(dataSvc)` from the generated seed module. This is the ONLY entry point — do not call removed exports.
- All platform capabilities (auth, RBAC, audit, search, workflow, notifications) arrive via `/api/platform/<service>/` mounts — never re-derive them.
