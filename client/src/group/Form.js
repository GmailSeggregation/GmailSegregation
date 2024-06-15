import React, { useState } from 'react';

function Form({ onCreateGroup }) {
    const [groupName, setGroupName] = useState('');
    const [senderEmails, setSenderEmails] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (groupName && senderEmails) {
            setLoading(true);
            setError('');

            try {
                // Send POST request to create a new group
                const response = await fetch('/group', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: groupName,
                        senderEmails: senderEmails.split(',').map(email => email.trim()),
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create group');
                }

                const newGroup = await response.json();

                // Call the parent function to add the new group
                onCreateGroup(newGroup);

                // Reset form fields
                setGroupName('');
                setSenderEmails('');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Create New Group</h2>
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="groupName" className="block mb-2 font-medium">Group Name:</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="senderEmails" className="block mb-2 font-medium">Sender Emails (comma-separated):</label>
                    <input
                        type="text"
                        id="senderEmails"
                        value={senderEmails}
                        onChange={(e) => setSenderEmails(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className={`p-2 text-white bg-blue-500 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Group'}
                </button>
            </form>
        </div>
    );
}

export default Form;
