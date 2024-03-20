import React, { useEffect, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import { getBalance } from '../api/BalanceApi';
import { getInvites } from '../api/InviteApi';

const Invite = () => {
    const [balance, setBalance] = useState();
    const [totalAmt, setTotalAmt] = useState();
    const [totalCount, setTotalCount] = useState();
    const [referral, setReferral] = useState([]);

    const fetchBalance = async () => {
        try {
            const res = await getBalance();
            setBalance(res.balance);
        } catch (error) {
            // Handle error
            console.error('Error fetching balance:', error);
        }
    };

    const fetchInvites = async () => {
        try {
            const res = await getInvites();
            console.log(res)
            setTotalAmt(res.totalAmount);
            setTotalCount(res.totalCount);
            setReferral(res.referrals);
            console.log(res.referrals);
        } catch (error) {
            console.error("Error fetching invite details");
        }
    }

    useEffect(() => {
        fetchBalance();
        fetchInvites();
    }, []);

    return (
        <div className="container-fluid bg- border min-vh-100" style={{ maxWidth: '500px' }}>
            {/* Header */}
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdGroupAdd size={30} className='mr-2' />
                    <h4 className='mb-0'> <b> &nbsp; Invite</b></h4>
                </div>
            </div>

            <div className="container mt-2 shadow text-white bg-primary p-3 py-4 Invite-2 w-80 rounded">
                <div className="row">
                    <div className="col">
                        Balance
                        <br />
                        <span className='text-white'><h5><b>₹ {balance || 0}</b></h5></span>
                    </div>
                    <div className="col text-end">
                        <Link to="/withdraw" className="btn btn-dark btn-lg">
                            Withdraw
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container py-3" style={{ borderBottom: "15px solid silver" }}>
                <div className="row text-center font-weight-bold  text-dark">
                    <div className="col border-end">
                        {/* <img src="https://i.ibb.co/0kYp8gR/Group-1.png" alt="Group-1" border="0" /> */}
                        <b>Invite Team</b>
                    </div>
                    <div className="col">
                        {/* <img src="https://i.ibb.co/0kYp8gR/Group-1.png" alt="Group-1" border="0" /> */}
                        <b>Invite Link</b>
                    </div>
                </div>
            </div>

            <div className="container" style={{ borderBottom: "15px solid silver" }}>
                <div className="row text-center text-dark p-3">
                    <div className="col border-end">
                        Total Invite
                        <br />
                        {totalCount}
                        <br />
                    </div>
                    <div className="col">
                        Total Income
                        <br />
                        {totalAmt}
                        <br />
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="container-fluid p-0" data-bs-scroll="true">
                    <div className="row text-dark text-center mt-3 pb-2 border-bottom" style={{ fontWeight: "bold" }}>
                        <div className="col-5">
                            Mobile Number
                        </div>
                        <div className="col">
                            Status
                        </div>
                        <div className="col">
                            Amount
                        </div>
                    </div>
                    {
                        referral.map(invite => (
                            <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${invite.status === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                                <div className="col">
                                    {invite.invitee_mobile_number}
                                </div>
                                <div className={`col text-capitalize text-${invite.status === "Pending" ? "warning" : "success"}`}>
                                    <b>{invite.status}</b>
                                </div>
                                <div className="col">
                                    {invite.amount}
                                </div>
                            </div>
                        ))
                    }
                    <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${1 === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                        <div className="col">
                            8389893434
                        </div>
                        <div className={`col text-capitalize text-${1 === "Pending" ? "warning" : "success"}`}>
                            <b>Approved</b>
                        </div>
                        <div className="col">
                            100
                        </div>
                    </div>
                    <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${1 === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                        <div className="col">
                            8389893434
                        </div>
                        <div className={`col text-capitalize text-${1 === "Pending" ? "warning" : "success"}`}>
                            <b>Approved</b>
                        </div>
                        <div className="col">
                            100
                        </div>
                    </div>
                    <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${1 === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                        <div className="col">
                            8389893434
                        </div>
                        <div className={`col text-capitalize text-${1 === "Pending" ? "warning" : "success"}`}>
                            <b>Approved</b>
                        </div>
                        <div className="col">
                            100
                        </div>
                    </div>
                    <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${1 === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                        <div className="col">
                            8389893434
                        </div>
                        <div className={`col text-capitalize text-${1 === "Pending" ? "warning" : "success"}`}>
                            <b>Approved</b>
                        </div>
                        <div className="col">
                            100
                        </div>
                    </div>
                    <div className="row shadow mt-3 m-3 text-center py-3 border rounded-2" style={{ fontWeight: "normal", fontSize: "20px", backgroundColor: `${1 === "Pending" ? "rgba(255, 255, 0, 0.350)" : "rgba(153, 240, 131, 0.350)"}` }}>
                        <div className="col">
                            8389893434
                        </div>
                        <div className={`col text-capitalize text-${1 === "Pending" ? "warning" : "success"}`}>
                            <b>Approved</b>
                        </div>
                        <div className="col">
                            100
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 m-5"></div>

            {/* Footer */}
            <div className="container border-top py-2 text-center fixed-bottom bg-primary" style={{ maxWidth: '500px' }}>
                <div className="row">
                    <div className="col">
                        <NavbarTab tabName="Home" />
                    </div>
                    <div className="col">
                        <NavbarTab tabName="Invite" />
                    </div>
                    <div className="col">
                        <NavbarTab tabName="Recharge" />
                    </div>
                    <div className="col">
                        <NavbarTab tabName="My" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invite;
