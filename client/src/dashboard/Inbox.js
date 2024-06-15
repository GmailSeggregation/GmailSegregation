import React from 'react';

function formatDateTime(dateTimeString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
}

function Inbox({ emails, loading }) {
    const openEmailInGmail = (emailId) => {
        window.open(`https://mail.google.com/mail/u/0/#inbox/${emailId}`);
    };

    return (
        <div className="p-4 inbox">
            {loading ? (
                <p>Loading...</p> 
            ) : (
                <table className="w-full overflow-hidden border-collapse rounded-lg table-auto">
                    <thead>
                        <tr className="text-black bg-gray-300">
                            <th className="p-3">From</th>
                            <th className="p-3">Subject</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email) => (
                            <tr key={email.id} className="transition-colors duration-300 cursor-pointer hover:bg-gray-50 hover:text-gray-500 shadow-m d" onClick={() => openEmailInGmail(email.id)}>
                                <td className="p-3">{email.sender}</td>
                                <td className="p-3">{email.subject}</td>
                                <td className="p-3">{formatDateTime(email.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Inbox;
