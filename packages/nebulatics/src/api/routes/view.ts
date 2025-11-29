import { createEndpoint } from "better-call";
import z from "zod";

export const view = createEndpoint(
  "/view",
  {
    method: "POST",
    body: z.object({
      vid: z.string(), // visitor id
      sid: z.string(), // session id
      ts: z.number().int().positive(), // unix timestamp in milliseconds, Date.now()
      p: z.string(), // page path
      ua: z.string(), // user agent
      ip: z.string(), // ip address
      ref: z.string(), // referrer
      loc: z.string(), // location
      lng: z.string(), // language
      tz: z.string(), // timezone
      dev: z.string(), // device
      os: z.string(), // operating system
    }),
  },
  async ({ body, context, request }) => {
    const { vid, sid, ts, p, ua, ip, ref, loc, lng, tz, dev, os } = body;

    return {};
  },
);
