import express from 'express';
import controller from './city.controller.js';

import permissionHandler from '../../middlewares/security/permission-handler.js';

const router = express.Router();

const admin = permissionHandler(['admin']);
const editor = permissionHandler(['admin', 'editor']);

router.get('/', controller.getItems.bind(controller));
router.get('/authorized', editor, controller.getItems.bind(controller));
router.get('/denied', admin, controller.getItems.bind(controller));
router.post('/', controller.createItem.bind(controller));

export default router;
