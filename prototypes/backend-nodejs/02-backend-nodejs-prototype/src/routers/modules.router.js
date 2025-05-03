import express from 'express';

import cityRouter from '../modules/city/item.router.js';
import personRouter from '../modules/person/item.router.js';
import professionRouter from '../modules/profession/item.router.js';

const router = express.Router();

router.use('/cities', cityRouter);
router.use('/persons', personRouter);
router.use('/professions', professionRouter);

export default router;

