import React, { useState } from 'react';
import axios from 'axios';

function Search({ accessToken, onSearchResults, setLoading }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    const searchEmails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/search-emails', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { query: searchQuery },
            });
            onSearchResults(response.data); // Pass search results to EmailDashboard
            setLoading(false);
        } catch (error) {
            setError(`Error searching emails: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="search">
            <div className='flex flex-row items-center justify-center gap-4'>
            <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-5/6 p-3 border-2 rounded-xl '
            />
            <button onClick={searchEmails} className=''>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-14 h-14">
  <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clip-rule="evenodd" />
</svg>

            </button>
            </div>
            {error && <p className="error-message">Error: {error}</p>}
        </div>
    );
}

export default Search;
