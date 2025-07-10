error-handler.js

'use strict';

function errorHandler(err, req, res, next) {
  // Cas d'une erreur de validation Zod
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Cas d'une erreur classique ou inconnue
  console.error('Unhandled Error:', err);

  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
  });
}

module.exports = errorHandler;


app.js


'use strict';

const express = require('express');

const configureSecurity = require('./infrastructure/middleware/security/security.js');
const errorHandler = require('./infrastructure/middleware/error/error-handler.js');

const swaggerRoutes = require('./infrastructure/swagger/swagger.routes');

const appRoutes = require('./routers/app.routes.js');
const rootRoutes = require('./routers/root.routes.js');

const app = express();

configureSecurity(app);

app.use('/api-docs', swaggerRoutes);

app.use(appRoutes);
app.use(rootRoutes);

app.use(errorHandler);

module.exports = app;
