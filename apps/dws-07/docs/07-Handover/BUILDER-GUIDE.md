# Solution Builder Guide — DWS.07 (BioTest Diagnostics Servicing)

How to evolve this solution. This is a **generated artifact** — the source of truth is the
**manifest** (`solution/_arch/SOLUTION.md`, authored in the monorepo as
`docs/10-Solutions/DWS.07-SOLUTION.md`). Refine the manifest and regenerate; do not
hand-edit `app/` routes.

## 1. The model: standard menu → refine

Every DBP solution starts from the standard navigation menu (all Feature Areas → Groups →
Features), scaffolded as demo pages. A manifest module OVERRIDES a standard slot by route (your
real feature wins). Refine or remove demo pages as you go.

## 2. Common changes (edit manifest, then regen)

| Want to… | Manifest change |
|---|---|
| Add / remove a page | add/remove a `modules:` entry (id, route, scaffold, features) |
| Change a page's feature | edit `modules[].features[].config` |
| Add an entity + seed | add an `entities:` block (type / fields / seed) |
| Rebrand | edit `theme:` tokens (brand = accent; `--color-primary` stays dark) |
| Home page | `home:` block — `hero`/`greetingCard` + `features`/`howItWorks` render the landing-page home |

Regenerate (in an isolated git worktree — the generator is destructive):

```bash
pnpm scaffold -- docs/10-Solutions/DWS.07-SOLUTION.md --force
```

## 3. Nav configuration

Each module page's sidebar is driven by the `nav` block in your SOLUTION.md. The generator emits the nav as a constant in the module page file. The generated constant wires into the shell's `nav` prop.

### Adding solution-specific nav sections

Top-level section ids are drawn from the six standard Feature-Areas (`orientation`, `marketplace`, `workspace`, `service-operations`, `operational-intelligence`, `platform-management`). Presence is optional — select the subset your solution needs, and relabel them for your context. To add a section id of your own, declare it first (see "Declaring custom top-level nav sections" below); an undeclared id is a hard error.

```yaml
# In modules[].nav.sections (in SOLUTION.md)
sections:
  - id: orientation
    label: ORIENTATION
    items: [...]

  - id: marketplace
    label: MARKETPLACE
    items: [...]

  # Solution-specific section — legal ONLY if listed in `customNavSections`
  - id: tasks
    label: TASKS
    items:
      - id: my-tasks
        label: My Tasks
        icon: CheckSquare
        children:
          - id: open-tasks
            label: Open Tasks
            href: /marketplace/tasks
          - id: approvals
            label: Approvals
            href: /marketplace/approvals

  - id: platform-management
    label: PLATFORM MANAGEMENT
    items: [...]

  - id: operational-intelligence
    label: OPERATIONAL INTELLIGENCE
    items: [...]
```

### `mergeNavConfig` pattern (for hand-authored pages)

For hand-authored pages or nav configs not generated from SOLUTION.md, use the shared helper:

```ts
import type { NavSection } from "@dbp/contracts";

// apps/<solution>/app/nav-config.ts
export const APP_SECTIONS: NavSection[] = [
  { id: "orientation",             label: "ORIENTATION",             items: [...] },
  { id: "marketplace",             label: "MARKETPLACE",             items: [...] },
  { id: "my-section",              label: "MY SECTION",              items: [...] },  // requires customNavSections
  { id: "platform-management",     label: "PLATFORM MANAGEMENT",     items: [...] },
  { id: "operational-intelligence",label: "OPERATIONAL INTELLIGENCE",items: [...] },
];

// Custom ids must be passed as the second argument, or mergeNavConfig throws:
mergeNavConfig(APP_SECTIONS, ["my-section"]);
```

Reference: `apps/dxp-01a/app/nav-config.ts`.

### Declaring custom top-level nav sections

`mergeNavConfig()` (`packages/stack/app-scaffolds/shells/transaction/nav-merge.ts`) only accepts the six standard Feature-Area ids (`orientation`, `marketplace`, `workspace`, `service-operations`, `operational-intelligence`, `platform-management`) unless you explicitly declare extra ones. An undeclared id is a hard build/runtime error naming the bad id — this is intentional, it catches typos. To add your own top-level section id, follow these steps:

1. In your solution manifest (`SolutionManifestSchema` — SOLUTION.md frontmatter or `solution-manifest.ts`), add a top-level `customNavSections` list with your new kebab-case ids:
   ```yaml
   customNavSections:
     - finance-ops
     - client-success
   ```
2. Reference the declared id(s) in any module's `nav.sections`, same as a standard section:
   ```yaml
   modules:
     - id: DWS.04.M01
       nav:
         sections:
           - id: finance-ops
             label: FINANCE OPS
             items:
               - id: ledger
                 label: Ledger
                 href: /ledger
   ```
3. Regenerate (`scripts/scaffold-solution.mjs`) — it reads `manifest.customNavSections` and emits it as `allowedExtraSectionIds` on both the per-module nav constant and the solution-wide `SOLUTION_NAV` constant in `app/(authenticated)/layout.tsx`, so `mergeNavConfig()` accepts your id.
4. Do not declare the retired ids `platform-admin` or `analytics` — they are rejected even if listed in `customNavSections` (they were renamed to `platform-management` / `operational-intelligence` and must never be revived).

If you skip step 1, step 2 still fails with `Nav config has an unknown section id "finance-ops"` — the declaration is what makes the id legal, not just using it in `nav.sections`.

---

## 4. Rules

- Layer-06 services are wired by ID, never reimplemented.
- Zod schemas are the source of truth (`z.infer` for types).
- Solution-owned files (`solution/`, `instrumentation.ts`, `docs/`) are preserved on regen; `app/` is overwritten.
- Always verify data at runtime after a regen (curl an entity endpoint) — a green build doesn't prove data survived.
