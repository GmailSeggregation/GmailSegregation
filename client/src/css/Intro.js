import React from 'react';
import GoogleButton from './googlebutton';
import { Link } from 'react-router-dom';

const Intro = () => {
    const buildAuthUrl = () => {
        const params = new URLSearchParams({
            client_id: process.env.REACT_APP_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            response_type: 'code',
            scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'].join(' '),
            access_type: 'offline',
            prompt: 'consent',
        });
        return `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
    };

    // Function to handle sign-in
    const handleSignIn = () => {
        window.location.href = buildAuthUrl();
    };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-12 bg-gradient-to-r from-gray-900 to-slate-900'>  
      <div className="p-1 px-4 border-2 rounded-xl opacity0 animate-slidein300">
        <h2 className='font-bold text-white'>Let's Segregate Our Mails</h2> 
      
      </div>

      <h1 className="text-5xl font-bold text-center text-white opacity-0 animate-slidein500 font-plex-serif-300">  
        Hey there!
        <br />
        Are you ready to streamline your inbox chaos? <br/>Let's segregate it right!
      </h1>

      <p className="text-xl text-center text-white opacity-0 animate-slidein500"> 
        Organized and prioritized, sorting emails with care and delight.
        <br />
        Gmail Segregation keeps your inbox bright.
      </p>

      <div className="animate-slidein700">
      <GoogleButton onSignIn={handleSignIn} />
       
      </div>
      <Link to="/about" className='text-white'>AboutUs</Link>
    </div>
  );
}

export default Intro;
