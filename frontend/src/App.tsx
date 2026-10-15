import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import "./colors.css";

import HomePage from "./features/home-page/HomePage";
import Dashboard from "./features/home-page/Dashboard";
import ExpansesPage from "./features/expanses/ExpansesPage";
import StatisticsPage from "./features/statistics/StatisticsPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import AddExpensePage from "./features/addExpense/AddExpensePage";
import { store } from "./utility/redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Routes with sidebar */}
          <Route element={<HomePage />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/addExpense" element={<AddExpensePage />} />
            <Route path="/expanses" element={<ExpansesPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;