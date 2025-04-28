import request from 'supertest';
import app from './app'; // importation correcte de ton app.ts

describe('GET /persons', () => {
  it('should return a list of persons', async () => {
    const response = await request(app).get('/persons');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(7);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
