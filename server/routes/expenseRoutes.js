const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const expenses = await req.models.Expense.findAll({ order: [["date", "ASC"]] });
  res.json(expenses);
});

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = await req.models.Expense.create({ title, amount, category, date });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

module.exports = router;