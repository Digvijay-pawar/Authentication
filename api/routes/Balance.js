const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authenticate = require('../config/authenticate.js');
const BalanceController = require("../controllers/BalanceController.js");

// balance
router.get('/get-balance', authenticate, asyncHandler(BalanceController.getBalance));

// change-balance
router.post('/update-balance', authenticate, asyncHandler(BalanceController.updateBalance));


module.exports = router;