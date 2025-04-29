import express from 'express';
import compression from 'compression';

import configureSecurity from './middlewares/security/security.js';

import initLocals from './middlewares/core/init-locals.js';

import swaggerRoutes from './infrastructure/swagger/swagger.routes.js';

import appRoutes from './routes/app.routes.js';
import rootRoutes from './routes/root.routes.js';

const app = express();

configureSecurity(app);

app.use(compression());
app.use(express.json());
app.use(initLocals);

app.use(swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

export default app;
