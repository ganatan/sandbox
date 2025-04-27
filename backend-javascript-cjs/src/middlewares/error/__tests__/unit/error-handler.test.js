'use strict';

const errorHandler = require('../../error-handler');

describe('errorHandler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test-url',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const checkResponse = (expectedStatus, expectedError) => {
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: expect.objectContaining(expectedError),
    });
  };

  it('should handle generic error without statusCode', () => {
    const error = new Error('Something went wrong');

    errorHandler(error, req, res, next);

    checkResponse(500, {
      message: 'Something went wrong',
      context: 'GET /test-url',
      details: expect.objectContaining({
        path: '/test-url',
        errorCode: 500,
      }),
    });
  });

  it('should handle error with specific statusCode', () => {
    const error = {
      statusCode: 404,
      message: 'Resource not found',
    };

    errorHandler(error, req, res, next);

    checkResponse(404, {
      message: 'Resource not found',
      context: 'GET /test-url',
      details: expect.objectContaining({
        path: '/test-url',
        errorCode: 404,
      }),
    });
  });

  it('should handle error with custom context and details', () => {
    const error = {
      statusCode: 400,
      message: 'Invalid input',
      context: 'POST /custom-url',
      details: {
        path: '/custom-url',
        errorCode: 400,
        timestamp: '2025-04-27T12:00:00.000Z',
      },
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'Invalid input',
        context: 'POST /custom-url',
        details: {
          path: '/custom-url',
          errorCode: 400,
          timestamp: '2025-04-27T12:00:00.000Z',
        },
      },
    });
  });
});
