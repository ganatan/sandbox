const config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true,
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/__tests__/**',
    '!src/**/mocks/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary'],
};

export default config;



// const config = {
//   coverageProvider: 'v8',
// };

// export default config;


// export default {
//   testEnvironment: 'node',
//   testMatch: ['**/*.test.js'],
//   moduleFileExtensions: ['js', 'json'],
//   clearMocks: true,
//   verbose: true,
//   collectCoverage: false,
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx}',
//     '!src/**/__tests__/**',
//     '!src/**/mocks/**',
//     '!**/node_modules/**',
//     '!**/vendor/**',
//   ],
//   coverageDirectory: 'coverage',
//   coverageReporters: ['text', 'lcov', 'json-summary'],
//   transform: {},
//   extensionsToTreatAsEsm: ['.js'],
// };



// const config = {
//   transform: {},
//   moduleNameMapper: {},
//   testEnvironment: 'node',
//   coverageProvider: 'v8',
// };

// export default config;

// const config = {
//   coverageProvider: 'v8',
// };

// export default config;
