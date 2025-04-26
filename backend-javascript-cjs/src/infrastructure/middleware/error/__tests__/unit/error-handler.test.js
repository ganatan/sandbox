'use strict';

const errorHandler = require('../../error-handler');

describe('errorHandler middleware', () => {
  let req;
  let res;
  let next;
  let consoleErrorSpy;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should handle ZodError and return 400 with error details', () => {
    // Arrange
    const error = {
      name: 'ZodError',
      errors: [
        {
          path: ['name'],
          message: 'Le nom est requis',
        },
      ],
    };

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      errors: [
        {
          path: 'name',
          message: 'Le nom est requis',
        },
      ],
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle unknown errors and return 500', () => {
    // Arrange
    const error = new Error('Something went wrong');

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Erreur interne du serveur',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unhandled Error:', error);
  });
});
