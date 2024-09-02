const path = require("path");
require("dotenv").config({
    override: true,
    path: path.join(__dirname, ".env"),
  });
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const debug_mode = process.env.DEBUG === 'debug';

function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (debug_mode) {
    req.upn = "developer";
    return next();
  }

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  try {
    const jwksClient = jwksRsa({
      cache: true,
      rateLimit: true,
      jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USERPOOLID}/.well-known/jwks.json` // Replace with User Pool ID
    });

    function getKey(header, callback) {
      jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
          callback(err);
        } else {
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        }
      });
    }

    jwt.verify(token, getKey, {
      audience: process.env.CLIENTID, // Replace with Cognito App Client ID
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USERPOOLID}`, // Replace with User Pool ID
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send('Access token is invalid');
      }
      req.user = decoded;
      req.upn = req.user.email;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error when verifying token' });
  }
};

module.exports = verifyToken;