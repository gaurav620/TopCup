import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';
import User from '@/models/User';

// Generate 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { identifier, type } = body; // identifier can be phone or email, type is 'phone' or 'email'

        if (!identifier || !type) {
            return NextResponse.json(
                { error: 'Phone/Email and type are required' },
                { status: 400 }
            );
        }

        // Validate based on type
        if (type === 'phone') {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(identifier)) {
                return NextResponse.json(
                    { error: 'Please provide a valid Indian phone number' },
                    { status: 400 }
                );
            }
        } else if (type === 'email') {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(identifier)) {
                return NextResponse.json(
                    { error: 'Please provide a valid email address' },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { error: 'Invalid type. Must be "phone" or "email"' },
                { status: 400 }
            );
        }

        // Connect to database with timeout handling
        try {
            await dbConnect();
        } catch (dbError: any) {
            console.error('Database connection error:', dbError.message);
            return NextResponse.json(
                { error: 'Unable to connect to database. Please try again later.' },
                { status: 503 }
            );
        }

        // Check if user exists (Optional: can be removed if supporting signup via OTP)
        // const user = await User.findOne(
        //     type === 'phone' ? { phone: identifier } : { email: identifier.toLowerCase() }
        // );

        // if (!user) {
        //     return NextResponse.json(
        //         { error: 'No account found. Please sign up first.' },
        //         { status: 404 }
        //     );
        // }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete existing OTPs for this identifier
        await OTP.deleteMany({ identifier, type });

        // Save OTP to database
        await OTP.create({
            identifier,
            type,
            otp,
            expiresAt,
            attempts: 0,
        });

        // In production, send OTP via SMS or Email
        // For development, we'll log it to console
        console.log(`[DEV] OTP for ${identifier}: ${otp}`);

        // TODO: Integrate with SMS gateway (MSG91, Twilio, etc.)
        // TODO: Integrate with email service (Nodemailer, SendGrid, etc.)

        return NextResponse.json({
            message: `OTP sent to your ${type}`,
            // Only include OTP in response during development
            ...(process.env.NODE_ENV === 'development' && { devOtp: otp }),
        });
    } catch (error: any) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
