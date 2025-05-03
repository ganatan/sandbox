
mon code

person-controller.js

export const getItems = (service) => (req, res) => {
  const items = service.getItems();
  res.json(items);
};


person-routes.js

import express from 'express';
import { getItems } from './person-controller.js';
import * as service from './person-service.js';

const router = express.Router();

router.get('/', getItems(service));

export default router;


person-service.js

const items = [
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

export const getItems = () => {
  return items;
};



je veux mainteant utiliser des class avec des constructors

et mettre tout ca en async await

qu'en penses tu
quelles sont les best practices
