import express from 'express';

import configureSecurity from './infrastructure/middleware/security/security.js';

import swaggerRoutes from './infrastructure/swagger/swagger.routes.js';

import appRoutes from './routes/app.routes.js';
import rootRoutes from './routes/root.routes.js';

const app = express();

configureSecurity(app);

app.use(swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

export default app;
