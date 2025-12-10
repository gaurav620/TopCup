const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    passwordChangedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for faster queries
adminSchema.index({ email: 1 });

// Don't return password in queries
adminSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;
