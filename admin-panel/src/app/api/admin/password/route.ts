import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// Change admin password
export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { adminId, currentPassword, newPassword } = body;

        // Validation
        if (!adminId || !currentPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                error: 'All fields are required'
            }, { status: 400 });
        }

        // Password strength validation
        if (newPassword.length < 8) {
            return NextResponse.json({
                success: false,
                error: 'Password must be at least 8 characters long'
            }, { status: 400 });
        }

        // Find admin
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return NextResponse.json({
                success: false,
                error: 'Admin not found'
            }, { status: 404 });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);

        if (!isCurrentPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Current password is incorrect'
            }, { status: 401 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        admin.password = hashedPassword;
        admin.passwordChangedAt = new Date();
        await admin.save();

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to change password'
        }, { status: 500 });
    }
}
