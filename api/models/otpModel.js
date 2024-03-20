const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    mobile_number: {
        type: String,
        required: true,
        ref: 'User',
        unique: true,
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: "Invalid mobile number"
        }
    },

    otp: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^[0-9]{6}$/.test(value)
            },
            message: "Invalid otp"
        }
    },

    otpExpiration: {
        type: Date,
        default: Date.now(),
        get: (otpExpiration) => otpExpiration.getTime()
    }
})

const otpModel = mongoose.model("Otps", otpSchema);

module.exports = otpModel;