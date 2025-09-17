# response 1

npm install --save-dev jest ts-jest @types/jest supertest @types/supertest

npx ts-jest config:init




check

jest.config.js

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
};


"scripts": {
  "test": "jest --passWithNoTests",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}

app.test.js

import request from 'supertest';
import express, { Request, Response } from 'express';

// Reprendre ton app sans démarrer de serveur sur un port réel
const app = express();

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

describe('GET /persons', () => {
  it('should return a list of persons', async () => {
    const response = await request(app).get('/persons');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(7);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});


jest.config.js apres modif

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};

# response 2

app.test.ts

import request from 'supertest';
import app from './app';

describe('GET /persons', () => {
  it('should return a list of persons', async () => {
    const response = await request(app).get('/persons');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(7);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});


app.ts

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;


# response 3

import request from 'supertest';
import app from '../../../src/app';

describe('GET /persons', () => {
  it('should return a list of persons', async () => {
    const response = await request(app).get('/persons');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(7);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
