'use strict';

const responseHandler = require('../../response-handler');

describe('responseHandler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      headersSent: false,
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send response with payload only', () => {
    res.locals = { data: { id: 1, name: 'Paris' }, statusCode: 200 };

    responseHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { id: 1, name: 'Paris' },
    });
    expect(next).toHaveBeenCalled();
  });

  it('should send response with metadata and data', () => {
    res.locals = {
      data: {
        metadata: { total: 10 },
        data: [{ id: 1, name: 'Paris' }],
      },
      statusCode: 200,
    };

    responseHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      metadata: { total: 10 },
      data: [{ id: 1, name: 'Paris' }],
    });
    expect(next).toHaveBeenCalled();
  });

  it('should call next directly if headers are already sent', () => {
    res.headersSent = true;

    responseHandler(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
