server.js

import app from './app.js';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default server;



ce fichier de test

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


et la couverture

-----------|---------|----------|---------|---------|-------------------                                                                         
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                          
-----------|---------|----------|---------|---------|-------------------
All files  |   96.96 |      100 |     100 |   96.96 | 
 app.js    |     100 |      100 |     100 |     100 | 
 server.js |   88.88 |      100 |     100 |   88.88 | 6
-----------|---------|----------|---------|---------|-------------------

improve ce test