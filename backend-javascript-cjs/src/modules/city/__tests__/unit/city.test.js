'use strict';

const cityController = require('../../city.controller');

describe('CityController', () => {

  describe('getCities', () => {
    it('should return an object with success and an array of cities', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await cityController.getCities(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);

      const [response] = res.json.mock.calls[0];

      expect(response).toHaveProperty('success', true);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThanOrEqual(1);
      expect(response.data[0]).toHaveProperty('name');
    });
  });

  describe('createCity', () => {
    it('should create a city successfully when data is valid', async () => {
      const req = {
        body: { name: 'Lyon' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await cityController.createCity(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);

      const [response] = res.json.mock.calls[0];

      expect(response).toHaveProperty('success', true);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'Lyon');
    });

    it('should call next with a validation error if data is invalid', async () => {
      const req = {
        body: { name: '' }, // Nom invalide
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await cityController.createCity(req, res, next);

      expect(next).toHaveBeenCalled();
      const [error] = next.mock.calls[0];
      expect(error.name).toBe('ZodError');
    });
  });

});


// 'use strict';

// const cityController = require('../../city.controller');

// describe('CityController', () => {
//   describe('getCities', () => {
//     it('should return an object with success and an array of cities', async () => {
//       // Arrange
//       const req = {};
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       const next = jest.fn();

//       // Act
//       await cityController.getCities(req, res, next);

//       // Assert
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledTimes(1);

//       const [response] = res.json.mock.calls[0];

//       expect(response).toHaveProperty('success', true);
//       expect(Array.isArray(response.data)).toBe(true);
//       expect(response.data.length).toBeGreaterThanOrEqual(1); // on teste qu'il y a au moins 1 ville
//       expect(response.data[0]).toHaveProperty('name');
//     });
//   });
// });

