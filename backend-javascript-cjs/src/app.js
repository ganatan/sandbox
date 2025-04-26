'use strict';

const express = require('express');

const configureSecurity = require('./infrastructure/middleware/security/security.js');
const responseHandler = require('./infrastructure/middleware/response/response-handler.js');
const errorHandler = require('./infrastructure/middleware/error/error-handler.js');

const requestLogger = require('./infrastructure/logger/request-logger.js');
const errorLogger = require('./infrastructure/logger/error-logger.js');

const swaggerRoutes = require('./infrastructure/swagger/swagger.routes.js');

const appRoutes = require('./routers/app.routes.js');
const rootRoutes = require('./routers/root.routes.js');

const app = express();

configureSecurity(app);

app.use(express.json());

app.use(requestLogger);

app.use('/api-docs', swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

app.use(errorLogger);
app.use(responseHandler);
app.use(errorHandler);

module.exports = app;
