'use strict';

const logger = require('../../logger/logger');

function errorHandler(err, req, res, next) {
  console.log('00000000001:errorHandler');
  const statusCode = err.statusCode || 500;
  console.log('00000000002:errorHandler');
  const message = err.message || 'Internal Server Error';
  console.log('00000000003:errorHandler');
  const context = err.context || `${req.method} ${req.originalUrl}`;
  console.log('00000000004:errorHandler');
  const details = err.details || {
    path: req.originalUrl,
    errorCode: statusCode,
    timestamp: new Date().toISOString(),
  };
  console.log('00000000005:errorHandler');
  logger.error(`[ERROR] ${statusCode}: ${message}`);
  if (context) {
    logger.error(`[CONTEXT] ${context}`);
  }
  console.log('00000000006:errorHandler');
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      context,
      details,
    },
  });
}

module.exports = errorHandler;
