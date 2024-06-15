import React, { useState, useEffect } from 'react';
import Login from './login';
import EmailDashboard from './EmailDashboard';
import axios from 'axios';

function App() {
    const [accessToken, setAccessToken] = useState(() => {
        // Retrieve access token from local storage on initial load
        return localStorage.getItem('accessToken') || '';
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // If there's a code in the URL, fetch the access token
        if (code) {
            axios.post('/api/get-token', { code })
                .then(response => {
                    const token = response.data.accessToken;
                    // Store the access token in local storage and state
                    localStorage.setItem('accessToken', token);
                    setAccessToken(token);
                })
                .catch(err => console.error(`Failed to fetch token: ${err.message}`));
        }
    }, []);

    const handleLogout = () => {
        // Clear access token from state and local storage
        localStorage.removeItem('accessToken');
        setAccessToken('');
    };

    return (
        <div className='app-container'>
            {/* Render Login or EmailDashboard based on access token */}
            {!accessToken ? (
                <Login onLogin={(token) => {
                    // Store the access token in local storage and state
                    localStorage.setItem('accessToken', token);
                    setAccessToken(token);
                }} />
            ) : (
                <EmailDashboard accessToken={accessToken} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
