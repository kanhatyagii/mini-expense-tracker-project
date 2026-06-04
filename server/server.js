const express = require("express");
const cors = require("cors");
const { pool } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Expense Tracker API Running ");
});
app.post("/expenses", async (req, res) => {
try{
  
  const { title, amount, category, date, note } = req.body;
 const result = await pool.query(
      `INSERT INTO expenses (title, amount, category, date, note)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [title, amount, category, date, note]
    );

    res.status(201).json({
      message: "Expense added successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
  
app.put("/expenses/:id", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    const { id } = req.params;

    await pool.query(
      `UPDATE expenses
       SET title=$1, amount=$2, category=$3, date=$4, note=$5
       WHERE id=$6`,
      [title, amount, category, date, note, id]
    );

    res.json({
      message: "Expense updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.delete("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM expenses WHERE id=$1",
      [id]
    );

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.get("/expenses", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});