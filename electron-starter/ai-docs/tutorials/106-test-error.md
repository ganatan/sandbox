Ton linter (probablement ESLint) est configuré pour un environnement Node.js par défaut, et donc il ne connaît pas les variables globales du navigateur comme window et document.

👉 normal, car en Node pur, document n’existe pas.


# nouveau fichier eslint.config.mjs

!!!!!!!!!!!!!!!!!! rajout
        ...globals.browser,


import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ['dist/**', 'eslint.config.mjs', 'jest.config.js'],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
    rules: {
      indent: 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      'no-console': 'off',
      eqeqeq: 'error',
      curly: 'error',
      'no-undef': 'error',
      'no-redeclare': 'error',
      'consistent-return': 'error',
      'no-shadow': 'error',
      'object-curly-spacing': ['error', 'always'],
      'callback-return': 'error',
      'handle-callback-err': ['error', '^.*(e|E)rr'],
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-exit': 'off',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      strict: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-empty': 'error',
      'no-mixed-operators': 'error',
      'no-trailing-spaces': 'error',
      'linebreak-style': 'off',
      'max-len': 'off',
      'no-param-reassign': 'off',
      'prefer-destructuring': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'error',
      'arrow-parens': 'off',
      'dot-notation': 'off',
      'import/prefer-default-export': 'off',
      'import/first': 'off',
      'no-template-curly-in-string': 'off',
      'new-cap': ['error', { capIsNew: false }],
      'array-callback-return': 'error',
      'object-shorthand': ['error', 'consistent'],
      'function-paren-newline': ['error', 'consistent'],
      'quote-props': ['error', 'as-needed'],
      'operator-linebreak': ['error', 'before'],
      'prefer-template': 'error',
      'id-length': 'error',
      'newline-before-return': 'error',
      'space-before-blocks': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    },
    extends: ["js/recommended"]
  },
  {
    files: ["tests/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ["src/renderer/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]);

!!!!!!!!!!!!!!!!!! Attention à jest aussi

        ...globals.browser,
        ...globals.jest,



# nouveau fichier eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ['dist/**', 'eslint.config.mjs', 'jest.config.js'],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
    rules: {
      indent: 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      'no-console': 'off',
      eqeqeq: 'error',
      curly: 'error',
      'no-undef': 'error',
      'no-redeclare': 'error',
      'consistent-return': 'error',
      'no-shadow': 'error',
      'object-curly-spacing': ['error', 'always'],
      'callback-return': 'error',
      'handle-callback-err': ['error', '^.*(e|E)rr'],
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-exit': 'off',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      strict: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-empty': 'error',
      'no-mixed-operators': 'error',
      'no-trailing-spaces': 'error',
      'linebreak-style': 'off',
      'max-len': 'off',
      'no-param-reassign': 'off',
      'prefer-destructuring': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'error',
      'arrow-parens': 'off',
      'dot-notation': 'off',
      'import/prefer-default-export': 'off',
      'import/first': 'off',
      'no-template-curly-in-string': 'off',
      'new-cap': ['error', { capIsNew: false }],
      'array-callback-return': 'error',
      'object-shorthand': ['error', 'consistent'],
      'function-paren-newline': ['error', 'consistent'],
      'quote-props': ['error', 'as-needed'],
      'operator-linebreak': ['error', 'before'],
      'prefer-template': 'error',
      'id-length': 'error',
      'newline-before-return': 'error',
      'space-before-blocks': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    },
    extends: ["js/recommended"]
  },
  {
    files: ["tests/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ["src/renderer/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["tests/renderer.test.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
]);


# Modifier fichier de config jest

jest.config.js

'use strict';

const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

module.exports = config;
