'use strict';

const { readFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');

const env = process.env.NODE_ENV || 'development';

let versionInfo = {
  version: 'unknown',
  commit: 'unknown',
  buildTime: 'unknown',
  env: env,
};

if (env === 'production') {
  try {
    const versionPath = resolve(__dirname, 'version.json');
    versionInfo = JSON.parse(readFileSync(versionPath, 'utf-8'));
  } catch {
    console.error('❌ version.json introuvable en production.');
  }
} else {
  try {
    const pkg = JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf-8'));
    const commit = execSync('git rev-parse --short HEAD').toString().trim();

    versionInfo = {
      version: pkg.version || '0.0.0',
      commit: commit,
      buildTime: new Date().toISOString(),
      env: env,
    };
  } catch {
    console.error('❌ Impossible de lire la version en développement.');
  }
}

module.exports = { versionInfo };
