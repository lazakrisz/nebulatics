import { defineConfig, UserConfig } from "tsdown";
import swc from "unplugin-swc";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  treeshake: false,
  sourcemap: true,
  clean: false,
  dts: true,
  external: [],
  plugins: [
    //
    swc.rolldown({
      minify: true,
      sourceMaps: true,
      jsc: {
        target: "es2015",
      },
    }),
  ],
});
