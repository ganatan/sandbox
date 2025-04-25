'use strict';

const express = require('express');
const cityController = require('./city.controller');

const router = express.Router();

router.get('/', cityController.getCities.bind(cityController));
router.post('/', cityController.createCity.bind(cityController));

module.exports = router;
