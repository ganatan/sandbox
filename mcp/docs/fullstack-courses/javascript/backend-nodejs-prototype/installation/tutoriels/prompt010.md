# Modifier la structure

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


person-route.js
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
