voila mon code


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
  }

export default PersonController;


person-service.js

    class PersonService {
      constructor(repository) {
        this.repository = repository;
      }

      async getItems() {
        return this.repository.getItems();
      }
    }

    export default PersonService;



person-route.js

    import express from 'express';
    import PersonController from './person-controller.js';
    import PersonService from './person-service.js';
    import PersonRepository from './person-repository.js';

    const router = express.Router();

    const repository = new PersonRepository();
    const service = new PersonService(repository);
    const controller = new PersonController(service);

    router.get('/', controller.getItems);

    export default router;



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
        try {
          return await new Promise((resolve) => {
            setTimeout(() => resolve(this.items), 100);
          });
        } catch (error) {
          console.error(`Error fetching persons: ${error.message}`);
          return [];
        }
      }
    }

    export default PersonRepository;


je veux rajouter un factory

c'est quoi le pattern
quel est l'interet 
quelles sont les best practices