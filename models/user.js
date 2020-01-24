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
        type: String,
        required: true
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
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Number
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;