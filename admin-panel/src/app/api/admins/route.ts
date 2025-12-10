import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// GET all admins
export async function GET(request: any) {
    try {
        await connectDB();

        const admins = await Admin.find({})
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: admins
        });
    } catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch admins'
        }, { status: 500 });
    }
}

// POST create new admin
export async function POST(request: any) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, password, role } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Please provide all required fields'
            }, { status: 400 });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                error: 'Admin with this email already exists'
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin'
        });

        // Remove password from response
        const adminData = admin.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Admin created successfully',
            data: adminData
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create admin'
        }, { status: 500 });
    }
}
