import eslintPluginReadableTailwind from "eslint-plugin-readable-tailwind";

export default [
  {
    plugins: {
      "readable-tailwind": eslintPluginReadableTailwind
    },
    rules: {
      "readable-tailwind/multiline": ["warn", { 
        classesPerLine: 1 
      }]
    },
    settings: {
      "readable-tailwind": {
        tailwindConfig: "tailwind.config.js"
      }
    }
  }
];
