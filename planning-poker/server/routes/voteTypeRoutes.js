const express = require('express');
const { voteTypeController } = require('../controllers/voteTypeController');

const router = express.Router();
voteTypeController(router);

module.exports = router;
