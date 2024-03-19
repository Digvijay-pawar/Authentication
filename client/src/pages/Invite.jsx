import React, { useEffect, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import { getBalance } from '../api/BalanceApi';

const My = () => {
    const [balance, setBalance] = useState();

    const fetchBalance = async () => {
        try {
            const res = await getBalance();
            setBalance(res.balance);
        } catch (error) {
            // Handle error
            console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div className="container-fluid bg- border min-vh-100" style={{ maxWidth: '500px' }}>
            {/* Header */}
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdGroupAdd size={30} className='mr-2' />
                    <h4 className='mb-0'> <b> Invite</b></h4>
                </div>
            </div>

            <div className="container text-white bg-primary p-3 py-4 my-2 w-80 rounded">
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
                <div className="row text-center font-weight-bold  ">
                    <div className="col border-end">
                        {/* <img src="https://i.ibb.co/0kYp8gR/Group-1.png" alt="Group-1" border="0" /> */}
                        <b>My Team</b>
                    </div>
                    <div className="col">
                        {/* <img src="https://i.ibb.co/0kYp8gR/Group-1.png" alt="Group-1" border="0" /> */}
                        <b>Invite Link</b>
                    </div>
                </div>
            </div>

            {/* <div className="container" style={{borderBottom: "15px solid silver"}}>
                <div className="row text-center p-3">
                    <div className="col border-end">
                        Total Invite 
                        <br />
                        {totalReferral}
                        <br />
                    </div>
                    <div className="col">
                        Total Income
                        <br />
                        {totalIncome}
                        <br />
                    </div>
                </div>
            </div> */}

            <div className="container p-2">
                <div className="container">
                    <div className="row text-center mt-3 pb-2 border-bottom" style={{ fontWeight: "bold" }}>
                        <div className="col">
                            Mobile Number
                        </div>
                        <div className="col">
                            Status
                        </div>
                        <div className="col">
                            Amount
                        </div>
                    </div>
                    {/* {invites.length > 0 && invites.map((invite) => (
                            <div className="row mt-3 text-center py-3 border rounded-2" style={{fontWeight: "normal", fontSize: "20px", backgroundColor: `${invite.refferalStatus === "pending" ? "rgba(255, 255, 0, 0.150)" : "rgba(153, 240, 131, 0.150)"}`}}>
                                <div className="col">
                                    {invite.mobileNumber}
                                </div>
                                <div className={`col text-capitalize text-${invite.refferalStatus === "pending" ? "warning" : "success"}`}>
                                    <b>{invite.refferalStatus }</b>
                                </div>
                                <div className="col">
                                    {invite.referralAmount}
                                </div>
                            </div>
                    ))} */}
                </div>
            </div>


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

export default My;
