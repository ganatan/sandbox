import express, { Application } from 'express';
import compression from 'compression';

import notFoundHandler from './middlewares/error/not-found-handler';
import responseHandler from './middlewares/response/response-handler';
import errorHandler from './middlewares/error/error-handler';

import requestLogger from './infrastructure/logger/request-logger';
import errorLogger from './infrastructure/logger/error-logger';

import appRoutes from './routes/app.routes';
import rootRoutes from './routes/root.routes';

const app: Application = express();

app.use(compression());
app.use(express.json());

app.use(requestLogger);

app.use(appRoutes);
app.use(rootRoutes);

app.use(notFoundHandler);
app.use(responseHandler);
app.use(errorHandler);
app.use(errorLogger);

export default app;
