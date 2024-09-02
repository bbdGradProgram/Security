const express = require('express');
const { voteController } = require('../controllers/voteController');

const router = express.Router();
voteController(router);

module.exports = router;
