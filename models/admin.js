const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    accessToken: {
        type: String,
        required: true
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;