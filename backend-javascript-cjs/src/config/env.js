'use strict';

const path = require('path');
const dotenv = require('dotenv');

const nodeEnv = process.env.NODE_ENV || 'development';

let envFile = '.env.development';

if (nodeEnv === 'production') {
  envFile = '.env.production';
} else if (nodeEnv === 'test') {
  envFile = '.env.test';
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`0000000001: ${process.env.NODE_ENV}`);
console.log(`0000000002: ${nodeEnv}`);
console.log(`0000000003: ${envFile}`);

const env = {
  nodeEnv: nodeEnv,
  port: process.env.PORT || 7777,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = env;
