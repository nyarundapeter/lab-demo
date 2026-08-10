# Extending BioTest Diagnostics Servicing

Task-by-task guide for the changes a solution builder actually makes. Each task names the
exact file(s) to touch, what NOT to touch, and how to verify. For the reference-table version
of the same rules, see `docs/07-Handover/BUILDER-GUIDE.md`; for the full ownership contract,
see the root `README.md`.

## Add an entity

1. Add an `entities:` block entry to `docs/10-Solutions/DWS.07-SOLUTION.md`
   (type, label, fields, seed rows).
2. Regen: `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force`.
3. A Zod schema is emitted to `solution/entities/<type>.ts` — solution-owned from that point;
   hand-edit it freely (add fields, validation) without re-running the manifest step again.
4. **Don't** hand-write a TypeScript `interface` for the entity — `z.infer<typeof Schema>` is
   the only source of truth.
5. Verify: `curl -H "x-tenant-id: tenant-alpha" http://localhost:9030/api/platform/data/entities/<type>`
   returns the seeded rows.

## Add a page / feature config

1. Add or edit a `modules:` entry in `docs/10-Solutions/DWS.07-SOLUTION.md`
   (`id`, `route`, `scaffold`, `features`).
2. Regen with `--force` (same command as above).
3. **Don't** hand-edit the emitted route under `app/` — it is overwritten on the next regen.
   For custom page bodies, set that module's `pageComponent` to a component under
   `solution/pages/<name>.tsx` instead (solution-owned, survives regen).
4. Verify: the new route returns 200 and renders inside the standard shell (no duplicate
   `PageHeader` — see `docs/02-Guides/page-frame-contract.md`).

## Change navigation

1. Adding/removing a bespoke page changes the nav automatically (driven by `modules:`).
2. To rename or reorder standard-menu entries, edit the relevant `modules:` override in the
   manifest — the standard menu is the generator's default, and a manifest module overrides a
   standard slot by matching `route`.
3. **Don't** hand-edit the generated nav/shell wiring under `app/`.
4. Verify: the item appears/moves in the rendered sidebar at the expected route.

## Add a workflow

1. Add a workflow definition under `solution/workflows/` (solution-owned — create it directly,
   no manifest step required for the definition itself).
2. Wire the module that should surface it via the manifest's `features` config for that module.
3. **Don't** reimplement PS.WORKFLOW's engine or state machine — the workflow definition
   describes states/transitions; the platform service runs them.
4. Verify: the workflow's actions appear on the bound record and transitions persist across a
   reload.

## Add a migration (not applicable — prototype storage mode)

This solution runs in prototype (non-persistent JSONB) storage mode, so no migration
toolchain is emitted. If this solution needs a real database, that's a manifest change
(`storage_mode: postgres`) followed by a regen — not something to hand-build here.

## Request a platform update

Platform-service fixes and `@dbp/*` internals arrive via the package-bump channel, not by
hand-patching anything under `node_modules`/vendored packages. Raise the change against the
DBP Blueprint factory (the monorepo this solution was generated from) — see
`docs/02-Guides/getting-started.md` "Regenerating the scaffold" and the root `README.md`'s
"How updates arrive" section for the two channels.
