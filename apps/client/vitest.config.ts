import AutoImport from "unplugin-auto-import/vite";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    include: ["./src/**/*.test.ts", "./src/**/*.test.tsx"],
    environment: 'jsdom',
  },
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom", "vitest"],
      dirsScanOptions: {
        types: true,
      },
      dts: true,
      viteOptimizeDeps: true,
    }),
    tsconfigPaths()
  ],
});
