// ExamOrder entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `ExamOrderExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { ExamOrderExtensions } from "./extensions.js";

const ExamOrderBaseSchema = z.object({
  patientName: z.string(),
  patientPhone: z.string(),
  source: z.enum(["walk-in","dxp","referral"]),
  department: z.enum(["imaging","diagnostic-procedures","sample-collection","back-office"]),
  serviceCode: z.string(),
  siteId: z.string(),
  status: z.enum(["in-progress","released","recapture-requested"]),
  technicianId: z.string().optional(),
  releasedAt: z.string().optional(),
  notes: z.string().optional(),
  referrerAccountId: z.string().optional(),
});

export const ExamOrderSchema = ExamOrderBaseSchema.merge(ExamOrderExtensions);

export type ExamOrder = z.infer<typeof ExamOrderSchema>;

export const examOrderEntityTypeDefinition = {
  type: "exam-order",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      patientName: { type: "string" },
      patientPhone: { type: "string" },
      source: { type: "string", enum: ["walk-in","dxp","referral"] },
      department: { type: "string", enum: ["imaging","diagnostic-procedures","sample-collection","back-office"] },
      serviceCode: { type: "string" },
      siteId: { type: "string" },
      status: { type: "string", enum: ["in-progress","released","recapture-requested"] },
      technicianId: { type: "string" },
      releasedAt: { type: "string" },
      notes: { type: "string" },
      referrerAccountId: { type: "string" },
    },
    required: ["patientName", "patientPhone", "source", "department", "serviceCode", "siteId", "status"],
    additionalProperties: false,
  },
} as const;
