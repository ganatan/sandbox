person-controller.js
    class PersonController {
      constructor(service) {
        this.service = service;
      }

      getItems = async (req, res) => {
        try {
          const items = await this.service.getItems();
          res.json(items);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

      getItemById = async (req, res) => {
        try {
          const item = await this.service.getItemById(parseInt(req.params.id));
          if (!item) return res.status(404).json({ error: 'Person not found' });
          res.json(item);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

      createItem = async (req, res) => {
        try {
          const newItem = await this.service.createItem(req.body);
          res.status(201).json(newItem);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

      updateItem = async (req, res) => {
        try {
          const updatedItem = await this.service.updateItem(parseInt(req.params.id), req.body);
          if (!updatedItem) return res.status(404).json({ error: 'Person not found' });
          res.json(updatedItem);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

      deleteItem = async (req, res) => {
        try {
          const deletedItem = await this.service.deleteItem(parseInt(req.params.id));
          if (!deletedItem) return res.status(404).json({ error: 'Person not found' });
          res.json(deletedItem);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
    }

    export default PersonController;

person-repository.js
    class PersonRepository {
      constructor() {
        this.items = [
          { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
          { id: 2, name: 'Martin Scorsese', city: 'New York' },
          { id: 3, name: 'Quentin Tarantino', city: 'Knoxville' },
          { id: 4, name: 'Christopher Nolan', city: 'London' },
          { id: 5, name: 'Francis Ford Coppola', city: 'Detroit' },
          { id: 6, name: 'James Cameron', city: 'Kapuskasing' },
          { id: 7, name: 'David Fincher', city: 'Denver' },
          { id: 8, name: 'Tim Burton', city: 'Burbank' },
          { id: 9, name: 'Clint Eastwood', city: 'San Francisco' },
          { id: 10, name: 'Wes Anderson', city: 'Houston' },
          { id: 11, name: 'Spike Lee', city: 'Atlanta' },
          { id: 12, name: 'George Lucas', city: 'Modesto' },
        ];
      }

      async getItems() {
        return this.items;
      }

      async getItemById(id) {
        return this.items.find((item) => item.id === id) || null;
      }

      async createItem(person) {
        const newPerson = { id: this.items.length + 1, ...person };
        this.items.push(newPerson);
        return newPerson;
      }

      async updateItem(id, updatedData) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) return null;
        this.items[index] = { ...this.items[index], ...updatedData };
        return this.items[index];
      }

      async deleteItem(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) return null;
        return this.items.splice(index, 1)[0];
      }
    }

    export default PersonRepository;


person-service.js
    class PersonService {
      constructor(repository) {
        this.repository = repository;
      }

      async getItems() {
        return this.repository.getItems();
      }

      async getItemById(id) {
        return this.repository.getItemById(id);
      }

      async createItem(person) {
        return this.repository.createItem(person);
      }

      async updateItem(id, updatedData) {
        return this.repository.updateItem(id, updatedData);
      }

      async deleteItem(id) {
        return this.repository.deleteItem(id);
      }
    }

    export default PersonService;


person-routes.js
    import express from 'express';
    import PersonController from './person-controller.js';
    import PersonService from './person-service.js';
    import PersonRepository from './person-repository.js';

    const router = express.Router();
    const repository = new PersonRepository();
    const service = new PersonService(repository);
    const controller = new PersonController(service);

    router.get('/', controller.getItems);
    router.get('/:id', controller.getItemById);
    router.post('/', controller.createItem);
    router.put('/:id', controller.updateItem);
    router.delete('/:id', controller.deleteItem);

    export default router;
