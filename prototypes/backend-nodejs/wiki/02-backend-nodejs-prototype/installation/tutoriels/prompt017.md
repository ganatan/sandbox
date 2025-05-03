person-controller.js

  export const getPersons = (personService) => (req, res) => {
    const persons = personService.getAllPersons();
    res.json(persons);
  };


person-routes.js  

  import express from 'express';
  import { getPersons } from './person-controller.js';
  import * as personService from './person-service.js';

  const router = express.Router();

  router.get('/', getPersons(personService));

  export default router;
