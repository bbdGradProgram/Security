const client = require('./databaseConnection');

const tableName = 'rooms';
const userTableName = 'users';

const getRoomByUuid = async (roomUUID) => {
  const query = await client.query(`SELECT owner_id, current_ticket_id FROM ${tableName} WHERE room_uuid = $1`, [roomUUID]);
  if (query.rows.length === 0) {
    throw new Error(`Room with ID ${roomUUID} not found`);
  }
  const room = query.rows[0];
  const userResult = await client.query(`SELECT upn FROM ${userTableName} WHERE user_id = $1`, [room.owner_id]);
  const user = userResult.rows[0];
  return {owner: user.upn, current_ticket: room.current_ticket_id};
};

const createRoom = async (roomName, upn, closed = false) => {
  const userQuery = `SELECT user_id FROM ${userTableName} WHERE upn = $1`;
  const userResult = await client.query(userQuery, [upn]);
  const ownerId = userResult.rows[0].user_id;

  const roomQuery = `
    INSERT INTO ${tableName} (room_name, owner_id, closed)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const roomResult = await client.query(roomQuery, [roomName, ownerId, closed]);
  const row = roomResult.rows[0];

  return { roomUuid: row.room_uuid };
};

const updateRoomTicket = async (roomUuid, ticketId) => {
  const query = `UPDATE ${tableName} SET current_ticket_id = $1 WHERE room_id = (SELECT room_id FROM ${tableName} WHERE room_uuid = $2)`;
  await client.query(query, [ticketId, roomUuid]);
  return { roomUuid: roomUuid };
}

module.exports = {
  getRoomByUuid,
  createRoom,
  updateRoomTicket,
};
