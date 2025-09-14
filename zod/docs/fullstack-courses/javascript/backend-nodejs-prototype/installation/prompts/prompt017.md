person-controller.js

  import { getAllPersons } from './person-service.js';

  export const getPersons = (req, res) => {
    const persons = getAllPersons();
    res.json(persons);
  };


person-route.js

  import express from 'express';
  import { getPersons } from './person-controller.js';

  const router = express.Router();

  router.get('/', getPersons);

  export default router;


person-service.js

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

  export const getAllPersons = () => {
    return persons;
  };


donc mainteant je veux de l'injection de dependance

service dans le controller


Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.



