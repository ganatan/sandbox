class CityController {
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
      const data = await this.service.getItems(req.query);

      return res.status(200).json(data);
    } catch (error) {

      return next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const item = await this.service.getItemById(parseInt(req.params.id));
      if (!item) {
        return next({ status: 404, message: 'City not found' });
      }

      return res.status(200).json(item);
    } catch (error) {

      return next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      const newItem = await this.service.createItem(req.body);

      return res.status(201).json(newItem);
    } catch (error) {

      return next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const updatedItem = await this.service.updateItem(parseInt(req.params.id), req.body);
      if (!updatedItem) {
        return next({ status: 404, message: 'City not found' });
      }

      return res.status(200).json(updatedItem);
    } catch (error) {

      return next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const deletedItem = await this.service.deleteItem(parseInt(req.params.id));
      if (!deletedItem) {
        return next({ status: 404, message: 'City not found' });
      }

      return res.status(200).json(deletedItem);
    } catch (error) {

      return next(error);
    }
  }
}

export default CityController;
