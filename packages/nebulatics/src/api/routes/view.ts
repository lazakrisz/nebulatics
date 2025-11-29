import { createEndpoint } from "better-call";
import z from "zod";

export const view = createEndpoint(
  "/view",
  {
    method: "POST",
    body: z.object({
      vid: z.string().describe("Visitor ID"),
      sid: z.string().describe("Session ID"),
      ts: z
        .number()
        .int()
        .positive()
        .describe("Unix timestamp in milliseconds, Date.now()"),
      p: z.string().describe("Page path"),
    }),
  },
  async ({ body, context, request }) => {
    const { vid, sid, ts, p } = body;

    return {};
  },
);
