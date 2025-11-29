import { createEndpoint } from "better-call";
import z from "zod";

export const visitor = createEndpoint(
  "/visitor",
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
      ua: z.string().describe("User agent"),
      ip: z.string().describe("IP address"),
      ref: z.string().describe("Referrer"),
      loc: z.string().describe("Location"),
      lng: z.string().describe("Language"),
      tz: z.string().describe("Timezone"),
      dev: z.string().describe("Device"),
      os: z.string().describe("Operating system"),
    }),
  },
  async ({ body, context, request }) => {
    const { vid, sid, ts, p, ua, ip, ref, loc, lng, tz, dev, os } = body;

    // TODO: Implement visitor logic
    
    return {};
  },
);
