const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
let expenses=[];

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running ");
});
app.post("/expenses", (req, res) => {

  const expense = req.body;

  expenses.push(expense);

  res.status(201).json({
    message: "Expense added successfully",
    expense,
  });

});

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});