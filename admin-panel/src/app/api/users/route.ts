import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET - Fetch all users
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const role = searchParams.get('role') || '';

        let query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            query.role = role;
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            users,
            count: users.length
        });
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST - Create new user
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, password, role, phone } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            phone: phone || ''
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            user: userResponse
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}

// PUT - Update user
export async function PUT(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { id, password, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // If password is being updated, hash it
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE - Delete user
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}
