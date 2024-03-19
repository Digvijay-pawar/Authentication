const Transaction = require("../models/transactionSchema.js");
const Users = require('../models/userSchema.js')
class UsersTransactionController {
    static async rechargeHistory(req, res) {
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }

            // Retrieve recharge transactions and sort by transaction_type
            const rechargeTransactions = await Transaction.find({ mobile_number: req.mobile_number, transaction_type: 'Recharge' }).sort({ transaction_type: 1 });
            res.status(200).json(rechargeTransactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async withdrawalHistory(req, res) {
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }

            // Retrieve withdrawal transactions and sort by transaction_type
            const withdrawalTransactions = await Transaction.find({ mobile_number: req.mobile_number, transaction_type: 'Withdrawal' }).sort({ transaction_type: 1 });
            res.status(200).json(withdrawalTransactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async bonusHistory(req, res) {
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }

            // Retrieve bonus transactions and sort by transaction_type
            const bonusTransactions = await Transaction.find({ mobile_number: req.mobile_number, transaction_type: 'Bonus' }).sort({ transaction_type: 1 });
            res.status(200).json(bonusTransactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async bettingHistory(req, res) {
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }

            // Retrieve betting transactions and sort by transaction_type
            const bettingTransactions = await Transaction.find({ mobile_number: req.mobile_number, transaction_type: 'Betting' }).sort({ transaction_type: 1 });
            res.status(200).json(bettingTransactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UsersTransactionController;
