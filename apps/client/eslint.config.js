import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-import";
import security from "eslint-plugin-security";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier/recommended";
import depend from "eslint-plugin-depend";
import regex from "eslint-plugin-regexp";
import pluginImport from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vitest from "@vitest/eslint-plugin";
import a11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import react from "eslint-plugin-react";
import pluginQuery from '@tanstack/eslint-plugin-query'

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: ["**/eslint.config.js"],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [eslintJs.configs.recommended],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [security.configs.recommended],
    rules: {
      "security/detect-object-injection": "off",
    },
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [prettier],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [vitest.configs.recommended],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [depend.configs["flat/recommended"]],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    extends: [
      unusedImports.flatConfigs.recommended,
      unusedImports.flatConfigs.typescript,
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
    ],
    rules: {
      "import/order": "off",
      "sort-imports": "off",
      "import/no-relative-parent-imports": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js built-ins
            ["^node:"],
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            [],
            // Internal absolute paths
            ["^~(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [regex.configs["flat/recommended"]],
  },
  ...compat.extends("plugin:optimize-regex/recommended"),
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [eslintPluginUnicorn.configs.recommended],
    rules: {
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "unicorn/no-nested-ternary": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  {
    files: ["**/*{.ts,.tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
      },

      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig.json"],
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": ["**/*{.ts,.tsx}"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["tsconfig.json"],
        },
        node: true,
      },
    },
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [a11y.flatConfigs.recommended],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    extends: [testingLibrary.configs["flat/react"]],
  },
  {
    files: ["**/*{.ts,.tsx}"],
    plugins: { react },
  },
  ...pluginQuery.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        globals: {
          ...globals.browser,
        },
      },
    },
  },
);
