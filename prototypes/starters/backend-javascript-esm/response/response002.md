
npm install swagger-ui-express swagger-jsdoc


swagger.config.js

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation de l’API générée automatiquement par Swagger'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Serveur local'
        }
      ]
    },
    apis: ['src/modules/**/*.js', 'src/routers/**/*.js']
  }
  


  swagger.routes.js

  import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './swagger.config.js'

const router = Router()
const specs = swaggerJSDoc(swaggerOptions)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export default router
