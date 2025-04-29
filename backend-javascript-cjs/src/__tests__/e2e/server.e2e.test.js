'use strict';

const http = require('http');
const zlib = require('zlib');
const app = require('../../app');

jest.mock('../../modules/person/mocks/person.mock-data', () => {
  return require('../../__tests__/mocks/person.mock-data.large');
});

let server;

beforeAll((done) => {
  server = http.createServer(app).listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('GET /persons via HTTP', () => {
  test('should return 200, valid JSON payload, and gzip encoding', (done) => {
    // Arrange
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/persons',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    };

    // Act
    const req = http.request(options, (res) => {
      // Assert status code and headers
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-encoding']).toBe('gzip');

      const unzip = zlib.createGunzip();
      res.pipe(unzip);

      let responseData = '';

      unzip.on('data', (chunk) => {
        responseData += chunk;
      });

      unzip.on('end', () => {
        const json = JSON.parse(responseData);

        // Assert payload structure
        expect(json).toHaveProperty('success', true);
        expect(Array.isArray(json.data)).toBe(true);
        expect(json.data.length).toBeGreaterThan(100);
        expect(json.data[0]).toHaveProperty('name');

        done();
      });
    });

    req.on('error', (error) => {
      done(error);
    });

    req.end();
  });
});
