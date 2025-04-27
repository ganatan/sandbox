'use strict';

const express = require('express');
const controller = require('../controllers/city.controller');

const router = express.Router();

router.get('/', controller.getItems.bind(controller));
router.post('/', controller.createItem.bind(controller));

module.exports = router;
