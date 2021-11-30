require("dotenv").config();
const { USER, HOST, DATABASE, PASSWORD } = process.env;
const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://dbmanager:password@13.58.66.168:5432/SDC",
});

// pool
//   .connect()
//   .then(() => console.log("🐘 Connected to DB"))
//   .catch((err) => console.error(err));

module.exports = pool;
