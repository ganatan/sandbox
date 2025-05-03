# prompt 1

passer au test

mon fichier app.ts

import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

const persons = [
  { id: 1, name: 'Steven Spielberg' },
  { id: 2, name: 'Christopher Nolan' },
  { id: 3, name: 'Quentin Tarantino' },
  { id: 4, name: 'Martin Scorsese' },
  { id: 5, name: 'Alfred Hitchcock' },
  { id: 6, name: 'Stanley Kubrick' },
  { id: 7, name: 'James Cameron' },
];

app.get('/persons', (req: Request, res: Response) => {
  res.json(persons);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


utilise jest 

dis moi comment installer et l'utiliser

# promt 2


apres le coverage
 
  GET /persons
    √ should return a list of persons (18 ms)                                                                                                     
                                                                                                                                                  
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                  
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.311 s, estimated 2 s

app n'apparait pas le coverage

# prompt 3

je veux improver les tests

avec 
src/app.ts
src/__tests__/integration/app.test.ts

qu'en penses tu