import express from 'express';
import cors from 'cors';

import modulesRouter from './routers/modules.router.js';
import rootRouter from './routers/root.router.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(modulesRouter);

app.use('/', rootRouter);
app.use('*', rootRouter);

export default app;
