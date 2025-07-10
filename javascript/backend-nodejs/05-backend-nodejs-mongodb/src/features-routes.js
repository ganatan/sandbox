import express from 'express';

import personRoute from './features/person/person-routes.js';
import cityRoute from './features/city/city-routes.js';

const router = express.Router();

router.use('/persons', personRoute);
router.use('/cities', cityRoute);

export default router;

