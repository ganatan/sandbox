import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve(__dirname, '../../');
const distPath = resolve(projectRoot, 'dist');
const versionFilePath = resolve(distPath, 'version.json');

if (!existsSync(distPath)) {
  mkdirSync(distPath, { recursive: true });
}

const pkg = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf-8'));

const version = pkg.version || '0.0.0';
let commit = 'unknown';

try {
  commit = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  console.warn('⚠️ Impossible de récupérer le hash Git.');
}

const env = process.env.NODE_ENV || 'development';

const versionInfo = {
  version: version,
  commit: commit,
  buildTime: new Date().toISOString(),
  env: env,
};

writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2), 'utf-8');
console.log('✅ version.json écrit dans dist/:', versionInfo);
