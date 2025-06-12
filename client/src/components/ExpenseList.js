import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td className="p-2">{e.title}</td>
              <td className="p-2">₹{e.amount}</td>
              <td className="p-2">{e.category}</td>
              <td className="p-2">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;