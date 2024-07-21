const mongoose = require('mongoose');

// Helper function to get the current time as a string
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString(); // Formats time as a string like "9:00:00 AM"
};

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true, default: getCurrentTime },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);
