# response
npm init -y
npm install express
npm install nodemon

  "scripts": {
    "start": "node app",
    "dev": "nodemon app"
  },


# response

npm init @eslint/config@latest


# response

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


# response

npm install --save-dev jest
npm install supertest


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


# response

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

      "test:coverage": "jest --coverage"    


# response 07
deplacer les fichiers
dire oui au update des require dans les fichiers


# response 08
webpack.config.js


const path = require('path')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}


    "build": "webpack",
    "serve": "node dist/bundle"


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
