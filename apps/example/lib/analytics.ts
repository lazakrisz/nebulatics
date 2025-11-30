"use client";

import { createClient } from "nebulatics/client";

const analytics = createClient({
  basePath: "/a",
});

export const { track, identify } = analytics;
