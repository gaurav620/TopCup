import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    phone: { type: String },
    email: { type: String },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP;
