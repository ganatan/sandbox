# Build


donc mon fichier app.js

import express from "express";

const app = express();
const port = 3000;

const persons = [
  { id: 1, name: "Steven Spielberg", city: "Cincinnati" },
  { id: 2, name: "Martin Scorsese", city: "New York" },
  { id: 3, name: "Quentin Tarantino", city: "Knoxville" },
  { id: 4, name: "Christopher Nolan", city: "London" },
  { id: 5, name: "Francis Ford Coppola", city: "Detroit" },
  { id: 6, name: "James Cameron", city: "Kapuskasing" },
  { id: 7, name: "David Fincher", city: "Denver" },
  { id: 8, name: "Tim Burton", city: "Burbank" },
  { id: 9, name: "Clint Eastwood", city: "San Francisco" },
  { id: 10, name: "Wes Anderson", city: "Houston" },
  { id: 11, name: "Spike Lee", city: "Atlanta" },
  { id: 12, name: "George Lucas", city: "Modesto" },
];

app.get("/persons", (req, res) => {
  res.json(persons);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

export default app;



mon eslint.config.js
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

mon jest.config.js
export default {
  testEnvironment: "node",
  clearMocks: true, 
  collectCoverage: true,
  coverageProvider: "v8",
};

et mon .babelrc
{
  "presets": ["@babel/preset-env"]
}

je veux faire un build


est ce que c'est une bonne idee
a quoi ca sert
qulles sont les best practices


# Synthese
"start": "node src/app",
    "dev": "nodemon src/app",
    "lint": "eslint .",
    "test": "jest",
    "coverage": "jest --coverage",
    "build": "webpack --mode production",
    "serve": "node dist/bundle.js"

