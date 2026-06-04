# Mini Expense Tracker

## Project Title & Brief Description

Exercise Chosen: Exercise 2 - Mini Expense Tracker

Mini Expense Tracker is a full-stack web application that allows users to record and manage daily expenses. Users can add, edit, delete, and filter expenses by category and date range. The application provides spending summaries, category-wise analytics, budget tracking indicators, and visual expense distribution through charts. Data is persisted using SQLite so expenses remain available across server restarts.

---

## Live Demo Links

Frontend: To be added after deployment

Backend: To be added after deployment

GitHub Repository: https://github.com/kanhatyagii/mini-expense-tracker-project

---

## Tech Stack

### Frontend
- React — Component-based UI development
- Vite — Fast development and build tool
- CSS — Styling and responsive layout
- Recharts — Expense distribution pie chart visualization

### Backend
- Node.js — JavaScript runtime
- Express.js — REST API development

### Database
- SQLite — Lightweight persistent database

### Version Control
- Git
- GitHub

---

## Features

- Add expenses
- Edit expenses
- Delete expenses
- Category filtering
- Date range filtering
- Monthly spending summary
- Highest expense tracking
- Category-wise totals
- Pie chart visualization
- Currency formatting (INR)
- Form validation
- CSV export of expenses
- Budget indicators per category
- SQLite data persistence

---

## How to Run Locally

### Clone Repository

bash git clone https://github.com/kanhatyagii/mini-expense-tracker-project.git cd mini-expense-tracker-project 

### Install Frontend Dependencies

bash npm install 

### Start Frontend

bash npm run dev 

Frontend runs on:

bash http://localhost:5173 

### Start Backend

Open a new terminal:

bash cd server npm install node server.js 

Backend runs on:

bash http://localhost:5000 

---

## API Documentation

### Get All Expenses

Method

http GET /expenses 

Response

json [   {     "id": 1,     "title": "Lunch",     "amount": 250,     "category": "Food",     "date": "2025-06-01",     "note": "Office lunch"   } ] 

---

### Add Expense

Method

http POST /expenses 

Request Body

json {   "title": "Movie",   "amount": 500,   "category": "Entertainment",   "date": "2025-06-02",   "note": "Weekend movie" } 

Response

json {   "message": "Expense added successfully" } 

---

### Update Expense

Method

http PUT /expenses/:id 

Request Body

json {   "title": "Updated Expense",   "amount": 700,   "category": "Shopping",   "date": "2025-06-03",   "note": "Updated note" } 

Response

json {   "message": "Expense updated successfully" } 

---

### Delete Expense

Method

http DELETE /expenses/:id 

Response

json {   "message": "Expense deleted successfully" } 

---

## Project Structure

text mini-expense-tracker-project │ ├── public/ │   └── Static assets │ ├── src/ │   ├── App.jsx │   ├── App.css │   ├── main.jsx │   └── Frontend components and styling │ ├── server/ │   ├── server.js │   ├── db.js │   └── expense.db │ ├── package.json ├── package-lock.json └── README.md 

### Folder Description

- src → React frontend application
- public → Static assets
- server → Express API and SQLite database
- expense.db → Persistent expense storage

---

## Next Steps

The following enhancements were not implemented due to time constraints and would be considered future improvements:

- User authentication and authorization
- Editable budget settings from UI
- Advanced charts and analytics
- Search functionality
- Mobile-first responsive improvements
