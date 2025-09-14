import express from 'express';
import { ROUTES } from '../shared/constants/routes.constants.js';

const router = express.Router();

router.get('/', (req, res) => {
  const endpoints = {};

  Object.entries(ROUTES).forEach(([key, { path, methods }]) => {
    endpoints[key] = {
      url: path,
      methods: methods,
    };
  });

  res.json({
    version: '1.0.0',
    status: 'ok',
    timestamp: new Date().toISOString(),
    endpoints: endpoints,
  });
});

router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
    path: req.originalUrl,
    errorCode: 404,
    timestamp: new Date().toISOString(),
  });
});

export default router;
