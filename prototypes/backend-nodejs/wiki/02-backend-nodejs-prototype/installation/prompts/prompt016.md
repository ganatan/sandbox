# prompt 1

voila mon architecture

Structure of src:
|-- app.js
|-- features
  |-- city
    |-- city-route.js
  |-- person
    |-- person-route.js
|-- features-routes.js
|-- index-routes.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-structure.js


mon fichier

person-routes.js

  import express from 'express';

  const router = express.Router();

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

  router.get('/', (req, res) => {
    res.json(persons);
  });


  export default router;


je veux integrer un controller

person-controller.js



Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.



# prompt 2
maintenant rajoute 

person-service.js



