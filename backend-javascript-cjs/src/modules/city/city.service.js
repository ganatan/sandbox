'use strict';

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
