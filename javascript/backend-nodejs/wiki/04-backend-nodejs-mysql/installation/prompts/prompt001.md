# initialisation

voila mon app.js

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


voila mon server.js

import app from './app.js';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default server;


j'ai une base de données

avec ce script pour la table city



ALTER TABLE
  city AUTO_INCREMENT = 1000;

CREATE TABLE person (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  name CHAR(100) NOT NULL,
  wikipedia_link CHAR(100) NOT NULL,
  birth_date DATE,
  birth_city_id INT,
  death_date DATE,
  death_city_id INT,
  gender_id INT,
  image CHAR(50),
  PRIMARY KEY (id)
);

ALTER TABLE
  person AUTO_INCREMENT = 1000;

je veux integrer mysql dans mon application
je veux utiliser mysql avec des transactions


et je veux tout le code dans mon seul fichier app.js


quels sont tes conseils et les best practices


Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

