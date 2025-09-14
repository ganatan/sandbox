
creer 

features-routes.js
index-routes.js


deplacer le sql 



creer database.js dans src/config/

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


Mettre à jour person-route.js

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

  Mettre à jour app.js

    import express from 'express';
    import featuresRoutes from './features-routes.js';
    import indexRoutes from './index-routes.js';

    const app = express();

    app.use(express.json());
    app.use(featuresRoutes);
    app.use('/', indexRoutes);
    app.use('*', indexRoutes);

    export default app;

Améliorer server.js    

  import app from './app.js';
  import dotenv from 'dotenv';

  dotenv.config();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


