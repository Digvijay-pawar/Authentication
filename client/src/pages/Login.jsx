import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogin, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        mobile_number: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { mobile_number, password } = formData;
        
        //Validations
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

        //Login logic here
        console.log(formData)
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login-user`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                mobile_number,
                password
            })
        });

        const res = await data.json();

        if(res.message){
            localStorage.setItem("usersdatatoken",res.token);
            navigate('/home');
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid border min-vh-100" style={{ maxWidth: '500px' }}>
            <div className="row text-dark justify-content-between align-items-center bg-primary">
                <div className="col py-3 d-flex align-items-center">
                    <MdLogin size={30} className="mr-3" />
                    <h4 className="mb-0"> <b> &nbsp; Login</b></h4>
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
                        <div
                            className={`toast align-items-center justify-content-center w-100 text-white bg-danger mt-3 mb-3 ${error ? 'show' : ''}`}
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                        >
                            <div className="toast-body">
                                <h6><b>{error}</b></h6>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="tel" className="form-control py-2" required onChange={handleChange} value={formData.mobile_number} name="mobile_number" placeholder="Mobile Number" style={{ outline: "none", boxShadow: "none" }} />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control py-2" required onChange={handleChange} value={formData.password} name="password" placeholder="Create Password" style={{ outline: "none", boxShadow: "none" }} />
                                <button type="button" className="btn btn-outline-dark" onClick={togglePasswordVisibility}>
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-dark btn-lg form-control"><b>Login</b></button>
                        </div>
                        <div className="text-center mb-3">
                            <Link to="/forgot-password" className="text-primary text-decoration-underline"><b>Forgot Password?</b></Link>
                        </div>
                        <div className="text-center">
                            <span className="text-secondary">Don't have an account?</span>
                            <br />
                            <Link to={'/register'} className='btn btn-info w-50 mt-3'>Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
