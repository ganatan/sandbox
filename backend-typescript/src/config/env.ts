import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

interface EnvConfig {
  nodeEnv: string;
  port: number;
  corsOrigin: string;
  logLevel: string;
}

export const env: EnvConfig = {
  nodeEnv: nodeEnv,
  port: Number(process.env.PORT) || 7777,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info',
};
