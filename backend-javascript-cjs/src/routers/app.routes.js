'use strict';

const express = require('express');
const getPersons = require('../modules/person/person.controller.js');
const getCities = require('../modules/city/city.controller.js');

const router = express.Router();

router.use('/persons', getPersons);
router.use('/cities', getCities);

module.exports = router;
