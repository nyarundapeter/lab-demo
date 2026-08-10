// solution/fixtures/seed.ts — GENERATED from manifest.entities (DWS.07).
// GENERATOR-DRIVEN FILE: re-emitted on every --force regen when manifest.entities is declared.
// To customise seed data: update manifest.entities.seed[] — the generator will regenerate.
// To opt out of generation: remove manifest.entities and hand-author this file instead.
//
// Imported by BOTH instrumentation.ts (server boot) AND the PS.DATA route handler chunk.
// Next.js isolates route chunks, so each chunk must register entity schemas + seed its own
// in-memory store. Keeping both in sync here prevents the "entity type X not registered" error.

import type { EntityRecord } from "@dbp/contracts/entity";
import { SchemaConflictError } from "@dbp/ps-data/server";
import { labServiceEntityTypeDefinition } from "../entities/lab-service.js";
import { examOrderEntityTypeDefinition } from "../entities/exam-order.js";
import { demoRecordEntityTypeDefinition } from "../entities/demo-record.js";
import { demoCatalogItemEntityTypeDefinition } from "../entities/demo-catalog-item.js";
import { serviceOfferingRequestEntityTypeDefinition } from "../entities/service-offering-request.js";
import { reminderEntityTypeDefinition } from "../entities/reminder.js";

// SP-MANIFEST-SOT: tenant id from manifest.dev.tenant_id (defaults to "tenant-alpha").
export const TENANT = "tenant-alpha";

// <type>-note sub-entities backing each entity's record-drawer Comments tab
// (see registerAndSeedData's note-registration comment below for why these exist).
const labServiceNoteEntityTypeDefinition = {
  type: "lab-service-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

const examOrderNoteEntityTypeDefinition = {
  type: "exam-order-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

const demoRecordNoteEntityTypeDefinition = {
  type: "demo-record-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

const demoCatalogItemNoteEntityTypeDefinition = {
  type: "demo-catalog-item-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

const serviceOfferingRequestNoteEntityTypeDefinition = {
  type: "service-offering-request-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

const reminderNoteEntityTypeDefinition = {
  type: "reminder-note",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      recordId: { type: "string" },
      body: { type: "string" },
      author: { type: "string" },
      createdAt: { type: "string" },
    },
    required: ["recordId", "body"],
    additionalProperties: false,
  },
} as const;

export const labServiceSeed: EntityRecord[] = [
  { id: "a0000000-0001-4000-8000-000000000001", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Obstetric & Pregnancy Ultrasound","summary":"Prenatal imaging across all trimesters.","department":"imaging","status":"active","code":"IMG-001","slaTargetHours":24} },
  { id: "a0000000-0002-4000-8000-000000000002", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Abdominal Ultrasound","summary":"General abdominal imaging.","department":"imaging","status":"active","code":"IMG-002","slaTargetHours":24} },
  { id: "a0000000-0003-4000-8000-000000000003", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"ECG","summary":"Electrocardiogram, standard 12-lead.","department":"diagnostic-procedures","status":"active","code":"DXP-001","slaTargetHours":24} },
  { id: "a0000000-0004-4000-8000-000000000004", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Colonoscopy","summary":"Diagnostic colonoscopy, brokered or in-house.","department":"diagnostic-procedures","status":"active","code":"DXP-002","slaTargetHours":48} },
  { id: "a0000000-0005-4000-8000-000000000005", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Phlebotomy / Blood Draw","summary":"Sample collection for lab bloodwork.","department":"sample-collection","status":"active","code":"SC-001","slaTargetHours":4} },
  { id: "a0000000-0006-4000-8000-000000000006", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Specimen Intake","summary":"General specimen receipt and labeling.","department":"sample-collection","status":"active","code":"SC-002","slaTargetHours":2} },
  { id: "a0000000-0007-4000-8000-000000000007", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Billing Inquiry","summary":"Charge and payment record lookups.","department":"back-office","status":"active","code":"BO-001","slaTargetHours":24} },
  { id: "a0000000-0008-4000-8000-000000000008", type: "lab-service", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Insurance Verification","summary":"Panel/coverage confirmation ahead of a visit.","department":"back-office","status":"active","code":"BO-002","slaTargetHours":24} },
];

export const examOrderSeed: EntityRecord[] = [
  { id: "b0000000-0001-4000-8000-000000000001", type: "exam-order", tenantId: TENANT, createdAt: "2026-08-01T08:10:00.000Z", updatedAt: "2026-08-01T08:10:00.000Z", data: {"patientName":"Amara Osei","patientPhone":"+254700000001","source":"walk-in","department":"imaging","serviceCode":"IMG-001","siteId":"upper-hill","status":"in-progress"} },
  { id: "b0000000-0002-4000-8000-000000000002", type: "exam-order", tenantId: TENANT, createdAt: "2026-07-30T09:00:00.000Z", updatedAt: "2026-07-30T09:00:00.000Z", data: {"patientName":"Diego Ramirez","patientPhone":"+254700000002","source":"dxp","department":"sample-collection","serviceCode":"SC-001","siteId":"upper-hill","status":"released","technicianId":"tech-01","releasedAt":"2026-07-30T15:40:00.000Z"} },
  { id: "b0000000-0003-4000-8000-000000000003", type: "exam-order", tenantId: TENANT, createdAt: "2026-07-29T10:00:00.000Z", updatedAt: "2026-07-29T10:00:00.000Z", data: {"patientName":"Priya Nair","patientPhone":"+254700000003","source":"referral","department":"diagnostic-procedures","serviceCode":"DXP-001","siteId":"upper-hill","status":"released","technicianId":"tech-02","releasedAt":"2026-07-29T14:00:00.000Z","referrerAccountId":"partner-acct-001"} },
  { id: "b0000000-0004-4000-8000-000000000004", type: "exam-order", tenantId: TENANT, createdAt: "2026-07-28T08:30:00.000Z", updatedAt: "2026-07-28T08:30:00.000Z", data: {"patientName":"Marcus Webb","patientPhone":"+254700000004","source":"walk-in","department":"imaging","serviceCode":"IMG-002","siteId":"upper-hill","status":"recapture-requested","technicianId":"tech-01","notes":"Image clarity insufficient, recapture on next slot."} },
  { id: "b0000000-0005-4000-8000-000000000005", type: "exam-order", tenantId: TENANT, createdAt: "2026-07-27T07:45:00.000Z", updatedAt: "2026-07-27T07:45:00.000Z", data: {"patientName":"Grace Mwangi","patientPhone":"+254700000005","source":"dxp","department":"back-office","serviceCode":"BO-002","siteId":"upper-hill","status":"in-progress"} },
];

export const demoRecordSeed: EntityRecord[] = [
  { id: "dr000000-0001-4000-8000-000000000001", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 01","status":"open","owner":"Ahmed Al-Mansoori","priority":"low","category":"Operations","updated":"2026-06-10"} },
  { id: "dr000000-0002-4000-8000-000000000002", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 02","status":"in-progress","owner":"Fatima Al-Rashid","priority":"medium","category":"Finance","updated":"2026-06-11"} },
  { id: "dr000000-0003-4000-8000-000000000003", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 03","status":"review","owner":"Omar Al-Hashimi","priority":"high","category":"Customer","updated":"2026-06-12"} },
  { id: "dr000000-0004-4000-8000-000000000004", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 04","status":"done","owner":"Sara Al-Zaabi","priority":"low","category":"Compliance","updated":"2026-06-13"} },
  { id: "dr000000-0005-4000-8000-000000000005", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 05","status":"open","owner":"Khalid Al-Nuaimi","priority":"medium","category":"Technology","updated":"2026-06-14"} },
  { id: "dr000000-0006-4000-8000-000000000006", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 06","status":"in-progress","owner":"Hessa Al-Maktoum","priority":"high","category":"Operations","updated":"2026-06-15"} },
  { id: "dr000000-0007-4000-8000-000000000007", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 07","status":"review","owner":"Ahmed Al-Mansoori","priority":"low","category":"Finance","updated":"2026-06-16"} },
  { id: "dr000000-0008-4000-8000-000000000008", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 08","status":"done","owner":"Fatima Al-Rashid","priority":"medium","category":"Customer","updated":"2026-06-17"} },
  { id: "dr000000-0009-4000-8000-000000000009", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 09","status":"open","owner":"Omar Al-Hashimi","priority":"high","category":"Compliance","updated":"2026-06-18"} },
  { id: "dr000000-0010-4000-8000-000000000010", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 10","status":"in-progress","owner":"Sara Al-Zaabi","priority":"low","category":"Technology","updated":"2026-06-19"} },
  { id: "dr000000-0011-4000-8000-000000000011", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 11","status":"review","owner":"Khalid Al-Nuaimi","priority":"medium","category":"Operations","updated":"2026-06-20"} },
  { id: "dr000000-0012-4000-8000-000000000012", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 12","status":"done","owner":"Hessa Al-Maktoum","priority":"high","category":"Finance","updated":"2026-06-21"} },
  { id: "dr000000-0013-4000-8000-000000000013", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 13","status":"open","owner":"Ahmed Al-Mansoori","priority":"low","category":"Customer","updated":"2026-06-22"} },
  { id: "dr000000-0014-4000-8000-000000000014", type: "demo-record", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Record 14","status":"in-progress","owner":"Fatima Al-Rashid","priority":"medium","category":"Compliance","updated":"2026-06-23"} },
];

export const demoCatalogItemSeed: EntityRecord[] = [
  { id: "cd000000-0001-4000-8000-000000000001", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 01","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"platform","status":"coming-soon","code":"OFF-001"} },
  { id: "cd000000-0002-4000-8000-000000000002", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 02","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"integration","status":"available","code":"OFF-002"} },
  { id: "cd000000-0003-4000-8000-000000000003", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 03","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"security","status":"available","code":"OFF-003"} },
  { id: "cd000000-0004-4000-8000-000000000004", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 04","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"data","status":"coming-soon","code":"OFF-004"} },
  { id: "cd000000-0005-4000-8000-000000000005", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 05","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"service","status":"available","code":"OFF-005"} },
  { id: "cd000000-0006-4000-8000-000000000006", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 06","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"platform","status":"available","code":"OFF-006"} },
  { id: "cd000000-0007-4000-8000-000000000007", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 07","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"integration","status":"coming-soon","code":"OFF-007"} },
  { id: "cd000000-0008-4000-8000-000000000008", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 08","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"security","status":"available","code":"OFF-008"} },
  { id: "cd000000-0009-4000-8000-000000000009", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 09","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"data","status":"available","code":"OFF-009"} },
  { id: "cd000000-0010-4000-8000-000000000010", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 10","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"service","status":"coming-soon","code":"OFF-010"} },
  { id: "cd000000-0011-4000-8000-000000000011", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 11","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"platform","status":"available","code":"OFF-011"} },
  { id: "cd000000-0012-4000-8000-000000000012", type: "demo-catalog-item", tenantId: TENANT, createdAt: "2026-06-01T08:00:00.000Z", updatedAt: "2026-06-01T08:00:00.000Z", data: {"name":"Demo Offering 12","summary":"A sample marketplace offering generated for the standard-menu demo.","category":"integration","status":"available","code":"OFF-012"} },
];

export const serviceOfferingRequestSeed: EntityRecord[] = [];

export const reminderSeed: EntityRecord[] = [
  { id: "rm000000-0001-4000-8000-000000000001", type: "reminder", tenantId: TENANT, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", data: {"title":"Assess any new risks identified in the morning meeting.","dueAt":"Today","done":false,"userId":"usr-alpha-user-01"} },
  { id: "rm000000-0002-4000-8000-000000000002", type: "reminder", tenantId: TENANT, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", data: {"title":"Outline key points for tomorrow's stand-up meeting.","dueAt":"Today","done":false,"userId":"usr-alpha-user-01"} },
];

type DataSvc = {
  registry: { register: (def: unknown) => unknown };
  storage: {
    put: (tenantId: string, record: EntityRecord) => Promise<void>;
    list: (tenantId: string, entityType: string, opts: { page: number; pageSize: number }) => Promise<{ total: number; rows: EntityRecord[] }>;
    transaction?: <T>(fn: (tx: DataSvc["storage"]) => Promise<T>) => Promise<T>;
  };
};

/**
 * Register all entity schemas and seed demo data into the given data service instance.
 * Idempotent: schema registration awaits the (possibly Drizzle-backed) write and only
 * swallows SchemaConflictError; other failures propagate. Seeding is row-existence-gated
 * per entity type (see seedData()) — adapter-symmetric, no longer memory-only. Safe to
 * call from both instrumentation.ts and the PS.DATA route handler chunk (each chunk has
 * its own in-memory store).
 */
export async function registerAndSeedData(dataSvc: DataSvc): Promise<void> {
  // Register ALL entity schemas into this chunk's registry (idempotent — swallows SchemaConflictError).
    try { await dataSvc.registry.register(labServiceEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(examOrderEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(demoRecordEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(demoCatalogItemEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(serviceOfferingRequestEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(reminderEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }

  // Register the <type>-note sub-entity backing each entity's record-drawer Comments
  // tab. standard-menu-scaffold.mjs emits that tab unconditionally for every entity
  // with fields, so its storage must be registered unconditionally here too — see
  // generateSeedFileContent()'s noteEntities comment for the full rationale.
    try { await dataSvc.registry.register(labServiceNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(examOrderNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(demoRecordNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(demoCatalogItemNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(serviceOfferingRequestNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }
    try { await dataSvc.registry.register(reminderNoteEntityTypeDefinition); } catch (err) { if (!(err instanceof SchemaConflictError)) throw err; }

  // Seed each entity type independently.
  await seedData(dataSvc, "lab-service", labServiceSeed, "once");
  await seedData(dataSvc, "exam-order", examOrderSeed, "once");
  await seedData(dataSvc, "demo-record", demoRecordSeed, "once");
  await seedData(dataSvc, "demo-catalog-item", demoCatalogItemSeed, "once");
  await seedData(dataSvc, "service-offering-request", serviceOfferingRequestSeed, "once");
  await seedData(dataSvc, "reminder", reminderSeed, "once");
}

// SP-DATA-PATTERNS (AC-1): atomic seed via transaction when the adapter supports it.
// If storage.transaction() is available, wraps all puts in a single transaction so a
// mid-seed failure leaves zero partial rows. Falls back to sequential puts on adapters
// without transaction support (e.g. custom adapters not yet upgraded).
//
// GG-06/GG-07 fix: seeding is gated by a single bulk list() per entity type (not a
// per-record get() — remote Postgres round-trips are too slow for that, see
// docs/09-plans/seed-migration-ownership-design-2026-07-25.md OQ4) whose ids are
// diffed against the fixture set client-side; only rows whose id is absent for this
// TYPE are put(). This is adapter-symmetric (fixes the Postgres-only clobber where
// storage.put() unconditionally upserted every boot) and correctly relies on the
// composite (type, id) upsert target added in @dbp/platform-db 0.1.5 — without that,
// a fixture id colliding with a different type's id would clobber the wrong row while
// still probing "absent" under a type-scoped list().
//
// policy: "once" (default) applies the row-existence gate above — a row, once present
// (from fixture OR migration OR runtime write), is never re-written by seed again.
// "always" (manifest.entities[].seedPolicy) restores unconditional upsert-every-boot
// for entity types a solution author has confirmed will never be migration-managed.
async function seedData(
  dataSvc: DataSvc,
  gateType: string,
  records: EntityRecord[],
  policy: "once" | "always" = "once",
): Promise<void> {
  if (records.length === 0) return;
  let pending = records;
  if (policy === "once") {
    const existing = await dataSvc.storage.list(TENANT, gateType, { page: 1, pageSize: Math.max(records.length, 1) });
    const existingIds = new Set(existing.rows.map((row) => row.id));
    pending = records.filter((record) => !existingIds.has(record.id));
    if (pending.length === 0) return;
  }
  if (typeof dataSvc.storage.transaction === "function") {
    await dataSvc.storage.transaction(async (tx) => {
      for (const record of pending) {
        await tx.put(TENANT, record);
      }
    });
  } else {
    for (const record of pending) {
      await dataSvc.storage.put(TENANT, record);
    }
  }
}
