'use strict';

const express = require('express');

const configureSecurity = require('./middlewares/security/security.js');
const responseHandler = require('./middlewares/response/response-handler.js');
const errorHandler = require('./middlewares/error/error-handler.js');

const requestLogger = require('./infrastructure/logger/request-logger.js');
const errorLogger = require('./infrastructure/logger/error-logger.js');

const swaggerRoutes = require('./infrastructure/swagger/swagger.routes.js');

const appRoutes = require('./routes/app.routes.js');
const rootRoutes = require('./routes/root.routes.js');

const app = express();

configureSecurity(app);

app.use(express.json());

app.use(requestLogger);

app.use('/api-docs', swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

app.use(responseHandler);
app.use(errorHandler);
app.use(errorLogger);

module.exports = app;
