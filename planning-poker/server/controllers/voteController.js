const { getVotesByTicketId, createVote, isUserInRoom, isTicketNotRevealed } = require('../data/voteRepository');
const { handleErrors } = require('../middlewares/errorHandler');
const verifyToken  = require('../middlewares/auth-middleware.js');

function voteController(router) {

  router.get(
    '/ticket/:ticketId', verifyToken,
    handleErrors(async (req, res) => {
      const ticketId = req.params.ticketId;
      const votes = await getVotesByTicketId(ticketId);
      res.send(votes);
    })
  );

  router.post(
    '/create', verifyToken,
    handleErrors(async (req, res) => {
      const { userInRoomId, voteTypeId, ticketId } = req.body;
      const upn = req.upn;
      if(await isUserInRoom(userInRoomId, upn) && await isTicketNotRevealed(ticketId)){
        const newVote = await createVote(userInRoomId, voteTypeId, ticketId);
        res.status(201).json(newVote);
      } else {
        res.status(404).send();
      }
    })
  );
}

module.exports = { voteController };
