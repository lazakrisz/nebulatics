import { toNextJsHandler } from "nebulatics/api";

export const { GET, POST } = toNextJsHandler({ basePath: "/a" });
