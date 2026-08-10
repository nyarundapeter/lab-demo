// ServiceOfferingRequest entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `ServiceOfferingRequestExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { ServiceOfferingRequestExtensions } from "./extensions.js";

const ServiceOfferingRequestBaseSchema = z.object({
  serviceId: z.string(),
  description: z.string(),
  urgency: z.enum(["low","medium","high"]),
  justification: z.string().optional(),
});

export const ServiceOfferingRequestSchema = ServiceOfferingRequestBaseSchema.merge(ServiceOfferingRequestExtensions);

export type ServiceOfferingRequest = z.infer<typeof ServiceOfferingRequestSchema>;

export const serviceOfferingRequestEntityTypeDefinition = {
  type: "service-offering-request",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      serviceId: { type: "string" },
      description: { type: "string" },
      urgency: { type: "string", enum: ["low","medium","high"] },
      justification: { type: "string" },
    },
    required: ["serviceId", "description", "urgency"],
    additionalProperties: false,
  },
} as const;
