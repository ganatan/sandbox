import express from 'express';

import getItems from '../modules/person/person.controller.js';
import cityRoutes from '../modules/city/city.routes.js';

const router = express.Router();

router.use('/persons', getItems);
router.use('/cities', cityRoutes);

export default router;
