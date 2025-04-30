import { jest } from '@jest/globals';
import { errorLogger } from '../../error-logger.js';
import logger from '../../logger.js';

jest.mock('../../logger.js', () => ({
  default: {
    error: jest.fn(),
  },
}));

describe('Error Logger Middleware', () => {
  it('logs error with statusCode if provided', () => {
    const error = new Error('Something went wrong');
    error.statusCode = 500;
    const req = { method: 'POST', originalUrl: '/error-url' };
    const res = {};
    const next = jest.fn();

    errorLogger(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Error: Something went wrong', {
      method: 'POST',
      url: '/error-url',
      statusCode: 500,
    });
    expect(next).toHaveBeenCalledWith(error);
  });

  it('logs error with default statusCode 500 if none provided', () => {
    const error = new Error('Unhandled error');
    const req = { method: 'GET', originalUrl: '/crash' };
    const res = {};
    const next = jest.fn();

    errorLogger(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('Error: Unhandled error', {
      method: 'GET',
      url: '/crash',
      statusCode: 500,
    });
    expect(next).toHaveBeenCalledWith(error);
  });
});
