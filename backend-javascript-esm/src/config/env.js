import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeEnv = process.env.NODE_ENV || 'development';

let envFile = '.env.development';

if (nodeEnv === 'production') {
  envFile = '.env.production';
} else if (nodeEnv === 'test') {
  envFile = '.env.test';
}

dotenv.config({ path: path.resolve(__dirname, '..', '..', envFile) });

export const env = {
  nodeEnv,
  port: process.env.PORT || 7777,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info',
};


// import path from 'path';
// import dotenv from 'dotenv';

// const nodeEnv = process.env.NODE_ENV || 'development';
// const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// export const env = {
//   nodeEnv: nodeEnv,
//   port: process.env.PORT || 7777,
//   corsOrigin: process.env.CORS_ORIGIN || '*',
//   logLevel: process.env.LOG_LEVEL || 'info',
// };
