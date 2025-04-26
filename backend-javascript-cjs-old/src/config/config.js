'use strict';

module.exports = {
  app: {
    port: 3000
  }
};


// 'use strict';

// require('dotenv').config();

// const config = {
//   app: {
//     port: process.env.PORT || 3000,
//     env: process.env.NODE_ENV || 'development',
//   },
//   security: {
//     corsOrigin: process.env.CORS_ORIGIN || '*',
//     helmet: {
//       contentSecurityPolicy: false,
//     },
//     rateLimit: {
//       windowMs: 15 * 60 * 1000,
//       max: 100,
//     },
//   },
//   logger: {
//     level: process.env.LOG_LEVEL || 'info',
//   },
//   monitoring: {
//     metricsPath: '/metrics',
//   },
// };

// module.exports = config;
