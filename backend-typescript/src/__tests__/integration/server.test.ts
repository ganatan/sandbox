import http from 'http';
import app from '../../app';

let server: http.Server;
const port = 4000;

describe('Server - E2E Test', () => {
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('GET /persons - should return 7 persons from real server', async () => {
    const response = await fetch(`http://localhost:${port}/persons`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(7);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
  });
});
