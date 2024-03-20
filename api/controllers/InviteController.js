const Users = require("../models/userSchema");
const Invite = require("../models/inviteSchema");

class InviteSchemaController {

    static async getInvites(req, res) {
        try {
            const mobile_number = req.mobile_number;

            //validation
            if (!mobile_number) {
                return res.status(400).json({ error: "Fill all the fields" });
            }

            //check if user exists
            const existingUser = await Users.findOne({ mobile_number: mobile_number });
            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            //find referrals for the user
            const inviteUser = await Invite.find({ invitee_mobile_number: mobile_number });

            //find total amount & user
            const { totalAmountEarned, numberOfReferrals } = await InviteSchemaController.calculateEarningsAndReferralsForMobileNumber(mobile_number);

            //send response to user
            return res.status(200).json({
                referrals: inviteUser,
                totalAmount: totalAmountEarned,
                totalCount: numberOfReferrals
            });
        } catch (err) {
            console.error('Error in getInvites:', err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async calculateEarningsAndReferralsForMobileNumber(mobileNumber) {
        try {
            // Calculate total amount earned for the specific mobile number
            const totalAmountEarned = await Invite.aggregate([
                { $match: { status: 'Accepted', invitee_mobile_number: mobileNumber } },
                { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
            ]);

            // Calculate number of referrals for the specific mobile number
            const numberOfReferrals = await Invite.countDocuments({ status: 'Accepted', invitee_mobile_number: mobileNumber });

            return {
                totalAmountEarned: totalAmountEarned.length > 0 ? totalAmountEarned[0].totalAmount : 0,
                numberOfReferrals: numberOfReferrals
            };
        } catch (err) {
            console.error('Error calculating earnings and referrals for mobile number:', err);
            throw err;
        }
    }
}

module.exports = InviteSchemaController;
