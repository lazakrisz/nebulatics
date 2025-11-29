import { createRouter } from "better-call";
import { view } from "./routes/view";
import { visitor } from "./routes/visitor";

interface GetRouterOptions {
  basePath: string;
}

export function getRouter({ basePath }: GetRouterOptions) {
  return createRouter(
    {
      view,
      visitor,
    },
    { basePath },
  );
}
