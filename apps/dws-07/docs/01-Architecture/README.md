# Solution Overview — BioTest Diagnostics Servicing

**ID:** `DWS.07`  |  **Platform:** `DWS`  |  **Blueprint:** `platform/v1.5.0`

## Purpose

_Update this section with the business purpose of this solution._

## Journey stages

- Stage 3

## Platform services (Layer 06)

These are wired, not built. Each service is a platform capability consumed via its API mount:

### PS.AUTH
- Package: `@dbp/ps-auth`
- Mount: `/api/platform/auth`
- Handler: `app/api/platform/auth/[[...path]]/route.ts`

### PS.RBAC
- Package: `@dbp/ps-rbac`
- Mount: `/api/platform/rbac`
- Handler: `app/api/platform/rbac/[[...path]]/route.ts`

### PS.DATA
- Package: `@dbp/ps-data`
- Mount: `/api/platform/data`
- Handler: `app/api/platform/data/[[...path]]/route.ts`

### PS.AUDIT
- Package: `@dbp/ps-audit`
- Mount: `/api/platform/audit`
- Handler: `app/api/platform/audit/[[...path]]/route.ts`

### PS.NOTIF
- Package: `@dbp/ps-notif`
- Mount: `/api/platform/notif`
- Handler: `app/api/platform/notif/[[...path]]/route.ts`

### PS.SEARCH
- Package: `@dbp/ps-search`
- Mount: `/api/platform/search`
- Handler: `app/api/platform/search/[[...path]]/route.ts`

## Modules (Layer 07)

### My Dashboard (`DWS.07.S01`)
- Route: `/dashboard`  Shell: `SH.02`
- Feature `APP.F21` (`orientation-my-dashboard`) → `@dbp/organisms`

### My Work (`DWS.07.S02`)
- Route: `/my-work`  Shell: `SH.02`
- Feature `APP.F01` (`orientation-my-work`) → `@dbp/organisms`

### Enquiries (`DWS.07.S03`)
- Route: `/transactions/enquiries`  Shell: `SH.02`
- Feature `APP.F01` (`marketplace-enquiries`) → `@dbp/organisms`

### Requests (`DWS.07.S04`)
- Route: `/transactions/requests`  Shell: `SH.02`
- Feature `APP.F01` (`marketplace-requests`) → `@dbp/organisms`

### Support Tickets (`DWS.07.S05`)
- Route: `/transactions/support-tickets`  Shell: `SH.02`
- Feature `APP.F01` (`marketplace-support-tickets`) → `@dbp/organisms`

### Wallet (`DWS.07.S06`)
- Route: `/transactions/wallet`  Shell: `SH.02`
- Feature `APP.F01` (`marketplace-wallet`) → `@dbp/organisms`

### Calendar (`DWS.07.S07`)
- Route: `/collaboration/calendar`  Shell: `SH.02`
- Feature `APP.F01` (`marketplace-calendar`) → `@dbp/organisms`

### Forums (`DWS.07.S08`)
- Route: `/collaboration/forums`  Shell: `SH.02`
- Feature `APP.F19` (`marketplace-forums`) → `@dbp/organisms`

### Cases (`DWS.07.S09`)
- Route: `/manage-work/cases`  Shell: `SH.02`
- Feature `APP.F19` (`workspace-cases`) → `@dbp/organisms`

### Assignments (`DWS.07.S10`)
- Route: `/manage-work/assignments`  Shell: `SH.02`
- Feature `APP.F19` (`workspace-assignments`) → `@dbp/organisms`

### Reviews (`DWS.07.S11`)
- Route: `/manage-work/reviews`  Shell: `SH.02`
- Feature `APP.F19` (`workspace-reviews`) → `@dbp/organisms`

### Escalations (`DWS.07.S12`)
- Route: `/manage-work/escalations`  Shell: `SH.02`
- Feature `APP.F19` (`workspace-escalations`) → `@dbp/organisms`

### Work Queue (`DWS.07.S13`)
- Route: `/monitor-work/queue`  Shell: `SH.02`
- Feature `APP.F19` (`workspace-work-queue`) → `@dbp/organisms`

### Alerts (`DWS.07.S14`)
- Route: `/monitor-work/alerts`  Shell: `SH.02`
- Feature `APP.F01` (`workspace-mw-alerts`) → `@dbp/organisms`

### Service Catalogue (`DWS.07.S15`)
- Route: `/manage-services/catalogue`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-service-catalogue`) → `@dbp/organisms`

### Service Requests (`DWS.07.S16`)
- Route: `/manage-services/requests`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-service-requests`) → `@dbp/organisms`

### Service Lifecycle (`DWS.07.S17`)
- Route: `/manage-services/lifecycle`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-service-lifecycle`) → `@dbp/organisms`

### Service Quality (`DWS.07.S18`)
- Route: `/manage-services/quality`  Shell: `SH.02`
- Feature `APP.F01` (`service-operations-service-quality`) → `@dbp/organisms`

### Customers / Participants (`DWS.07.S19`)
- Route: `/manage-relationships/customers`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-customers`) → `@dbp/organisms`

### Partners (`DWS.07.S20`)
- Route: `/manage-relationships/partners`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-partners`) → `@dbp/organisms`

### Providers (`DWS.07.S21`)
- Route: `/manage-relationships/providers`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-providers`) → `@dbp/organisms`

### Account Management (`DWS.07.S22`)
- Route: `/manage-relationships/accounts`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-account-management`) → `@dbp/organisms`

### Delivery Plans (`DWS.07.S23`)
- Route: `/manage-delivery/plans`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-delivery-plans`) → `@dbp/organisms`

### Tasks (`DWS.07.S24`)
- Route: `/manage-delivery/tasks`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-delivery-tasks`) → `@dbp/organisms`

### Cases (`DWS.07.S25`)
- Route: `/manage-delivery/cases`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-delivery-cases`) → `@dbp/organisms`

### Incidents (`DWS.07.S26`)
- Route: `/manage-delivery/incidents`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-incidents`) → `@dbp/organisms`

### Escalations (`DWS.07.S27`)
- Route: `/manage-delivery/escalations`  Shell: `SH.02`
- Feature `APP.F19` (`service-operations-delivery-escalations`) → `@dbp/organisms`

### Fulfilment Tracking (`DWS.07.S28`)
- Route: `/manage-delivery/fulfilment`  Shell: `SH.02`
- Feature `APP.F01` (`service-operations-fulfilment-tracking`) → `@dbp/organisms`

### Operational Dashboards (`DWS.07.S29`)
- Route: `/dashboards/operational`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-operational-dashboards-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-operational-dashboards-chart`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-operational-dashboards-funnel`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-operational-dashboards-ranking`) → `@dbp/organisms`

### Executive Dashboards (`DWS.07.S30`)
- Route: `/dashboards/executive`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-executive-dashboards-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-executive-dashboards-chart`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-executive-dashboards-heatmap`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-executive-dashboards-summary`) → `@dbp/organisms`

### Custom Dashboards (`DWS.07.S31`)
- Route: `/dashboards/custom`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-custom-dashboards-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-custom-dashboards-chart`) → `@dbp/organisms`

### Alerts & Notifications (`DWS.07.S32`)
- Route: `/dashboards/alerts`  Shell: `SH.02`
- Feature `APP.F01` (`operational-intelligence-alerts-notifications`) → `@dbp/organisms`

### KPI Scorecards (`DWS.07.S33`)
- Route: `/dashboards/scorecards`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-kpi-scorecards-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-kpi-scorecards-chart`) → `@dbp/organisms`

### Ad-hoc Analysis (`DWS.07.S34`)
- Route: `/analytics/adhoc`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-adhoc-analysis-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-adhoc-analysis-chart`) → `@dbp/organisms`

### Trend Analysis (`DWS.07.S35`)
- Route: `/analytics/trends`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-trend-analysis-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-trend-analysis-chart`) → `@dbp/organisms`

### Root Cause Analysis (`DWS.07.S36`)
- Route: `/analytics/root-cause`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-root-cause-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-root-cause-chart`) → `@dbp/organisms`

### Cohort Analysis (`DWS.07.S37`)
- Route: `/analytics/cohort`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-cohort-analysis-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-cohort-analysis-chart`) → `@dbp/organisms`

### Benchmarking (`DWS.07.S38`)
- Route: `/analytics/benchmarking`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-benchmarking-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-benchmarking-chart`) → `@dbp/organisms`

### Standard Reports (`DWS.07.S39`)
- Route: `/reports/standard`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-standard-reports-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-standard-reports-chart`) → `@dbp/organisms`

### Custom Reports (`DWS.07.S40`)
- Route: `/reports/custom`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-custom-reports-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-custom-reports-chart`) → `@dbp/organisms`

### Scheduled Reports (`DWS.07.S41`)
- Route: `/reports/scheduled`  Shell: `SH.02`
- Feature `ANL.F03` (`operational-intelligence-scheduled-reports-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`operational-intelligence-scheduled-reports-chart`) → `@dbp/organisms`

### Report Subscriptions (`DWS.07.S42`)
- Route: `/reports/subscriptions`  Shell: `SH.02`
- Feature `APP.F01` (`operational-intelligence-report-subscriptions`) → `@dbp/organisms`

### Export & Sharing (`DWS.07.S43`)
- Route: `/reports/export`  Shell: `SH.02`
- Feature `APP.F01` (`operational-intelligence-export-sharing`) → `@dbp/organisms`

### Organisation Setup (`DWS.07.S44`)
- Route: `/admin/organisation`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-org-setup`) → `@dbp/organisms`

### Workspace Settings (`DWS.07.S45`)
- Route: `/admin/workspace-settings`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-workspace-settings`) → `@dbp/organisms`

### Branding (`DWS.07.S46`)
- Route: `/admin/branding`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-branding`) → `@dbp/organisms`

### Regional & Language (`DWS.07.S47`)
- Route: `/admin/regional`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-regional-language`) → `@dbp/organisms`

### Business Hours (`DWS.07.S48`)
- Route: `/admin/business-hours`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-business-hours`) → `@dbp/organisms`

### Default Values (`DWS.07.S49`)
- Route: `/admin/defaults`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-default-values`) → `@dbp/organisms`

### User Management (`DWS.07.S50`)
- Route: `/admin/users`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-user-management`) → `@dbp/organisms`

### Role Management (`DWS.07.S51`)
- Route: `/admin/roles`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-role-management`) → `@dbp/organisms`

### Access Control (`DWS.07.S52`)
- Route: `/admin/access-control`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-access-control`) → `@dbp/organisms`

### Authentication Settings (`DWS.07.S53`)
- Route: `/admin/auth`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-auth-settings`) → `@dbp/organisms`

### Form Builder (`DWS.07.S54`)
- Route: `/admin/form-builder`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-form-builder`) → `@dbp/organisms`

### Workflow Builder (`DWS.07.S55`)
- Route: `/admin/workflow-builder`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-workflow-builder`) → `@dbp/organisms`

### Rule Management (`DWS.07.S56`)
- Route: `/admin/rules`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-rule-management`) → `@dbp/organisms`

### Data Model (`DWS.07.S57`)
- Route: `/admin/data-model`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-data-model`) → `@dbp/organisms`

### Master Data (`DWS.07.S58`)
- Route: `/admin/master-data`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-master-data`) → `@dbp/organisms`

### Reference Data (`DWS.07.S59`)
- Route: `/admin/reference-data`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-reference-data`) → `@dbp/organisms`

### Data Quality Rules (`DWS.07.S60`)
- Route: `/admin/data-quality`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-data-quality`) → `@dbp/organisms`

### Data Lineage (`DWS.07.S61`)
- Route: `/admin/data-lineage`  Shell: `SH.02`
- Feature `ANL.F03` (`platform-management-data-lineage-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`platform-management-data-lineage-chart`) → `@dbp/organisms`

### API Management (`DWS.07.S62`)
- Route: `/admin/apis`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-api-management`) → `@dbp/organisms`

### Connectors (`DWS.07.S63`)
- Route: `/admin/connectors`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-connectors`) → `@dbp/organisms`

### Data Flows (`DWS.07.S64`)
- Route: `/admin/data-flows`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-data-flows`) → `@dbp/organisms`

### Data Import (`DWS.07.S65`)
- Route: `/admin/data-import`  Shell: `SH.02`
- Feature `APP.F01` (`platform-management-data-import`) → `@dbp/organisms`

### Policy Management (`DWS.07.S66`)
- Route: `/admin/policies`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-policy-management`) → `@dbp/organisms`

### Control Register (`DWS.07.S67`)
- Route: `/admin/controls`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-control-register`) → `@dbp/organisms`

### Risk Register (`DWS.07.S68`)
- Route: `/admin/risks`  Shell: `SH.02`
- Feature `APP.F19` (`platform-management-risk-register`) → `@dbp/organisms`

### Security Logs (`DWS.07.S69`)
- Route: `/admin/security-logs`  Shell: `SH.02`
- Feature `ANL.F03` (`platform-management-security-logs-scorecard`) → `@dbp/organisms`
- Feature `ANL.F02` (`platform-management-security-logs-chart`) → `@dbp/organisms`

### Servicing Queue (`DWS.07.M01`)
- Route: `/servicing`  Shell: `SH.03`
- Feature `APP.F19` (`servicing-queue`) → `@dbp/organisms`
- Feature `ANL.F03` (`servicing-kpis`) → `@dbp/organisms`

### Imaging & Radiology (`DWS.07.M02`)
- Route: `/marketplace/discern`  Shell: `SH.01`
- Feature `APP.F10` (`imaging-catalogue`) → `@dbp/organisms`

### Diagnostic Procedures (`DWS.07.M03`)
- Route: `/marketplace/design`  Shell: `SH.01`
- Feature `APP.F10` (`diagnostic-procedures-catalogue`) → `@dbp/organisms`

### Sample Collection (`DWS.07.M04`)
- Route: `/marketplace/deploy`  Shell: `SH.01`
- Feature `APP.F10` (`sample-collection-catalogue`) → `@dbp/organisms`

### Back Office (`DWS.07.M05`)
- Route: `/marketplace/drive`  Shell: `SH.01`
- Feature `APP.F10` (`back-office-catalogue`) → `@dbp/organisms`

## Theme

- `--color-primary`: `#14305C`
- `--color-secondary`: `#0E7C7F`
- `--radius`: `8px`
- `--density`: `comfortable`
