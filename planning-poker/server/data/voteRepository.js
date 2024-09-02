const client = require('./databaseConnection');
const Vote = require('../models/vote');

const tableName = 'votes';

const getAllVotes = async () => {
  const result = await client.query(`SELECT * FROM ${tableName}`);
  return result.rows.map(row => new Vote(row.vote_id, row.user_in_room_id, row.vote_type_id, row.ticket_id));
};

const getVotesByTicketId = async (ticketId) => {
  const result = await client.query(`SELECT * FROM ${tableName} WHERE ticket_id = $1`,[ticketId]);
  return result.rows.map(row => new Vote(row.vote_id, row.user_in_room_id, row.vote_type_id, row.ticket_id));
};

const createVote = async (userInRoomId, voteTypeId, ticketId) => {
  const result = await client.query(
    ` INSERT INTO ${tableName} (user_in_room_id, vote_type_id, ticket_id) VALUES ($1, $2, $3)
    ON CONFLICT (user_in_room_id, ticket_id)
    DO UPDATE SET vote_type_id = $2
    RETURNING *;`,
    [userInRoomId, voteTypeId, ticketId]
  );
  const row = result.rows[0];
  return new Vote(row.vote_id, row.user_in_room_id, row.vote_type_id, row.ticket_id);
}; 

const isUserInRoom = async (userInRoomId, upn) => {
  const query = `
  SELECT room_id from users_in_rooms where user_in_room_id=$1 and user_id=(select user_id from users where upn=$2)
  `;
  const result = await client.query(query, [userInRoomId, upn]);
  const row = result.rows[0];
  return row ? true : false;
}

const isTicketNotRevealed = async (ticketId) => {
  const query = `
  SELECT * from tickets where ticket_id=$1 and revealed='0'
  `;
  const result = await client.query(query, [ticketId]);
  const row = result.rows[0];
  return row ? true : false;
}

module.exports = {
  getAllVotes,
  getVotesByTicketId,
  createVote,
  isUserInRoom,
  isTicketNotRevealed,
}; 