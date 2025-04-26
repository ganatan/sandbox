'use strict';

const { createCitySchema } = require('./city.schema');
const cityService = require('./city.service');

class CityController {
  async getCities(req, res) {
    const cities = cityService.findAll();
    res.status(200).json({ success: true, data: cities });
  }

  async createCity(req, res, next) {
    try {
      const validated = createCitySchema.parse(req.body);
      const newCity = cityService.create(validated);

      return res.status(201).json({ success: true, data: newCity });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CityController();
