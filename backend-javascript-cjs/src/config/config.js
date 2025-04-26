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
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
  monitoring: {
    metricsPath: '/metrics',
  },
};

module.exports = config;
