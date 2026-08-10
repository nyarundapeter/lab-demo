# Features — BioTest Diagnostics Servicing

This solution ships **5** bespoke module(s) on top of the
standard navigation menu (demo pages).

## Bespoke modules

### Servicing Queue (`DWS.07.M01`)
- Route: `/servicing`  ·  Shell: `SH.03`
- Features: `APP.F19`, `ANL.F03`

### Imaging & Radiology (`DWS.07.M02`)
- Route: `/marketplace/discern`  ·  Shell: `SH.01`
- Features: `APP.F10`

### Diagnostic Procedures (`DWS.07.M03`)
- Route: `/marketplace/design`  ·  Shell: `SH.01`
- Features: `APP.F10`

### Sample Collection (`DWS.07.M04`)
- Route: `/marketplace/deploy`  ·  Shell: `SH.01`
- Features: `APP.F10`

### Back Office (`DWS.07.M05`)
- Route: `/marketplace/drive`  ·  Shell: `SH.01`
- Features: `APP.F10`

## Entities

- `lab-service` — 6 fields, 8 seed rows
- `exam-order` — 11 fields, 5 seed rows
- `service-offering-request` — 4 fields, 0 seed rows
- `reminder` — 4 fields, 2 seed rows

> The rest of the navigation is the standard DBP Feature menu (demo pages). Refine or
> remove per the [Builder Guide](../07-Handover/BUILDER-GUIDE.md).
