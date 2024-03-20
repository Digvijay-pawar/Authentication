const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const UserController = require("../controllers/User.js");
const authenticate = require('../config/authenticate.js');

// Create user
router.post('/create-user', asyncHandler(UserController.createUser));

// Login user
router.post('/login-user', asyncHandler(UserController.loginUser));

// Change password
router.patch('/change-password', asyncHandler(UserController.changePassword));

// Get user
router.get("/get-user", authenticate, asyncHandler(UserController.getUser));

// Validate user
router.get("/valid-user", authenticate, asyncHandler(UserController.validateUser));

// Logout user
router.get("/logout", authenticate, asyncHandler(UserController.logoutUser));

// Send otp to user
router.post("/send-otp", asyncHandler(UserController.sendOtp));

router.post("/verify-otp", asyncHandler(UserController.verifyOtp));

module.exports = router;
