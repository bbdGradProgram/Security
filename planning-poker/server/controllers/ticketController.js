const { createTicket, updateTicketReveal } = require('../data/ticketRepository');
const { handleErrors } = require('../middlewares/errorHandler');
const verifyToken  = require('../middlewares/auth-middleware.js');
const { rateLimit } = require("express-rate-limit");
const ticketLimiter = rateLimit({
  windowMs:  60 * 1000, // 1 minute
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (1 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});
const ticket2Limiter = rateLimit({
  windowMs:  30 * 1000, // 1 minute
  limit: 1, // each IP can make up to 10 requests per `windowsMs` (1 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

function ticketController(router) {

  router.post(
    '/create', verifyToken,ticketLimiter,
    handleErrors(async (req, res) => {
      const { ticketName, roomUuid } = req.body;
      const newTicket = await createTicket(ticketName, roomUuid);
      res.status(201).json(newTicket);
    })
  );

  router.post(
    '/update', verifyToken,ticket2Limiter,
    handleErrors(async (req, res) => {
      const { ticketId, revealed } = req.body;
      let ticketID = await updateTicketReveal(ticketId, revealed);
      res.status(201).json(ticketID);
    })
  );
}

module.exports = { ticketController };
