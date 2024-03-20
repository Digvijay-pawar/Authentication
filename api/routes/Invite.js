const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authenticate = require('../config/authenticate.js');
const InviteSchemaController = require("../controllers/InviteController.js");

// balance
router.get('/get-invite', authenticate, asyncHandler(InviteSchemaController.getInvites));

module.exports = router;