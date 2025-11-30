import "server-only";
import { createRouter } from "better-call";
import { getRouter } from "./router";

interface Handler {
  (request: Request): Promise<Response> | Response;
}

/** A handler for Next.js routes. */
interface NextJsHandler {
  GET: Handler;
  POST: Handler;
}

interface NextJsHandlerOptions {
  basePath?: string;
}

let moduleCache: Record<string, ReturnType<typeof getRouter>> = {};

function getModuleCacheKey(basePath: string) {
  return `nebulatics:api:router:${basePath}`;
}

function getModuleCache(basePath: string) {
  const key = getModuleCacheKey(basePath);
  if (!moduleCache[key]) {
    moduleCache[key] = getRouter({ basePath });
  }
  return moduleCache[key];
}

/**
 * Handles requests for the analytics API. Use it in a Next.js route handler.
 *
 * @param options - The options for the handler.
 * @param options.basePath - The base path for the handler. Defaults to "/a".
 * @returns A handler for Next.js routes.
 *
 *   ```ts
 *   export const { GET, POST } = toNextJsHandler();
 *   ```
 */
export function toNextJsHandler({
  basePath = "/a",
}: NextJsHandlerOptions = {}): NextJsHandler {
  const router = getModuleCache(basePath);

  return {
    GET: router.handler,
    POST: router.handler,
  };
}
