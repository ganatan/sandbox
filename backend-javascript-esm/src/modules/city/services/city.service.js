import items from '../mocks/city.mock-data.js';

class Service {
  getItems() {
    return items;
  }

  create(cityData) {
    const newItem = { id: items.length + 1, ...cityData };
    items.push(newItem);

    return newItem;
  }
}

export default new Service();
