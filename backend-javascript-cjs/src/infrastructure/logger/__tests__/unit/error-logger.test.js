'use strict';

const errorLogger = require('../../error-logger');
const logger = require('../../logger');

jest.mock('../../logger', () => ({
  error: jest.fn(),
}));

describe('Error Logger Middleware', () => {
  it('should log the error message with details', () => {
    const err = new Error('Something went wrong');
    err.statusCode = 500;

    const req = { method: 'POST', originalUrl: '/error-url' };
    const res = {};
    const next = jest.fn();

    errorLogger(err, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Error: Something went wrong', {
      method: 'POST',
      url: '/error-url',
      statusCode: 500,
    });
    expect(next).toHaveBeenCalledWith(err);
  });
});
