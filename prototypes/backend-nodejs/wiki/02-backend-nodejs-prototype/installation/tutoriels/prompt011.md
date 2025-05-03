Rajouter dans app.js

import express from 'express';

import featuresRoutes from './features-routes.js';
import indexRoutes from './index-routes.js';

const app = express();

app.use(featuresRoutes);

app.use('/', indexRoutes);
app.use('*', indexRoutes);

export default app;


Creer index-routes.js

  import express from 'express';

  const router = express.Router();

  const index = [
    'persons',
    'cities',
  ];

  router.get('/', (req, res) => {
    res.json(index);
  });


  router.use((req, res) => {
    const errorResponse = {
      status: 'error',
      message: 'Resource not found',
      url: req.originalUrl,
      errorCode: 404,
      timestamp: new Date().toISOString(),
    };
    res.json(errorResponse);
  }
  )


  export default router;
