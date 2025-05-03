# modifier le code

modifier index-routes.js


import express from 'express';

const router = express.Router();

const index = [
  'persons',
  'cities',
];

router.get('/', (req, res) => {
  res.json(index);
});

router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
    url: req.originalUrl,
    errorCode: 404,
    timestamp: new Date().toISOString(),
  });
});


export default router;



# modifier les tests


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

