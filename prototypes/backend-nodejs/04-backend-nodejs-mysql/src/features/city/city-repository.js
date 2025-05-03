import pool from '../../config/database.js';

class CityRepository {
  constructor(useDatabase) {
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
    if (this.useDatabase && pool) {
      try {
        const { rows } = await pool.query('SELECT * FROM city');

        return rows;
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return [];
      }
    }

    return Promise.resolve(this.items);
  }

  async getItemById(id) {
    if (this.useDatabase && pool) {
      try {
        const { rows } = await pool.query('SELECT * FROM city WHERE id = $1', [id]);

        return rows.length ? rows[0] : null;
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    return Promise.resolve(this.items.find((item) => item.id === id) || null);
  }

  async createItem(item) {
    if (this.useDatabase && pool) {
      try {
        const { name } = item;
        const { rows } = await pool.query('INSERT INTO city (name) VALUES ($1) RETURNING *', [name]);

        return rows[0];
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    const newItem = { id: this.items.length + 1, ...item };
    this.items.push(newItem);

    return Promise.resolve(newItem);
  }

  async updateItem(id, updatedData) {
    if (this.useDatabase && pool) {
      try {
        const { name } = updatedData;
        const { rows } = await pool.query('UPDATE city SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

        return rows.length ? rows[0] : null;
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.items[index] = { ...this.items[index], ...updatedData };

    return Promise.resolve(this.items[index]);
  }

  async deleteItem(id) {
    if (this.useDatabase && pool) {
      try {
        const { rows } = await pool.query('DELETE FROM city WHERE id = $1 RETURNING *', [id]);

        return rows.length ? rows[0] : null;
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.items.splice(index, 1)[0]);
  }
}

export default CityRepository;
