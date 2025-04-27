'use strict';

const express = require('express');
const cityRoutes = require('../modules/city/routes/city.routes');
const getPersons = require('../modules/person/controllers/person.controller.js');

const router = express.Router();

router.use('/persons', getPersons);
router.use('/cities', cityRoutes);

module.exports = router;
