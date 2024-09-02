const { getAllVoteTypes } = require('../data/voteTypeRepository');
const { handleErrors } = require('../middlewares/errorHandler');
const verifyToken  = require('../middlewares/auth-middleware.js');
const { rateLimit } = require("express-rate-limit");

const Limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minutes
  limit: 10, // each IP can make up to 1 requests per `windowsMs` (1 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

function voteTypeController(router) {
  router.get(
    '/', verifyToken,Limiter,
    handleErrors(async (req, res) => {
      const voteTypes = await getAllVoteTypes();
      res.send(voteTypes);
    })
  );
}

module.exports = { voteTypeController };
