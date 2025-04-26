'use strict';

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const config = require('../../../config/config');

function configureSecurity(app) {
  app.use(cors({ origin: config.security.corsOrigin }));
  app.use(helmet(config.security.helmet));
  app.use(xssClean());
  console.log('00000000001');
  const limiter = rateLimit({
    windowMs: config.security.rateLimit.windowMs,
    max: config.security.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
  });
  console.log('00000000002');
  app.use(limiter);
  console.log('00000000003');
}

module.exports = configureSecurity;
