const client = require('./databaseConnection');

const tableName = 'users';

const createUser = async (upn) => {
  const checkUserQuery = `SELECT * FROM ${tableName} WHERE upn = $1`;
  const checkUserResult = await client.query(checkUserQuery, [upn]);

  if (checkUserResult.rows.length > 0) {
    const existingUser = checkUserResult.rows[0];
    return { upn: existingUser.upn };
  }

  const result = await client.query(
    `INSERT INTO ${tableName} (upn) VALUES ($1) RETURNING *`,
    [upn]
  );
  const row = result.rows[0];
  return { upn: row.upn};
};

module.exports = {
  createUser,
};
