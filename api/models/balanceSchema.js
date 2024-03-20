const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    ref: 'User',
    required: true,
    unique: true
  },
  current_balance: {
    type: Number,
    required: true,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
