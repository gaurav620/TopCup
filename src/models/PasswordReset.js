const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['customer', 'admin', 'delivery'],
        required: true
    }
}, {
    timestamps: true
});

// Index for faster lookups
passwordResetSchema.index({ email: 1, token: 1 });
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Check if token is valid
passwordResetSchema.methods.isValid = function () {
    return !this.used && new Date() < this.expiresAt;
};

const PasswordReset = mongoose.models.PasswordReset || mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;
