---
platform: DWS
solution: DWS.07
name: BioTest Diagnostics Servicing
blueprint_version: platform/v1.5.0
platform_version: platform/v1.5.0
generated_at: 2026-08-10T08:39:24.516Z
generator_rev: 7673816b
deploy_layer: L03
journey_stages:
  - 3
app_package: "@dbp/app-dws-07"
app_dir: apps/dws-07
consumes_platform_services:
  - id: PS.AUTH
    package: "@dbp/ps-auth"
    mount_path: /api/platform/auth
    route_handler: app/api/platform/auth/[[...path]]/route.ts
  - id: PS.RBAC
    package: "@dbp/ps-rbac"
    mount_path: /api/platform/rbac
    route_handler: app/api/platform/rbac/[[...path]]/route.ts
  - id: PS.DATA
    package: "@dbp/ps-data"
    mount_path: /api/platform/data
    route_handler: app/api/platform/data/[[...path]]/route.ts
  - id: PS.AUDIT
    package: "@dbp/ps-audit"
    mount_path: /api/platform/audit
    route_handler: app/api/platform/audit/[[...path]]/route.ts
  - id: PS.NOTIF
    package: "@dbp/ps-notif"
    mount_path: /api/platform/notif
    route_handler: app/api/platform/notif/[[...path]]/route.ts
  - id: PS.SEARCH
    package: "@dbp/ps-search"
    mount_path: /api/platform/search
    route_handler: app/api/platform/search/[[...path]]/route.ts
modules:
  - id: DWS.07.S01
    name: My Dashboard
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboard
    features:
      - id: APP.F21
        role: orientation-my-dashboard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S02
    name: My Work
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /my-work
    features:
      - id: APP.F01
        role: orientation-my-work
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S03
    name: Enquiries
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /transactions/enquiries
    features:
      - id: APP.F01
        role: marketplace-enquiries
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S04
    name: Requests
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /transactions/requests
    features:
      - id: APP.F01
        role: marketplace-requests
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S05
    name: Support Tickets
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /transactions/support-tickets
    features:
      - id: APP.F01
        role: marketplace-support-tickets
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S06
    name: Wallet
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /transactions/wallet
    features:
      - id: APP.F01
        role: marketplace-wallet
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S07
    name: Calendar
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /collaboration/calendar
    features:
      - id: APP.F01
        role: marketplace-calendar
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S08
    name: Forums
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /collaboration/forums
    features:
      - id: APP.F19
        role: marketplace-forums
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S09
    name: Cases
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-work/cases
    features:
      - id: APP.F19
        role: workspace-cases
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S10
    name: Assignments
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-work/assignments
    features:
      - id: APP.F19
        role: workspace-assignments
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S11
    name: Reviews
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-work/reviews
    features:
      - id: APP.F19
        role: workspace-reviews
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S12
    name: Escalations
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-work/escalations
    features:
      - id: APP.F19
        role: workspace-escalations
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S13
    name: Work Queue
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /monitor-work/queue
    features:
      - id: APP.F19
        role: workspace-work-queue
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S14
    name: Alerts
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /monitor-work/alerts
    features:
      - id: APP.F01
        role: workspace-mw-alerts
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S15
    name: Service Catalogue
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-services/catalogue
    features:
      - id: APP.F19
        role: service-operations-service-catalogue
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S16
    name: Service Requests
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-services/requests
    features:
      - id: APP.F19
        role: service-operations-service-requests
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S17
    name: Service Lifecycle
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-services/lifecycle
    features:
      - id: APP.F19
        role: service-operations-service-lifecycle
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S18
    name: Service Quality
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-services/quality
    features:
      - id: APP.F01
        role: service-operations-service-quality
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S19
    name: Customers / Participants
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-relationships/customers
    features:
      - id: APP.F19
        role: service-operations-customers
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S20
    name: Partners
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-relationships/partners
    features:
      - id: APP.F19
        role: service-operations-partners
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S21
    name: Providers
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-relationships/providers
    features:
      - id: APP.F19
        role: service-operations-providers
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S22
    name: Account Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-relationships/accounts
    features:
      - id: APP.F19
        role: service-operations-account-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S23
    name: Delivery Plans
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/plans
    features:
      - id: APP.F19
        role: service-operations-delivery-plans
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S24
    name: Tasks
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/tasks
    features:
      - id: APP.F19
        role: service-operations-delivery-tasks
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S25
    name: Cases
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/cases
    features:
      - id: APP.F19
        role: service-operations-delivery-cases
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S26
    name: Incidents
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/incidents
    features:
      - id: APP.F19
        role: service-operations-incidents
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S27
    name: Escalations
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/escalations
    features:
      - id: APP.F19
        role: service-operations-delivery-escalations
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S28
    name: Fulfilment Tracking
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /manage-delivery/fulfilment
    features:
      - id: APP.F01
        role: service-operations-fulfilment-tracking
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S29
    name: Operational Dashboards
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboards/operational
    features:
      - id: ANL.F03
        role: operational-intelligence-operational-dashboards-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-operational-dashboards-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-operational-dashboards-funnel
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-operational-dashboards-ranking
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S30
    name: Executive Dashboards
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboards/executive
    features:
      - id: ANL.F03
        role: operational-intelligence-executive-dashboards-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-executive-dashboards-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-executive-dashboards-heatmap
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-executive-dashboards-summary
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S31
    name: Custom Dashboards
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboards/custom
    features:
      - id: ANL.F03
        role: operational-intelligence-custom-dashboards-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-custom-dashboards-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S32
    name: Alerts & Notifications
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboards/alerts
    features:
      - id: APP.F01
        role: operational-intelligence-alerts-notifications
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S33
    name: KPI Scorecards
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /dashboards/scorecards
    features:
      - id: ANL.F03
        role: operational-intelligence-kpi-scorecards-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-kpi-scorecards-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S34
    name: Ad-hoc Analysis
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /analytics/adhoc
    features:
      - id: ANL.F03
        role: operational-intelligence-adhoc-analysis-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-adhoc-analysis-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S35
    name: Trend Analysis
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /analytics/trends
    features:
      - id: ANL.F03
        role: operational-intelligence-trend-analysis-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-trend-analysis-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S36
    name: Root Cause Analysis
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /analytics/root-cause
    features:
      - id: ANL.F03
        role: operational-intelligence-root-cause-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-root-cause-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S37
    name: Cohort Analysis
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /analytics/cohort
    features:
      - id: ANL.F03
        role: operational-intelligence-cohort-analysis-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-cohort-analysis-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S38
    name: Benchmarking
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /analytics/benchmarking
    features:
      - id: ANL.F03
        role: operational-intelligence-benchmarking-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-benchmarking-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S39
    name: Standard Reports
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /reports/standard
    features:
      - id: ANL.F03
        role: operational-intelligence-standard-reports-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-standard-reports-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S40
    name: Custom Reports
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /reports/custom
    features:
      - id: ANL.F03
        role: operational-intelligence-custom-reports-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-custom-reports-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S41
    name: Scheduled Reports
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /reports/scheduled
    features:
      - id: ANL.F03
        role: operational-intelligence-scheduled-reports-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: operational-intelligence-scheduled-reports-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S42
    name: Report Subscriptions
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /reports/subscriptions
    features:
      - id: APP.F01
        role: operational-intelligence-report-subscriptions
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S43
    name: Export & Sharing
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /reports/export
    features:
      - id: APP.F01
        role: operational-intelligence-export-sharing
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S44
    name: Organisation Setup
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/organisation
    features:
      - id: APP.F01
        role: platform-management-org-setup
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S45
    name: Workspace Settings
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/workspace-settings
    features:
      - id: APP.F01
        role: platform-management-workspace-settings
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S46
    name: Branding
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/branding
    features:
      - id: APP.F01
        role: platform-management-branding
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S47
    name: Regional & Language
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/regional
    features:
      - id: APP.F01
        role: platform-management-regional-language
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S48
    name: Business Hours
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/business-hours
    features:
      - id: APP.F01
        role: platform-management-business-hours
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S49
    name: Default Values
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/defaults
    features:
      - id: APP.F01
        role: platform-management-default-values
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S50
    name: User Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/users
    features:
      - id: APP.F19
        role: platform-management-user-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S51
    name: Role Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/roles
    features:
      - id: APP.F19
        role: platform-management-role-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S52
    name: Access Control
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/access-control
    features:
      - id: APP.F01
        role: platform-management-access-control
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S53
    name: Authentication Settings
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/auth
    features:
      - id: APP.F01
        role: platform-management-auth-settings
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S54
    name: Form Builder
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/form-builder
    features:
      - id: APP.F01
        role: platform-management-form-builder
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S55
    name: Workflow Builder
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/workflow-builder
    features:
      - id: APP.F01
        role: platform-management-workflow-builder
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S56
    name: Rule Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/rules
    features:
      - id: APP.F01
        role: platform-management-rule-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S57
    name: Data Model
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/data-model
    features:
      - id: APP.F01
        role: platform-management-data-model
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S58
    name: Master Data
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/master-data
    features:
      - id: APP.F19
        role: platform-management-master-data
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S59
    name: Reference Data
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/reference-data
    features:
      - id: APP.F19
        role: platform-management-reference-data
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S60
    name: Data Quality Rules
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/data-quality
    features:
      - id: APP.F01
        role: platform-management-data-quality
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S61
    name: Data Lineage
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/data-lineage
    features:
      - id: ANL.F03
        role: platform-management-data-lineage-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: platform-management-data-lineage-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S62
    name: API Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/apis
    features:
      - id: APP.F01
        role: platform-management-api-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S63
    name: Connectors
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/connectors
    features:
      - id: APP.F01
        role: platform-management-connectors
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S64
    name: Data Flows
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/data-flows
    features:
      - id: APP.F01
        role: platform-management-data-flows
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S65
    name: Data Import
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/data-import
    features:
      - id: APP.F01
        role: platform-management-data-import
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S66
    name: Policy Management
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/policies
    features:
      - id: APP.F19
        role: platform-management-policy-management
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S67
    name: Control Register
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/controls
    features:
      - id: APP.F19
        role: platform-management-control-register
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S68
    name: Risk Register
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/risks
    features:
      - id: APP.F19
        role: platform-management-risk-register
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.S69
    name: Security Logs
    journey_stage: 2
    scaffold: SH.02
    shell_package: "@dbp/shell-transaction"
    route: /admin/security-logs
    features:
      - id: ANL.F03
        role: platform-management-security-logs-scorecard
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
      - id: ANL.F02
        role: platform-management-security-logs-chart
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.M01
    name: Servicing Queue
    journey_stage: 3
    scaffold: SH.03
    shell_package: "@dbp/shell-transaction"
    route: /servicing
    features:
      - id: APP.F19
        role: servicing-queue
        slot: main
        package: "@dbp/organisms"
        wires:
          - PS.DATA
          - PS.AUDIT
      - id: ANL.F03
        role: servicing-kpis
        slot: detailContent
        package: "@dbp/organisms"
        wires:
          - PS.DATA
  - id: DWS.07.M02
    name: Imaging & Radiology
    journey_stage: 1
    scaffold: SH.01
    shell_package: "@dbp/shell-transaction"
    route: /marketplace/discern
    features:
      - id: APP.F10
        role: imaging-catalogue
        slot: catalog
        package: "@dbp/organisms"
        wires:
          - PS.DATA
          - PS.SEARCH
  - id: DWS.07.M03
    name: Diagnostic Procedures
    journey_stage: 1
    scaffold: SH.01
    shell_package: "@dbp/shell-transaction"
    route: /marketplace/design
    features:
      - id: APP.F10
        role: diagnostic-procedures-catalogue
        slot: catalog
        package: "@dbp/organisms"
        wires:
          - PS.DATA
          - PS.SEARCH
  - id: DWS.07.M04
    name: Sample Collection
    journey_stage: 1
    scaffold: SH.01
    shell_package: "@dbp/shell-transaction"
    route: /marketplace/deploy
    features:
      - id: APP.F10
        role: sample-collection-catalogue
        slot: catalog
        package: "@dbp/organisms"
        wires:
          - PS.DATA
          - PS.SEARCH
  - id: DWS.07.M05
    name: Back Office
    journey_stage: 1
    scaffold: SH.01
    shell_package: "@dbp/shell-transaction"
    route: /marketplace/drive
    features:
      - id: APP.F10
        role: back-office-catalogue
        slot: catalog
        package: "@dbp/organisms"
        wires:
          - PS.DATA
          - PS.SEARCH
theme_applied:
  --color-primary: "#14305C"
  --color-secondary: "#0E7C7F"
  --radius: 8px
  --density: comfortable
---

# Resolved Solution Architecture — BioTest Diagnostics Servicing

This file is **generated** by `scaffold-solution`. It records what was actually wired,
not what was declared in the input manifest. Do not edit by hand — re-run the generator.

## Platform Services Wired (Layer 06)

- **PS.AUTH** → `@dbp/ps-auth` mounted at `/api/platform/auth` via `app/api/platform/auth/[[...path]]/route.ts`
- **PS.RBAC** → `@dbp/ps-rbac` mounted at `/api/platform/rbac` via `app/api/platform/rbac/[[...path]]/route.ts`
- **PS.DATA** → `@dbp/ps-data` mounted at `/api/platform/data` via `app/api/platform/data/[[...path]]/route.ts`
- **PS.AUDIT** → `@dbp/ps-audit` mounted at `/api/platform/audit` via `app/api/platform/audit/[[...path]]/route.ts`
- **PS.NOTIF** → `@dbp/ps-notif` mounted at `/api/platform/notif` via `app/api/platform/notif/[[...path]]/route.ts`
- **PS.SEARCH** → `@dbp/ps-search` mounted at `/api/platform/search` via `app/api/platform/search/[[...path]]/route.ts`

## Modules Scaffolded (Layer 07)

### DWS.07.S01 — My Dashboard
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboard`
- Feature `APP.F21` as `orientation-my-dashboard` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S02 — My Work
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/my-work`
- Feature `APP.F01` as `orientation-my-work` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S03 — Enquiries
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/transactions/enquiries`
- Feature `APP.F01` as `marketplace-enquiries` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S04 — Requests
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/transactions/requests`
- Feature `APP.F01` as `marketplace-requests` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S05 — Support Tickets
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/transactions/support-tickets`
- Feature `APP.F01` as `marketplace-support-tickets` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S06 — Wallet
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/transactions/wallet`
- Feature `APP.F01` as `marketplace-wallet` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S07 — Calendar
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/collaboration/calendar`
- Feature `APP.F01` as `marketplace-calendar` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S08 — Forums
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/collaboration/forums`
- Feature `APP.F19` as `marketplace-forums` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S09 — Cases
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-work/cases`
- Feature `APP.F19` as `workspace-cases` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S10 — Assignments
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-work/assignments`
- Feature `APP.F19` as `workspace-assignments` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S11 — Reviews
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-work/reviews`
- Feature `APP.F19` as `workspace-reviews` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S12 — Escalations
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-work/escalations`
- Feature `APP.F19` as `workspace-escalations` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S13 — Work Queue
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/monitor-work/queue`
- Feature `APP.F19` as `workspace-work-queue` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S14 — Alerts
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/monitor-work/alerts`
- Feature `APP.F01` as `workspace-mw-alerts` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S15 — Service Catalogue
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-services/catalogue`
- Feature `APP.F19` as `service-operations-service-catalogue` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S16 — Service Requests
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-services/requests`
- Feature `APP.F19` as `service-operations-service-requests` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S17 — Service Lifecycle
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-services/lifecycle`
- Feature `APP.F19` as `service-operations-service-lifecycle` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S18 — Service Quality
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-services/quality`
- Feature `APP.F01` as `service-operations-service-quality` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S19 — Customers / Participants
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-relationships/customers`
- Feature `APP.F19` as `service-operations-customers` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S20 — Partners
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-relationships/partners`
- Feature `APP.F19` as `service-operations-partners` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S21 — Providers
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-relationships/providers`
- Feature `APP.F19` as `service-operations-providers` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S22 — Account Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-relationships/accounts`
- Feature `APP.F19` as `service-operations-account-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S23 — Delivery Plans
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/plans`
- Feature `APP.F19` as `service-operations-delivery-plans` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S24 — Tasks
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/tasks`
- Feature `APP.F19` as `service-operations-delivery-tasks` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S25 — Cases
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/cases`
- Feature `APP.F19` as `service-operations-delivery-cases` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S26 — Incidents
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/incidents`
- Feature `APP.F19` as `service-operations-incidents` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S27 — Escalations
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/escalations`
- Feature `APP.F19` as `service-operations-delivery-escalations` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S28 — Fulfilment Tracking
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/manage-delivery/fulfilment`
- Feature `APP.F01` as `service-operations-fulfilment-tracking` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S29 — Operational Dashboards
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboards/operational`
- Feature `ANL.F03` as `operational-intelligence-operational-dashboards-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-operational-dashboards-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-operational-dashboards-funnel` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-operational-dashboards-ranking` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S30 — Executive Dashboards
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboards/executive`
- Feature `ANL.F03` as `operational-intelligence-executive-dashboards-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-executive-dashboards-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-executive-dashboards-heatmap` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-executive-dashboards-summary` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S31 — Custom Dashboards
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboards/custom`
- Feature `ANL.F03` as `operational-intelligence-custom-dashboards-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-custom-dashboards-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S32 — Alerts & Notifications
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboards/alerts`
- Feature `APP.F01` as `operational-intelligence-alerts-notifications` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S33 — KPI Scorecards
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/dashboards/scorecards`
- Feature `ANL.F03` as `operational-intelligence-kpi-scorecards-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-kpi-scorecards-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S34 — Ad-hoc Analysis
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/analytics/adhoc`
- Feature `ANL.F03` as `operational-intelligence-adhoc-analysis-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-adhoc-analysis-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S35 — Trend Analysis
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/analytics/trends`
- Feature `ANL.F03` as `operational-intelligence-trend-analysis-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-trend-analysis-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S36 — Root Cause Analysis
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/analytics/root-cause`
- Feature `ANL.F03` as `operational-intelligence-root-cause-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-root-cause-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S37 — Cohort Analysis
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/analytics/cohort`
- Feature `ANL.F03` as `operational-intelligence-cohort-analysis-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-cohort-analysis-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S38 — Benchmarking
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/analytics/benchmarking`
- Feature `ANL.F03` as `operational-intelligence-benchmarking-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-benchmarking-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S39 — Standard Reports
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/reports/standard`
- Feature `ANL.F03` as `operational-intelligence-standard-reports-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-standard-reports-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S40 — Custom Reports
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/reports/custom`
- Feature `ANL.F03` as `operational-intelligence-custom-reports-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-custom-reports-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S41 — Scheduled Reports
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/reports/scheduled`
- Feature `ANL.F03` as `operational-intelligence-scheduled-reports-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `operational-intelligence-scheduled-reports-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S42 — Report Subscriptions
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/reports/subscriptions`
- Feature `APP.F01` as `operational-intelligence-report-subscriptions` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S43 — Export & Sharing
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/reports/export`
- Feature `APP.F01` as `operational-intelligence-export-sharing` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S44 — Organisation Setup
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/organisation`
- Feature `APP.F01` as `platform-management-org-setup` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S45 — Workspace Settings
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/workspace-settings`
- Feature `APP.F01` as `platform-management-workspace-settings` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S46 — Branding
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/branding`
- Feature `APP.F01` as `platform-management-branding` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S47 — Regional & Language
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/regional`
- Feature `APP.F01` as `platform-management-regional-language` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S48 — Business Hours
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/business-hours`
- Feature `APP.F01` as `platform-management-business-hours` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S49 — Default Values
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/defaults`
- Feature `APP.F01` as `platform-management-default-values` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S50 — User Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/users`
- Feature `APP.F19` as `platform-management-user-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S51 — Role Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/roles`
- Feature `APP.F19` as `platform-management-role-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S52 — Access Control
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/access-control`
- Feature `APP.F01` as `platform-management-access-control` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S53 — Authentication Settings
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/auth`
- Feature `APP.F01` as `platform-management-auth-settings` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S54 — Form Builder
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/form-builder`
- Feature `APP.F01` as `platform-management-form-builder` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S55 — Workflow Builder
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/workflow-builder`
- Feature `APP.F01` as `platform-management-workflow-builder` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S56 — Rule Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/rules`
- Feature `APP.F01` as `platform-management-rule-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S57 — Data Model
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/data-model`
- Feature `APP.F01` as `platform-management-data-model` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S58 — Master Data
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/master-data`
- Feature `APP.F19` as `platform-management-master-data` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S59 — Reference Data
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/reference-data`
- Feature `APP.F19` as `platform-management-reference-data` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S60 — Data Quality Rules
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/data-quality`
- Feature `APP.F01` as `platform-management-data-quality` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S61 — Data Lineage
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/data-lineage`
- Feature `ANL.F03` as `platform-management-data-lineage-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `platform-management-data-lineage-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S62 — API Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/apis`
- Feature `APP.F01` as `platform-management-api-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S63 — Connectors
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/connectors`
- Feature `APP.F01` as `platform-management-connectors` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S64 — Data Flows
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/data-flows`
- Feature `APP.F01` as `platform-management-data-flows` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S65 — Data Import
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/data-import`
- Feature `APP.F01` as `platform-management-data-import` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S66 — Policy Management
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/policies`
- Feature `APP.F19` as `platform-management-policy-management` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S67 — Control Register
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/controls`
- Feature `APP.F19` as `platform-management-control-register` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S68 — Risk Register
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/risks`
- Feature `APP.F19` as `platform-management-risk-register` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.S69 — Security Logs
- Shell: `SH.02` (`@dbp/shell-transaction`) | Stage: 2 | Route: `/admin/security-logs`
- Feature `ANL.F03` as `platform-management-security-logs-scorecard` in slot `main` → `@dbp/organisms` wires `PS.DATA`
- Feature `ANL.F02` as `platform-management-security-logs-chart` in slot `main` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.M01 — Servicing Queue
- Shell: `SH.03` (`@dbp/shell-transaction`) | Stage: 3 | Route: `/servicing`
- Feature `APP.F19` as `servicing-queue` in slot `main` → `@dbp/organisms` wires `PS.DATA, PS.AUDIT`
- Feature `ANL.F03` as `servicing-kpis` in slot `detailContent` → `@dbp/organisms` wires `PS.DATA`

### DWS.07.M02 — Imaging & Radiology
- Shell: `SH.01` (`@dbp/shell-transaction`) | Stage: 1 | Route: `/marketplace/discern`
- Feature `APP.F10` as `imaging-catalogue` in slot `catalog` → `@dbp/organisms` wires `PS.DATA, PS.SEARCH`

### DWS.07.M03 — Diagnostic Procedures
- Shell: `SH.01` (`@dbp/shell-transaction`) | Stage: 1 | Route: `/marketplace/design`
- Feature `APP.F10` as `diagnostic-procedures-catalogue` in slot `catalog` → `@dbp/organisms` wires `PS.DATA, PS.SEARCH`

### DWS.07.M04 — Sample Collection
- Shell: `SH.01` (`@dbp/shell-transaction`) | Stage: 1 | Route: `/marketplace/deploy`
- Feature `APP.F10` as `sample-collection-catalogue` in slot `catalog` → `@dbp/organisms` wires `PS.DATA, PS.SEARCH`

### DWS.07.M05 — Back Office
- Shell: `SH.01` (`@dbp/shell-transaction`) | Stage: 1 | Route: `/marketplace/drive`
- Feature `APP.F10` as `back-office-catalogue` in slot `catalog` → `@dbp/organisms` wires `PS.DATA, PS.SEARCH`

## Theme

- `--color-primary`: `#14305C`
- `--color-secondary`: `#0E7C7F`
- `--radius`: `8px`
- `--density`: `comfortable`
