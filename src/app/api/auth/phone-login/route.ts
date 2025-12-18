import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { uid, phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone required' }, { status: 400 });
        }

        // Clean phone number (remove +91 if present for consistency, or keep as is)
        // Schema usually expects plain number or e.164. 
        // Let's assume input matches schema expectation (or search roughly).

        let user = await User.findOne({ phone });

        if (!user) {
            // Create user
            // Schema requires email and password
            const placeholderEmail = `${phone}@phone.topcup.com`;

            user = await User.create({
                name: `User ${phone.slice(-4)}`,
                email: placeholderEmail,
                password: Math.random().toString(36).slice(-8) + 'Aa1!', // Random secure-ish password
                phone,
                role: 'user',
                isVerified: true,
            });
        }

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error('Phone login error:', error);
        return NextResponse.json({ error: error.message || 'Failed to login' }, { status: 500 });
    }
}
