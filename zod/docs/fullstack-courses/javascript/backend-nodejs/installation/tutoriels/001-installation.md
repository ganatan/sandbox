
  npm install express pg dotenv


Modifier app.js


  import express from 'express';
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

  const app = express();
  app.use(express.json());

  app.get('/persons', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM person');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/persons', async (req, res) => {
    const { name, wikipedia_link, birth_date, birth_city_id } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rows } = await client.query(
        'INSERT INTO person (name, wikipedia_link, birth_date, birth_city_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, wikipedia_link, birth_date, birth_city_id]
      );
      await client.query('COMMIT');
      res.status(201).json(rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  });

  export default app;



Rajouter un fichier .env

DB_USER=postgres
DB_HOST=localhost
DB_NAME=backend_node_javascript
DB_PASSWORD=Trustno1
DB_PORT=5432


# tester un objet JSON avec postman

{
  "name": "Stanley Kubrick",
  "wikipedia_link": "https://en.wikipedia.org/wiki/Stanley_Kubrick",
  "birth_date": "1928-07-26",
  "birth_city_id": 1
}


{
  "name": "Los Angeles"
}