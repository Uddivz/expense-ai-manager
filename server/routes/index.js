// server/routes/index.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route: POST /api/predict
router.post('/predict', async (req, res) => {
  const { month } = req.body;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  try {
    const response = await axios.post('http://localhost:6000/predict', { month });
    res.json({ predictedExpense: response.data.predicted_expense });
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
