import React from 'react';

const About = () => {
  // Dummy data representing members' information
  const members = [
    {
      id: 1,
      photoUrl: 'https://i.postimg.cc/W4dK3hJh/venkatesh2.jpg', // Placeholder image URL
      name: 'Venkatesh Badarala',
      teamLead: 'Team Member',
      role: 'React Developer',
    },
    {
      id: 2,
      photoUrl: 'https://i.postimg.cc/jSp2gJKb/suraj-pic.jpg',
      name: 'Suraj Lankey',
      teamLead: 'Team Member',
      role: 'Frontend Designer',
    },
    {
      id: 3,
      photoUrl: 'https://i.postimg.cc/NjcfRvxs/dhnaush1.jpg',
      name: 'Dhanush Sabbisetty',
      teamLead: 'Team Lead',
      role: 'Backend Developer ',
    },
    {
      id: 4,
      photoUrl: 'https://i.postimg.cc/9F3WjHKd/IMG-20231230-123800-2.jpg',
      name: 'Sahitya  Remella',
      teamLead: ' Team Member',
      role: 'Project Analyst',
    },
    {
        id: 5,
        photoUrl: 'https://i.postimg.cc/gJCPd3Sz/IMG-20230101-133951.jpg',
        name: 'Harshitha Shyamala',
        teamLead: 'Team Member',
        role: ' Project Analyst',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <div
          className="p-6 transition-shadow duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          key={member.id}
        >
          <div className="flex flex-col items-center">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-32 h-32 border-indigo-500 rounded-full shadow-lg wborder-4 h-50 mb50-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500"> {member.teamLead}</p>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
