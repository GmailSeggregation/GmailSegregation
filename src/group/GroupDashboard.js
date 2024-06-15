import React, { useState, useEffect } from 'react';

function GroupDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch the dashboard data
    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/group');
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
                setLoading(false);
            } else {
                setError('Failed to fetch data');
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Error fetching data');
            setLoading(false);
        }
    };

    // Fetch the dashboard data when the component mounts
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Conditional rendering based on loading and error state
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Group Dashboard</h1>
            {/* Render the dashboard data here */}
            {dashboardData && (
                <div>
                    <p>Group Name: {dashboardData.groupName}</p>
                    <p>Number of Members: {dashboardData.numMembers}</p>
                    {/* Render other data as needed */}
                </div>
            )}
        </div>
    );
}

export default GroupDashboard;
