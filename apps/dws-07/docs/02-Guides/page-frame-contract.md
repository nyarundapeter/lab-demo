# Page-Frame Contract

One rule that keeps every page consistent: **the shell/layout owns the page frame;
features render body-only.**

- The shell (`@dbp/shell-transaction`) provides the top bar, sidebar, footer, and —
  via `CanvasLayout`/`CatalogueLayout` — the `PageHeader` (title + breadcrumb).
- Do **not** add a second `PageHeader` inside a feature mounted in `slots.main`.
- Custom pages rendered directly in `slots.main` (no layout) SHOULD render their own
  `PageHeader` with a breadcrumb (see the detail/queue templates in `04-templates/`).

## Gotchas the templates already handle

- `FilterBar` takes props (`searchValue`, `chips`, …) — it does NOT wrap children.
- `Pagination` takes `{ page, pageSize, total, onPageChange }` — not `totalPages`.
- Don't use `FieldLabel` for form inputs (it renders uppercase). Use a plain
  `<label className="text-sm font-medium">`.
- Filtering uses the SegmentedControl pills (with count badges). KPI scorecards are
  display-only metrics — never status-count duplicates of the tabs.
