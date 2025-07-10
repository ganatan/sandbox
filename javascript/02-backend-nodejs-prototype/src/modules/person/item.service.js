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
