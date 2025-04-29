'use strict';

describe('env config', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  test('should load .env.development when NODE_ENV is undefined', () => {
    delete process.env.NODE_ENV;
    const env = require('../../env');
    expect(env.nodeEnv).toBe('development');
  });

  test('should load .env.production when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    const env = require('../../env');
    expect(env.nodeEnv).toBe('production');
  });

  test('should load .env.test when NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    const env = require('../../env');
    expect(env.nodeEnv).toBe('test');
  });

  test('should use environment variables for port, corsOrigin and logLevel', () => {
    process.env.PORT = '8888';
    process.env.CORS_ORIGIN = 'https://example.com';
    process.env.LOG_LEVEL = 'debug';
    jest.resetModules();
    const env = require('../../env');

    expect(env.port).toBe('8888');
    expect(env.corsOrigin).toBe('https://example.com');
    expect(env.logLevel).toBe('debug');
  });
});
