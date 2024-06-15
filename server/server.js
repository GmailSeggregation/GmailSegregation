// Import dependencies and models
const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

// Import the Group and Email models
const Group = require('./models/Group');
const Email = require('./models/Email');

// Create an Express app
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// Serve static files (if applicable, e.g., for a frontend React app)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Initialize Gmail client
const initializeGmailClient = (accessToken) => {
    const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    oauth2Client.setCredentials({ access_token: accessToken });
    return google.gmail({ version: 'v1', auth: oauth2Client });
};



app.get('/group', (req, res) => {
    // Resolve the absolute path to GroupDashboard.js
    const filePath = path.join('GroupDashboard.js');
    
    // Send the file
    res.render(filePath);
});








app.get('/api/mails', async (req, res) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) return res.status(401).json({ error: 'Access token is required.' });

    try {
        const gmail = initializeGmailClient(accessToken);
        const listResponse = await gmail.users.messages.list({ userId: 'me', maxResults: 20 });

        if (!listResponse.data.messages) return res.status(404).json({ error: 'No messages found.' });

        const emailDetails = await Promise.all(
            listResponse.data.messages.map(async ({ id }) => {
                try {
                    const response = await gmail.users.messages.get({ userId: 'me', id });
                    const emailData = response.data;

                    // Extract email details
                    const headers = emailData.payload.headers;
                    const sender = headers.find(header => header.name === 'From')?.value || 'Unknown sender';
                    const subject = headers.find(header => header.name === 'Subject')?.value || 'No subject';
                    const date = headers.find(header => header.name === 'Date')?.value || 'Unknown date';

                    // Extract email body
                    const bodyPart = emailData.payload.parts?.find(part => part.mimeType === 'text/plain') || emailData.payload.parts?.find(part => part.mimeType === 'text/html');
                    let body = '';
                    if (bodyPart && bodyPart.body && bodyPart.body.data) {
                        body = Buffer.from(bodyPart.body.data, 'base64').toString('utf8');
                    }

                    return { id, sender, subject, date, body };
                } catch (error) {
                    console.error(`Error fetching email with ID ${id}:`, error);
                    return null;
                }
            })
        );

        res.json(emailDetails.filter(email => email !== null));
    } catch (error) {
        console.error('Error retrieving mail data:', error);
        res.status(500).json({ error: `Error retrieving mail data: ${error.message}` });
    }
});





app.get('/api/search-emails', async (req, res) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
        return res.status(401).json({ error: 'Access token is required.' });
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }

    try {
        const gmail = initializeGmailClient(accessToken);
        const searchResponse = await gmail.users.messages.list({
            userId: 'me',
            q: query,
        });

        const messages = searchResponse.data.messages;

        if (!messages) {
            return res.status(404).json({ error: 'No messages found.' });
        }

        const emailDetails = await Promise.all(
            messages.map(async ({ id }) => {
                try {
                    const response = await gmail.users.messages.get({ userId: 'me', id });
                    const emailData = response.data;

                    // Extract email details
                    const headers = emailData.payload.headers;
                    const sender = headers.find(header => header.name === 'From')?.value || 'Unknown sender';
                    const subject = headers.find(header => header.name === 'Subject')?.value || 'No subject';
                    const date = headers.find(header => header.name === 'Date')?.value || 'Unknown date';

                    // Extract email body
                    let body = '';
                    if (emailData.payload.parts) {
                        const textPart = emailData.payload.parts.find(part => part.mimeType === 'text/plain') || emailData.payload.parts.find(part => part.mimeType === 'text/html');
                        if (textPart && textPart.body && textPart.body.data) {
                            body = Buffer.from(textPart.body.data, 'base64').toString('utf8');
                        }
                    } else if (emailData.payload.body && emailData.payload.body.data) {
                        body = Buffer.from(emailData.payload.body.data, 'base64').toString('utf8');
                    }

                    return {
                        id,
                        sender,
                        subject,
                        date,
                        body,
                    };
                } catch (error) {
                    console.error(`Error fetching email with ID ${id}:`, error);
                    return null;
                }
            })
        );

        res.json(emailDetails.filter(email => email !== null));
    } catch (error) {
        console.error('Error searching emails:', error);
        res.status(500).json({ error: `Error searching emails: ${error.message}` });
    }
});


app.post('/api/get-token', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required.' });
    }

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const { access_token: accessToken } = response.data;
        res.json({ accessToken });
    } catch (error) {
        console.error('Failed to exchange token:', error);
        res.status(500).json({ error: `Failed to exchange token: ${error.message}` });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
