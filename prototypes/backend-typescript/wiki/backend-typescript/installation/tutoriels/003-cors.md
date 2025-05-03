
npm install --save-dev cors
npm install --save-dev @types/cors


import express, { Application } from 'express';
import cors from 'cors';

import modulesRouter from './routers/modules.router';
import rootRouter from './routers/root.router';

const app: Application = express();

app.use(cors());