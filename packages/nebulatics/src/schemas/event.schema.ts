import { z } from "zod";

export const eventSchema = z.object({
  e: z.string(),
  d: z.record(z.string(), z.any()),
  f: z.record(z.string(), z.any()),
});

export type EventSchema = z.infer<typeof eventSchema>;
