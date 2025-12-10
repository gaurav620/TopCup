import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Change user password
export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { userId, currentPassword, newPassword } = body;

        // Validation
        if (!userId || !currentPassword || !newPassword) {
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

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found'
            }, { status: 404 });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isCurrentPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Current password is incorrect'
            }, { status: 401 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

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
