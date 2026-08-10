# BioTest Diagnostics4.0 — Container View (C4 L2)

> Notation: C4 Level 2 (Container) | Renderer: PlantUML (C4-PlantUML stdlib) | Source: `business-requirements-specification.md`, `system-context.md`
>
> **Corrected — see HLAD AD-08.** The original version of this diagram showed all 3 client apps as symmetric peers each calling one shared API Gateway. That's wrong: the real pattern (confirmed against `dbp_blueprint_build`/`Hotel-Demo-DXP-DWS`) is one scaffolded backend solution (the DWS-equivalent, containing the Internal Servicing Workspace + gateway + data layer) plus two independently-deployed thin-client apps (Patient App, Partner Portal) that proxy into it over HTTP — never their own platform services.

```plantuml
@startuml C4_Container_BioTest
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

skinparam backgroundColor #0d1117
skinparam defaultFontColor #e6edf3
skinparam ArrowColor #9aa4b2
skinparam shadowing false
skinparam roundCorner 8

LAYOUT_LEFT_RIGHT()
LAYOUT_WITH_LEGEND()

title Container View — BioTest Diagnostics4.0 (DWS-hub / DXP-thin-client)

Person(staff, "Internal Staff", "Front Desk, Lab Technician, Lab Owner")
Person(patient, "Patient")
Person(partner, "Doctor / Referral Front Desk")

System_Boundary(biotest, "BioTest Diagnostics4.0") {
    Container_Boundary(dwsHub, "DWS-equivalent solution - one scaffolded backend") {
        Container(internalApp, "Internal Servicing Workspace", "Next.js", "Queue, catalog admin, dashboard - same deployment as the gateway")
        Container(gateway, "API Gateway", "Express / BFF", "The one real backend - business logic, orchestration, access control")
        Container(foundation, "Foundation Services", "Node.js background service", "Notification dispatch and audit logging")
        Container(dataApi, "Data API", "Supabase / PostgREST", "Mediates DB access, enforces RLS")
        ContainerDb(postgres, "PostgreSQL", "PostgreSQL", "System of record - platform, s1_discovery, s2_account, s3_ops, s4_diagnostics")
        Container(redis, "Redis", "Redis", "Cache and session state")
    }
    Container(patientApp, "Patient App", "Next.js", "Independently deployed - no platform services of its own")
    Container(partnerApp, "Partner Portal", "Next.js", "Independently deployed - no platform services of its own")
}

System_Ext(notifyChannels, "Notification Channels", "WhatsApp Business API, SMS/Email Gateway [3rd-party]")

Rel(staff, internalApp, "Uses")
Rel(patient, patientApp, "Uses")
Rel(partner, partnerApp, "Uses")

Rel(internalApp, gateway, "Calls (same deployment)")
Rel(patientApp, gateway, "Calls via a thin server-side proxy client (cross-deployment)")
Rel(partnerApp, gateway, "Calls via a thin server-side proxy client (cross-deployment)")

Rel(gateway, dataApi, "Reads and writes exam-order, lab-service, accounts")
Rel(gateway, foundation, "Triggers on release")
Rel(gateway, redis, "Reads and writes session state")

Rel(dataApi, postgres, "Reads and writes")
Rel(foundation, dataApi, "Reads account and order data")
Rel(foundation, notifyChannels, "Dispatches notifications")

@enduml
```

**Legend:**

| Arrow label | Protocol | Mode | Notes |
|---|---|---|---|
| Uses (staff/patient/partner → app) | HTTPS | sync | Browser/mobile session |
| Calls (same deployment) | In-process | sync | Internal Servicing Workspace and the API Gateway ship as one solution |
| Calls via a thin server-side proxy client | HTTPS/REST | sync | Cross-deployment — Patient App/Partner Portal never touch PostgreSQL, Redis, or PS.* directly; a server-side client (the `dws-client.ts` pattern) makes the call, same as `apps/dxp` does against `apps/dws` in the reference build |
| Reads and writes exam-order, lab-service, accounts | HTTPS/REST | sync | Data API, RLS-enforced |
| Triggers on release | In-process / internal queue | async | Fires when technician finalizes an order (BRS §14 seam) |
| Reads and writes session state | Redis protocol | sync | Session + cache only, per guardrail G-05 |
| Reads and writes (Data API → PostgreSQL) | TCP/SQL via PostgREST | sync | RLS enforced at this boundary (G-03) |
| Reads account and order data | HTTPS/REST | sync | Foundation Services never bypasses Data API (G-02) |
| Dispatches notifications | WhatsApp Business API / SMS / SMTP | async | Fire-and-forget, best-effort |

**Notation:** Person = tier-level actor (collapsed from the 6 named personas per BRS's own S00 tier-level convention). `Container_Boundary` = the one scaffolded backend solution (DWS-equivalent) — everything inside ships and deploys together. Container outside that boundary = an independently deployed app. ContainerDb = data store. System_Ext (grey) = external, combined box for both notification channels.

**Design notes:**
- Foundation Services routes through Data API rather than hitting PostgreSQL directly, per guardrails G-02/G-03 — adds a hop to every audit write, confirmed as intentional.
- Patient App and Partner Portal are peers of each other, not of the Internal Servicing Workspace — they're separately deployable client apps with zero platform-service consumption of their own, proxying every read/write into the one real backend. This mirrors the proven `Hotel-Demo-DXP-DWS` pattern (`apps/dxp` → `apps/dws`) rather than the platform-prd-era assumption of three symmetric surfaces.

**Readability self-check:** PASS on density (14 nodes / 13 edges — nudged over the 12-node guideline by the added `Container_Boundary`, judged worth it for correctness over the prior wrong-but-compact version), arrow labels, PlantUML renderer, full legend.
