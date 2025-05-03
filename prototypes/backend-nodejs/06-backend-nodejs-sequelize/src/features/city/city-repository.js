import City from './city-model.js';

class CityRepository {
  constructor(useDatabase = true) {
    this.useDatabase = useDatabase;
    this.items = [
      { id: 1, name: 'Cincinnati' },
      { id: 2, name: 'New York' },
      { id: 3, name: 'Knoxville' },
      { id: 4, name: 'London' },
      { id: 5, name: 'Detroit' },
      { id: 6, name: 'Kapuskasing' },
      { id: 7, name: 'Denver' },
      { id: 8, name: 'Burbank' },
      { id: 9, name: 'San Francisco' },
      { id: 10, name: 'Houston' },
      { id: 11, name: 'Atlanta' },
      { id: 12, name: 'Modesto' },
    ];
  }

  async getItems() {
    if (this.useDatabase) {
      return await City.findAll({ attributes: ['id', 'name'] });
    }

    return this.items;
  }

  async getItemById(id) {
    if (this.useDatabase) {
      return await City.findByPk(id, { attributes: ['id', 'name'] });
    }

    return this.items.find((item) => item.id === id) || null;
  }

  async createItem(city) {
    if (this.useDatabase) {
      return await City.create(city);
    }
    const newItem = { id: this.items.length + 1, ...city };
    this.items.push(newItem);

    return newItem;
  }

  async updateItem(id, updatedData) {
    if (this.useDatabase) {
      const city = await City.findByPk(id);
      if (!city) {
        return null;
      }

      return await city.update(updatedData);
    }
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this.items[index] = { ...this.items[index], ...updatedData };

    return this.items[index];
  }

  async deleteItem(id) {
    if (this.useDatabase) {
      const city = await City.findByPk(id);
      if (!city) {
        return null;
      }
      await city.destroy();

      return city;
    }
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    return this.items.splice(index, 1)[0];
  }
}

export default CityRepository;
