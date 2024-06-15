import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailDashboard from './EmailDashboard';
import Login from './Login';

function DashboardHandle() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    
    const handleLogin = (token) => {
        // Save the token in local storage
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
    };
    
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('accessToken');
        setAccessToken(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={accessToken ? (
                    <EmailDashboard accessToken={accessToken} onLogout={handleLogout} />
                ) : (
                    <Navigate to="/login" replace />
                )} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
}

export default DashboardHandle;
