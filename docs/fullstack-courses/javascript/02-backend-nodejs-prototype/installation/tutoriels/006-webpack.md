# Installation
  npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env


  Creer un fichier webpack.config.js

    import path from "path";

    export default {
      entry: "./src/app.js",
      output: {
        path: path.resolve("dist"),
        filename: "bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      target: "node",
      mode: "production"
    };


    Rajouter un script

      "build": "webpack"


  Rajouter ces scripts

    "build": "webpack --mode production",
    "serve": "node dist/bundle.js"


  Rajouter dans eslint
  dans le fichier eslint.config.js

import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      'dist/**',
      'eslint.config.js',
      'webpack.config.js'
    ],
  },
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
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": "off"
    }
  },
];



  Des erreurs sont generes

  Rajouter cette info dans la config webpack.config.js
    experiments: {
      outputModule: true
    },

  Modifier ce script pour eviter les surprises
    "build": "webpack --mode production --output-path dist",
    "build": "webpack --mode production",
