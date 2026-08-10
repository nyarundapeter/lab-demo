# BioTest Diagnostics Servicing

**Generated DBP solution** (`DWS.07`, platform `DWS`) — built by the DBP
Blueprint factory. This repo is not hand-built from scratch: most of `app/` and its config
files are emitted from a manifest, on top of reusable Layer 06 platform services.

**Provenance:** if this repo was produced by `export-standalone.sh`, the machine-readable
record of exactly which platform version, `@dbp` package versions, and generator revision
produced it is in `blueprint-release.json` at the repo root (human-readable notes for each
release are under `docs/06-Releases/`). If this is a scaffold-only app with no export yet,
the same provenance lives in `solution/_arch/SOLUTION.md`'s frontmatter instead.

## 60-second orientation

```bash
pnpm install
pnpm --filter @dbp/app-dws-07 dev     # run locally (see docs/02-Guides/getting-started.md)
pnpm --filter @dbp/app-dws-07 verify  # typecheck + lint + test + quality gates
```

- Business logic (entities, workflows, RBAC deltas, custom pages) — `solution/`
- Generated app shell (routes, API mounts, chrome) — `app/` (do not hand-edit)
- Full docs spine — `docs/`, start at `docs/Home.md`

## Ownership map

| Path | Owner | On `--force` regen |
|---|---|---|
| `app/`, `package.json`, `next.config.ts`, `middleware.ts`, `solution/_arch/` | Generator | Overwritten |
| `solution/entities/`, `solution/workflows/`, `solution/modules/`, `solution/rbac/`, `solution/adapters/`, `solution/pages/` | You | Preserved |
| `instrumentation.ts` | You | Preserved |
| `docs/` (this spine — extend freely) | You | Preserved |
| `AGENTS.md` / `CLAUDE.md` | Shared | Only the `FACTORY-NON-NEGOTIABLES`-delimited block is refreshed; everything else is yours |
| `PROGRESS.md`, `quality-ratchet.json`, `.env.local` | You | Created once, never regenerated |

This is the same contract `scripts/scaffold-solution.mjs`'s `isSolutionOwned()` enforces at
generation time — see `AGENTS.md` "File ownership contract" for the full list.

## How updates arrive

Two channels, see `docs/07-Handover/BUILDER-GUIDE.md`:

1. **Package bump** — `@dbp/*` tarball/dependency versions move (bug fixes, design-token or
   platform-service internals). No file in this repo changes and no regen runs.
2. **Regen** — edit `docs/10-Solutions/DWS.07-SOLUTION.md` (the manifest) and run
   `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force` (or `pnpm regen`
   inside a standalone repo). Carries page/route/nav/theme changes. Always verify data at
   runtime afterward — a green build does not prove data survived.

## The rules

- **Don't hand-edit generator-owned files** (see Ownership map above) — the next regen
  overwrites them. Need custom UI on a generated page? Set the module's `pageComponent` to a
  `solution/pages/<name>.tsx` component instead.
- **Schema changes go through migrations, never hand-edited SQL.** This solution runs in prototype (non-persistent) storage mode — no migration toolchain is emitted.
- **Quality gates are not optional.** `pnpm verify` runs the same checks the factory itself
  requires before this solution shipped — don't `--no-verify` past a red one.

## More

- [Docs index](docs/Home.md) — the full spine (architecture, guides, testing, decisions, operations, handover)
- [Team handoff](docs/07-Handover/TEAM-HANDOFF.md) — what's built, how to run it, demo login
- [Extending this solution](docs/EXTENDING.md) — task-by-task how-do-I guide
