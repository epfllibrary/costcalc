import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";

import globals from "globals";

export default [
  // 1. Règles recommandées pour JavaScript
  js.configs.recommended,

  // 2. Configuration pour vos fichiers React / JSX
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      },
      parserOptions: {
        // C'est cette option qui permet à ESLint de comprendre le JSX !
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@eslint-react": eslintReact,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
    },
  },
];