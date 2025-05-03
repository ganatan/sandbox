import app from '../src/app.js';
import sequelize from '../src/config/sequelize.js';
import request from 'supertest';

describe('Server startup', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should respond with 200 on the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
