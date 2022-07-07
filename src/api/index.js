const express = require('express');

const flight = require('./flight');

const router = express.Router();

router.use('/flight', flight);

module.exports = router;
