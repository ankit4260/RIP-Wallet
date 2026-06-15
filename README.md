# RIPWALLET 💸

A modern expense tracking web application that helps users manage their finances, monitor spending habits, and visualize income and expenses through interactive dashboards and charts.

## Features

### Authentication

* User Registration
* User Login
* Secure Logout
* Password Hashing using bcrypt
* JWT-based Authentication

### Dashboard

* Total Balance Overview
* Total Income Summary
* Total Expense Summary
* Recent Transaction Insights
* Cash Flow Analytics
* Category-wise Spending Visualization

### Transaction Management

* Add Transactions
* Edit Transactions
* Delete Transactions
* Filter Transactions
* Categorize Income and Expenses

### Analytics

* Income vs Expense Trends
* Spending by Category
* Interactive Charts using Chart.js

### Responsive Design

* Desktop Dashboard Layout
* Mobile-Friendly Interface
* Responsive Navigation
* Optimized User Experience

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Chart.js
* Font Awesome

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)


## Project Structure

```text
RIPWALLET/
│
├── public/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── models/
│   ├── User.js
│   └── Expense.js
│
├── routes/
│   ├── auth.js
│   ├── expenses.js
│   └── dashboard.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ripwallet.git
cd ripwallet
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

## Future Enhancements

* Budget Planning
* Advanced Analytics
* Export Transactions (CSV/PDF)
* Dark/Light Theme
* Monthly Reports
* Multi-Currency Support
* AI-Based Spending Insights

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Manage Transactions Page
* Analytics Page

## Author

Ankit Choudhary


