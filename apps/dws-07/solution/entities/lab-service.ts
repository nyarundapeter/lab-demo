// LabService entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `LabServiceExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { LabServiceExtensions } from "./extensions.js";

const LabServiceBaseSchema = z.object({
  name: z.string(),
  summary: z.string(),
  department: z.enum(["imaging","diagnostic-procedures","sample-collection","back-office"]),
  status: z.enum(["active","draft"]),
  code: z.string(),
  slaTargetHours: z.number(),
});

export const LabServiceSchema = LabServiceBaseSchema.merge(LabServiceExtensions);

export type LabService = z.infer<typeof LabServiceSchema>;

export const labServiceEntityTypeDefinition = {
  type: "lab-service",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: { type: "string" },
      summary: { type: "string" },
      department: { type: "string", enum: ["imaging","diagnostic-procedures","sample-collection","back-office"] },
      status: { type: "string", enum: ["active","draft"] },
      code: { type: "string" },
      slaTargetHours: { type: "number" },
    },
    required: ["name", "summary", "department", "status", "code", "slaTargetHours"],
    additionalProperties: false,
  },
} as const;
