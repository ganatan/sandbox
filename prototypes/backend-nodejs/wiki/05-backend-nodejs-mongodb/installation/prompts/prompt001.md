# initialisation

mon projet backend-node-javascript-postgresql

database.js

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'backend_node_javascript',
  password: process.env.DB_PASSWORD || 'Trustno1',
  port: process.env.DB_PORT || 5432,
});

export default pool;


person-repository.js
import pool from '../../config/database.js';

class PersonRepository {
  constructor(useDatabase) {
    this.useDatabase = useDatabase;
    this.items = [
      { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
      { id: 2, name: 'Martin Scorsese', city: 'New York' },
      { id: 3, name: 'Quentin Tarantino', city: 'Knoxville' },
      { id: 4, name: 'Christopher Nolan', city: 'London' },
      { id: 5, name: 'Francis Ford Coppola', city: 'Detroit' },
      { id: 6, name: 'James Cameron', city: 'Kapuskasing' },
      { id: 7, name: 'David Fincher', city: 'Denver' },
      { id: 8, name: 'Tim Burton', city: 'Burbank' },
      { id: 9, name: 'Clint Eastwood', city: 'San Francisco' },
      { id: 10, name: 'Wes Anderson', city: 'Houston' },
      { id: 11, name: 'Spike Lee', city: 'Atlanta' },
      { id: 12, name: 'George Lucas', city: 'Modesto' },
    ];
  }

  async getItems() {
    if (this.useDatabase && pool) {
      try {
        const { rows } = await pool.query('SELECT * FROM person');

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
        const { rows } = await pool.query('SELECT * FROM person WHERE id = $1', [id]);

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
        const { rows } = await pool.query('INSERT INTO person (name) VALUES ($1) RETURNING *', [name]);

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
        const { rows } = await pool.query('UPDATE person SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

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
        const { rows } = await pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id]);

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

export default PersonRepository;


adapte ce code pour mongodb
