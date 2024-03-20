const Balance = require("../models/balanceSchema.js");
const Transaction = require("../models/transactionSchema.js");
const User = require("../models/userSchema.js");
const Users = require("../models/userSchema.js")
class BalanceController {

    static async updateBalance(req, res) {
        try {
            const { mobile_number, transaction_type, result, amount } = req.body;

            if(!mobile_number || !transaction_type || ! amount){
                throw new Error("Fill all the fields")
            }

            //Check user exists
            const getUser = await User.findOne({mobile_number});
            if(!getUser){
                throw new Error("User not found");
            }

            const amt = Number(amount);
            // Fetch user's current balance
            let balance = await Balance.findOne({ mobile_number: mobile_number });

            // If balance doesn't exist, create a new balance entry
            if (!balance) {
                balance = new Balance({
                    mobile_number : mobile_number,
                    current_balance: 0 // Assuming initial balance is 0
                });
            }

            // Update balance based on transaction type
            switch (transaction_type) {
                case 'Recharge':
                    balance.current_balance += amt;
                    break;
                case 'Withdrawal':
                    balance.current_balance -= amt;
                    break;
                case 'Bonus':
                    balance.current_balance += amt;
                    break;
                case 'Betting':
                    result == 'Win' ? balance.current_balance += amt : balance.current_balance -= amt;
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid transaction type' });
            }

            // Save the updated balance
            await balance.save();

            let transaction;
            // Create a new transaction record
            if(transaction_type === 'Betting'){
                transaction = new Transaction({
                    mobile_number,
                    transaction_type,
                    amount,
                    result
                });
            } else{
                transaction = new Transaction({
                    mobile_number,
                    transaction_type,
                    amount
                });
            } 
            await transaction.save();

            // Respond with success message
            res.status(201).json({ message: 'Transaction completed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getBalance(req, res){
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }

            const balance = await Balance.findOne({mobile_number: req.mobile_number});
            if(!balance){
                return res.status(200).json({
                    message: "Balance is empty",
                    balance: 0
                })
            }

            return res.status(200).json({
                message: "Balance fetched successfully!", 
                balance: balance.current_balance, 
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BalanceController;