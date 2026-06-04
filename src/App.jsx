import "./App.css";
import expenseImage from "./assets/expense.jpg";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function App() {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("Food");
const [date, setDate] = useState("");
const [expenses, setExpenses] = useState([]);
const [filterCategory, setFilterCategory] = useState("All");
const [editIndex, setEditIndex] = useState(null);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/expenses")
    .then((res) => res.json())
    .then((data) => {
      setExpenses(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
const addExpense = () => {
  if (editIndex !== null) {

    const updatedExpenses = [...expenses];

    updatedExpenses[editIndex] = {
      title,
      amount,
      category,
      date,
    };

    setExpenses(updatedExpenses);
    setEditIndex(null);

  } else {

    const newExpense = {
      title,
      amount,
      category,
      date,
    };
fetch("http://localhost:5000/expenses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newExpense),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  setExpenses([...expenses, newExpense]);
  }
  setTitle("");
  setAmount("");
  setCategory("Food");
  setDate("");
};

const deleteExpense = (indexToDelete) => {
  const updatedExpenses = expenses.filter(
    (_, index) => index !== indexToDelete
  );

  setExpenses(updatedExpenses);
};
const editExpense = (index) => {
  const expense = expenses[index];

  setTitle(expense.title);
  setAmount(expense.amount);
  setCategory(expense.category);
  setDate(expense.date);

  setEditIndex(index);
};



const totalSpent = expenses.reduce(
  (total, expense) => total + Number(expense.amount),
  0
);
const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map((expense) => Number(expense.amount)))
    : 0;

    const categoryTotals = expenses.reduce((acc, expense) => {
  const category = expense.category;

  if (!acc[category]) {
    acc[category] = 0;
  }

  acc[category] += Number(expense.amount);

  return acc;
}, {});
const chartData = Object.entries(categoryTotals).map(
  ([category, total]) => ({
    name: category,
    value: total,
  })
);
const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
];


const filteredExpenses =
  filterCategory === "All"
    ? expenses
    : expenses.filter(
        (expense) =>
          expense.category === filterCategory
      );
const dateFilteredExpenses = filteredExpenses.filter((expense) => {

  if (!startDate && !endDate) {
    return true;
  }
const highestExpense =
  dateFilteredExpenses.length > 0
    ? Math.max(
        ...dateFilteredExpenses.map(
          (expense) => Number(expense.amount)
        )
      )
    : 0;
  const expenseDate = new Date(expense.date);

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && expenseDate < start) {
    return false;
  }

  if (end && expenseDate > end) {
    return false;
  }

  return true;
});

      const SortedExpenses = [...dateFilteredExpenses].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
  return (
    <div className="container">

      <img
        src={expenseImage}
        alt="Expense Tracker"
        className="hero-image"
      />

      <h1 className="heading">Expense Tracker</h1>

      <p className="subheading">
        Track and manage your daily expenses easily
      </p>
<div className="summary-card">
  <h2>Expense Summary</h2>

  <p>
    <strong>Total Spent:</strong> ₹{totalSpent}
  </p>

  <p>
    <strong>Highest Expense:</strong> ₹{highestExpense}
  </p>
  <h3>Category Totals</h3>

{Object.entries(categoryTotals).map(([category, total]) => (
  <p key={category}>
    <strong>{category}:</strong> ₹{total}
  </p>
))}
  <div className="chart-container">
  <h3>Expense Distribution</h3>

  <PieChart width={400} height={300}>
  <Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={100}
  label
>
  {chartData.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</div>

  <div className="filter-card">

  <label>Filter By Category</label>

  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
  </select>

</div>
<div className="filter-card">

  <label>Start Date</label>

  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />

  <label>End Date</label>

  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />

</div>
</div>
      <div className="card">

        <div className="input-group">
          <label>Expense Title</label>
          <input type="text" placeholder="Enter expense title" value={title}
  onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input type="number" placeholder="Enter amount" value={amount}
  onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select value={category}
  onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date"  value={date}
  onChange={(e) => setDate(e.target.value)}/>
        </div>

      <button className="btn" onClick={addExpense}>
  {editIndex !== null ? "Update Expense" : "Add Expense"}
</button>

      </div>
      <div className="expense-list">
  <h2>Recent Expenses</h2>

  {SortedExpenses.map((expense, index) => (
    <div className="expense-item" key={index}>
      <h3>{expense.title}</h3>

      <p>Amount: ₹{expense.amount}</p>

      <p>Category: {expense.category}</p>

      <p>Date: {expense.date}</p>

<button
  className="edit-btn"
  onClick={() => editExpense(index)}
>
  Edit
</button>
      <button
  className="delete-btn"
  onClick={() => deleteExpense(index)}
>
  Delete
</button>
    </div>
  ))}
</div>
    </div>
  );
}

export default App;