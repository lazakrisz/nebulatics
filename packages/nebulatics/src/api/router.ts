import { createRouter } from "better-call";
import { event } from "./routes/event";

interface GetRouterOptions {
  basePath: string;
}

export function getRouter({ basePath }: GetRouterOptions) {
  return createRouter(
    {
      event,
    },
    {
      basePath,
      openapi: {
        disabled: process.env.NODE_ENV === "production",
        path: "/docs",
      },
    },
  );
}
