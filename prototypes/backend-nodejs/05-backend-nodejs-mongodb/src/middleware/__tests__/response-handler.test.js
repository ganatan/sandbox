import responseHandler from '../response-handler.js';

describe('responseHandler', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    next = jest.fn();
  });

  test('returns an error response when an error is passed', () => {
    // Arrange
    const error = { status: 404, message: 'Not Found' };

    // Act
    responseHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });

  test('returns data with status 200 if res.locals.data is set', () => {
    // Arrange
    res.locals.data = { name: 'Test' };

    // Act
    responseHandler(null, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'Test' });
  });

  test('respects the existing statusCode if valid', () => {
    // Arrange
    res.locals.data = { name: 'Test' };
    res.statusCode = 201;

    // Act
    responseHandler(null, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ name: 'Test' });
  });

  test('defaults to status 200 if res.statusCode is invalid', () => {
    // Arrange
    res.locals.data = { name: 'Test' };
    res.statusCode = 999;

    // Act
    responseHandler(null, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'Test' });
  });

  test('calls next() if no error and no data', () => {
    // Arrange

    // Act
    responseHandler(null, req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
  });
});
