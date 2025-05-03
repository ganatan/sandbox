# installation
  Modifier eslint.config.js  

import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'off', 
      'import/extensions': 'off',
      'no-unused-vars': 'warn',
    },
  },
];