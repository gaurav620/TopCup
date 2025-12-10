const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['signup', 'login', 'password-reset', 'verification'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    attempts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster lookups and auto-deletion
otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Check if OTP is valid
otpSchema.methods.isValid = function () {
    return !this.verified && this.attempts < 3 && new Date() < this.expiresAt;
};

// Generate 6-digit OTP
otpSchema.statics.generateOTP = function () {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

module.exports = OTP;
