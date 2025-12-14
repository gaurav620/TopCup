import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DeliveryPartner from '@/models/DeliveryPartner';
import bcrypt from 'bcryptjs';

// Login delivery partner
export async function POST(request: NextRequest) {
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

        // Find delivery partner
        const partner = await DeliveryPartner.findOne({ email });

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, partner.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Remove password from response
        const partnerData = partner.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: partnerData
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            error: 'Login failed'
        }, { status: 500 });
    }
}
