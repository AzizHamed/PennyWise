 
# 💸 Pennywise — Personal Finance Tracker

Pennywise is a full-stack personal finance application that helps users track expenses, manage monthly budgets, and understand their spending habits through a clean, intuitive dashboard.

Built with **React, TypeScript, NestJS, and MongoDB**, Pennywise provides a simple way to take control of personal finances.

## ✨ Features

- **User Authentication** — Secure signup, login, and logout using session-based authentication.
- **Dashboard Analytics** — View total spending, monthly spending, and remaining budget.
- **Expense Management** — Add, view, edit, and delete expenses.
- **Monthly Budget Tracking** — Monitor spending against a monthly budget and prevent expenses that exceed the limit.
- **Interactive Charts** — Visualize monthly spending trends and category breakdowns.
- **Search & Filtering** — Find expenses by search term, category, and date.
- **Pagination** — Browse expenses in an organized, paginated table.
- **Responsive Design** — Layouts designed to adapt to different screen sizes.

## 📸 Screenshots

### Dashboard

<img width="1800" height="1125" alt="PennyWiseDashboard" src="https://github.com/user-attachments/assets/36c92ae4-12bb-4eaa-8c54-481772f8d7c4" />


### Login & Signup

<img width="1800" height="1125" alt="PennyWiseLogin" src="https://github.com/user-attachments/assets/300269f2-d89b-40b3-95ea-71532f421675" />


<img width="1800" height="1125" alt="PennyWiseSignup" src="https://github.com/user-attachments/assets/cfd0d5cc-3b93-403e-bc36-b9e2ce2c567f" />


### Add Expense

<img width="1800" height="1125" alt="PennyWiseAddExpense" src="https://github.com/user-attachments/assets/c7929c15-2592-48d3-971f-4992b8f69ffd" />


### Expense Management

<img width="1800" height="1125" alt="PennyWiseExpenses" src="https://github.com/user-attachments/assets/a69d6c4c-8e62-4655-9d90-0b51b6a3b001" />


> Screenshots should be placed in a `screenshots` directory in the repository root. Update the image paths if your folder structure differs.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| State Management | Redux Toolkit, React Redux |
| Routing | React Router |
| Styling | CSS3 |
| Icons | Lucide React |
| Backend | NestJS, Node.js |
| Database | MongoDB, Mongoose |
| Authentication | Cookie-based sessions |

## 📁 Project Structure

A typical project organization:

```text
pennywise/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── entities/
│   │   ├── hooks/
│   │   ├── utility/
│   │   │   └── redux/
│   │   │       └── slices/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── expense/
│   │   ├── user/
│   │   └── main.ts
│   ├── package.json
│   └── .env.example
│
├── screenshots/
└── README.md
```

*The structure above is illustrative; directory names may differ in your repository.*

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- A MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/pennywise.git
cd pennywise
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file in the backend directory.

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/pennywise
PORT=3000
```

Add any additional session or authentication secrets required by your backend configuration.

**Never commit real database credentials or secret keys to GitHub.**

### 5. Start the backend

```bash
cd backend
npm run start:dev
```

The backend runs at:

```text
http://localhost:3000
```

### 6. Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## 📊 Dashboard Overview

The dashboard provides insights into spending activity through:

- **Total Spending:** Total amount spent across all recorded expenses.
- **Monthly Spending:** Expenses recorded during the current month.
- **Remaining Budget:** Amount available before reaching the monthly budget.
- **Monthly Spending Chart:** Comparison of expenses across recent months.
- **Category Breakdown:** Spending distribution across categories such as Food, Housing, Transportation, and Shopping.

## 🔐 Authentication & Security

Pennywise uses session-based authentication with HTTP-only cookies.

- Password-protected user accounts
- Authenticated API requests
- Server-managed sessions
- Protected financial data
- Logout functionality that invalidates the session

Authentication cookies are automatically included in requests using:

```typescript
fetch("http://localhost:3000/auth/me", {
  credentials: "include",
});
```

## 💰 Expense Management

Users can create expenses with the following information:

| Field | Description |
|---|---|
| Description | Name or purpose of the expense |
| Category | Expense classification |
| Date | Date the expense occurred |
| Amount | Monetary value of the expense |

Expenses can be reviewed, searched, filtered, edited, and deleted from the expenses page.

## 🎨 Design

Pennywise follows a minimal financial dashboard design with:

- A green-and-neutral color palette
- Clean cards and rounded components
- Simple navigation
- Readable financial statistics
- Visual spending insights
- Responsive layouts

## 🔮 Future Improvements

- Export expenses to CSV or PDF
- Recurring expenses
- Custom spending categories
- Budget notifications
- Advanced financial reports
- Dark mode
- Additional chart visualizations

## 👨‍💻 Author

Developed as a full-stack project to practice modern frontend development, backend architecture, authentication, database integration, and financial data visualization.

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under an open-source license.
