import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import PasswordReset from '@/models/PasswordReset';
import bcrypt from 'bcryptjs';

export async function POST(request: any) {
    try {
        await connectDB();

        const body = await request.json();
        const { token, newPassword } = body;

        if (!token || !newPassword) {
            return NextResponse.json({
                success: false,
                error: 'Token and new password are required'
            }, { status: 400 });
        }

        // Find reset token
        const resetRequest = await PasswordReset.findOne({ token });

        if (!resetRequest) {
            return NextResponse.json({
                success: false,
                error: 'Invalid or expired reset token'
            }, { status: 400 });
        }

        // Check if token is valid
        if (!resetRequest.isValid()) {
            return NextResponse.json({
                success: false,
                error: 'Reset token has expired or been used'
            }, { status: 400 });
        }

        // Find user
        const user = await User.findOne({ email: resetRequest.email });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found'
            }, { status: 404 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Mark token as used
        resetRequest.used = true;
        await resetRequest.save();

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error: any) {
        console.error('Reset password error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to reset password'
        }, { status: 500 });
    }
}
