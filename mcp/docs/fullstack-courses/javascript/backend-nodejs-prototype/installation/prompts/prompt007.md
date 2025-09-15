

je veux ameliorer la couverture de tests


app.js

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
  { id: 12, name: 'George Lucas', city: 'Modesto' },
];

app.get('/persons', (req, res) => {
  res.json(persons);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

export default app;


app.test.js

import request from 'supertest';
import app from '../src/app.js';

describe('GET /persons', () => {
  it('doit retourner une liste de personnes avec un code 200', async () => {
    const response = await request(app).get('/persons');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(12);
  });
});


la couverture donne

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                    
----------|---------|----------|---------|---------|-------------------
All files |   93.44 |       50 |     100 |   93.44 | 
 app.js   |   93.44 |       50 |     100 |   93.44 | 56-59
----------|---------|----------|---------|---------|-------------------