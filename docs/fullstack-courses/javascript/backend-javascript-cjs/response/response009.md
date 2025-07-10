# Ajouter un fichier config/config.js

require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || '*'
  }
};


server.js

'use strict';

const app = require('./app');
const config = require('./config/config');

const server = app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});

module.exports = server;


security.js

const helmet = require('helmet');
const cors = require('cors');
const config = require('../../config/config');

function setupSecurity(app) {
  app.use(cors({ origin: config.security.corsOrigin }));
  app.use(helmet(config.security.helmet));
}

module.exports = setupSecurity;
