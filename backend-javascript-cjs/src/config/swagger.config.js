'use strict';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express-Pro API',
      version: '1.0.0',
      description: 'Documentation API pour Express-Pro Project',
    },
    servers: [
      {
        url: 'http://localhost:7777/api',
        description: 'Serveur de développement',
      },
    ],
  },
  apis: ['./src/modules/**/*.swagger.js'],
};

module.exports = swaggerOptions;
