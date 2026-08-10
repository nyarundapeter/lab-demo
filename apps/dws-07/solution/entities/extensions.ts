// solution/entities/extensions.ts — SOLUTION-OWNED (create-if-missing; hand-edit freely).
// GG-01 extension seam: declare fields here that a solution needs on an entity but that
// manifest.entities doesn't (yet) capture. Every generated solution/entities/<type>.ts
// merges the matching `<TypePascal>Extensions` schema onto its manifest-derived base
// schema, so these fields survive Schema.parse() on every write instead of being
// silently stripped. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";

// LabService extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "lab-service" doesn't declare. A field name here MUST NOT
// collide with a "lab-service" manifest field name — the generator errors at generation
// time if it does.
export const LabServiceExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});

// ExamOrder extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "exam-order" doesn't declare. A field name here MUST NOT
// collide with a "exam-order" manifest field name — the generator errors at generation
// time if it does.
export const ExamOrderExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});

// DemoRecord extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "demo-record" doesn't declare. A field name here MUST NOT
// collide with a "demo-record" manifest field name — the generator errors at generation
// time if it does.
export const DemoRecordExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});

// DemoCatalogItem extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "demo-catalog-item" doesn't declare. A field name here MUST NOT
// collide with a "demo-catalog-item" manifest field name — the generator errors at generation
// time if it does.
export const DemoCatalogItemExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});

// ServiceOfferingRequest extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "service-offering-request" doesn't declare. A field name here MUST NOT
// collide with a "service-offering-request" manifest field name — the generator errors at generation
// time if it does.
export const ServiceOfferingRequestExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});

// Reminder extension overlay — add solution-specific fields here that
// manifest.entities[].fields for "reminder" doesn't declare. A field name here MUST NOT
// collide with a "reminder" manifest field name — the generator errors at generation
// time if it does.
export const ReminderExtensions = z.object({
  // Example: maturityLevel: z.string().optional(),
});
