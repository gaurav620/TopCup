import mongoose from 'mongoose';

// Admin Schema
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
    lastLogin: { type: Date },
    passwordChangedAt: { type: Date }
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
