import express from 'express';
import controller from '../controllers/city.controller';

const router = express.Router();

router.get('/', controller.getItems.bind(controller));
router.post('/', controller.createItem.bind(controller));

export default router;
