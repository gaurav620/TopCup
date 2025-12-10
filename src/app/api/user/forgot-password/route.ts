import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import PasswordReset from '@/models/PasswordReset';
import { sendPasswordReset } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: any) {
    try {
        await connectDB();

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({
                success: false,
                error: 'Email is required'
            }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Don't reveal if email exists (security)
            return NextResponse.json({
                success: true,
                message: 'If an account exists with this email, you will receive a password reset link'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Save reset token
        await PasswordReset.create({
            email: email.toLowerCase(),
            token: resetToken,
            expiresAt,
            userType: 'customer'
        });

        // Send email
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        await sendPasswordReset(email, resetLink, user.name);

        return NextResponse.json({
            success: true,
            message: 'Password reset link sent to your email'
        });
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process request'
        }, { status: 500 });
    }
}
