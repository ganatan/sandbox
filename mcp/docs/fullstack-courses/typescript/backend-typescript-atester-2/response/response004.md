# response 1
  npm install --save-dev webpack webpack-cli ts-loader typescript


webpack.config.js

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  target: 'node',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};


scripts

    "build": "webpack --config webpack.config.js",
    "start:prod": "node dist/bundle.js",
    "serve": "node dist/bundle.js",
