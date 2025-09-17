# Installation


  Installation des dependances
    npm install --save-dev eslint
    npm init @eslint/config@latest


  Bien selectionner
    javascript ES Modules
    node

  Rajouter le script

    "lint": "eslint ."

  Modifier le fichier eslint.config.js
  En rajoutant les rueles


import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": "off"
    }
  },
];



tester lint

Modifier eslint.config.js

  {
    ignores: ['dist/**', 'eslint.config.js'],
  },




# Tester le lint
rajouter le code
  let toto = 1111;

et verifier le lint  


Le fichier final est


import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ['dist/**', 'eslint.config.js'],
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": "off"
    }
  },
];


# Teste de jest

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
