import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dirsScanOptions: {
        types: true,
      },
      dts: true,
      viteOptimizeDeps: true,
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
