import "./App.css";
import expenseImage from "./assets/expense.jpg";

function App() {
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
          <input type="text" placeholder="Enter expense title" />
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input type="number" placeholder="Enter amount" />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>
          <input type="date" />
        </div>

        <button className="btn">
          + Add Expense
        </button>

      </div>
    </div>
  );
}

export default App;