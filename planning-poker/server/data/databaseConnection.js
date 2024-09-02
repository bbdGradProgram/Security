const { Client } = require('pg');
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "db.env"),
});

const debug_mode=process.env.DEBUG==='true';

let client;

if(debug_mode){
  client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_URL,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
} else {
  client = new Client({
    user: "dbadmin",
    host: process.env.DB_URL,
    database: 'poker',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  });
}



client.connect(err => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = client;
