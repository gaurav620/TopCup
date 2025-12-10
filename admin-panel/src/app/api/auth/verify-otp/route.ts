import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { identifier, type, otp } = body;

        if (!identifier || !type || !otp) {
            return NextResponse.json(
                { error: 'Identifier, type, and OTP are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find OTP record
        const otpRecord = await OTP.findOne({
            identifier,
            type,
            isVerified: false,
        });

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'OTP not found or already verified. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check attempts
        if (otpRecord.attempts >= 5) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return NextResponse.json(
                { error: 'Too many attempts. Please request a new OTP.' },
                { status: 400 }
            );
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            return NextResponse.json(
                { error: 'Invalid OTP. Please try again.' },
                { status: 400 }
            );
        }

        // Mark as verified
        otpRecord.isVerified = true;
        await otpRecord.save();

        return NextResponse.json({
            message: 'OTP verified successfully',
            verified: true,
        });
    } catch (error: any) {
        console.error('Verify OTP error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
