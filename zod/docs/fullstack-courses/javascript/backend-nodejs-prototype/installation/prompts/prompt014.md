# prompt 1

je veux appliquer sur les test le pattern aaa
je ne sais plus
dis moi quoi et surtout pourquoi

# prompt 2

donc mon code de test 

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

describe('GET /cities', () => {
  it('doit retourner une liste de personnes avec un code 200', async () => {
    const response = await request(app).get('/cities');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});


describe('GET /unknown-route', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});


describe('GET /', () => {
  it('should return 200 for index routes', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});



et 
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



refacto mes tests

appliquer Le pattern AAA
Tout le code doit être en anglais.
Les données doivent être en anglais.

Rajoute uniquement les commeantaires lies au pattern AAA

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.

