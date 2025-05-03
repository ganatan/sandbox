Problème : Linter (ESLint) ne reconnaît pas describe, it, et expect dans app.test.js
L'erreur provient du fait qu'ESLint ne sait pas que tu utilises Jest. Il faut configurer ESLint pour reconnaître Jest et ses fonctions de test (describe, it, expect).


Solution : Ajouter Jest à la configuration ESLint

et la solution c'est 

Tu as raison, la solution la plus simple est d'ajouter globals.jest dans eslint.config.js. Voici comment le faire proprement.


📌 Pourquoi ça fonctionne ?
globals.node : Active les variables globales pour Node.js (process, __dirname, etc.).
globals.jest : Active les variables globales pour Jest (describe, it, expect, etc.).
Avec cette configuration, ESLint reconnaît Jest sans avoir besoin du plugin eslint-plugin-jest.



import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // 👈 Ajoute Jest pour éviter les erreurs `no-undef`
      },
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": "off",
      "import/extensions": "off",
      "no-unused-vars": "warn",
    },
  },
];
