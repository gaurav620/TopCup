import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// GET - Make current user admin (temporary endpoint for setup)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email parameter required. Usage: /api/make-admin?email=your@email.com' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found with that email' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `User ${user.name} (${user.email}) is now an admin!`,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        console.error('Error making user admin:', error);
        return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
        );
    }
}
