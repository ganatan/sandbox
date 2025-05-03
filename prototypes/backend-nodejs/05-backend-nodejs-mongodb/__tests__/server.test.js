import request from 'supertest';
import app from '../src/app.js';

describe('Server startup', () => {
  let server;

  beforeAll(async () => {
    server = app.listen();
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('should respond to health check', async () => {
    // Arrange
    const expectedStatus = 200;

    // Act
    const response = await request(app).get('/');

    // Assert
    expect(response.status).toBe(expectedStatus);
  });
});
