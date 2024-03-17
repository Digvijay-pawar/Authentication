const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/User.js");

// Server Initialization
const app = express();

// Middleware
// Custom middleware to handle OPTIONS requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond with 200 OK for OPTIONS requests
    } else {
        next(); // Pass the request to the next middleware/route handler
    }
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route Initialization
app.use('/auth', userRouter);

app.get('/', (req, res) => {
  res.json("Hello");  
});

// Server Run
const PORT = process.env.PORT || 5000; // Use provided PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}...`);
});
