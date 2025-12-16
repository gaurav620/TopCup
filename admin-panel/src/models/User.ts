import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    addresses: [{
        street: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: Boolean
    }],
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
