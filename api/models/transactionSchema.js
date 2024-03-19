const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    ref: 'Users',
    required: true
  },
  transaction_type: {
    type: String,
    enum: ['Recharge', 'Withdrawal', 'Bonus', 'Betting'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  result: {
    type: String,
    enum: ['Win', 'Loss'],
    required: function() {
        return this.transaction_type === 'Betting';
    }
  },
  timestamp: {
    type: Date,
    default: Date.now,
    // Getter to format the date when retrieving from the database
    get: function(timestamp) {
      // Format the date to dd/mm/yyyy
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
  // Add other transaction-related fields as needed
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
