import React, { useState } from "react";

const ExpenseForm = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(expense);
    setExpense({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <form className="mb-6 space-y-4" onSubmit={handleSubmit}>
      <input name="title" value={expense.title} onChange={handleChange} placeholder="Title" className="p-2 border rounded w-full" />
      <input name="amount" type="number" value={expense.amount} onChange={handleChange} placeholder="Amount" className="p-2 border rounded w-full" />
      <input name="category" value={expense.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded w-full" />
      <input name="date" type="date" value={expense.date} onChange={handleChange} className="p-2 border rounded w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;