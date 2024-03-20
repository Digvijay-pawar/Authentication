const Users = require("../models/userSchema.js");
const OtpModel = require("../models/otpModel.js")
const Invite = require("../models/inviteSchema.js");
const bcrypt = require("bcryptjs");
const twilio = require('twilio');
var unirest = require("unirest");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 900000);
};

class UserController {

    static async createUser(req, res) {
        const { mobile_number, password, invite_code, otp } = req.body;
        console.log("Register")
        try {

            //Validation
            if (!mobile_number || !password || !otp) {
                throw new Error("Fill all the details.");
            }

            //Check user exists
            const existingUser = await Users.findOne({ mobile_number });
            if (existingUser) {
                throw new Error("This mobile number already exists.");
            }

            //Password hashing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //Check if invite code is valid or not
            const validCode = await Users.findOne({ mobile_number: invite_code })

            if (validCode && invite_code != mobile_number){
                //Create Invite
                const inviteUser = new Invite({
                    mobile_number: invite_code,
                    invitee_mobile_number: mobile_number
                })
                await inviteUser.save();
            }

            //Create User
            const newUser = new Users({
                mobile_number,
                password: hashedPassword,
                invite_code
            });
            await newUser.save();

            //Token
            const token = await newUser.generateAuthToken(res);

            res.cookie("usercookie", token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: true
            });

            //Send response to user
            return res.status(200).json({
                message: "Registered successfully!",
                mobile_number,
                token
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async loginUser(req, res) {
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

    static async changePassword(req, res) {
        const { mobile_number, new_password, otp } = req.body;

        try {
            if (!mobile_number || !new_password || !otp) {
                throw new Error("Fill all the details.");
            }

            const existingUser = await Users.findOne({ mobile_number });
            if (!existingUser) {
                throw new Error("User not found.");
            }


            // Hashed new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(new_password, salt);

            await Users.findOneAndUpdate({ mobile_number }, { password: hashedPassword });

            return res.status(200).json({ message: "Password changed successfully!" });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    static async validateUser(req, res) {
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

    static async getUser(req, res) {
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

    static async sendOtp(req, res) {
        const { mobile_number } = req.body;

        if (!mobile_number) {
            return res.status(400).json({ error: "Mobile number is required" });
        }

        // Validate the phone number format
        const mobile_numberRegex = /^\d{10}$/;
        if (!mobile_numberRegex.test(mobile_number)) {
            return res.status(400).json({ error: "Invalid mobile number format" });
        }

        try {
            const otp = generateOTP();

            // Save OTP to database
            const current_date = new Date();
            await OtpModel.findOneAndUpdate(
                { mobile_number },
                { otp, otpExpiration: new Date(current_date.getTime() + 5 * 60000) }, // OTP expires in 5 minutes
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            const req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

            req.headers({
                "authorization": "B7NykiaeT3q8nSGt4jhLsxU5rozm6ZOv2HQcMuK9XRdWwlgJ1ITWIXlRSYdKoBia68gjuwbAc3EsNf7H"
                , "Content-Type": "application/json"
            });

            req.form({
                "variable_values": "1231",
                "route": "otp",
                "numbers": "7378744047",
            });

            req.end(function (response) {
                if (response.error) {
                    console.error("Error sending SMS:", response.error);
                    return res.status(500).json({ error: "Failed to send OTP" });
                } else {
                    console.log(response.body);
                    return res.status(200).json({
                        message: "OTP sent successfully!",
                        otp: otp
                    });
                }
            });
        } catch (error) {
            console.error("Error sending OTP:", error);
            return res.status(500).json({ error: "Failed to send OTP" });
        }

    }

    static async verifyOtp(req, res) {
        const { mobile_number, otp } = req.body;

        if (!mobile_number || !otp) {
            return res.status(400).json({ error: "Mobile number and OTP are required" });
        }

        try {
            const existingOtp = await OtpModel.findOne({ mobile_number, otp });
            if (!existingOtp) {
                return res.status(400).json({ error: "Invalid OTP" });
            }

            return res.status(200).json({
                message: "Otp verified successfully!"
            })
        } catch (error) {
            console.error("Error verifying OTP:", error);
            return res.status(500).json({ error: "Failed to verify OTP" });
        }
    }


}

module.exports = UserController;
