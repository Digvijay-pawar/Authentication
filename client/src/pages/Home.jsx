import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [mobile_number, setMobile_number] = useState();
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const getCurrentUser = async () => {
        let token = localStorage.getItem("usersdatatoken");
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-user`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": token
            }
        });
        const res = await data.json();

        if (res.message) {
            setMobile_number(res.mobile_number);
            setStatus(res.status);
        }
    }

    const handleLogout = async () => {
        let token = localStorage.getItem("usersdatatoken");
        localStorage.removeItem('usersdatatoken');
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": token
            }
        });
        const res = await data.json();

        if(res.message){
            navigate('/')
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        <div className='card p-5 bg-info m-5 text-center align-items-center'>
            <h1>Home page</h1>
            <h3>User Details</h3>
            <h5>Mobile Number: {mobile_number}</h5>
            <h5 className='text-capitalize text-dark'>Account Status: {status}</h5>
            <button className='btn btn-danger btn-lg w-50' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;