import { defineConfig } from "@pandacss/dev";

import { recipes, tokens } from "./src/theme";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
  dependencies: ["./src/**/*.{js,jsx,ts,tsx}"],
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
  exclude: [],
  theme: {
    extend: {
      recipes,
      tokens,
    },
  },
  jsxFramework: "react",
  outdir: "src/components/atoms/styled-system",
});
