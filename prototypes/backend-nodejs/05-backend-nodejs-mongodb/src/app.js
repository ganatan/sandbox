import express from 'express';
import featuresRoutes from './features-routes.js';
import indexRoutes from './index-routes.js';

const app = express();

app.use(express.json());

app.use(featuresRoutes);
app.use('/', indexRoutes);

export default app;

// import express from 'express';

// import featuresRoutes from './features-routes.js';
// import indexRoutes from './index-routes.js';

// const app = express();

// app.use(featuresRoutes);

// app.use('/', indexRoutes);
// app.use('*', indexRoutes);

// export default app;
