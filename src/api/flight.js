const express = require('express');

const router = express.Router();
const controller = require('../controllers/flight.controller')

router.get('/', controller.getFlights);

module.exports = router;
