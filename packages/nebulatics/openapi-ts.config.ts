import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3002/a/docs",
  output: "src/sdk",
});
