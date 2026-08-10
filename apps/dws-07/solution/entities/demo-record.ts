// DemoRecord entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `DemoRecordExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { DemoRecordExtensions } from "./extensions.js";

const DemoRecordBaseSchema = z.object({
  name: z.string(),
  status: z.enum(["open","in-progress","review","done"]),
  owner: z.string().optional(),
  priority: z.enum(["low","medium","high"]).optional(),
  category: z.string().optional(),
  updated: z.string().optional(),
});

export const DemoRecordSchema = DemoRecordBaseSchema.merge(DemoRecordExtensions);

export type DemoRecord = z.infer<typeof DemoRecordSchema>;

export const demoRecordEntityTypeDefinition = {
  type: "demo-record",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: { type: "string" },
      status: { type: "string", enum: ["open","in-progress","review","done"] },
      owner: { type: "string" },
      priority: { type: "string", enum: ["low","medium","high"] },
      category: { type: "string" },
      updated: { type: "string" },
    },
    required: ["name", "status"],
    additionalProperties: false,
  },
} as const;
