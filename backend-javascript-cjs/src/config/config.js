'use strict';

const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
  app: {
    port: process.env.PORT || 7777,
    env: env,
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
