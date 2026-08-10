# Entity Playbook — the one-file workflow

> **You should almost never build a screen by hand.** This solution is generated
> from ONE file: `docs/10-Solutions/DWS.07-SOLUTION.md` (the
> manifest). Describe your data there, regenerate, and the screens follow.

## Add a new entity (e.g. "control")

1. Open `docs/10-Solutions/DWS.07-SOLUTION.md`.
2. In the `entities:` block, add your entity — name it, list its fields,
   and (optionally) its lifecycle:

   ```yaml
   entities:
     - type: control
       fields:
         - { name: title,  type: string, required: true }
         - { name: owner,  type: string }
         - { name: status, type: enum, enum: [draft, active, retired] }
       lifecycle:
         states: [draft, active, retired]
         transitions:
           - { from: draft, to: active, action: activate }
   ```

3. Wire it to a screen — give a module's list feature the entity:

   ```yaml
   features:
     - id: APP.F19        # LVE workspace (list-view-edit)
       role: controls
       wires: [PS.DATA]
       config: { entityType: control }
   ```

4. Run:

   ```bash
   pnpm regen --dry-run   # PREVIEW: exactly what would be created/overwritten/deleted
   pnpm regen             # regenerates the app from the manifest
   pnpm verify            # typecheck + lint + tests + quality gates
   pnpm dev               # spot-check the affected screens
   ```

Your hand-written files are SAFE across a regen — `solution/**`,
`instrumentation.ts`, tests, and docs are never overwritten (see the file
ownership contract in AGENTS.md). Only generated chrome/pages/config refresh.

## Change or remap an entity

Edit the same block (rename a field, change the lifecycle, point at a different
entity) and run `pnpm regen` again. Screens, columns, tabs, and stage bars are
all projections of the manifest — they follow automatically.

## What regen can and cannot do here

- ✅ Entities, fields, lifecycles, module configs, nav, theme tokens, feature
  wiring — all manifest-driven, regenerate freely.
- ⚠️ Adding a NEW platform feature (a new `APP.F*` id this repo has never
  used) may need a package this repo doesn't carry — `pnpm regen` will tell
  you and the platform team ships it via a blueprint re-export.
- ✋ Business rules for CHANGING data across multiple tables (approvals,
  multi-step saves) stay hand-written — copy the pattern in
  `app/api/example-catalog/route.ts` (validate at the boundary, all writes in
  one transaction). That code lives in solution-owned files and survives regens.

## If you are about to hand-edit a generated page — stop

Set the module's `pageComponent` in the manifest to a component under
`solution/pages/` instead (see docs/02-Guides/page-wiring.md). Hand-edits to
generated pages are destroyed by the next regen; `solution/pages/**` is yours
forever.
