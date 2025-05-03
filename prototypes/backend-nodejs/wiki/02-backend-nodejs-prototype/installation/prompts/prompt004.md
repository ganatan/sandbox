# Jest test error

apres l'installation de jest 

j'ai cette erreur

__tests__\app.test.js:1
    
{import request from "supertest";

    SyntaxError: Cannot use import statement outside a module


pour le fichier de config

ChatGPT me conseille
.babelrc

Deepseek me conseille 
babel.config.js

que choisir

le site de babel

conseille


What's your use case?
You are using a monorepo?
You want to compile node_modules?
babel.config.json is for you!

You have a configuration that only applies to a single part of your project?
.babelrc.json is for you!

Guy Fieri is your hero?
We recommend using the babel.config.json format.



et mon fichier de config jest 
est jest.config.mjs

import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: { ...globals.node },
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