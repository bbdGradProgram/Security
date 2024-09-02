const express = require('express');
const { ticketController } = require('../controllers/ticketController');

const router = express.Router();
ticketController(router);

module.exports = router;
