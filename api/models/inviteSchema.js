const mongoose = require('mongoose');
const User = require('./userSchema');

const inviteSchema = new mongoose.Schema({
    mobile_number: { 
        type: String,
        ref: 'User', 
        required: true 
    },
    invitee_mobile_number: { 
        type: String, 
        required: true,
        unique: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Rejected'], 
        default: 'Pending' 
    },
    amount: {
        type: Number,
        required: true,
        default: process.env.REFFEREL_AMOUNT
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

inviteSchema.post('save', async function (doc) {
    if (doc.status === 'Accepted') {
        try {
            // Find the inviter and update their balance
            const inviter = await User.findById(doc.inviter);
            if (inviter) {
                inviter.balance += 100; // Add 100 units to the inviter's balance
                inviter.status = 'active'; // Change the status of the inviter to active
                await inviter.save();
            }
        } catch (err) {
            console.error('Error updating inviter balance:', err);
        }
    }
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
