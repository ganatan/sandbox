'use strict';

const helmet = require('helmet');
const cors = require('cors');
const config = require('../../../config/config');

function configureSecurity(app) {
  app.use(cors({ origin: config.security.corsOrigin }));
  app.use(helmet(config.security.helmet));
}

module.exports = configureSecurity;
