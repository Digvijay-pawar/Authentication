// api.js

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/invite'; // Replace with your actual API base URL

// Function to handle GET request to fetch balance
export const getInvites = async () => {
    let token = localStorage.getItem('usersdatatoken')
    try {
        const response = await fetch(`${API_BASE_URL}/get-invite`, {
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
