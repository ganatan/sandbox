# Response Winston

error-logger.js

'use strict';

const logger = require('./logger');

const errorLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
  });

  next(err);
};

module.exports = errorLogger;

logger.js

'use strict';

const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

module.exports = logger;


request-logger.js

'use strict';

const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;



app.js


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



# Response security

npm install express-rate-limit


config.js

'use strict';

require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || '*',
    helmet: {
      contentSecurityPolicy: false,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
  monitoring: {
    metricsPath: '/metrics',
  },
};

module.exports = config;


security.js

'use strict';

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('../../../config/config');

function configureSecurity(app) {
  app.use(cors({ origin: config.security.corsOrigin }));
  app.use(helmet(config.security.helmet));
  const limiter = rateLimit({
    windowMs: config.security.rateLimit.windowMs,
    max: config.security.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

module.exports = configureSecurity;
