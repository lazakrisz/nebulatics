import { createEndpoint } from "better-call";
import { eventSchema } from "../../schemas/event.schema";
import { Events } from "../../types";

export const event = createEndpoint(
  "/e",
  {
    method: "POST",
    body: eventSchema,
    metadata: {
      openapi: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  e: { type: "string" },
                  d: { type: "object" },
                  f: { type: "object" },
                },
                required: ["e"],
              },
            },
          },
        },
      },
    },
  },
  async ({ body }) => {
    const { e, d, f } = body;
    const event = e as Events;

    return new Response(null, { status: 204 });
  },
);
