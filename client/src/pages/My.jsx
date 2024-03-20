import React, { useEffect, useState } from 'react';
import { MdAccountCircle, MdArrowCircleRight, MdLogout, MdDescription, MdFileDownload, MdAccountBox, MdEdit, MdSend, MdHistory } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import { getBalance } from '../api/BalanceApi';
import { logoutUser } from '../api/AuthApi';
import { getInvites } from '../api/InviteApi';

const My = () => {
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

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            console.log(res)
            if (res.message) {
                navigate('/');
            }
        } catch (error) {
            console.error("Error user logout:", error);
        }
    }

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div className="container-fluid bg- border min-vh-100" style={{ maxWidth: '500px' }}>
            {/* Header */}
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdAccountCircle size={30} className='mr-2' />
                    <h4 className='mb-0'><b> Account</b></h4>
                </div>
            </div>

            {/* Content */}
            <div className="container p-4 mt-2 rounded" style={{ background: "rgb(0,0,255, 0.75)", color: "whitesmoke" }}>
                <div className="row">
                    <div className="col-3 p-0">
                        <MdAccountCircle className="text-white" size={70} />
                    </div>
                    <div className="col mt-2">
                        <span><big><b>7378744047</b></big></span>
                        <br />
                        <span className='' style={{ fontSize: "15px", fontWeight: "bold", color: "whitesmoke" }}>Balance: ₹ {balance || 0}</span>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-7">
                        <button className=" btn btn-light w-100 btn-sm"><MdEdit size={15} className='mr-2' /> Change Password</button>
                    </div>
                    <div className="col-5">
                        <button className="btn btn-dark w-100  btn-sm" onClick={handleLogout}>
                            <MdLogout size={15} className='mr-2' />
                            <b> Logout</b></button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col p-2 px-4">
                    <ul>
                        <li className='py-3'>
                            <div className="row">
                                <div className='col-md-1 col-2'>
                                    <MdDescription size={30} className='mr-2' />
                                </div>
                                <div className="col">
                                    <Link to="/finantial-details" className="text-decoration-none text-dark"><b>Finantial History</b></Link>
                                </div>
                                <div className="col-2 text-end">
                                    <MdArrowCircleRight size={30} className='mr-2' />
                                </div>
                            </div>
                        </li>
                        <li className='py-3 border-top '>
                            <div className="row">
                                <div className="col-md-1 col-2">
                                    <MdHistory size={30} className='mr-2' />
                                </div>
                                <div className="col">
                                    <Link to="/recharge" className="text-decoration-none text-dark"><b>Game History</b></Link>
                                </div>
                                <div className="col-2 text-end">
                                    <MdArrowCircleRight size={30} className='mr-2' />
                                </div>
                            </div>
                        </li>
                        <li className="py-3 border-top">
                            <div className="row">
                                <div className="col-md-1 col-2">
                                    <MdAccountBox size={30} className='mr-2' />
                                </div>
                                <div className="col">
                                    <Link to="/recharge" className="text-decoration-none text-dark"><b>Contact us</b></Link>
                                </div>
                                <div className="col-2 text-end">
                                    <MdArrowCircleRight size={30} className='mr-2' />
                                </div>
                            </div>
                        </li>
                        <li className="py-3 border-top">
                            <div className="row">
                                <div className="col-md-1 col-2">
                                    <MdSend size={30} className='mr-2' />
                                </div>
                                <div className="col">
                                    <Link to="/recharge" className="text-decoration-none text-dark"><b>Follow Us</b></Link>
                                </div>
                                <div className="col-2 text-end">
                                    <MdArrowCircleRight size={30} className='mr-2' />
                                </div>
                            </div>
                        </li>
                        <li className="py-3 border-top">
                            <div className="row">
                                <div className="col-md-1 col-2">
                                    <MdFileDownload size={30} className='mr-2' />
                                </div>
                                <div className="col">
                                    <Link to="/recharge" className="text-decoration-none text-dark"><b>Download App</b></Link>
                                </div>
                                <div className="col-2 text-end">
                                    <MdArrowCircleRight size={30} className='mr-2' />
                                </div>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>

            <div className="row mb-5">
                <div className="col text-center">
                </div>
            </div>

            {/* Footer */}
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

export default My;
