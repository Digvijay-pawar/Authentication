import React, { useEffect, useState } from 'react';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import { getBalance } from '../api/BalanceApi';

const Recharge = () => {
    const [balance, setBalance] = useState();
    const navigate = useNavigate();
    const [rechargeAmount, setRechargeAmount] = useState('');

    // Function to handle click on predefined recharge amounts
    const handleAmountClick = async (amount) => {
        setRechargeAmount(amount);
    };

    const fetchBalance = async () => {
        try {
            const res = await getBalance();
            setBalance(res.balance);
        } catch (error) {
            // Handle error
            console.error('Error fetching balance:', error);
        }
    };

    // Function to handle recharge button click
    const handleRecharge = () => {

    };

    useEffect(() => {
        fetchBalance();
    })

    return (
        <div className="container-fluid bg- border min-vh-100" style={{ maxWidth: '500px' }}>
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdAccountBalanceWallet size={30} className='mr-3' />
                    <h4 className='mb-0'> <b>&nbsp; Recharge</b></h4>
                </div>
                <div className="col text-end">
                    <Link to={"/recharge-records"} className='text-dark text-decoration-none'><b>Records</b></Link>
                </div>
            </div>

            <div className="row">
                <div className="col text-center py-4">
                    <h6 className='text-secondary'><b>Balance</b></h6>
                    <h4 className='mb-0'><b>₹ {balance || 0}</b></h4>
                </div>
            </div>

            <div className="container mt-1">
                <div className="row">
                    <div className="col text-dark">
                        <label htmlFor="rechargeAmount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="">
                                <h1 className=" p-2"><b>₹</b></h1>
                            </div>
                            <input
                                type="text"
                                className="form-control bg-"
                                id="rechargeAmount"
                                placeholder='500-10000'
                                style={{
                                    outline: "none",
                                    boxShadow: "none",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderBottom: "1px solid black"
                                }}
                                value={rechargeAmount}
                                onChange={(e) => setRechargeAmount(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row p-3">
                <div className="d-flex gap-2">
                    <div className="col-4 py-2 border bg-light font-weight-bold rounded text-center" onClick={() => handleAmountClick('500')}>
                        <b> 500 </b>
                    </div>
                    <div className="col-4 py-2 font-weight-bold bg-light rounded border text-center" onClick={() => handleAmountClick('1000')}>
                        <b>1000 </b>
                    </div>
                    <div className="col-4 py-2 font-weight-bold bg-light border rounded text-center" onClick={() => handleAmountClick('2000')}>
                        <b>2000 </b>
                    </div>
                </div>
            </div>
            <div className="row px-3">
                <div className="d-flex gap-2">
                    <div className="col-4 py-2 border font-weight-bold bg-light rounded text-center" onClick={() => handleAmountClick('1500')}>
                        <b> 1500 </b>
                    </div>
                    <div className="col-4 py-2 font-weight-bold bg-light border rounded text-center" onClick={() => handleAmountClick('2500')}>
                        <b>2500 </b>
                    </div>
                    <div className="col-4 py-2 font-weight-bold bg-light border rounded text-center" onClick={() => handleAmountClick('5000')}>
                        <b>5000 </b>
                    </div>
                </div>
            </div>

            <div className="row mt-4 px-3">
                <div className="col">
                    <button className="btn btn-dark btn-lg w-100" onClick={handleRecharge}>
                        Recharge
                    </button>
                </div>
            </div>

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

export default Recharge;
