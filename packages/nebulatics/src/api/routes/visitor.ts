import { createEndpoint } from "better-call";
import z from "zod";

export const visitor = createEndpoint(
  "/visitor",
  {
    method: "POST",
    body: z.object({
      vid: z.string(),
      sid: z.string(),
      ts: z.number().int().positive(),
      p: z.string(),
      ua: z.string(),
      ip: z.string(),
      ref: z.string(),
      loc: z.string(),
      lng: z.string(),
      tz: z.string(),
      dev: z.string(),
      os: z.string(),
    }),
    metadata: {
      openapi: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vid: { type: "string" },
                  sid: { type: "string" },
                  ts: { type: "number" },
                  p: { type: "string" },
                  ua: { type: "string" },
                  ip: { type: "string" },
                  ref: { type: "string" },
                  loc: { type: "string" },
                  lng: { type: "string" },
                  tz: { type: "string" },
                  dev: { type: "string" },
                  os: { type: "string" },
                },
                required: [
                  "vid",
                  "sid",
                  "ts",
                  "p",
                  "ua",
                  "ip",
                  "ref",
                  "loc",
                  "lng",
                  "tz",
                  "dev",
                  "os",
                ],
              },
            },
          },
        },
      },
    },
  },
  async ({ body, context, request }) => {
    const { vid, sid, ts, p, ua, ip, ref, loc, lng, tz, dev, os } = body;

    // TODO: Implement visitor logic

    return {};
  },
);
