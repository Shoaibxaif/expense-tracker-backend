const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const moment = require("moment");

// Create a new transaction
router.post('/transactions', async (req, res) => {
    const { date, time, title, amount, category, notes } = req.body;
  
    try {
      // Parse the date from YYYY-MM-DD format
      const parsedDate = moment.utc(date, 'YYYY-MM-DD').startOf('day').toDate();
  
      const newTransaction = new Transaction({
        date: parsedDate,
        time,
        title,
        amount,
        category,
        notes,
      });
  
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
// Get all transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by ID
router.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { date, time, title, amount, category, notes } = req.body;
  
  try {
    // Parse the date from MM/DD/YYYY format and convert to UTC
    const parsedDate = date ? moment.utc(date, "MM/DD/YYYY").startOf('day').toDate() : undefined;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { date: parsedDate, time, title, amount, category, notes },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a transaction by ID
router.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
