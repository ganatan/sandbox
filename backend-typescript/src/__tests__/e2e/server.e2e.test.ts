import request from 'supertest';
import app from '../../app';

let server: ReturnType<typeof app.listen>;

beforeAll((done) => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('GET /persons via HTTP', () => {
  it('should return 200 and an array of 7 persons', async () => {
    const response = await request('http://localhost:3000').get('/persons').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(7);
    expect(response.body[1]).toHaveProperty('name', 'Christopher Nolan');
  });
});
