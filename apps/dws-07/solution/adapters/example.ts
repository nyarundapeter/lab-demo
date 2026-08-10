// ── Solution adapter (example) — SOLUTION-OWNED ──────────────────────────────
// Adapters translate between a Layer 06 platform port and a solution-specific
// concern (an external system, a derived projection, a transition guard).
//
// CONTRACT:
//   • An adapter NEVER reimplements a platform service — it composes one.
//   • It exposes a narrow, typed function surface; callers depend on the
//     function signature, not on the platform package directly.
//   • Side-effects (audit, notify) go through the platform services, not ad hoc.
//
// Delete this example and add real adapters (e.g. <entity>-lifecycle.ts) as the
// solution grows. Lifecycle guards have a dedicated template (see GAP-10 / Wave 2).
export interface ExampleAdapter {
  /** Replace with the real port this adapter wraps. */
  describe(): string;
}

export function createExampleAdapter(): ExampleAdapter {
  return {
    describe: () => "Replace solution/adapters/example.ts with a real adapter.",
  };
}
