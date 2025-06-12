import React, { useState } from 'react';

function PredictExpense() {
  const [month, setMonth] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);

    if (!month) {
      setError('Please enter a month');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month }),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data.predictedExpense);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Expense Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Month (e.g., 2023-06):
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="YYYY-MM"
            style={{ marginLeft: 10, padding: 5, width: 150 }}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 10, padding: '5px 10px' }}>
          Predict
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction !== null && (
        <p>
          Predicted Expense for <b>{month}</b>: ₹{prediction}
        </p>
      )}
    </div>
  );
}

export default PredictExpense;
