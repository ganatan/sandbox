class PersonService {
  constructor(repository) {
    this.repository = repository;
  }

  async getItems() {
    return await this.repository.getItems();
  }

  async getItemById(id) {
    return await this.repository.getItemById(id);
  }

  async createItem(person) {
    return await this.repository.createItem(person);
  }

  async updateItem(id, updatedData) {
    return await this.repository.updateItem(id, updatedData);
  }

  async deleteItem(id) {
    return await this.repository.deleteItem(id);
  }
}

export default PersonService;
