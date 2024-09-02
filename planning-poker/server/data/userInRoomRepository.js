const client = require('./databaseConnection');
const UserInRoom = require('../models/userInRoom');

const tableName = 'users_in_rooms';
const userTableName = 'users'
const roomTableName = 'rooms';

const getAllUsersInRoom = async (roomUuid) => {
  const query = `
    SELECT uir.user_in_room_id, uir.user_id, uir.room_id, u.upn 
    FROM ${tableName} uir
    JOIN ${userTableName} u ON uir.user_id = u.user_id
    JOIN ${roomTableName} r ON uir.room_id = r.room_id
    WHERE r.room_uuid = $1;
  `;

  const result = await client.query(query, [roomUuid]);
  return result.rows.map(row => new UserInRoom(row.user_in_room_id, row.upn));
};

const addUserToRoom = async (upn, roomUuid) => {
  const checkInRoom = `
    SELECT uir.user_in_room_id, uir.user_id, uir.room_id, u.upn 
    FROM ${tableName} uir
    JOIN ${userTableName} u ON uir.user_id = u.user_id
    JOIN ${roomTableName} r ON uir.room_id = r.room_id
    WHERE r.room_uuid = $1 AND u.upn = $2;
  `;

  const check = await client.query(checkInRoom, [roomUuid, upn]);
  const user = check.rows[0];
  if (user) return { userInRoomId: user.user_in_room_id };

  const query = `
    INSERT INTO ${tableName} (user_id, room_id)
    VALUES ((SELECT user_id FROM ${userTableName} WHERE upn = $1), (SELECT room_id FROM ${roomTableName} WHERE room_uuid = $2))
    RETURNING user_in_room_id;
  `;

  const result = await client.query(query, [upn, roomUuid]);
  const row = result.rows[0];

  return {userInRoomId: row.user_in_room_id };
};

module.exports = {
  getAllUsersInRoom,
  addUserToRoom,
};
