import eslintPluginBetterTailwindCSS from "eslint-plugin-better-tailwindcss";
import tsParser from "@typescript-eslint/parser";
//import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindCSS,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...eslintPluginBetterTailwindCSS.configs["recommended-warn"].rules,
      // enable all recommended rules to report an error
      ...eslintPluginBetterTailwindCSS.configs["recommended-error"].rules,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "./app/app.css",
        tailwindConfig: "tailwind.config.js",
      },
    },
  },
];
