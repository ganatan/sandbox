'use strict';

const items = require('./city.mock-data');

class Service {
  getItems() {
    return items;
  }

  createItem(cityData) {
    const newItem = { id: items.length + 1, ...cityData };
    items.push(newItem);

    return newItem;
  }
}

module.exports = new Service();
