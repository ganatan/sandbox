j'ai ce code item.service.js

import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { ITEM_CONSTANTS } from './item.constant.js';
import { validateItem } from './item.schema.js';

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async getItems(query) {
    return await this.repository.getItems(query);
  }

  async getItemById(id) {
    const item = await this.repository.getItemById(id);

    if (!item) {
      const error = new Error(ITEM_CONSTANTS.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return item;
  }

  async createItem(data) {
    try {
      validateItem(data);
    } catch (error) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    const exists = await this.repository.existsByName(data.name);
    if (exists) {
      const error = new Error(ITEM_CONSTANTS.ALREADY_EXISTS);
      error.status = HTTP_STATUS.CONFLICT;
      throw error;
    }

    return await this.repository.createItem(data);
  }

  async updateItem(id, data) {
    try {
      validateItem(data);
    } catch (error) {
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    return await this.repository.updateItem(id, data);
  }

  async deleteItem(id) {
    return await this.repository.deleteItem(id);
  }
}

export default Service;



item.controller.js
import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { ITEM_CONSTANTS } from './item.constant.js';

class Controller {
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
      const result = await this.service.getItems(req.query);

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {

      return next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const result = await this.service.getItemById(parseInt(req.params.id));
      if (!result) {
        return next({ status: HTTP_STATUS.NOT_FOUND, message: ITEM_CONSTANTS.ITEM_NOT_FOUND });
      }

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {

      return next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      const result = await this.service.createItem(req.body);

      return res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {

      return next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const result = await this.service.updateItem(parseInt(req.params.id), req.body);
      if (!result) {
        return next({ status: HTTP_STATUS.NOT_FOUND, message: ITEM_CONSTANTS.ITEM_NOT_FOUND });
      }

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {

      return next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const result = await this.service.deleteItem(parseInt(req.params.id));
      if (!result) {
        return next({ status: HTTP_STATUS.NOT_FOUND, message: ITEM_CONSTANTS.ITEM_NOT_FOUND });
      }

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {

      return next(error);
    }
  }
}

export default Controller;


et item.router.js
import express from 'express';

import responseHandler from '../../infrastructure/logger/response-handler.js';

import Repository from './item.repository.js';
import Service from './item.service.js';
import Controller from './item.controller.js';

import config from '../../core/config/config.js';

const router = express.Router();

const repository = new Repository(config.useDatabase);
const service = new Service(repository);
const controller = new Controller(service);

router.get('/', controller.getItems, responseHandler);
router.get('/:id', controller.getItemById, responseHandler);
router.post('/', controller.createItem, responseHandler);
router.put('/:id', controller.updateItem, responseHandler);
router.delete('/:id', controller.deleteItem, responseHandler);

export default router;




apparemment Le Service ne doit pas faire de validation ou gérer du HTTP directement


qu'en penses tu 
quelles sont les best practices