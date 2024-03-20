const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema.js");
const keySecret = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    try {
        // Extract token from request header
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("No token provided");
        }
        
        // Verify token
        const verifyToken = jwt.verify(token, keySecret);

        // Find user based on token
        const rootUser = await Users.findOne({ mobile_number: verifyToken.mobile_number });
        if (!rootUser) {
            throw new Error("User not found");
        }

        // Attach user and token to request object
        req.token = token;
        req.rootUser = rootUser;
        req.mobile_number = rootUser.mobile_number;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ status: 401, message: "Unauthorized: " + error.message });
    }
};

module.exports = authenticate;
