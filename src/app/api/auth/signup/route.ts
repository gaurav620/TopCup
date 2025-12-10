import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Check if we're in demo mode (no database)
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, password } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Validate phone if provided
        if (phone) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                return NextResponse.json(
                    { error: 'Please provide a valid Indian phone number' },
                    { status: 400 }
                );
            }
        }

        // Demo Mode - simulate successful signup
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Simulating signup for', email);
            return NextResponse.json(
                {
                    message: 'Account created successfully (Demo Mode)',
                    user: {
                        id: 'demo-' + Date.now(),
                        name: name,
                        email: email.toLowerCase(),
                    },
                    demoNote: 'Use demo@topcup.in / demo1234 to login',
                },
                { status: 201 }
            );
        }

        // Production Mode - use database
        const dbConnect = (await import('@/lib/mongodb')).default;
        const User = (await import('@/models/User')).default;

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

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, ...(phone ? [{ phone }] : [])],
        });

        if (existingUser) {
            if (existingUser.email === email.toLowerCase()) {
                return NextResponse.json(
                    { error: 'An account with this email already exists' },
                    { status: 400 }
                );
            }
            if (phone && existingUser.phone === phone) {
                return NextResponse.json(
                    { error: 'An account with this phone number already exists' },
                    { status: 400 }
                );
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone: phone || undefined,
            password: hashedPassword,
            role: 'user',
        });

        return NextResponse.json(
            {
                message: 'Account created successfully',
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}

