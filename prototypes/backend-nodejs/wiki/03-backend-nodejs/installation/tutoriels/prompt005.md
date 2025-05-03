person-routes.js

  import express from 'express';
  import PersonController from './person-controller.js';
  import PersonService from './person-service.js';
  import PersonRepository from './person-repository.js';

  const router = express.Router();
  const repository = new PersonRepository(true);
  const service = new PersonService(repository);
  const controller = new PersonController(service);

  router.get('/', controller.getItems);
  router.get('/:id', controller.getItemById);
  router.post('/', controller.createItem);
  router.put('/:id', controller.updateItem);
  router.delete('/:id', controller.deleteItem);

  export default router;
