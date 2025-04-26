'use strict';

const logger = require('../../logger');
const { Writable } = require('stream');

describe('Logger', () => {
  it('should create a Winston logger instance', () => {
    expect(logger).toHaveProperty('info');
    expect(logger).toHaveProperty('error');
    expect(logger).toHaveProperty('warn');
    expect(typeof logger.info).toBe('function');
  });

  it('should log info messages without crashing', () => {
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        callback();
      },
    });

    const oldTransports = logger.transports.slice();
    logger.clear();
    logger.add(new (require('winston').transports.Stream)({ stream: writableStream }));

    expect(() => logger.info('Test info log')).not.toThrow();

    // Restore original transports
    logger.clear();
    oldTransports.forEach((transport) => logger.add(transport));
  });
});
