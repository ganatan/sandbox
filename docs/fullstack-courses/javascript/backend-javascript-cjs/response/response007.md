app.routes.js


const express = require('express');
const cityRoutes = require('../modules/city/city.routes');
const getPersons = require('../modules/person/person.controller.js');

const router = express.Router();

router.use('/persons', getPersons);
router.use('/cities', cityRoutes);

module.exports = router;


city.routes.js
const express = require('express');
const cityController = require('./city.controller');

const router = express.Router();

router.get('/', cityController.getCities.bind(cityController));
router.post('/', cityController.createCity.bind(cityController));

module.exports = router;


city.controller.js
const { createCitySchema } = require('./city.schema');
const cityService = require('./city.service');
const { z } = require('zod');

class CityController {
  async getCities(req, res) {
    const cities = cityService.findAll();
    res.status(200).json({ success: true, data: cities });
  }

  async createCity(req, res, next) {
    try {
      const validated = createCitySchema.parse(req.body);
      const newCity = cityService.create(validated);
      res.status(201).json({ success: true, data: newCity });
    } catch (error) {
      next(error); // Laisse le middleware error gérer
    }
  }
}

module.exports = new CityController();


city.service.js
const cities = require('./city.mock-data');

class CityService {
  findAll() {
    return cities;
  }

  create(cityData) {
    const newCity = { id: cities.length + 1, ...cityData };
    cities.push(newCity);
    return newCity;
  }
}

module.exports = new CityService();


city.schema.js
const { z } = require('zod');

const createCitySchema = z.object({
  name: z.string().min(2, { message: 'Le nom de la ville doit faire au moins 2 caractères.' }),
});

module.exports = { createCitySchema };
