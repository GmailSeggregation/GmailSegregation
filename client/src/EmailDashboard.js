import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmailDetails from './dashboard/EmailDetails';
import Inbox from './dashboard/Inbox';
import Search from './dashboard/Search';
import Group from './group/GroupDashboard';
import axios from 'axios';

function EmailDashboard({ accessToken, onLogout }) {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (accessToken) {
            const fetchEmails = async () => {
                try {
                    const response = await axios.get('/api/mails', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    setEmails(response.data);
                } catch (err) {
                    console.error(`Error fetching emails: ${err.message}`);
                    setError(`Error fetching emails: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchEmails();
        }
    }, [accessToken]);

    return (
        <div className="min-h-screen text-white bg-gradient-to-r from-gray-800 to-slate-800">
            <div className="fixed top-0 left-0 right-0 z-10 py-3 bg-slate-500">
                <div className="container flex items-center justify-between mx-auto">
                    <h1 className="text-4xl font-bold">Recent Gmails</h1>
                    <div className="flex items-center space-x-4">
                        <Search accessToken={accessToken} onSearchResults={setEmails} setLoading={setLoading} />
                        <Link to="/group" className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">Create Group</Link>
                        <button onClick={onLogout} className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600">Log Out</button>
                    </div>
                </div>
            </div>
            <div className="container pt-24 mx-auto">
                <Routes>
                    <Route path="/" element={<Inbox emails={emails} loading={loading} />} />
                    <Route path="/email/:emailId" element={<EmailDetails accessToken={accessToken} />} />
                    <Route path="/group" element={<Group />} />
                </Routes>
            </div>
        </div>
    );
}

export default EmailDashboard;
