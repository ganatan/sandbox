'use strict';

const express = require('express');
const cityRoutes = require('../modules/city/city.routes');

const router = express.Router();

router.get('/cities', (req, res) => {
    const result = {
      success: true,
      data: {
        version: '1.0.0',
        status: 'ok',
        app: 'get-cities',
      },
    };
    res.send(result);
  });

//router.use('/cities', cityRoutes);

module.exports = router;
