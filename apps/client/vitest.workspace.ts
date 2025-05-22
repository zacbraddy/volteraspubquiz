import * as path from 'path';

import { fileURLToPath } from 'url';

import { defineWorkspace } from 'vitest/config';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  'vitest.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
