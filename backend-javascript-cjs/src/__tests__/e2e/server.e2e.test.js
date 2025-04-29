'use strict';

const http = require('http');
const zlib = require('zlib');
const app = require('../../app');

// Mock forcé pour les tests e2e
jest.mock('../../modules/person/mocks/person.mock-data', () =>
  require('../../__tests__/mocks/person.mock-data.large')
);

let server;

beforeAll((done) => {
  server = http.createServer(app).listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('GET /persons via HTTP', () => {
  test('should return 200, valid JSON payload, and gzip encoding', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/persons',
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate',
      },
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-encoding']).toBe('gzip');

      const unzip = zlib.createGunzip();
      res.pipe(unzip);

      let data = '';
      unzip.on('data', (chunk) => {
        data += chunk;
      });
      unzip.on('end', () => {
        const json = JSON.parse(data);

        expect(json).toHaveProperty('success', true);
        expect(Array.isArray(json.data)).toBe(true);
        expect(json.data.length).toBeGreaterThan(100); // large response
        expect(json.data[0]).toHaveProperty('name');

        done();
      });
    });

    req.on('error', (err) => done(err));
    req.end();
  });
});


// 'use strict';

// const http = require('http');
// const app = require('../../app');

// let server;

// beforeAll((done) => {
//   server = http.createServer(app).listen(3000, () => {
//     done();
//   });
// });

// afterAll((done) => {
//   server.close(done);
// });

// describe('GET /persons via HTTP', () => {
//   test('retourne 200 et un objet JSON avec success et data', (done) => {
//     http.get('http://localhost:3000/persons', (res) => {
//       expect(res.statusCode).toBe(200);

//       let data = '';
//       res.on('data', (chunk) => (data += chunk));
//       res.on('end', () => {
//         const json = JSON.parse(data);

//         expect(json).toHaveProperty('success', true);
//         expect(Array.isArray(json.data)).toBe(true);
//         expect(json.data).toHaveLength(7);
//         expect(json.data[0]).toHaveProperty('name', 'Christopher Nolan');

//         done();
//       });
//     });
//   });
// });
