const express = require('express');
const { roomController } = require('../controllers/roomController');

const router = express.Router();
roomController(router);

module.exports = router;
