import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import DeliveryPartner from '@/models/DeliveryPartner';
import PasswordReset from '@/models/PasswordReset';
import { sendPasswordReset } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: any) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({
                success: false,
                error: 'Email is required'
            }, { status: 400 });
        }

        // Check if delivery partner exists
        const partner = await DeliveryPartner.findOne({ email: email.toLowerCase() });

        if (!partner) {
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
            userType: 'delivery'
        });

        // Send email
        const resetLink = `${process.env.NEXT_PUBLIC_DELIVERY_URL || 'http://localhost:5002'}/reset-password?token=${resetToken}`;
        await sendPasswordReset(email, resetLink, partner.name);

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
