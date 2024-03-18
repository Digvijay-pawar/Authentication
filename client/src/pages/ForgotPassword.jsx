import React, { useState } from 'react';
import { MdReply, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        mobile_number: '',
        new_password: '',
        otp: ''
    });
    const handleSuccess = (msg) => {
        toast.success(msg);
    };

    const handleError = (err) => {
        toast.error(err);
    };
    const [countdown, setCountdown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { mobile_number, new_password, otp } = formData;
        // Validation for mobile number
        const mobile_numberRegex = /^\d{10}$/;
        if (!mobile_numberRegex.test(mobile_number)) {
            handleError('Mobile number must be 10 digits');
            return;
        }

        // Validation for password
        if (new_password.length < 8) {
            handleError('Password must be at least 8 characters long');
            return;
        }

        if (otp.length < 6) {
            handleError('OTP must be 6 digits');
            return;
        }

        // Submit the form
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                mobile_number,
                new_password,
                otp
            })
        });

        const res = await data.json();

        if (res.message) {
            handleSuccess("Password Changed successfully!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            //handleError("Login Failed!");
            handleError(res.error); // Set the error message received from the backend
        }
    };

    const handleSendOtp2 = () => {
        const { mobile_number } = formData;
        if (!mobile_number) {
            handleError('Mobile number is required');
            return;
        }
        setCountdown(60);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid border min-vh-100" style={{ maxWidth: '500px' }}>
            <ToastContainer />
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdReply size={30} className='mr-3' onClick={() => navigate('/login')} />
                    <h4 className='mb-0'> <b> Forgot Password?</b></h4>
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
                        <div className="mb-3">
                            <input type="tel" className="form-control py-2" onChange={handleChange} required value={formData.mobile_number} name="mobile_number" placeholder="Mobile Number" style={{ outline: "none", boxShadow: "none" }} />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control py-2" onChange={handleChange} required value={formData.new_password} name="new_password" placeholder="New Password" style={{ outline: "none", boxShadow: "none" }} />
                                <button type="button" className="btn btn-outline-dark" onClick={togglePasswordVisibility}>
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" className="form-control py-2" onChange={handleChange} required value={formData.otp} name="otp" placeholder="OTP" style={{ outline: "none", boxShadow: "none" }} />
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-success form-control py-2" onClick={handleSendOtp2} disabled={countdown > 0}><b>{countdown > 0 ? `Resend OTP (${countdown})` : "Send OTP"}</b></button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-dark btn-lg form-control py-2"><b>Change Password</b></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
