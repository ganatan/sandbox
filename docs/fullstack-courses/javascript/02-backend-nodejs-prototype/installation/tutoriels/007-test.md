Modifier app.js

import express from 'express';

const app = express();

const persons = [
  { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
  { id: 2, name: 'Martin Scorsese', city: 'New York' },
  { id: 3, name: 'Quentin Tarantino', city: 'Knoxville' },
  { id: 4, name: 'Christopher Nolan', city: 'London' },
  { id: 5, name: 'Francis Ford Coppola', city: 'Detroit' },
  { id: 6, name: 'James Cameron', city: 'Kapuskasing' },
  { id: 7, name: 'David Fincher', city: 'Denver' },
  { id: 8, name: 'Tim Burton', city: 'Burbank' },
  { id: 9, name: 'Clint Eastwood', city: 'San Francisco' },
  { id: 10, name: 'Wes Anderson', city: 'Houston' },
  { id: 11, name: 'Spike Lee', city: 'Atlanta' },
  { id: 12, name: 'George Lucas', city: 'Modesto' },
];

app.get('/persons', (req, res) => {
  res.json(persons);
});

export default app;


Créer server.js

import app from './app.js';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default server;



Créer server.test.js

import server from '../src/server.js';

describe('Démarrage du serveur', () => {
  it('Le serveur démarre et écoute correctement', async () => {
    expect(server.listening).toBe(true);
  });

  afterAll(() => {
    server.close();
  });
});



Modifier  webpack.config.js


import path from "path";

export default {
  entry: "./src/server.js",
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
  mode: "production",
  experiments: {
    outputModule: true
  },
};
