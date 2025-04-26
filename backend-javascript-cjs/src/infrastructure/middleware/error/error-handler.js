'use strict';

function errorHandler(err, req, res, next) {
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.errors.map((item) => ({
        path: item.path.join('.'),
        message: item.message,
      })),
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
  });
}

module.exports = errorHandler;
