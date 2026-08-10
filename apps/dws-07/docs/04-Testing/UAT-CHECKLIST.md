# UAT Checklist — BioTest Diagnostics Servicing (DWS.07)

**Generated:** _fill in the deployment date before circulating_
**Status:** starting draft — edit freely, this is not a completed checklist

## What this is

This is a **starting point**, not a finished test plan. It is pre-populated from what
`DWS.07`'s manifest actually declares — its roles and its pages/modules —
so the solution owner doesn't start from a blank page. Before circulating it to
stakeholders, review every row: rename vague checks, add the specific business
scenarios only a human familiar with this deployment would know, and remove anything
that doesn't apply.

**Who should use this:** the solution owner and the business stakeholders who will
give manual sign-off before go-live — not an automated test suite. UAT is inherently
a human activity against a specific deployed solution; nothing here runs in CI.

For the factory's overall test strategy and where UAT sits relative to the automated
gates, see the DBP factory's `docs/04-testing/minimum-test-plan.md` (monorepo doc —
this solution ships without a copy of that repo, so it's referenced by path, not link).

---

## Role-based checks

### As a **Platform Admin** (`platform-admin`)

- [ ] Can sign in and land on the correct home experience for this role.
- [ ] Verify you can/cannot **read exam-order** — View exam-orders.
- [ ] Verify you can/cannot **create exam-order** — Register a new exam-order at intake (front desk).
- [ ] Verify you can/cannot **update exam-order** — Update an exam-order's fields.
- [ ] Verify you can/cannot **release exam-order** — Judge accuracy and release an exam-order in one action (technician) — no second-reviewer approval exists.
- [ ] Verify you can/cannot **recapture exam-order** — Flag an exam-order for recapture and route it back to in-progress (technician).
- [ ] Verify you can/cannot **manage lab-service** — Manage catalog listings, SLA targets, department structure (owner).
- [ ] Verify actions outside this role's permissions are correctly blocked or hidden.

### As a **Lab Owner** (`owner`)

- [ ] Can sign in and land on the correct home experience for this role.
- [ ] Verify you can/cannot **read exam-order** — View exam-orders.
- [ ] Verify you can/cannot **create exam-order** — Register a new exam-order at intake (front desk).
- [ ] Verify you can/cannot **update exam-order** — Update an exam-order's fields.
- [ ] Verify you can/cannot **release exam-order** — Judge accuracy and release an exam-order in one action (technician) — no second-reviewer approval exists.
- [ ] Verify you can/cannot **recapture exam-order** — Flag an exam-order for recapture and route it back to in-progress (technician).
- [ ] Verify you can/cannot **manage lab-service** — Manage catalog listings, SLA targets, department structure (owner).
- [ ] Verify actions outside this role's permissions are correctly blocked or hidden.

### As a **Lab Technician** (`technician`)

- [ ] Can sign in and land on the correct home experience for this role.
- [ ] Verify you can/cannot **read exam-order** — View exam-orders.
- [ ] Verify you can/cannot **create exam-order** — Register a new exam-order at intake (front desk).
- [ ] Verify you can/cannot **update exam-order** — Update an exam-order's fields.
- [ ] Verify you can/cannot **release exam-order** — Judge accuracy and release an exam-order in one action (technician) — no second-reviewer approval exists.
- [ ] Verify you can/cannot **recapture exam-order** — Flag an exam-order for recapture and route it back to in-progress (technician).
- [ ] Verify you can/cannot **manage lab-service** — Manage catalog listings, SLA targets, department structure (owner).
- [ ] Verify actions outside this role's permissions are correctly blocked or hidden.

### As a **Front Desk** (`front-desk`)

- [ ] Can sign in and land on the correct home experience for this role.
- [ ] Verify you can/cannot **read exam-order** — View exam-orders.
- [ ] Verify you can/cannot **create exam-order** — Register a new exam-order at intake (front desk).
- [ ] Verify you can/cannot **update exam-order** — Update an exam-order's fields.
- [ ] Verify you can/cannot **release exam-order** — Judge accuracy and release an exam-order in one action (technician) — no second-reviewer approval exists.
- [ ] Verify you can/cannot **recapture exam-order** — Flag an exam-order for recapture and route it back to in-progress (technician).
- [ ] Verify you can/cannot **manage lab-service** — Manage catalog listings, SLA targets, department structure (owner).
- [ ] Verify actions outside this role's permissions are correctly blocked or hidden.

---

## Journey / page checks

### Servicing Queue (`/servicing`)

- [ ] Page loads without error for each role expected to use it.
- [ ] Primary action(s) on this page complete successfully end-to-end.
- [ ] Data shown matches what the business expects for a real (non-demo) tenant.
- [ ] Fill in any solution-specific business scenario for this page.

### Imaging & Radiology (`/marketplace/discern`)

- [ ] Page loads without error for each role expected to use it.
- [ ] Primary action(s) on this page complete successfully end-to-end.
- [ ] Data shown matches what the business expects for a real (non-demo) tenant.
- [ ] Fill in any solution-specific business scenario for this page.

### Diagnostic Procedures (`/marketplace/design`)

- [ ] Page loads without error for each role expected to use it.
- [ ] Primary action(s) on this page complete successfully end-to-end.
- [ ] Data shown matches what the business expects for a real (non-demo) tenant.
- [ ] Fill in any solution-specific business scenario for this page.

### Sample Collection (`/marketplace/deploy`)

- [ ] Page loads without error for each role expected to use it.
- [ ] Primary action(s) on this page complete successfully end-to-end.
- [ ] Data shown matches what the business expects for a real (non-demo) tenant.
- [ ] Fill in any solution-specific business scenario for this page.

### Back Office (`/marketplace/drive`)

- [ ] Page loads without error for each role expected to use it.
- [ ] Primary action(s) on this page complete successfully end-to-end.
- [ ] Data shown matches what the business expects for a real (non-demo) tenant.
- [ ] Fill in any solution-specific business scenario for this page.

---

## Sign-off

| Stakeholder | Role | Date | Outcome |
|---|---|---|---|
| | | | |
