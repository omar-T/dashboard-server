const mongoose = require('mongoose');

const logShcema = new mongoose.Schema({
    userId: {
        type: String
    },
    action: {
        type: Number
    },
    clickedDoc: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Log = mongoose.model('Log', logShcema);

module.exports = Log;