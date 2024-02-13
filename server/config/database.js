const mysql = require('mysql2/promise');
require('dotenv').config();

const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const db = mysql.createPool({
  host: dbUrl,
  user: dbUser,
  password: dbPassword,
  database: 'earlyjobs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
