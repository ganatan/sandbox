import express, { Application } from 'express';
import compression from 'compression';

import appRoutes from './routes/app.routes';
import rootRoutes from './routes/root.routes';

const app: Application = express();

app.use(compression());
app.use(express.json());

app.use(appRoutes);
app.use(rootRoutes);

export default app;
