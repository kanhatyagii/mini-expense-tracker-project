const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query(`
  CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    title TEXT,
    amount REAL,
    category TEXT,
    date TEXT,
    note TEXT
  )
`)
.then(() => console.log("Expenses table ready"))
.catch(err => console.error(err));

module.exports = { pool };