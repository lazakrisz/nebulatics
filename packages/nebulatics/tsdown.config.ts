import { defineConfig, UserConfig } from "tsdown";

const baseConfig: UserConfig = {
  format: ["cjs", "esm"],
  treeshake: false,
  dts: true,
  sourcemap: true,
  clean: false,
};

export default defineConfig([
  {
    entry: ["src/index.ts"],
    ...baseConfig,
    outDir: "dist",
  },
  {
    ...baseConfig,
    entry: ["src/api/index.ts"],
    outDir: "dist/api",
  },
  {
    ...baseConfig,
    entry: ["src/dashboard/index.ts"],
    outDir: "dist/dashboard",
    external: [/^next/, /^react/],
  },
  {
    ...baseConfig,
    entry: ["src/next/index.ts"],
    outDir: "dist/next",
    external: [/^next/, /^react/],
  },
]);
