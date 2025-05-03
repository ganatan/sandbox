# Test

voila mon fichier app.js

  import express from 'express';

  const app = express();
  const port = 3000;

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
    { id: 12, name: 'George Lucas', city: 'Modesto' }
  ];

  app.get('/persons', (req, res) => {
    res.json(persons);
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });

et mon package.json

  {
    "name": "backend-node-javascript",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "node app",
      "lint": "eslint ."    
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "module",
    "description": "",
    "devDependencies": {
      "@eslint/js": "^9.20.0",
      "eslint": "^9.20.0",
      "express": "^4.21.2",
      "globals": "^15.14.0"
    }
  }


je veux installer les test avec jest


comment faire

par contre 
  comment generer aussi le fichier de config
  jest.config.js

le site de jest evoque
  npm init jest@latest

tiens en compte  

