require("dotenv").config();
const { USER, HOST, DATABASE, PASSWORD } = process.env;
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
});

// pool
//   .connect()
//   .then(() => console.log("🐘 Connected to DB"))
//   .catch((err) => console.error(err));
module.exports = pool;
