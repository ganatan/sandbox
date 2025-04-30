import { jest } from '@jest/globals';
import { requestLogger } from '../../request-logger.js';
import logger from '../../logger.js';

jest.mock('../../logger.js', () => ({
  default: {
    info: jest.fn(),
  },
}));

describe('Request Logger Middleware', () => {
  it('should log the HTTP method and URL', () => {
    const req = { method: 'GET', originalUrl: '/test-url' };
    const res = {};
    const next = jest.fn();

    requestLogger(req, res, next);

    expect(logger.info).toHaveBeenCalledWith('[GET] /test-url');
    expect(next).toHaveBeenCalled();
  });
});
