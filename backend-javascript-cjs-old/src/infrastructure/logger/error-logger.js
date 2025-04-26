'use strict';

const logger = require('./logger');

const errorLogger = (err, req, res, next) => {
  console.log('00000000001:errorLogger');
  logger.error(`Error: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
  });

  next(err);
};

module.exports = errorLogger;
