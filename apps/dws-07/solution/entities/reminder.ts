// Reminder entity schema — generated from manifest.entities.
// GENERATOR-DRIVEN FILE: re-emitted on --force regen when manifest.entities lists this type.
// To customise, either: (a) remove this type from manifest.entities and hand-author the file,
// or (b) update manifest.entities — the generator will regenerate from the new declaration.
//
// GG-01 extension seam: fields the solution needs but the manifest doesn't declare go in
// solution/entities/extensions.ts (create-if-missing, solution-owned) as `ReminderExtensions`.
// They are merged onto the base schema below, so Schema.parse() keeps them instead of
// silently stripping them. See docs/09-plans/stcb-generator-gaps-triage-2026-07-25.md GG-01.
import { z } from "zod";
import { ReminderExtensions } from "./extensions.js";

const ReminderBaseSchema = z.object({
  title: z.string(),
  dueAt: z.string().optional(),
  done: z.boolean().optional(),
  userId: z.string(),
});

export const ReminderSchema = ReminderBaseSchema.merge(ReminderExtensions);

export type Reminder = z.infer<typeof ReminderSchema>;

export const reminderEntityTypeDefinition = {
  type: "reminder",
  schema: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      title: { type: "string" },
      dueAt: { type: "string" },
      done: { type: "boolean" },
      userId: { type: "string" },
    },
    required: ["title", "userId"],
    additionalProperties: false,
  },
} as const;
