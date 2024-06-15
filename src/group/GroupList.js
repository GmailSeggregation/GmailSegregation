import React from 'react';

function GroupList({ groups, onGroupSelect }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Available Groups</h2>
            <ul>
                {groups && groups.length > 0 ? (
                    groups.map((group) => (
                        <li
                            key={group._id}
                            onClick={() => onGroupSelect(group._id)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {group.name}
                        </li>
                    ))
                ) : (
                    <li>No groups available.</li>
                )}
            </ul>
        </div>
    );
}

export default GroupList;
