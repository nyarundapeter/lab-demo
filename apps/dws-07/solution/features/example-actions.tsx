"use client";
// ── Example lifecycle actions — SOLUTION-OWNED ───────────────────────────────
// Renders lifecycle transition buttons for a single entity record and drives
// the transition through the platform services:
//   PS.WORKFLOW  → records the transition as a workflow event (audit trail of state)
//   PS.DATA      → PATCH the entity to the new state
//   React Query  → invalidates the entity query so the UI reflects the new state
//
// Wave 1 ships this as a fixed EXAMPLE (entity type and states are placeholders).
// Wave 2 (GAP-10) re-emits per-entity versions with real states + transitions
// derived from manifest.entities[].lifecycle.
//
// Usage: copy this file to solution/features/<entity-type>-actions.tsx and fill in
// the entity type, NEXT_STATE map, and query keys to match your entity's lifecycle.
import { useQueryClient } from "@tanstack/react-query";
import { updateEntityTyped } from "../lib/data-client";

// Replace with the real lifecycle states (e.g. { open: "in-progress", "in-progress": "done" }).
const NEXT_STATE: Record<string, string | undefined> = {
  // open: "in-progress",
  // "in-progress": "review",
  // review: "done",
};

// Replace "example" with the real entity type key used in manifest.entities.
const ENTITY_TYPE = "example" as const;

export function ExampleActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const qc = useQueryClient();
  const next = NEXT_STATE[status];

  async function advance() {
    if (!next) return;
    // 1. (PS.WORKFLOW) record the transition as a workflow event — wire to the
    //    workflow instance for this entity once the workflow is defined.
    //    await startOrAdvanceWorkflow(ENTITY_TYPE, id, { from: status, to: next });
    // 2. (PS.DATA) persist the new state (PATCH).
    await updateEntityTyped<{ status: string }>(ENTITY_TYPE, id, { status: next });
    // 3. (PS.AUDIT) the data write is audited by the platform; add a domain event
    //    here if the solution needs a richer audit record.
    // 4. (React Query) invalidate so the detail view and list re-fetch.
    await qc.invalidateQueries({ queryKey: ["entity", ENTITY_TYPE, id] });
    await qc.invalidateQueries({ queryKey: ["entity-list", ENTITY_TYPE] });
  }

  if (!next) return null;
  return (
    <button type="button" onClick={advance} className="dbp-button dbp-button--primary">
      Advance to {next}
    </button>
  );
}
