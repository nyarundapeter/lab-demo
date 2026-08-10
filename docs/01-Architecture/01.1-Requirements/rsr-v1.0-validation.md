# Validation Report — BioTest Diagnostics4.0 RSR v1.0

**Status:** PASS
**Date:** 2026-08-05
**Checks run:** 12
**Passed:** 12
**Failed:** 0
**Warnings:** 2

## Fixes applied this pass

| Rule | Original finding | Fix applied |
|---|---|---|
| V-RSR-02 / V-RSR-12 | §5.7 (Stage Y, not applicable to this platform) was written as plain prose, missing the required `### Backlog` / `### Inclusions` / `### Exclusions` structure | Rewrote §5.7 with all three sub-tables present, each explicitly stating N/A rather than omitting the structure |

## Warnings

| Rule | Description | Location |
|---|---|---|
| V-RSR-04 | NFR-10 Measurable Target contains `[TBD]` pending an evidence-export response-time decision | §5.12 |
| V-RSR-04 | NFR-11 Measurable Target contains `[TBD]` pending the hosting decision (HLAD AD-07) | §5.12 |

Both warnings trace to the same open decision already flagged in HLAD AD-07 — not new gaps, the same unresolved deployment question surfacing in a second document.

## Pass summary

| Rule | Result |
|---|---|
| V-RSR-01 | PASS |
| V-RSR-02 | PASS (fixed) |
| V-RSR-03 | PASS |
| V-RSR-04 | PASS (2 warnings, no failures) |
| V-RSR-05 | PASS |
| V-RSR-06 | PASS |
| V-RSR-07 | PASS |
| V-RSR-08 | PASS |
| V-RSR-09 | PASS |
| V-RSR-10 | PASS |
| V-RSR-11 | PASS |
| V-RSR-12 | PASS (fixed) |
