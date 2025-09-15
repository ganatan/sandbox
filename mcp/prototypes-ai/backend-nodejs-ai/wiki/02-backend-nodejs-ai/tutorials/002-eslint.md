# Dependances
  npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  npx eslint --init

# Scripts
"scripts": {
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  ...
}

# fichier de config
eslint.config.mjs

import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default defineConfig([
  // JS config
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.node
    },
    plugins: {
      js
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'off'
    }
  },

  // TS config
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: globals.node
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
])


# Tester les rules

Modifier les rules

    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
      "no-var": "error",
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }

