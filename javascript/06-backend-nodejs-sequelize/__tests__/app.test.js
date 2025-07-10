import request from 'supertest';
import app from '../src/app.js';

describe('GET /persons', () => {
  it('should return a list of persons with status 200', async () => {
    // Arrange
    const endpoint = '/persons';

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /cities', () => {
  it('should return a list of cities with status 200', async () => {
    // Arrange
    const endpoint = '/cities';

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /unknown-route', () => {
  it('should return 404 for unknown routes', async () => {
    // Arrange
    const endpoint = '/unknown-route';

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(404);
  });
});

describe('GET /', () => {
  it('should return 200 for index route', async () => {
    // Arrange
    const endpoint = '/';

    // Act
    const response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(200);
  });
});
