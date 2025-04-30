'use strict';

const express = require('express');
const compression = require('compression');

const configureSecurity = require('./middlewares/security/security.js');

const initLocals = require('./middlewares/core/init-locals.js');

const notFoundHandler = require('./middlewares/error/not-found-handler.js');
const responseHandler = require('./middlewares/response/response-handler.js');
const errorHandler = require('./middlewares/error/error-handler.js');

const requestLogger = require('./infrastructure/logger/request-logger.js');
const errorLogger = require('./infrastructure/logger/error-logger.js');

const swaggerRoutes = require('./infrastructure/swagger/swagger.routes.js');

const healthRoutes = require('./routes/health.routes.js');
const appRoutes = require('./routes/app.routes.js');
const rootRoutes = require('./routes/root.routes.js');

const app = express();

configureSecurity(app);

app.use(compression());
app.use(express.json());
app.use(initLocals);

// app.get('/', (req, res) => {
//     console.log('00000000001:' + JSON.stringify(req.headers));
//     const payload = {
//       status: 'ok',
//     //   req.headers
//     //         data: Array.from({ length: 1000 }, (_, i) => `Item ${i}`),
//     };
//     res.status(200).json({aaaa:1111});
//   });

app.use(healthRoutes);

app.use(requestLogger);

app.use('/api-docs', swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

app.use(notFoundHandler);
app.use(responseHandler);
app.use(errorHandler);
app.use(errorLogger);

module.exports = app;
