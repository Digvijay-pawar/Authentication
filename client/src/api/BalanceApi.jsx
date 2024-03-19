// api.js

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL; // Replace with your actual API base URL

// Function to handle GET request to fetch balance
export const getBalance = async () => {
    let token = localStorage.getItem('usersdatatoken')
    try {
        const response = await fetch(`${API_BASE_URL}/balance/get-balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

// Function to handle POST request to update balance
export const updateBalance = async (updateData) => {
    let token = localStorage.getItem('usersdatatoken')
    try {
        const response = await fetch(`${API_BASE_URL}/balance/update-balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify(updateData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating balance:', error);
        throw error;
    }
};
