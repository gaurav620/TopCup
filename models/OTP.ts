import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    identifier: { type: String, required: true }, // phone number or email
    type: { type: String, enum: ['phone', 'email'], required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

// Create index for quick lookup
otpSchema.index({ identifier: 1, type: 1 });
// TTL index for automatic cleanup after expiry
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP;
