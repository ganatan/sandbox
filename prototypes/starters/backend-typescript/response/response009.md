# response 1

npm install swagger-jsdoc swagger-ui-express
npm install --save-dev @types/swagger-ui-express
npm install --save-dev @types/swagger-jsdoc



swagger.config.ts

import { env } from './env';

const serverUrl = `http://localhost:${env.port}`;

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
        url: serverUrl,
        description: 'Serveur de développement',
      },
    ],
  },
  apis: ['./src/modules/**/*.swagger.ts'],
};

export default swaggerOptions;



swagger.routes.ts

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../../config/swagger.config';

const router = Router();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'Documentation API',
  }),
);

export default router;
