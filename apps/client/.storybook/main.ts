import path from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["@storybook/addon-essentials"],
      },
      resolve: {
        alias: {
          "~": path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "../src",
          ),
          "styled-system": path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "../src/components/atoms/styled-system",
          ),
          "types": path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "../src/types",
          ),
        },
      },
    });
  },
};
export default config;
