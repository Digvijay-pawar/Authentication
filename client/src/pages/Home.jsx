import React, { useEffect, useState } from 'react';
import { MdHomeFilled, MdRefresh } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import NavbarTab from '../components/NavbarTab';
import FastParityImg from '../img/fast-parity.jpg';
import ParityImg from '../img/parity.jpg';
import Parity1Img from '../img/parity1.jpg';
import SapreImg from '../img/sapre.jpg';
import {getBalance} from '../api/BalanceApi';
function Home() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);

    const fetchBalance = async () => {
        try {
          const res = await getBalance();
          setBalance(res.balance);
        } catch (error) {
          // Handle error
          console.error('Error fetching balance:', error);
        }
    };

    const handleRefreshBalance = async () => {
        try {
            await getBalance();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div className="container-fluid bg- border min-vh-100" style={{ maxWidth: '500px' }}>
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdHomeFilled size={30} className='mr-2' />
                    <h4 className='mb-0'><b> Home</b></h4>
                </div>
            </div>

            <div className="row justify-content-between align-items-center border-bottom py-2">
                <div className="col-6 align-items-center py-3 overflow-hidden">
                    <h5 className="mb-0">Balance</h5>
                    <div className="d-flex mt-2">
                        <h4 className='mb-0'><b>₹ {balance || 0}</b></h4>
                        <MdRefresh
                            size={30}
                            onClick={handleRefreshBalance}
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                </div>
                <div className="col-6 text-end">
                    <Link to={'/withdraw'} className="btn btn-primary mx-2 btn-sm w-100"><b>Withdraw</b></Link>
                    <Link to={'/recharge'} className="btn btn-outline-dark mx-2 mt-2 btn-sm w-100"> <b> Recharge</b></Link>
                </div>
            </div>

            <div className="container">
                <div className="row p-2 py-3 justify-content-between align-items-center gap-1">
                    <div className="col card bg-success p-2 text-white" onClick={() => navigate('/task-reward')} ><b>Task Reward</b></div>
                    <div className="col card bg-info p-2 text-white" onClick={() => navigate('/check-in')} ><b>Daily Reward</b></div>
                </div>
            </div>

            <div className="row border-top py-2">
                <div className="col-6 p-1">
                    <img src={FastParityImg} className="w-100 img-fluid rounded" alt="" />
                </div>
                <div className="col-6 p-1">
                    <img src={Parity1Img} className="w-100 img-fluid rounded" alt="" />
                </div>
                <div className="col-6 p-1 mt-2">
                    <img src={SapreImg} className="w-100 img-fluid rounded" alt="" />
                </div>
                <div className="col-6 p-1 mt-2">
                    <img src={ParityImg} className="w-100 img-fluid rounded" alt="" />
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
}

export default Home;
