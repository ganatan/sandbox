
Installer la gestion des routes


voila ma structure

Structure of src:
|-- app.js
|-- features
  |-- city
    |-- city-route.js
  |-- person
    |-- person-route.js
|-- features-routes.js
|-- index-routes.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-structure.js

  mon fichier 


  app.js

    import express from 'express';

    import featuresRoutes from './features-routes.js';
    import indexRoutes from './index-routes.js';

    const app = express();

    app.use(featuresRoutes);

    app.use('/', indexRoutes);
    app.use('*', indexRoutes);

    export default app;

features-routes.js

  import express from 'express';

  import personRoute from './features/person/person-route.js';
  import cityRoute from './features/city/city-route.js';

  const router = express.Router();

  router.use('/persons', personRoute);
  router.use('/cities', cityRoute);

  export default router;

et person-route.js

  import express from 'express';

  const router = express.Router();

  const persons = [
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

  router.get('/', (req, res) => {
    res.json(persons);
  });


  export default router;


voila mon app.js que je voudrai integrer dans cette architecture  


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


comment faire
qulles sont les best practices

Tout le code doit être en anglais.
Les données doivent être en anglais.

Pas de commentaires dans le code.

Réponds en français.

La réponse doit tenir sur un seul écran et ne pas utiliser de canevas sur le côté.





