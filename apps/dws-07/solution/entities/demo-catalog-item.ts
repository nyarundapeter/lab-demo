// DemoCatalogItem entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `DemoCatalogItemExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { DemoCatalogItemExtensions } from "./extensions.js";

const DemoCatalogItemBaseSchema = z.object({
  name: z.string(),
  summary: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["available","coming-soon"]),
  code: z.string().optional(),
});

export const DemoCatalogItemSchema = DemoCatalogItemBaseSchema.merge(DemoCatalogItemExtensions);

export type DemoCatalogItem = z.infer<typeof DemoCatalogItemSchema>;

export const demoCatalogItemEntityTypeDefinition = {
  type: "demo-catalog-item",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: { type: "string" },
      summary: { type: "string" },
      category: { type: "string" },
      status: { type: "string", enum: ["available","coming-soon"] },
      code: { type: "string" },
    },
    required: ["name", "status"],
    additionalProperties: false,
  },
} as const;
