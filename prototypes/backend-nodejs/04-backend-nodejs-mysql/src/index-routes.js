import express from 'express';

const router = express.Router();

const index = [
  'persons',
  'cities',
];

router.get('/', (req, res) => {
  res.json(index);
});

router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
    url: req.originalUrl,
    errorCode: 404,
    timestamp: new Date().toISOString(),
  });
});

export default router;
