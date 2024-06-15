import React from 'react';

function EmailList({ group, emails }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Emails for {group.name}</h2>
            {emails && emails.length > 0 ? (
                <ul>
                    {emails.map((email) => (
                        <li key={email._id} className="p-2 border-b last:border-b-0">
                            <p><strong>From:</strong> {email.sender}</p>
                            <p><strong>Subject:</strong> {email.subject}</p>
                            <p><strong>Date:</strong> {email.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No emails found for this group.</p>
            )}
        </div>
    );
}

export default EmailList;
