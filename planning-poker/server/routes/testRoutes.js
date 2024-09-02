const express = require('express');
const verifyToken  = require('../middlewares/auth-middleware.js');

const testRoutes = express.Router();

testRoutes.get('/', function (req, res) {
    res.send("Health is good");
});

testRoutes.get('/protected', verifyToken, (req, res) => {
    console.log(req.user);
  res.send(`Hello ${req.upn}, your access token is valid!`);
});

module.exports = testRoutes;