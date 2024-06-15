const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    senderEmails: {
        type: [String],
        required: true,
    },
    emails: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Email',
        default: [],
    },
});

module.exports = mongoose.model('Group', GroupSchema);
