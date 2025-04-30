import express from 'express';

import getItems from '../modules/person/controllers/person.controller.js';
import cityRoutes from '../modules/city/routes/city.routes.js';

const router = express.Router();

router.use('/persons', getItems);
router.use('/cities', cityRoutes);

export default router;
