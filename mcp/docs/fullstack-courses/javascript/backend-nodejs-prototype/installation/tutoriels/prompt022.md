person-controller.js

  class PersonController {
    constructor(service) {
      this.service = service;

      this.getItems = this.getItems.bind(this);
      this.getItemById = this.getItemById.bind(this);
      this.createItem = this.createItem.bind(this);
      this.updateItem = this.updateItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);    
    }

    async getItems(req, res, next) {
      try {
        res.locals.data = await this.service.getItems(req.query);
        return next();
      } catch (error) {
        return next(error);
      }
    }

    async getItemById(req, res, next) {
      try {
        const item = await this.service.getItemById(parseInt(req.params.id));
        if (!item) return next({ status: 404, message: 'Person not found' });

        res.locals.data = item;
        return next();
      } catch (error) {
        return next(error);
      }
    }

    async createItem(req, res, next) {
      try {
        res.locals.data = await this.service.createItem(req.body);
        res.status(201);
        return next();
      } catch (error) {
        return next(error);
      }
    }

    async updateItem(req, res, next) {
      try {
        const updatedItem = await this.service.updateItem(parseInt(req.params.id), req.body);
        if (!updatedItem) return next({ status: 404, message: 'Person not found' });

        res.locals.data = updatedItem;
        return next();
      } catch (error) {
        return next(error);
      }
    }

    async deleteItem(req, res, next) {
      try {
        const deletedItem = await this.service.deleteItem(parseInt(req.params.id));
        if (!deletedItem) return next({ status: 404, message: 'Person not found' });

        res.locals.data = deletedItem;
        return next();
      } catch (error) {
        return next(error);
      }
    }
  }

  export default PersonController;



person-routes.js

  import express from 'express';

  import handleResponse from '../../infrastructure/logger/response-handler.js';

  import PersonRepository from './person-repository.js';
  import PersonService from './person-service.js';
  import PersonController from './person-controller.js';

  const router = express.Router();

  const repository = new PersonRepository();
  const service = new PersonService(repository);
  const controller = new PersonController(service);

  router.get('/', controller.getItems, handleResponse);
  router.get('/:id', controller.getItemById, handleResponse);
  router.post('/', controller.createItem, handleResponse);
  router.put('/:id', controller.updateItem, handleResponse);
  router.delete('/:id', controller.deleteItem, handleResponse);

  export default router;

response-handler.js

  const handleResponse = (req, res) => {
    if (res.locals.data) {
      return res.status(res.statusCode || 200).json(res.locals.data);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  };

  export default handleResponse;
