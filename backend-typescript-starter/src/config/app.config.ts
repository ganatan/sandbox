import { env } from './env';

const appConfig = {
  app: {
    port: env.port,
    env: env.nodeEnv,
    name: env.name,
    version: env.version,
  },
  security: {
    corsOrigin: env.corsOrigin,
    helmet: {
      contentSecurityPolicy: false,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },
  logger: {
    level: env.logLevel,
  },
  monitoring: {
    metricsPath: '/metrics',
  },
} as const;

export default appConfig;
