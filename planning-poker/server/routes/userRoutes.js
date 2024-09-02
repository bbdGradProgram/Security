const express = require('express');
const { userController } = require('../controllers/userController');

const router = express.Router();
userController(router);

module.exports = router;
