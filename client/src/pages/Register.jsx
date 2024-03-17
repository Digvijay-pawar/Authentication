import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAppRegistration, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [formData, setFormData] = useState({
        mobile_number: '',
        password: '',
        confirmPassword: '',
        otp: '',
        invite_code: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { mobile_number, password, confirmPassword, otp, invite_code } = formData;
        setError('');

        // Validation for mobile number
        const mobile_numberRegex = /^\d{10}$/;
        if (!mobile_numberRegex.test(mobile_number)) {
            setError('Mobile number must be 10 digits');
            return;
        }

        // Validation for password
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        // Validation for password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validation for OTP
        const otpRegex = /^\d{6}$/;
        if (!otpRegex.test(otp)) {
            setError('OTP must be 6 digits');
            return;
        }

        // Register logic here
        console.log(formData, process.env.REACT_APP_BACKEND_URL)
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mobile_number,
                password,
                invite_code,
                otp
            })
        });

        const res = await data.json();
        if (res.message) {
            localStorage.setItem("usersdatatoken",res.token);
            navigate('/home')
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSendOtp = () => {
        // Logic to send OTP
        const { mobile_number } = formData;
        if (!mobile_number) {
            setError('Mobile number is required');
            return;
        }

        // For now, let's just set the countdown to 60 seconds
        setCountdown(60);
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="container-fluid border min-vh-100" style={{ maxWidth: '500px' }}>
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdAppRegistration size={30} className='mr-3' />
                    <h4 className='mb-0'> <b> Create Account</b></h4>
                </div>
            </div>
            <div className="row p-5 text-center">
                <div className="col">
                    Logo
                </div>
            </div>
            <div className="row justify-content-between align-items-center py-3">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        {/* Bootstrap alert for displaying errors */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="mb-3">
                            <input type="tel" required className="form-control py-2" onChange={handleChange} value={formData.mobile_number} name="mobile_number" placeholder="Mobile Number" style={{ outline: "none", boxShadow: "none" }} />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} required className="form-control py-2" onChange={handleChange} value={formData.password} name="password" placeholder="Create Password" style={{ outline: "none", boxShadow: "none" }} />
                                <button type="button" className="btn btn-outline-dark" onClick={togglePasswordVisibility}>
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type={showConfirmPassword ? "text" : "password"} required className="form-control py-2" onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" placeholder="Confirm Password" style={{ outline: "none", boxShadow: "none" }} />
                                <button type="button" className="btn btn-outline-dark" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" required className="form-control py-2" onChange={handleChange} value={formData.otp} name="otp" placeholder="OTP" style={{ outline: "none", boxShadow: "none" }} />
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-success form-control py-2" onClick={handleSendOtp} disabled={countdown > 0}><b>{countdown > 0 ? `Resend OTP (${countdown})` : "Send OTP"}</b></button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control py-2" onChange={handleChange} name="invite_code" value={formData.invite_code} placeholder="Invite Code" style={{ outline: "none", boxShadow: "none" }} />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-dark btn-lg form-control py-2"><b>Create Account</b></button>
                        </div>
                        <div className="text-center">
                            <span className="text-secondary">Already have an account?</span>
                            <br />
                            <Link to={'/'} className='btn btn-info w-50 mt-3'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
