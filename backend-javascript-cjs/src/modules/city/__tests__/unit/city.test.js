'use strict';

const cityController = require('../../city.controller');

describe('CityController', () => {
  describe('getCities', () => {
    it('should return an object with success and an array of cities', async () => {
      // Arrange
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      // Act
      await cityController.getCities(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);

      const [response] = res.json.mock.calls[0];

      expect(response).toHaveProperty('success', true);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThanOrEqual(1); // on teste qu'il y a au moins 1 ville
      expect(response.data[0]).toHaveProperty('name');
    });
  });
});

// 'use strict';

// const getItems = require('../../city.controller');

// test('getItems returns an object with success and an array of 7 cities', () => {
//   // Arrange
//   const req = {};
//   const res = {
//     json: jest.fn(),
//   };

//   // Act
//   getItems(req, res);

//   // Assert
//   expect(res.json).toHaveBeenCalledTimes(1);
//   const [jsonResponse] = res.json.mock.calls[0];

//   expect(jsonResponse).toHaveProperty('success', true);
//   expect(Array.isArray(jsonResponse.data)).toBe(true);
//   expect(jsonResponse.data).toHaveLength(7);
//   expect(jsonResponse.data[0]).toHaveProperty('name', 'Paris');
// });
