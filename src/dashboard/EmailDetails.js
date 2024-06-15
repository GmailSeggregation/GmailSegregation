import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EmailDetails({ accessToken }) {
    const { emailId } = useParams(); // Get the email ID from the URL parameters
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch email details
    useEffect(() => {
        const fetchEmailDetails = async () => {
            try {
                // Make a GET request to fetch email details
                const response = await axios.get(`/api/mails/${emailId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
                    },
                });

                if (response.status === 200) {
                    // Set email data state
                    setEmail(response.data);
                } else {
                    // Handle unexpected response status
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (err) {
                // Log and set error state
                console.error(`Error fetching email details: ${err.message}`);
                setError(`Error fetching email details: ${err.message}`);
            } finally {
                // Set loading state to false once data is fetched
                setLoading(false);
            }
        };

        // Fetch email details only if emailId and accessToken are available
        if (emailId && accessToken) {
            fetchEmailDetails();
        }
    }, [emailId, accessToken]);

    // Display loading state while fetching data
    if (loading) {
        return <p>Loading...</p>;
    }

    // Display error message if an error occurs
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    // Display message if email data is not found
    if (!email) {
        return <p>No email details found.</p>;
    }

    // Display email details
    return (
        <div className="p-4 email-details">
            {/* Button to navigate back to the previous page */}
            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>

            {/* Display email details */}
            <h2>{email.subject}</h2>
            <p><strong>From:</strong> {email.sender}</p>
            <p><strong>To:</strong> {email.recipient || 'N/A'}</p>
            <p><strong>Date:</strong> {email.date}</p>
            <p><strong>Body:</strong> {email.body}</p>

            {/* Display attachments if any */}
            {email.attachments && email.attachments.length > 0 && (
                <div className="attachments">
                    <strong>Attachments:</strong>
                    <ul>
                        {email.attachments.map((attachment) => (
                            <li key={attachment.id}>
                                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                    {attachment.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EmailDetails;
