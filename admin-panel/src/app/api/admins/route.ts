import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// Admin schema inline
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
    lastLogin: { type: Date },
    passwordChangedAt: { type: Date }
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    console.log('[Admins API] 🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Admins API] ✅ Connected to MongoDB');
}

// GET all admins
export async function GET(request: any) {
    try {
        await connectDB();

        const admins = await Admin.find({})
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: admins
        });
    } catch (error: any) {
        console.error('[Admins API] Error fetching admins:', error.message);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch admins'
        }, { status: 500 });
    }
}

// POST create new admin
export async function POST(request: any) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, password, role } = body;
        console.log('[Admins API] Creating admin:', name, email);

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Please provide all required fields'
            }, { status: 400 });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                error: 'Admin with this email already exists'
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('[Admins API] Password hashed successfully');

        // Create admin
        const admin = await Admin.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || 'admin'
        });
        console.log('[Admins API] Admin created:', admin._id);

        // Remove password from response
        const adminData = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            createdAt: admin.createdAt
        };

        return NextResponse.json({
            success: true,
            message: 'Admin created successfully',
            data: adminData
        }, { status: 201 });
    } catch (error: any) {
        console.error('[Admins API] Error creating admin:', error.message);
        return NextResponse.json({
            success: false,
            error: 'Failed to create admin'
        }, { status: 500 });
    }
}

