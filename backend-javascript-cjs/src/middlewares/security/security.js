'use strict';

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('../../config/app.config');

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
