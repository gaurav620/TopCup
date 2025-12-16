import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// Admin schema defined inline to ensure same mongoose instance
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
    lastLogin: Date,
    passwordChangedAt: Date
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    console.log('[Admin Login] 🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Admin Login] ✅ Connected to MongoDB');
}

// Admin login with database authentication
export async function POST(request: any) {
    try {
        console.log('[Admin Login] Starting login attempt...');
        await connectDB();
        console.log('[Admin Login] DB connected');

        const body = await request.json();
        const { email, password } = body;
        console.log('[Admin Login] Attempt for email:', email);

        if (!email || !password) {
            console.log('[Admin Login] Missing email or password');
            return NextResponse.json({
                success: false,
                error: 'Please provide email and password'
            }, { status: 400 });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        console.log('[Admin Login] Admin found:', admin ? 'Yes' : 'No');

        if (!admin) {
            console.log('[Admin Login] No admin found with email:', email);
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        console.log('[Admin Login] Comparing password...');
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        console.log('[Admin Login] Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('[Admin Login] Password mismatch');
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();
        console.log('[Admin Login] Login successful!');

        // Return admin data (exclude password)
        const adminData = {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role
        };

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: adminData
        });
    } catch (error: any) {
        console.error('[Admin Login] Error:', error.message);
        return NextResponse.json({
            success: false,
            error: 'Login failed'
        }, { status: 500 });
    }
}

