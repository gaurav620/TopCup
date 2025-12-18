import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// User schema inline
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Admin schema inline
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
    lastLogin: { type: Date },
    passwordChangedAt: { type: Date }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    console.log('[Users API] 🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Users API] ✅ Connected to MongoDB');
}

// GET - Fetch all users (combines users and admins)
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const role = searchParams.get('role') || '';

        let query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Fetch both users and admins and combine
        const [users, admins] = await Promise.all([
            User.find(role === 'admin' ? { _id: null } : query).select('-password').sort({ createdAt: -1 }),
            Admin.find(role === 'user' ? { _id: null } : query).select('-password').sort({ createdAt: -1 })
        ]);

        // Map admins to have role field
        const allUsers = [
            ...users.map((u: any) => ({ ...u.toObject(), role: u.role || 'user' })),
            ...admins.map((a: any) => ({ ...a.toObject(), role: 'admin' }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({
            success: true,
            users: allUsers,
            count: allUsers.length
        });
    } catch (error: any) {
        console.error('[Users API] Error fetching users:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST - Create new user or admin based on role
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, password, role, phone } = body;
        console.log('[Users API] Creating:', name, email, 'role:', role);

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('[Users API] Password hashed successfully');

        // If role is admin, save to Admin collection
        if (role === 'admin') {
            // Check if admin already exists
            const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
            if (existingAdmin) {
                return NextResponse.json(
                    { success: false, error: 'Admin with this email already exists' },
                    { status: 400 }
                );
            }

            const admin = await Admin.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: 'admin'
            });
            console.log('[Users API] Admin created:', admin._id);

            return NextResponse.json({
                success: true,
                message: 'Admin created successfully - they can now login!',
                user: { _id: admin._id, name: admin.name, email: admin.email, role: 'admin', createdAt: admin.createdAt }
            }, { status: 201 });
        }

        // For regular users, save to User collection
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'user',
            phone: phone || ''
        });
        console.log('[Users API] User created:', user._id);

        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            user: { _id: user._id, name: user.name, email: user.email, role: 'user', createdAt: user.createdAt }
        }, { status: 201 });
    } catch (error: any) {
        console.error('[Users API] Error creating user:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to create user: ' + error.message },
            { status: 500 }
        );
    }
}

// PUT - Update user or admin
export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, password, role, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        // If password is being updated, hash it
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        // Try to find in admin first, then user
        let record = await Admin.findById(id);
        if (record) {
            await Admin.findByIdAndUpdate(id, updateData, { new: true });
            return NextResponse.json({ success: true, message: 'Admin updated successfully' });
        }

        record = await User.findById(id);
        if (record) {
            await User.findByIdAndUpdate(id, updateData, { new: true });
            return NextResponse.json({ success: true, message: 'User updated successfully' });
        }

        return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
        );
    } catch (error: any) {
        console.error('[Users API] Error updating user:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE - Delete user or admin
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Try to delete from admin first, then user
        let deleted = await Admin.findByIdAndDelete(id);
        if (deleted) {
            return NextResponse.json({ success: true, message: 'Admin deleted successfully' });
        }

        deleted = await User.findByIdAndDelete(id);
        if (deleted) {
            return NextResponse.json({ success: true, message: 'User deleted successfully' });
        }

        return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
        );
    } catch (error: any) {
        console.error('[Users API] Error deleting user:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}

