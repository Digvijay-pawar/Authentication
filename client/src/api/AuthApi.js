// api.js

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/auth'; // Replace with your actual API base URL

// Function to handle POST request to create user
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (data.message) {
            localStorage.setItem("usersdatatoken", data.token);
        }
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to handle POST request to login user
export const loginUser = async (loginData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();

        if(data.message){
            localStorage.setItem("usersdatatoken", data.token);
        }
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Function to handle PATCH request to change password
export const changePassword = async (passwordData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/change-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

// Function to handle GET request to get user
export const getUser = async () => {
    const token = localStorage.getItem('usersdatatoken');
    try {
        const response = await fetch(`${API_BASE_URL}/get-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Function to handle GET request to validate user
export const validateUser = async () => {
    const token = localStorage.getItem('usersdatatoken');
    try {
        const response = await fetch(`${API_BASE_URL}/valid-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error validating user:', error);
        throw error;
    }
};

// Function to handle GET request to logout user
export const logoutUser = async () => {
    const token = localStorage.getItem('usersdatatoken')
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
        });
        const data = await response.json();
        localStorage.removeItem('usersdatatoken');
        return data;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
};

// Function to handle POST request to send OTP to user
export const sendOtp = async (emailData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

// Function to handle POST request to verify OTP
export const verifyOtp = async (otpData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};
