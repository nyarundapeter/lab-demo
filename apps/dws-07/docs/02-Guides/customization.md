# Customization Guide — BioTest Diagnostics Servicing

## What you can change

### Safe to hand-edit (solution-owned)

| Path | What it controls |
|---|---|
| `solution/entities/<type>.ts` | Zod schema + seed data for an entity type |
| `solution/workflows/` | Workflow definitions |
| `solution/modules/` | Module-level configs |
| `instrumentation.ts` | App bootstrap (schema/seed registration) |
| `docs/` | Project documentation |
| `AGENTS.md`, `CLAUDE.md`, `.ai/context.md` | AI agent context |

### Change via the manifest (then regen)

Edit `docs/10-Solutions/DWS.07-SOLUTION.md` and run `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force` to update:

- Adding or removing modules (pages, routes)
- Changing features on a module (entity-list, LVE, analytics, etc.)
- Adding or removing platform services
- Theme tokens (primary colour, accent, font, radius)
- Home page composition (hero, features, how-it-works, CTA)
- Marketplace configuration

### Do NOT hand-edit

These are generator-owned and will be overwritten on the next regen:

- `app/` — all Next.js pages, API route mounts, chrome, providers, middleware
- `package.json`, `next.config.ts`, `tsconfig.json`, PostCSS/Tailwind configs
- `solution/_arch/SOLUTION.md` — this is generated output, not an input

## Adding a new entity type

1. Add an `entities:` block to `docs/10-Solutions/DWS.07-SOLUTION.md`:
   ```yaml
   entities:
     - type: my-entity
       label: My Entity
       fields:
         - { name: title, type: string, label: Title }
       seed:
         - { id: "1", title: "Example" }
   ```
2. Regen: `pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force`
3. A Zod schema is emitted to `solution/entities/my-entity.ts` (solution-owned from that point)

## Adding a custom adapter

For domain data not in the generic entity store (e.g. a discovery catalogue), add a solution-owned adapter:

1. Create `solution/adapters/<name>.ts` with your domain schema + data
2. Import and register it in `app/api/platform/data/[[...path]]/route.ts` (solution-owned)
3. Wire your page to the adapter's entity type

## Theming

Set theme tokens in the manifest `theme:` block and regen. Tokens available:

- `primary` — primary brand colour (hex)
- `accent` — accent colour (hex)
- `font-sans` — body font family
- `radius` — base border radius

See `docs/01-Architecture/` in the monorepo for the full token reference.
