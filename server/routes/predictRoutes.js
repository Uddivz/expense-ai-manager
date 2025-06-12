const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { monthly_expenses } = req.body;
    if (!monthly_expenses || monthly_expenses.length < 2) {
      return res.status(400).json({ error: "Provide at least two months of expenses" });
    }

    const response = await axios.post("http://localhost:5001/predict", { monthly_expenses });
    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Prediction service failed" });
  }
});

module.exports = router;