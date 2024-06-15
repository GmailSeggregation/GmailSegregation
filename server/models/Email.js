const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
