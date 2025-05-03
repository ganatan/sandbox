j'ai ce code

Structure of src:
|-- app.js
|-- config
  |-- config.js
|-- features
  |-- city
    |-- city-controller.js
    |-- city-repository.js
    |-- city-routes.js
    |-- city-service.js
  |-- person
    |-- person-controller.js
    |-- person-repository.js
    |-- person-routes.js
    |-- person-service.js
|-- features-routes.js
|-- index-routes.js
|-- middleware
  |-- response-handler.js
|-- server.js

Structure of __tests__:
|-- app.test.js
|-- server.test.js

Structure of tools:
|-- scripts
  |-- generate-structure.js



app.js

import express from 'express';
import featuresRoutes from './features-routes.js';
import indexRoutes from './index-routes.js';

const app = express();

app.use(express.json());

app.use(featuresRoutes);

app.use('/', indexRoutes);
app.use('*', indexRoutes);

export default app;


features-route.js

import express from 'express';

import personRoute from './features/person/person-routes.js';
import cityRoute from './features/city/city-routes.js';

const router = express.Router();

router.use('/persons', personRoute);
router.use('/cities', cityRoute);

export default router;



person-route.js

import express from 'express';

import responseHandler from '../../middleware/response-handler.js';

import PersonRepository from './person-repository.js';
import PersonService from './person-service.js';
import PersonController from './person-controller.js';

const router = express.Router();

const repository = new PersonRepository();
const service = new PersonService(repository);
const controller = new PersonController(service);

router.get('/', controller.getItems, responseHandler);
router.get('/:id', controller.getItemById, responseHandler);
router.post('/', controller.createItem, responseHandler);
router.put('/:id', controller.updateItem, responseHandler);
router.delete('/:id', controller.deleteItem, responseHandler);

export default router;


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
      if (!item) {
        return next({ status: 404, message: 'Person not found' });
      }
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
      if (!updatedItem) {
        return next({ status: 404, message: 'Person not found' });
      }
      res.locals.data = updatedItem;

      return next();
    } catch (error) {

      return next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const deletedItem = await this.service.deleteItem(parseInt(req.params.id));
      if (!deletedItem) {
        return next({ status: 404, message: 'Person not found' });
      }
      res.locals.data = deletedItem;

      return next();
    } catch (error) {

      return next(error);
    }
  }
}

export default PersonController;


person-service.js
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
    return Promise.resolve(this.items);
  }

  async getItemById(id) {
    return Promise.resolve(this.items.find((item) => item.id === id) || null);
  }

  async createItem(person) {
    const newPerson = { id: this.items.length + 1, ...person };
    this.items.push(newPerson);

    return Promise.resolve(newPerson);
  }

  async updateItem(id, updatedData) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.items[index] = { ...this.items[index], ...updatedData };

    return Promise.resolve(this.items[index]);
  }

  async deleteItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.items.splice(index, 1)[0]);
  }
}

export default PersonRepository;


adapte donc mon donc avec ce code


    import express from 'express';
    import { Sequelize, DataTypes } from 'sequelize';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();

    const { PORT, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

    let url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    const sequelize = new Sequelize(url);

    const Person = sequelize.define('Person', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'person', timestamps: false });

    app.get('/persons', async (req, res) => {
      try {
        const persons = await Person.findAll({ attributes: ['id', 'name'] });
        res.json(persons);
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
    });

    const start = async () => {
      try {
        await sequelize.authenticate();
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
      } catch (error) {
        console.error('Database connection failed', error);
      }
    };

    start();
