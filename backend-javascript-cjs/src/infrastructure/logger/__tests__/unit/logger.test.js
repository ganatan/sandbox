'use strict';

const path = require('path');

describe('Logger', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('creates logger without console transport in production', () => {
    // Arrange
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'info';
    const logger = require('../../logger');

    // Act
    const hasConsole = logger.transports.some(
      (t) => t.constructor.name === 'Console'
    );

    // Assert
    expect(hasConsole).toBe(false);
  });

  it('creates logger with console transport in development', () => {
    // Arrange
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'debug';
    const logger = require('../../logger');

    // Act
    const hasConsole = logger.transports.some(
      (t) => t.constructor.name === 'Console'
    );

    // Assert
    expect(hasConsole).toBe(true);
  });
});


// 'use strict';

// const logger = require('../../logger');
// const { Writable } = require('stream');

// describe('Logger', () => {
//   it('should create a Winston logger instance', () => {
//     expect(logger).toHaveProperty('info');
//     expect(logger).toHaveProperty('error');
//     expect(logger).toHaveProperty('warn');
//     expect(typeof logger.info).toBe('function');
//   });

//   it('should log info messages without crashing', () => {
//     const writableStream = new Writable({
//       write(chunk, encoding, callback) {
//         callback();
//       },
//     });

//     const oldTransports = logger.transports.slice();
//     logger.clear();
//     logger.add(new (require('winston').transports.Stream)({ stream: writableStream }));

//     expect(() => logger.info('Test info log')).not.toThrow();

//     // Restore original transports
//     logger.clear();
//     oldTransports.forEach((transport) => logger.add(transport));
//   });
// });
