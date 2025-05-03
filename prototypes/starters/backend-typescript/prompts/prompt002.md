# prompt 1

Reflexion

un backend
lint test coverage et build
ces etapes me semblent essentielles
c'est ce que j'ai vu en entreprise

ton avis

# prompt 2

Commencons donc par le lint


# prompt 3

ma config eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
]);

rajoute une rule

var interdit