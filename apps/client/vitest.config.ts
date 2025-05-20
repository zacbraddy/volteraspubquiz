import AutoImport from "unplugin-auto-import/vite";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  test: {
    globals: true,
    root: "./",
    include: ["./src/**/*.test.ts"],
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
    AutoImport({
      imports: ["vitest", "react"],
      dts: true,
    }),
  ],
});

export default config;
