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

avec ce script pour la table person


CREATE TABLE person (
  id dom_pk PRIMARY KEY NOT NULL DEFAULT nextval('person_id_seq' :: regclass),
  name dom_lib NOT NULL,
  wikipedia_link dom_lib NOT NULL,
  birth_date dom_date,
  birth_city_id dom_fk,
  death_date dom_date,
  death_city_id dom_fk,
  gender_id dom_fk,
  image dom_lib
);


je veux integrer postgresql dans mon application
je veux utiliser postgresql avec des transactions
je veux utiliser un ORM sequelize


et je veux tout le code dans mon seul fichier app.js


quels sont tes conseils et les best practices


Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

