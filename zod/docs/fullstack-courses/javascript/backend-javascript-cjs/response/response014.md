# response 1
rajouter jest.config.js

Etape 1

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




ne test que les fichier sutilises dans le code

'use strict';

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true,
  verbose: true,

  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/__tests__/**',
    '!src/**/mocks/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],

  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};


# reponse 2

'use strict';

const { execSync } = require('child_process');

const coverageThresholds = {
  branches: 80,
  functions: 80,
  lines: 90,
  statements: 90,
};

const coverageThresholdArg = JSON.stringify({ global: coverageThresholds }).replace(/"/g, '\\"');

try {
  execSync(`npx jest --coverage --coverageThreshold="${coverageThresholdArg}"`, {
    stdio: 'inherit',
  });

  console.log('\n✅ Coverage thresholds validated successfully.');
} catch (error) {
  console.error('\n❌ Coverage thresholds not met.');
  process.exit(1);
}

# response 3

generate-coverage-badge.js
generate-project-structure.js



    "coverage": "cross-env NODE_ENV=test jest --coverage",
    "coverage:check": "node tools/scripts/coverage-check.js",
    "coverage:badge": "node tools/scripts/generate-coverage-badge.js",
    "coverage:full": "npm run test:coverage && npm run coverage:badge",



jest.config.js

'use strict';

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
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
