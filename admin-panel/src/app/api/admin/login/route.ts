import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

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

        // Return admin data (password excluded by toJSON method)
        const adminData = admin.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: adminData
        });
    } catch (error) {
        console.error('[Admin Login] Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Login failed'
        }, { status: 500 });
    }
}
