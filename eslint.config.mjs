import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: ["hexagonal-architecture"],
  },
  {
    overrides: [
      {
        files: ["contexts/{backend,frontend}/*/src/**/*.ts"],
        rules: {
          "hexagonal-architecture/enforce": ["error"],
        },
      },
    ],
  },
];
