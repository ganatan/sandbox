'use strict';

const env = require('./env');

const appConfig = {
  app: {
    port: env.port,
    env: env.nodeEnv,
  },
  security: {
    corsOrigin: env.corsOrigin,
    helmet: {
      contentSecurityPolicy: false,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },
  logger: {
    level: env.logLevel,
  },
  monitoring: {
    metricsPath: '/metrics',
  },
};

module.exports = appConfig;
