import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseCharts from "./components/ExpenseCharts";
import axios from "axios";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loadingPred, setLoadingPred] = useState(false);
  const [monthInput, setMonthInput] = useState("");  // <-- added this

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    await axios.post("http://localhost:5000/api/expenses", expense);
    fetchExpenses();
  };

  const predictNextMonth = async () => {
    setLoadingPred(true);
    const monthlyTotals = expenses.reduce((acc, e) => {
      const month = e.date.slice(0, 7);
      acc[month] = (acc[month] || 0) + parseFloat(e.amount);
      return acc;
    }, {});

    const sortedMonths = Object.keys(monthlyTotals).sort();
    const monthlyExpensesArray = sortedMonths.map((m) => monthlyTotals[m]);

    try {
      const res = await axios.post("http://localhost:5000/api/predict", {
        monthly_expenses: monthlyExpensesArray,
      });
      setPrediction(res.data);
    } catch (error) {
      alert("Failed to get prediction");
    }
    setLoadingPred(false);
  };

  // New function for prediction of a specific month using monthInput
  const predictForMonth = async () => {
    if (!monthInput) {
      alert("Please enter a month in YYYY-MM format");
      return;
    }
    setLoadingPred(true);
    try {
      const res = await axios.post("http://localhost:5000/api/predict-month", {
        month: monthInput,
        expenses,
      });
      setPrediction(res.data);
    } catch (error) {
      alert("Failed to get prediction for the month");
    }
    setLoadingPred(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Expense Manager</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} />

      {/* Manual month input */}
      <div className="mb-4">
        <label>
          Enter Month (YYYY-MM):{" "}
          <input
            type="text"
            value={monthInput}
            onChange={(e) => setMonthInput(e.target.value)}
            placeholder="2023-06"
            className="border px-2 py-1 rounded"
          />
        </label>
      </div>

      {/* Button for manual month prediction */}
      <button
        onClick={predictForMonth}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loadingPred}
      >
        {loadingPred ? "Predicting..." : "Predict Expense for Month"}
      </button>

      {/* Button for next month prediction */}
      <button
        onClick={predictNextMonth}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        disabled={loadingPred || expenses.length === 0}
      >
        {loadingPred ? "Predicting..." : "Predict Next Month Expense"}
      </button>

      {prediction && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Predictions</h2>
          <p>Linear Regression: ₹{prediction.linear_regression_prediction}</p>
          <p>Neural Network: ₹{prediction.neural_net_prediction}</p>
        </div>
      )}

      <ExpenseCharts expenses={expenses} />
    </div>
  );
};

export default App;
