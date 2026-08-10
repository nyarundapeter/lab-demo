---
# catalog/DWS.07/SOLUTION.md  [STAGED DRAFT — not yet copied into dbp_blueprint_build]
# BioTest Diagnostics4.0 — Internal Servicing Workspace, the DWS-equivalent solution
# and the one real backend per HLAD AD-08. Patient App and Partner Portal are
# separate, independently-deployed thin clients (apps/dxp pattern) that proxy into
# this solution's API — they do not get their own SOLUTION.md / scaffold.
#
# Modeled on catalog/DWS.06/SOLUTION.md (Hospitality Servicing), with one
# deliberate divergence: DWS.06 gates high-value requests through a manager
# approval (PS.WORKFLOW + APP.F06). BioTest never gates on a second internal
# reviewer (AD-02, AP-08) — the capturing technician judges accuracy and releases
# in one action. That maps to APP.F19 (LVE Workspace: list + detail + edit,
# PS.DATA + PS.AUDIT only) instead of APP.F02 + APP.F06, and PS.WORKFLOW is not
# consumed at all.
#
# Numbering note: DWS.07 confirmed free against docs/REGISTRY.yaml (checked
# 2026-08-10) — DWS.01/02A-X/03/04/05/06 all in use there. The uncommitted
# catalog/DWS.06 + apps/dws-06 seen locally are unrelated leftover scratch, not
# a live collision (git status shows both untracked, REGISTRY's real DWS.06 is
# "Workflow Factory Demo" / apps/wfd-01).
#
# scaffold: uses the OLD numeric shell alias (SH.01/SH.03), not the current
# canonical SH.WORKSPACE name — confirmed by scaffold-dry-run.mjs: manifest
# `scaffold` ids are still regex-locked to SH.\d\d; the two-shell consolidation
# lives only in the generator's internal alias layer, not the manifest schema.
#
# quickLinks[].tone: enum is fixed to navy|orange (confirmed by dry-run
# validation — teal is rejected). Left as navy/orange below; worth confirming
# after a real build whether "orange" renders as a literal orange or maps to
# the theme's --color-secondary token (our teal) — not verified from the
# manifest alone.

platform: DWS
solution: DWS.07
name: BioTest Diagnostics Servicing
journey_stages: [3]
deploy_layer: L03

consumes_platform_services:
  - PS.AUTH
  - PS.RBAC
  - PS.DATA
  - PS.AUDIT
  - PS.NOTIF
  - PS.SEARCH
  # Deliberately NOT PS.WORKFLOW — no internal approval gate exists (AD-02, AP-08).
  # Deliberately NOT PS.EVENTS/PS.AI at launch — AI use cases are post-launch (BRS §4.3).

theme:
  "--color-primary": "#14305C"
  "--color-secondary": "#0E7C7F"
  "--radius": "8px"
  "--density": "comfortable"

nav:
  links:
    - label: Servicing Queue
      href: /servicing
  sign_in:
    label: Sign in
    href: /login

# ── Authenticated Home (SH.WORKSPACE / APP.F12) ─────────────────────────────
home:
  hero:
    overline: "BIOTEST SERVICING WORKSPACE"
    headline: "Every order, one queue."
    headlineAccent: "Nothing falls through."
    body: "BioTest Diagnostics Servicing brings intake, capture, and release together across every department — walk-in, self-booked, or referred, staff always know what's next. No internal approval gate: the technician who captures it releases it."
    primaryCta:
      label: "Open Servicing Queue"
      href: /servicing
    secondaryCta:
      label: "Browse Service Catalog"
      href: /marketplace/discern
    trustBullets:
      - label: "Self-certified release, fully audited"
      - label: "Same-day SLA tracked, not assumed"
      - label: "Every department, one queue"
  kpis:
    - id: in-progress
      label: In Progress
      entityType: exam-order
      metric: { aggregate: count }
      filters: { status: in-progress }
      format: number
      icon: Activity
    - id: released
      label: Released
      entityType: exam-order
      metric: { aggregate: count }
      filters: { status: released }
      format: number
      icon: Target
    - id: recapture
      label: Recapture Requested
      entityType: exam-order
      metric: { aggregate: count }
      filters: { status: recapture-requested }
      format: number
      icon: TrendingUp
    - id: total
      label: Total Orders
      entityType: exam-order
      metric: { aggregate: count }
      format: number
      icon: Hash
  features:
    items:
      - id: queue
        title: "Servicing Queue"
        description: "Every exam-order across every department — imaging, diagnostic procedures, sample collection, back office — captured and self-released, no second reviewer."
        icon: ListChecks
      - id: compliance
        title: "Compliance Ledger"
        description: "Immutable audit trail on every capture, release, and recapture, exportable on demand for KENAS/KNRA inspection."
        icon: ShieldCheck
      - id: catalog
        title: "Internal Service Catalog"
        description: "Imaging & Radiology, Diagnostic Procedures, Sample Collection, and Back Office — organised by department, with SLA targets published."
        icon: Store
  howItWorks:
    steps:
      - id: intake
        title: "Order arrives"
        description: "Walk-in, self-booked via the Patient App, or referred via the Partner Portal — front desk registers it and tags the source."
      - id: capture
        title: "Technician captures"
        description: "The assigned technician performs the procedure and judges its own accuracy — no second reviewer in the loop."
      - id: release
        title: "Released, same action"
        description: "The technician releases in the same action that closes the capture. Notification fires automatically."
  quickLinks:
    - id: servicing-queue
      label: Servicing Queue
      href: /servicing
      icon: ListChecks
      description: "Every order, self-released."
      tone: navy
    - id: imaging
      label: Imaging & Radiology
      href: /marketplace/discern
      icon: Activity
      description: "Ultrasound, CT, MRI, X-Ray."
      tone: orange
    - id: diagnostic-procedures
      label: Diagnostic Procedures
      href: /marketplace/design
      icon: Stethoscope
      description: "Endoscopy, Colonoscopy, ECG, EEG."
      tone: navy
    - id: sample-collection
      label: Sample Collection
      href: /marketplace/deploy
      icon: Droplet
      description: "Phlebotomy, specimen intake."
      tone: orange
    - id: back-office
      label: Back Office
      href: /marketplace/drive
      icon: Briefcase
      description: "Billing, insurance, records."
      tone: navy

# ── Marketplace catalogue (APP.F10) — internal service catalog ─────────────
marketplace:
  entityType: lab-service
  headline: "Internal Service Catalog."
  lede: "The diagnostic services BioTest captures and releases, organised by department, with SLA targets published."
  itemLabel: services
  categories:
    - id: all
      label: All
    - id: imaging
      label: Imaging & Radiology
    - id: diagnostic-procedures
      label: Diagnostic Procedures
    - id: sample-collection
      label: Sample Collection
    - id: back-office
      label: Back Office
  categoryField: department
  cardFields:
    title: name
    description: summary
    typeLabel: department
    status: status
    statusTone: success
    footerId: code
  filterFields:
    - field: department
      label: Department
    - field: status
      label: Status

# ── Entities (manifest-driven — generator emits entity schemas + seed) ──────
entities:
  - type: lab-service
    fields:
      - { name: name, type: string, required: true }
      - { name: summary, type: string, required: true }
      - { name: department, type: enum, enum: [imaging, diagnostic-procedures, sample-collection, back-office], required: true }
      - { name: status, type: enum, enum: [active, draft], required: true }
      - { name: code, type: string, required: true }
      - { name: slaTargetHours, type: number, required: true }
    seed:
      - id: "a0000000-0001-4000-8000-000000000001"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Obstetric & Pregnancy Ultrasound", summary: "Prenatal imaging across all trimesters.", department: imaging, status: active, code: "IMG-001", slaTargetHours: 24 }
      - id: "a0000000-0002-4000-8000-000000000002"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Abdominal Ultrasound", summary: "General abdominal imaging.", department: imaging, status: active, code: "IMG-002", slaTargetHours: 24 }
      - id: "a0000000-0003-4000-8000-000000000003"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "ECG", summary: "Electrocardiogram, standard 12-lead.", department: diagnostic-procedures, status: active, code: "DXP-001", slaTargetHours: 24 }
      - id: "a0000000-0004-4000-8000-000000000004"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Colonoscopy", summary: "Diagnostic colonoscopy, brokered or in-house.", department: diagnostic-procedures, status: active, code: "DXP-002", slaTargetHours: 48 }
      - id: "a0000000-0005-4000-8000-000000000005"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Phlebotomy / Blood Draw", summary: "Sample collection for lab bloodwork.", department: sample-collection, status: active, code: "SC-001", slaTargetHours: 4 }
      - id: "a0000000-0006-4000-8000-000000000006"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Specimen Intake", summary: "General specimen receipt and labeling.", department: sample-collection, status: active, code: "SC-002", slaTargetHours: 2 }
      - id: "a0000000-0007-4000-8000-000000000007"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Billing Inquiry", summary: "Charge and payment record lookups.", department: back-office, status: active, code: "BO-001", slaTargetHours: 24 }
      - id: "a0000000-0008-4000-8000-000000000008"
        type: lab-service
        tenantId: tenant-alpha
        createdAt: "2026-06-01T08:00:00.000Z"
        updatedAt: "2026-06-01T08:00:00.000Z"
        data: { name: "Insurance Verification", summary: "Panel/coverage confirmation ahead of a visit.", department: back-office, status: active, code: "BO-002", slaTargetHours: 24 }

  - type: exam-order
    fields:
      - { name: patientName, type: string, required: true }
      - { name: patientPhone, type: string, required: true }
      - { name: source, type: enum, enum: [walk-in, dxp, referral], required: true }
      - { name: department, type: enum, enum: [imaging, diagnostic-procedures, sample-collection, back-office], required: true }
      - { name: serviceCode, type: string, required: true }
      - { name: siteId, type: string, required: true }
      - { name: status, type: enum, enum: [in-progress, released, recapture-requested], required: true }
      - { name: technicianId, type: string, required: false }
      - { name: releasedAt, type: string, required: false }
      - { name: notes, type: string, required: false }
      - { name: referrerAccountId, type: string, required: false }
    seed:
      - id: "b0000000-0001-4000-8000-000000000001"
        type: exam-order
        tenantId: tenant-alpha
        createdAt: "2026-08-01T08:10:00.000Z"
        updatedAt: "2026-08-01T08:10:00.000Z"
        data: { patientName: "Amara Osei", patientPhone: "+254700000001", source: walk-in, department: imaging, serviceCode: "IMG-001", siteId: "upper-hill", status: in-progress }
      - id: "b0000000-0002-4000-8000-000000000002"
        type: exam-order
        tenantId: tenant-alpha
        createdAt: "2026-07-30T09:00:00.000Z"
        updatedAt: "2026-07-30T15:40:00.000Z"
        data: { patientName: "Diego Ramirez", patientPhone: "+254700000002", source: dxp, department: sample-collection, serviceCode: "SC-001", siteId: "upper-hill", status: released, technicianId: "tech-01", releasedAt: "2026-07-30T15:40:00.000Z" }
      - id: "b0000000-0003-4000-8000-000000000003"
        type: exam-order
        tenantId: tenant-alpha
        createdAt: "2026-07-29T10:00:00.000Z"
        updatedAt: "2026-07-29T14:00:00.000Z"
        data: { patientName: "Priya Nair", patientPhone: "+254700000003", source: referral, department: diagnostic-procedures, serviceCode: "DXP-001", siteId: "upper-hill", status: released, technicianId: "tech-02", releasedAt: "2026-07-29T14:00:00.000Z", referrerAccountId: "partner-acct-001" }
      - id: "b0000000-0004-4000-8000-000000000004"
        type: exam-order
        tenantId: tenant-alpha
        createdAt: "2026-07-28T08:30:00.000Z"
        updatedAt: "2026-07-28T09:15:00.000Z"
        data: { patientName: "Marcus Webb", patientPhone: "+254700000004", source: walk-in, department: imaging, serviceCode: "IMG-002", siteId: "upper-hill", status: recapture-requested, technicianId: "tech-01", notes: "Image clarity insufficient, recapture on next slot." }
      - id: "b0000000-0005-4000-8000-000000000005"
        type: exam-order
        tenantId: tenant-alpha
        createdAt: "2026-07-27T07:45:00.000Z"
        updatedAt: "2026-07-27T07:45:00.000Z"
        data: { patientName: "Grace Mwangi", patientPhone: "+254700000005", source: dxp, department: back-office, serviceCode: "BO-002", siteId: "upper-hill", status: in-progress }

modules:
  - id: DWS.07.M01
    name: Servicing Queue
    journey: 3
    scaffold: SH.03
    route: /servicing
    features:
      # LVE Workspace (list + detail + edit, PS.DATA + PS.AUDIT only) — chosen over
      # DWS.06's APP.F02 (detail) + APP.F06 (approval) pattern because there is no
      # second internal reviewer to approve against (AD-02, AP-08). The technician
      # edits status directly; PS.AUDIT logs it, PS.RBAC scopes who can.
      # Config below matches packages/stack/app-scaffolds/features/lve-workspace/types.ts
      # LveWorkspaceConfig exactly (confirmed via scaffold-dry-run.mjs, not guessed).
      # Release/recapture use quickActions.patch, never quickActions.engineAction —
      # engineAction routes through PS.WORKFLOW, which this solution deliberately
      # does not consume (AD-02, AP-08). patch is the documented alternative for a
      # lifecycle field with no bound workflow, which is exactly our case.
      - id: APP.F19
        role: servicing-queue
        slot: main
        wires: [PS.DATA, PS.AUDIT]
        config:
          entityType: exam-order
          entityLabel: Exam Order
          columns:
            - { field: patientName, label: Patient, sortable: true }
            - { field: department, label: Department, sortable: true }
            - { field: source, label: Source, sortable: true }
            - { field: status, label: Status, sortable: true, format: badge, badgeTones: { in-progress: warning, released: success, recapture-requested: danger } }
          pageSize: 25
          enableSearch: true
          selectable: true
          header:
            titleField: patientName
            subtitleField: serviceCode
            statusField: status
          detailTabs:
            - id: details
              label: Order Details
              sections:
                - title: Order Details
                  fields:
                    - { field: patientName, label: Patient, format: text }
                    - { field: patientPhone, label: Phone, format: text }
                    - { field: source, label: Source }
                    - { field: department, label: Department }
                    - { field: serviceCode, label: Service }
                    - { field: siteId, label: Site }
                    - { field: notes, label: Notes, format: text, editable: true, editType: text }
          quickActions:
            - action: release
              label: Release
              when: [{ field: status, op: is, value: in-progress }]
              patch: { status: released }
              tone: success
            - action: recapture
              label: Request Recapture
              when: [{ field: status, op: is, value: in-progress }]
              patch: { status: recapture-requested }
              tone: warning
            - action: back-to-progress
              label: Back to In Progress
              when: [{ field: status, op: is, value: recapture-requested }]
              patch: { status: in-progress }
              tone: default
          showActivity: true
          createConfig:
            title: New Exam Order
            fields:
              - { field: patientName, label: Patient Name, editType: text, required: true }
              - { field: patientPhone, label: Patient Phone, editType: text, required: true }
              - { field: source, label: Source, editType: select, required: true, editOptions: [{ value: walk-in, label: Walk-in }, { value: dxp, label: Patient App }, { value: referral, label: Referral }] }
              - { field: department, label: Department, editType: select, required: true, editOptions: [{ value: imaging, label: Imaging & Radiology }, { value: diagnostic-procedures, label: Diagnostic Procedures }, { value: sample-collection, label: Sample Collection }, { value: back-office, label: Back Office }] }
              - { field: serviceCode, label: Service Code, editType: text, required: true }
              - { field: siteId, label: Site, editType: text, required: true }
            defaults: { status: in-progress }
      - id: ANL.F03
        role: servicing-kpis
        slot: detailContent
        wires: [PS.DATA]
        config:
          layout: grid
          kpis:
            - id: in-progress
              label: In Progress
              entityType: exam-order
              metric: { aggregate: count }
              filters: { status: in-progress }
              format: number
              icon: Activity
              tone: warning
            - id: released
              label: Released
              entityType: exam-order
              metric: { aggregate: count }
              filters: { status: released }
              format: number
              icon: Target
              tone: success
            - id: recapture
              label: Recapture Requested
              entityType: exam-order
              metric: { aggregate: count }
              filters: { status: recapture-requested }
              format: number
              icon: TrendingUp
              tone: info
    nav:
      logo: "BioTest Servicing"
      items:
        - id: servicing-queue
          label: Servicing Queue
          href: /servicing
          active: true
      sections: &NAV_SECTIONS
        - id: orientation
          label: ORIENTATION
          items:
            - id: queue
              label: Servicing Queue
              icon: BookOpen
              children:
                - id: queue-link
                  label: Servicing Queue
                  href: /servicing
        - id: marketplace
          label: MARKETPLACE
          items:
            - id: catalogue
              label: Service Catalog
              icon: LayoutGrid
              children:
                - id: catalogue-imaging
                  label: Imaging & Radiology
                  href: /marketplace/discern
                - id: catalogue-diagnostic
                  label: Diagnostic Procedures
                  href: /marketplace/design
                - id: catalogue-sample
                  label: Sample Collection
                  href: /marketplace/deploy
                - id: catalogue-back-office
                  label: Back Office
                  href: /marketplace/drive
      breadcrumb:
        - label: DWS.07
          href: /
        - label: Servicing Queue

  # ── M02–M05: Internal Service Catalog — 4 departments ───────────────────
  - id: DWS.07.M02
    name: Imaging & Radiology
    journey: 1
    scaffold: SH.01
    route: /marketplace/discern
    features:
      - id: APP.F10
        role: imaging-catalogue
        slot: catalog
        wires: [PS.DATA, PS.SEARCH]
        config:
          entityType: lab-service
          headline: "Imaging & Radiology."
          lede: "Ultrasound, CT, MRI, and X-Ray requests."
          filters: { department: imaging }
          cardFields: { title: name, description: summary, typeLabel: department, status: status, statusTone: success, footerId: code }
          filterFields:
            - { field: status, label: Status }
    nav:
      logo: "BioTest Servicing"
      items:
        - { id: discern, label: Imaging & Radiology, href: /marketplace/discern, active: true }
      sections: *NAV_SECTIONS

  - id: DWS.07.M03
    name: Diagnostic Procedures
    journey: 1
    scaffold: SH.01
    route: /marketplace/design
    features:
      - id: APP.F10
        role: diagnostic-procedures-catalogue
        slot: catalog
        wires: [PS.DATA, PS.SEARCH]
        config:
          entityType: lab-service
          headline: "Diagnostic Procedures."
          lede: "Endoscopy, Colonoscopy, ECG, and EEG requests."
          filters: { department: diagnostic-procedures }
          cardFields: { title: name, description: summary, typeLabel: department, status: status, statusTone: success, footerId: code }
          filterFields:
            - { field: status, label: Status }
    nav:
      logo: "BioTest Servicing"
      items:
        - { id: design, label: Diagnostic Procedures, href: /marketplace/design, active: true }
      sections: *NAV_SECTIONS

  - id: DWS.07.M04
    name: Sample Collection
    journey: 1
    scaffold: SH.01
    route: /marketplace/deploy
    features:
      - id: APP.F10
        role: sample-collection-catalogue
        slot: catalog
        wires: [PS.DATA, PS.SEARCH]
        config:
          entityType: lab-service
          headline: "Sample Collection."
          lede: "Phlebotomy and specimen intake requests."
          filters: { department: sample-collection }
          cardFields: { title: name, description: summary, typeLabel: department, status: status, statusTone: success, footerId: code }
          filterFields:
            - { field: status, label: Status }
    nav:
      logo: "BioTest Servicing"
      items:
        - { id: deploy, label: Sample Collection, href: /marketplace/deploy, active: true }
      sections: *NAV_SECTIONS

  - id: DWS.07.M05
    name: Back Office
    journey: 1
    scaffold: SH.01
    route: /marketplace/drive
    features:
      - id: APP.F10
        role: back-office-catalogue
        slot: catalog
        wires: [PS.DATA, PS.SEARCH]
        config:
          entityType: lab-service
          headline: "Back Office."
          lede: "Billing, insurance, and records requests."
          filters: { department: back-office }
          cardFields: { title: name, description: summary, typeLabel: department, status: status, statusTone: success, footerId: code }
          filterFields:
            - { field: status, label: Status }
    nav:
      logo: "BioTest Servicing"
      items:
        - { id: drive, label: Back Office, href: /marketplace/drive, active: true }
      sections: *NAV_SECTIONS

iam:
  defaultIsolation: pooled
  identity:
    provider: password
  roles:
    - id: platform-admin
      label: Platform Admin
    - id: owner
      label: Lab Owner
    - id: technician
      label: Lab Technician
    - id: front-desk
      label: Front Desk
  permissions:
    - action: read
      resource: exam-order
      description: View exam-orders
    - action: create
      resource: exam-order
      description: Register a new exam-order at intake (front desk)
    - action: update
      resource: exam-order
      description: Update an exam-order's fields
    - action: release
      resource: exam-order
      description: Judge accuracy and release an exam-order in one action (technician) — no second-reviewer approval exists
    - action: recapture
      resource: exam-order
      description: Flag an exam-order for recapture and route it back to in-progress (technician)
    - action: manage
      resource: lab-service
      description: Manage catalog listings, SLA targets, department structure (owner)
---

# BioTest Diagnostics Servicing (DWS.07)

The Internal Servicing Workspace and the one real backend for BioTest Diagnostics4.0
(HLAD AD-08). Every exam-order — walk-in, self-booked via the Patient App, or
referred via the Partner Portal — lands in one queue. Unlike `DWS.06`'s
`servicing-approval` pattern, there is no manager gate: the technician who
captures the order judges its own accuracy and releases it in the same action
(`AD-02`, `AP-08`). `PS.WORKFLOW` is not consumed. Patient App and Partner Portal
are separate, independently-deployed apps that proxy into this solution's API —
modeled on `apps/dxp` → `apps/dws` in `Hotel-Demo-DXP-DWS` — not additional
`SOLUTION.md` manifests of their own.
