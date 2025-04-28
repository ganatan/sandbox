import request from 'supertest';
import app from '../../app';

describe('App - Integration Test', () => {
  it('GET /persons - should return 7 persons', async () => {
    const response = await request(app).get('/persons');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(7);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});
