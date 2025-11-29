import { createRouter } from "better-call";
import { test } from "./routes/test";
import { view } from "./routes/view";

interface GetRouterOptions {
  basePath: string;
}
export function getRouter({ basePath }: GetRouterOptions) {
  return createRouter(
    {
      view,
      test,
    },
    { basePath },
  );
}
