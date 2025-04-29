import { env } from './env.js';

const serverUrl = `http://localhost:${env.port}`;

export const swaggerOptions = {
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
  apis: ['./src/modules/**/*.swagger.js'],
};

// export const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Documentation',
//       version: '1.0.0',
//       description: 'Documentation de l’API générée automatiquement par Swagger',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Serveur local',
//       },
//     ],
//   },
//   apis: ['src/modules/**/*.js', 'src/routes/**/*.js'],
// };
