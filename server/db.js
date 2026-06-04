const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./expense.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL,
    category TEXT,
    date TEXT,
    note TEXT
  )
`);

module.exports = db;