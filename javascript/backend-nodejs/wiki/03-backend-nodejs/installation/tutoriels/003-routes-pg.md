Modifier

server.js


  console.log('00000000001:server')

  import app from './app.js';
  import dotenv from 'dotenv';
  dotenv.config();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


app.js

  console.log('00000000001:app')
  import express from 'express';
  import featuresRoutes from './features-routes.js';
  import indexRoutes from './index-routes.js';

  const app = express();

  app.use(express.json());

  app.use(featuresRoutes);

  app.use('/', indexRoutes);
  app.use('*', indexRoutes);

  export default app;


features-routes.js

  import express from 'express';

  import personRoute from './features/person/person-routes.js';
  import cityRoute from './features/city/city-routes.js';

  const router = express.Router();

  router.use('/persons', personRoute);
  router.use('/cities', cityRoute);

  export default router;


  persons-routes.js

  
    console.log('00000000001:person-routes')
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
      console.log('00000000001:client.connect');
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
        console.log('00000000001:client.release');
        client.release();
      }
    });

    export default router;
