# prompt 01
donc commencons par 
backend/javascript/comonjs

donne moi dans un seul fichier app.js
une api qui renvoie sur l'url persons
la liste de 7 realisateurs tres connus

# prompt 02
  Je veux rajouter un lint
  en utilisant ESLint

  utilise les dernieres mise à jour sur le site officiel
  https://eslint.org/docs/latest/use/getting-started


  # Rem
  
  voila le code

  npm init @eslint/config@latest

  et le fichier de config

    import js from "@eslint/js";
    import globals from "globals";
    import { defineConfig } from "eslint/config";


    export default defineConfig([
      { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
      { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
      { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
    ]);


# prompt 03

ok mon fichier genere


import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);


je veux rajouter des regles

interdire var par exemple


# prompt 04
rajoute le test avec jest


# prompt 05
refacto le test a la place de it je veux test

et rajoute le pattern AAA avec commentaires en anglais uniquement pour le pattern AAA

const request = require('supertest')
const express = require('express')

const app = express()

const persons = [
  { id: 1, name: 'Christopher Nolan' },
  { id: 2, name: 'Quentin Tarantino' },
  { id: 3, name: 'Steven Spielberg' },
  { id: 4, name: 'Martin Scorsese' },
  { id: 5, name: 'James Cameron' },
  { id: 6, name: 'Ridley Scott' },
  { id: 7, name: 'Denis Villeneuve' }
]

app.get('/persons', (req, res) => {
  res.json(persons)
})

describe('GET /persons', () => {
  it('should return list of persons', async () => {
    const res = await request(app).get('/persons')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(7)
    expect(res.body[0]).toHaveProperty('name')
  })
})


  # Rem
mon fichier de config

eslint.config.mjs

import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-var": "error", 
      "prefer-const": "warn", 
      "no-unused-vars": "warn" 
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node
    }
  }
])



  j'ai cette erreur


D:\Chendra\04-tutorials\311-angular-app\starters\javascript\nodejs\commonjs\app.test.js
  20:1  error  'describe' is not defined  no-undef
  21:3  error  'test' is not defined      no-undef
  28:5  error  'expect' is not defined    no-undef
  29:5  error  'expect' is not defined    no-undef
  30:5  error  'expect' is not defined    no-undef


  # prompt 06
  Je veux rajouter le coverage
  comment faire

  # prompt 07
  je veux mettre app.test.js dans un répertoire
  __tests__/integration

  et app.js et server.js dans src

  # prompt 08
  je veux rajouter un module bundler avec webpack
  
  # prompt 09
  
  je veux exclure du lint les fichiers de dist


  eslint.config.mjs

  import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-var": "error",
      "prefer-const": "warn",
      "no-unused-vars": "warn"
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  }
])
