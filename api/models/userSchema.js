const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    mobile_number: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: "Invalid mobile number"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    invite_code: {
        type: String,
        required: false,
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: "Invalid invite code"
        }
    },
    status: {
        type: String,
        enum: ['active', 'pending'],
        default: 'pending'
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

// Token generation method
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id, mobile_number: this.mobile_number }, process.env.SECRET_KEY, { expiresIn: "8d" });
        this.tokens.push({ token });
        await this.save();
        return token;
    } catch (err) {
        throw new Error("Error during token generation: " + err.message);
    }
}

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
