j'ai 2 routes cities et persons

avec city-route.md

import express from 'express';

const router = express.Router();

const cities = [
  'Cincinnati',
  'New York',
  'Knoxville',
  'London',
  'Detroit',
  'Kapuskasing',
  'Denver',
  'Burbank',
  'San Francisco',
  'Houston',
  'Atlanta',
  'Modesto'
];

router.get('/', (req, res) => {
  res.json(cities);
});

export default router;



refacto ce fichier sur la base de person-route.js

import express from 'express';
import pool from '../../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM person');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
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

export default router;


Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.





