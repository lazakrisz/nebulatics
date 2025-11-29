import { createEndpoint } from "better-call";

export const test = createEndpoint(
  "/test",
  {
    method: "GET",
  },
  async ({ context, request }) => {
    return {
      message: "Hello, world!",
    };
  },
);
