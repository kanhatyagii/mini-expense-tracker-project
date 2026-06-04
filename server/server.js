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

  const { title, amount, category, date } = req.body;

  db.run(
    `INSERT INTO expenses (title, amount, category, date)
     VALUES (?, ?, ?, ?)`,
    [title, amount, category, date],
    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Expense added successfully",
        id: this.lastID,
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