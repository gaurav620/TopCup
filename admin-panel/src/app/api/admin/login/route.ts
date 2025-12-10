import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// Admin login with database authentication
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Please provide email and password'
            }, { status: 400 });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Return admin data (password excluded by toJSON method)
        const adminData = admin.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: adminData
        });
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json({
            success: false,
            error: 'Login failed'
        }, { status: 500 });
    }
}
