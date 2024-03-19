import React, { useEffect, useState } from 'react';
import { MdAccountBalanceWallet, MdAddCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import { getBalance } from '../api/BalanceApi';

const Withdraw = () => {
    const [balance, setBalance] = useState();
    const navigate = useNavigate();

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

            {/* Navbar */}
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdAccountBalanceWallet size={30} className='mr-3' />
                    <h4 className='mb-0'> <b> Withdraw</b></h4>
                </div>
                <div className="col text-end">
                    <b>Records</b>
                </div>
            </div>

            {/* Balance */}
            <div className="row">
                <div className="col text-center py-2">
                    <h6 className='text-secondary'><b>Balance</b></h6>
                    <h4 className='mb-0'><b>₹ {balance || 0}</b></h4>
                </div>
            </div>

            {/* UPI and Bank Details */}
            <div className="container bg-white rounded-3 shadow border">
                <div className="row">
                    <div className="col-2 bg-primary text-center text-white rounded">UPI</div>
                </div>
                <div className="row ">
                    {/*                     
                    {
                            upiDetails ? 
                            <div className="col px-4 py-2">
                                <h6>
                                    UPI ID: {upiDetails.UPIID}
                                    <br className='mb-2' />
                                </h6>
                            </div>
                            :
                            <div className="col px-4 py-2 text-center" onClick={() => navigate('/upi-id')}>
                                <MdAddCircleOutline className='mb-3'  size={40} />
                            </div>
                    } */}
                </div>
            </div>
            {/* <div className="container mt-4 bg-white rounded-3">
                <div className="row">
                    <div className="col-2 bg-info text-center text-white rounded">Bank</div>
                </div>
                <div className="row">
                    <div className="col px-4 py-2">
                        <h6>
                            Name: Vishal Kumar Singh
                            <br className='mb-2' />
                            Account No: 123456789123123112
                        </h6>
                    </div>
                </div>
            </div> */}
            <div className="container mt-4 bg-white rounded-3 border shadow">
                <div className="row">
                    <div className="col-2 bg-info text-center text-white rounded">Bank</div>
                </div>
                <div className="row" >
                    {/* {
                            bankDetails ? 
                            <div className="col px-4 py-2 align-items-start">
                                <h6>
                                    Name: {bankDetails.accountHolderName}
                                    <br className='mb-2' />
                                    Account No: {bankDetails.accountNumber}
                                    <br className='mb-2'/>
                                    IFSC Code: {bankDetails.IFSCCode}
                                </h6>
                            </div>    
                            :
                            <div className="col px-4 py-2 text-center" onClick={() => navigate('/add-bank')}>
                                <MdAddCircleOutline className='mb-3'  size={40} />
                            </div>
                        } */}
                </div>
            </div>


            {/* Withdraw Amount */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <label htmlFor="WithdrawAmount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="">
                                <h1 className=" p-2"><b>₹</b></h1>
                            </div>
                            <input
                                type="text"
                                className="form-control bg-white"
                                id="WithdrawAmount"
                                placeholder='530-10000'
                                style={{
                                    outline: "none",
                                    boxShadow: "none",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderBottom: "1px solid black"
                                }}
                            />

                        </div>
                    </div>
                </div>
                <div className="row text-muted " style={{ fontSize: '12px' }}>
                    <div className="col ">
                        Amount upto 1000, fee 30 <br />
                        Amount > 1000, fee 3%
                    </div>
                    <div className="col text-end justify-content-end">
                        Maximum 100000
                        <br />
                        Minimum 530
                    </div>
                </div>
            </div>

            {/* Withdraw Button */}
            <div className="row mb-5 mt-4 px-3">
                <div className="col">
                    <button className="btn btn-dark btn-lg w-100">
                        Withdraw
                    </button>
                </div>
            </div>


            {/* Navbar */}
            <div className="container mt-5 border-top py-2 text-center fixed-bottom bg-primary" style={{ maxWidth: '500px' }}>
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

export default Withdraw;
