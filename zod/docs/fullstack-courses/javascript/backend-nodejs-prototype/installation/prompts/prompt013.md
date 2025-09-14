
# prompt improve

voila ma structure

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

server.test.js

import server from '../src/server.js';

describe('Démarrage du serveur', () => {
  it('Le serveur démarre et écoute correctement', async () => {
    expect(server.listening).toBe(true);
  });

  afterAll(() => {
    server.close();
  });
});




et le coverage


File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                
---------------------|---------|----------|---------|---------|-------------------
All files            |   89.71 |      100 |     100 |   89.71 | 
 src                 |   82.75 |      100 |     100 |   82.75 | 
  app.js             |     100 |      100 |     100 |     100 | 
  features-routes.js |     100 |      100 |     100 |     100 | 
  index-routes.js    |      64 |      100 |     100 |      64 | 11,15-22
  server.js          |   88.88 |      100 |     100 |   88.88 | 6
 src/features/city   |   95.83 |      100 |     100 |   95.83 | 
  city-route.js      |   95.83 |      100 |     100 |   95.83 | 21
 src/features/person |     100 |      100 |     100 |     100 | 
  person-route.js    |     100 |      100 |     100 |     100 | 
---------------------|---------|----------|---------|---------|-------------------


improve le coverage


Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

