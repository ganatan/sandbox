# prompt 1

person-controller.js

const persons = [
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

export const getPersons = (req, res) => {
  res.json(persons);
};



person-routes.md

import express from 'express';
import { getPersons } from './person-controller.js';

const router = express.Router();

router.get('/', getPersons);

export default router;


# prompt 2


person-service.js

const persons = [
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

export const getAllPersons = () => {
  return persons;
};


person-controller.js

import { getAllPersons } from './person-service.js';

export const getPersons = (req, res) => {
  const persons = getAllPersons();
  res.json(persons);
};

