import path from 'path';
import dotenv from 'dotenv';

const nodeEnv: string = process.env.NODE_ENV || 'development';

let envFile = '.env.development';

if (nodeEnv === 'production') {
  envFile = '.env.production';
} else if (nodeEnv === 'test') {
  envFile = '.env.test';
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const env = {
  nodeEnv,
  name: process.env.APP_NAME as string,
  version: process.env.APP_VERSION as string,
  port: parseInt(process.env.PORT || '7777', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info',
};



// import path from 'path';
// import dotenv from 'dotenv';

// const nodeEnv = process.env.NODE_ENV || 'development';

// let envFile = '.env.development';
// if (nodeEnv === 'production') {
//   envFile = '.env.production';
// } else if (nodeEnv === 'test') {
//   envFile = '.env.test';
// }
// dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// interface EnvConfig {
//   nodeEnv: string;
//   port: number;
//   corsOrigin: string;
//   logLevel: string;
// }

// export const env: EnvConfig = {
//   nodeEnv: nodeEnv,
//   port: Number(process.env.PORT) || 7777,
//   corsOrigin: process.env.CORS_ORIGIN || '*',
//   logLevel: process.env.LOG_LEVEL || 'info',
// };
