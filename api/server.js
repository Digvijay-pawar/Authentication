const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/User.js");
const balanceRouter = require("./routes/Balance.js");
const transactionRouter = require("./routes/Transaction.js");
const inviteRouter = require("./routes/Invite.js");

// Server Initialization
const app = express();

// Middleware
// app.use(cors({
//     origin: ["https://deploy-mern-authentication.vercel.app", "http://localhost:3000"],
//     methods: ["POST", "PUT", "PATCH", "GET"],
//     credentials: true

// })); // Add cors middleware here
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route Initialization
app.use('/auth', userRouter);
app.use('/balance', balanceRouter);
app.use('/transaction', transactionRouter)
app.use('/invite', inviteRouter);

// Server Run
const PORT = process.env.PORT || 5000; // Use provided PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}...`);
});
