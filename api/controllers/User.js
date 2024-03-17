const Users = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class UserController {

    static async createUser(req, res) {
        const { mobile_number, password, invite_code, otp } = req.body;

        try {
            if (!mobile_number || !password || !invite_code || !otp) {
                throw new Error("Fill all the details.");
            }

            const existingUser = await Users.findOne({ mobile_number });
            if (existingUser) {
                throw new Error("This mobile number already exists.");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new Users({
                mobile_number,
                password: hashedPassword,
                invite_code
            });
            await newUser.save();

            const token = await newUser.generateAuthToken(res);

            res.cookie("usercookie", token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: true
            });

            return res.status(200).json({
                message: "Registered successfully!",
                mobile_number,
                token
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    static async loginUser(req, res){
        const { mobile_number, password } = req.body;

        try {
            if (!mobile_number || !password) {
                throw new Error("Fill all the details.");
            }

            const existingUser = await Users.findOne({ mobile_number });
            if (!existingUser) {
                throw new Error("User not found.");
            }

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials.");
            }

            const token = await existingUser.generateAuthToken();

            res.cookie("usercookie", token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: true
            });

            return res.status(200).json({
                message: "Logged in successfully!",
                mobile_number,
                token
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    static async changePassword(req, res){
        const { mobile_number, new_password, otp } = req.body;

        try {
            if (!mobile_number || !new_password || !otp) {
                throw new Error("Fill all the details.");
            }

            const existingUser = await Users.findOne({ mobile_number });
            if (!existingUser) {
                throw new Error("User not found.");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(new_password, salt);

            await Users.findOneAndUpdate({ mobile_number }, { password: hashedPassword });

            return res.status(200).json({ message: "Password changed successfully!" });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    static async validateUser(req, res){
        try {
            const validUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!validUser) {
                throw new Error("Invalid user.");
            }
            return res.status(200).json({ message: "User verification successful", validUser });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async logoutUser(req, res) {
        try {
            req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
                return curelem.token !== req.token;
            });
    
            // Use res.clearCookie() to clear the cookie
            res.clearCookie('usercookie', { path: "/" });
    
            await req.rootUser.save();
    
            return res.status(200).json({ message: "Logout successfully!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    

    static async getUser(req, res){
        try {
            const getUser = await Users.findOne({ mobile_number: req.mobile_number });
            if (!getUser) {
                throw new Error("User not found.");
            }
            return res.status(200).json({ message: "User fetched successfully!", mobile_number: getUser.mobile_number, status: getUser.status });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
