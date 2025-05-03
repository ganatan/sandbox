import express from 'express';

import responseHandler from '../../middleware/response-handler.js';

import CityRepository from './city-repository.js';
import CityService from './city-service.js';
import CityController from './city-controller.js';

const router = express.Router();

const repository = new CityRepository(true);
const service = new CityService(repository);
const controller = new CityController(service);

router.get('/', controller.getItems, responseHandler);
router.get('/:id', controller.getItemById, responseHandler);
router.post('/', controller.createItem, responseHandler);
router.put('/:id', controller.updateItem, responseHandler);
router.delete('/:id', controller.deleteItem, responseHandler);

export default router;
