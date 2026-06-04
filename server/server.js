const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Expense Tracker API Running ");
});
app.post("/expenses", (req, res) => {

  console.log("POST HIT");

  console.log(req.body);

  const { title, amount, category, date, note } = req.body;

  db.run(
    `INSERT INTO expenses (title, amount, category, date, note)
     VALUES (?, ?, ?, ?, ?)`,
    [title, amount, category, date, note],
    function (err) {

      if (err) {
           console.log("SQL ERROR:", err);
        return res.status(500).json({
          error: err.message,
        });
      }
           console.log("INSERT SUCCESS");
      res.status(201).json({
        message: "Expense added successfully",
        id: this.lastID,
      });
    }
  );

});
app.put("/expenses/:id", (req, res) => {
  const { title, amount, category, date, note } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE expenses
     SET title = ?, amount = ?, category = ?, date = ?, note = ?
     WHERE id = ?`,
    [title, amount, category, date, note, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Expense updated successfully",
      });
    }
  );
});
app.get("/expenses", (req, res) => {

  db.all(
    "SELECT * FROM expenses",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);

    }
  );

});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});