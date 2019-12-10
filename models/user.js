const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId
    },
    accountType: {
        type: String
    },
    title: {
        type: String
    },
    accessToken: {
        type: String
    },
    lastSeenRg: {
        type: String
    },
    history: {
        type: Array
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;