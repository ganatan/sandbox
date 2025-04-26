'use strict';

const app = require('./app');
const config = require('./config/config');

const server = app.listen(config.app.port, () => {
  console.log(`API listening on http://localhost:${config.app.port}`);
});

module.exports = server;
