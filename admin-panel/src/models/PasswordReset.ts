import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    userType: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' },
    used: { type: Boolean, default: false }
}, { timestamps: true });

const PasswordReset = mongoose.models.PasswordReset || mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordReset;
