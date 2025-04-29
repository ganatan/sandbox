'use strict';

module.exports = {
  testEnvironment: 'node', 
  testMatch: ['**/*.test.js'], 
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true, 
  coverageDirectory: 'coverage', 
  coverageReporters: ['text', 'lcov'],
  verbose: true, 
};
