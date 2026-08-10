// ── DWS.07 RBAC subjects — SOLUTION-OWNED ─────────────────────────
// One entry per entity declared in this solution's manifest (manifest.entities[].type).
// generateCapabilityMatrix() (@dbp/ps-rbac) expands each subject's verb array into
// the viewer < contributor < reviewer < approver tier ladder. The default verb set
// below is a generic lifecycle-record shape — trim verbs an entity doesn't need
// (e.g. drop "submit"/"approve" for a reference/lookup entity with no approval
// flow), or add "retire" (dead-record close-out), "waive" (exception grant),
// "map"/"test"/"assess" (execution actions) where the entity needs them.
import type { SubjectVerbMap } from "@dbp/ps-rbac/server";

export const DWS07_SUBJECTS: SubjectVerbMap = {
  "lab-service": ["read","create","update-own","submit","approve"],
  "exam-order": ["read","create","update-own","submit","approve"],
  "demo-record": ["read","create","update-own","submit","approve"],
  "demo-catalog-item": ["read","create","update-own","submit","approve"],
  "service-offering-request": ["read","create","update-own","submit","approve"],
  "reminder": ["read","create","update-own","submit","approve"],
};
