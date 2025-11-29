import { createEndpoint } from "better-call";
import { z } from "zod";

export const view = createEndpoint(
  "/view",
  {
    method: "POST",
    body: z.object({
      vid: z.string({}),
      sid: z.string(),
      ts: z.number().int().positive(),
      p: z.string(),
    }),
    metadata: {
      openapi: {
        // temporary fix for better-call, which is not able to handle zod objects
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
                },
              },
              required: ["vid", "sid", "ts", "p"],
            },
          },
        },
      },
    },
  },
  async ({ body, context, request }) => {
    const { vid, sid, ts, p } = body;

    return {};
  },
);
