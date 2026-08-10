# BioTest Diagnostics4.0 — Context View (C4 L1)

> Notation: C4 Level 1 (System Context) | Renderer: Mermaid | Source: `business-requirements-specification.md`, `feature-backlog.md`

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#2b3a55', 'primaryTextColor':'#ffffff', 'primaryBorderColor':'#7a9cc6', 'lineColor':'#9aa4b2', 'fontSize':'14px'}}}%%
C4Context
    title Context View — BioTest Diagnostics4.0

    Person(patient, "Patient", "Books, tracks, and collects diagnostic results [External]")
    Person(doctor, "Doctor / Consultant", "Refers patients and reviews released results [Partner]")
    Person(refFrontDesk, "Referral Front Desk", "Submits and tracks referrals, for a practice or standalone [Partner]")
    Person(frontDesk, "Front Desk", "Registers intake and manages patient handover [Internal]")
    Person(technician, "Lab Technician", "Captures, judges, and releases exam-orders [Internal]")
    Person(owner, "Lab Owner", "Oversees operations, catalog, and staff [Internal]")

    System(biotest, "BioTest Diagnostics4.0", "Diagnostic servicing platform - intake, capture, and release of exam-orders across 3 tiers")

    System_Ext(whatsapp, "WhatsApp Business API", "Booking and status messaging [3rd-party]")
    System_Ext(notify, "SMS / Email Gateway", "Release notifications [3rd-party SaaS]")

    Rel(patient, biotest, "Books and tracks a visit")
    Rel(doctor, biotest, "Refers and reviews results")
    Rel(refFrontDesk, biotest, "Submits and tracks referrals")
    Rel(frontDesk, biotest, "Registers and hands off intake")
    Rel(technician, biotest, "Captures and releases orders")
    Rel(owner, biotest, "Oversees queue and catalog")
    Rel(biotest, whatsapp, "Sends booking confirmations")
    Rel(biotest, notify, "Sends release notifications")
```

**Legend:**

| Arrow label | Protocol | Mode | Notes |
|---|---|---|---|
| Books and tracks a visit | HTTPS/REST | sync | Phone/email OTP or magic-link auth |
| Refers and reviews results | HTTPS/REST | sync | Single clinic-user role |
| Submits and tracks referrals | HTTPS/REST | sync | Standalone or practice-linked account |
| Registers and hands off intake | HTTPS/REST | sync | Internal staff auth |
| Captures and releases orders | HTTPS/REST | sync | Internal staff auth |
| Oversees queue and catalog | HTTPS/REST | sync | Internal staff auth, admin scope |
| Sends booking confirmations | WhatsApp Business API / HTTPS | async | Fire-and-forget, best-effort |
| Sends release notifications | HTTPS/REST (SMS/SMTP) | async | Fire-and-forget, best-effort |

**Notation:** Person = human actor. System (bold border) = BioTest, the system-in-scope. System_Ext (grey) = external 3rd-party system. Solid arrows = relationship, direction = initiator → recipient.

**Readability self-check:** PASS on density, arrow labels, split threshold, legend requirement. **FLAGGED:** Rule 6 (renderer selection) recommends PlantUML over Mermaid above 6 nodes for better auto-layout — this diagram has 9. Kept as Mermaid per explicit confirmation; revisit if the diagram becomes hard to read as rendered.
