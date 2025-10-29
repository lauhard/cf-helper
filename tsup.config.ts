import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],          // Workers are ESM-only; simplest & safest
  dts: true,                // emits dist/index.d.ts
  sourcemap: true,
  clean: true,
  target: "es2022",
  platform: "browser",      // or "neutral" – avoids Node polyfills
  treeshake: true,
  splitting: false,
  minify: false             // let the app bundler minify; keeps stack traces readable
});
