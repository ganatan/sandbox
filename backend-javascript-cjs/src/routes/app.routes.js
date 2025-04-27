'use strict';

const express = require('express');
const cityRoutes = require('../modules/city/city.routes');
const getPersons = require('../modules/person/person.controller.js');

const router = express.Router();

router.use('/persons', getPersons);
router.use('/cities', cityRoutes);

module.exports = router;
