const client = require('./databaseConnection');
const VoteType = require('../models/voteType');

const tableName = 'vote_types';

const getAllVoteTypes = async () => {
  const result = await client.query(`SELECT * FROM ${tableName}`);
  return result.rows.map(row => new VoteType(row.vote_type_id, row.vote));
};

const createVoteType = async (vote) => {
  const result = await client.query(
    `INSERT INTO ${tableName} (vote) VALUES ($1) RETURNING *`,
    [vote]
  );
  const row = result.rows[0];
  return new VoteType(row.vote_type_id, row.vote);
};

module.exports = {
  getAllVoteTypes,
  createVoteType,
};