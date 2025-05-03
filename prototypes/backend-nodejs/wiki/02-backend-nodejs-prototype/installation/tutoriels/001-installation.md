
- creer le fichier package.json et ses dependances
  npm init -y
  npm install --save-dev express


- creer le fichier app.js

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


- Rajouter les scripts    
  "start": "node app",
  "dev": "nodemon app",


- Gestion de l'erreur
  Cannot use import statement outside a module  

  remplacer le type par defaut
    "type": "commonjs",

  par
    "type": "module",

- Rajouter les scripts    
  "start": "node src/app",
  "dev": "nodemon src/app",




