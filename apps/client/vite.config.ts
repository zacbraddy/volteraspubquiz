import path from "node:path";

import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
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
  ],
  resolve: {
    alias: {
      "~": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "./src",
      ),
      "styled-system": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "./src/components/atoms/styled-system",
      ),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
