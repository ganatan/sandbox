# response 01
npm init -y
npm install express
npm install nodemon

  "scripts": {
    "start": "node app",
    "dev": "nodemon app"
  },

dans package.json
  "type": "module"


# response 02

npm init @eslint/config@latest


# response 03

import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-var": "error"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node
    }
  }
])


# response 04

npm install --save-dev jest supertest


et ajout de app.test.js


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

# response 05


ces ajouts

- jest.config.mjs

const config = {
  coverageProvider: 'v8',
};

export default config;

- package.json
    "@babel/preset-env": "7.26.9",

- .babelrc    
{
  "presets": ["@babel/preset-env"]
}


ca fonctionnent pourquoi

# response 06

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
        ...globals.jest // ✅ Ajoute les globals Jest : describe, test, expect, etc.
      }
    }
  }
])



# response 06
  le fichier app n'est pas appele
  donc faire un require app.js
  et creer server.js et app.js
  
  puis rajouter

      "coverage": "jest --coverage"    


# response 07
deplacer les fichiers
dire oui au update des require dans les fichiers


# response 08

npm install --save-dev webpack webpack-cli

creer un fichier webpack.config.js


import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: './src/server.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  mode: 'production',
  experiments: {
    outputModule: true
  }
}


    "build": "webpack",
    "serve": "node dist/app.bundle"


# response 09

import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["dist/**"], // ✅ ignore tous les fichiers dans dist/
  },
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
