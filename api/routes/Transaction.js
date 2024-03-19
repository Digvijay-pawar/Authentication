const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authenticate = require('../config/authenticate.js');
const TransactionController = require("../controllers/TransactionController.js");

// recharge-history
router.get('/recharge-history', authenticate, asyncHandler(TransactionController.rechargeHistory));

// withdrawal-history
router.get('/withdrawal-history', authenticate, asyncHandler(TransactionController.withdrawalHistory));

// bonus-history
router.get('/bonus-history', authenticate, asyncHandler(TransactionController.bonusHistory));

// betting-history
router.get('/betting-history', authenticate, asyncHandler(TransactionController.bettingHistory));


module.exports = router;