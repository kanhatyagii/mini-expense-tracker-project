import "./App.css";
import expenseImage from "./assets/expense.jpg";
import React, { useState } from "react";

function App() {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("Food");
const [date, setDate] = useState("");
const [expenses, setExpenses] = useState([]);

const addExpense = () => {
  const newExpense = {
    title,
    amount,
    category,
    date,
  };

  setExpenses([...expenses, newExpense]);

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
          + Add Expense
        </button>

      </div>
      <div className="expense-list">
  <h2>Recent Expenses</h2>

  {expenses.map((expense, index) => (
    <div className="expense-item" key={index}>
      <h3>{expense.title}</h3>

      <p>Amount: ₹{expense.amount}</p>

      <p>Category: {expense.category}</p>

      <p>Date: {expense.date}</p>

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