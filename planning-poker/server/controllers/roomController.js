const { createRoom, getRoomByUuid, updateRoomTicket } = require('../data/roomRepository');
const { getAllUsersInRoom, addUserToRoom } = require('../data/userInRoomRepository');
const { handleErrors } = require('../middlewares/errorHandler');
const { getAllTicketsInRoom } = require('../data/ticketRepository');
const verifyToken  = require('../middlewares/auth-middleware.js');
const { rateLimit } = require("express-rate-limit");

const roomCreationLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});
const ticketLimiter = rateLimit({
  windowMs:  60 * 1000, // 1 minute
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (1 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

function roomController(router) {

  router.post(
    '/create', verifyToken, roomCreationLimiter,
    handleErrors(async (req, res) => {
      const { roomName, closed } = req.body;
      const upn = req.upn;
      const newRoom = await createRoom(roomName, upn, closed);
      res.status(201).json(newRoom);
    })
  );

  router.get(
    '/:uuid', verifyToken,
    handleErrors(async (req, res) => {
      const roomUUID = req.params.uuid;
      const room = await getRoomByUuid(roomUUID);
      res.json(room);
    })
  );

  router.get(
    '/:uuid/users', verifyToken,
    handleErrors(async (req, res) => {
      const roomUuid = req.params.uuid;
      const usersInRoom = await getAllUsersInRoom(roomUuid);
      res.status(200).json(usersInRoom);
    })
  );

  router.post(
    '/:uuid/users', verifyToken,roomCreationLimiter,
    handleErrors(async (req, res) => {
      const roomUuid = req.params.uuid;
      const upn = req.upn;
      const userInRoom = await addUserToRoom(upn, roomUuid);
      res.status(201).json(userInRoom);
    })
  );

  router.get(
    '/:uuid/tickets', verifyToken,
    handleErrors(async (req, res) => {
      const roomUuid = req.params.uuid;
      const tickets = await getAllTicketsInRoom(roomUuid);
      res.send(tickets);
    })
  );

  router.post(
    '/:uuid/ticket', verifyToken,ticketLimiter,
    handleErrors(async (req, res) => {
      const roomUuid = req.params.uuid;
      const {ticketId} = req.body;
      const roomUUID = await updateRoomTicket(roomUuid, ticketId);
      res.status(201).json(roomUUID);
    })
  );
}

module.exports = { roomController };
