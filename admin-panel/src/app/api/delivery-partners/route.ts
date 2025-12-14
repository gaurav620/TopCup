import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DeliveryPartner from '@/models/DeliveryPartner';
import bcrypt from 'bcryptjs';

// GET all delivery partners
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        let query: any = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { partnerId: { $regex: search, $options: 'i' } }
            ];
        }

        const partners = await DeliveryPartner.find(query)
            .sort({ createdAt: -1 })
            .select('-password');

        return NextResponse.json({
            success: true,
            count: partners.length,
            data: partners
        });
    } catch (error) {
        console.error('Error fetching delivery partners:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch delivery partners'
        }, { status: 500 });
    }
}

// POST create new delivery partner
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, phone, password, vehicleType, vehicleNumber, workingArea } = body;

        // Validation
        if (!name || !email || !phone || !password || !vehicleType || !vehicleNumber) {
            return NextResponse.json({
                success: false,
                error: 'Please provide all required fields'
            }, { status: 400 });
        }

        // Check if partner already exists
        const existingPartner = await DeliveryPartner.findOne({ email });
        if (existingPartner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner with this email already exists'
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create delivery partner
        const partner = await DeliveryPartner.create({
            name,
            email,
            phone,
            password: hashedPassword,
            vehicleType,
            vehicleNumber,
            workingArea: workingArea || 'Gurgaon'
        });

        // Remove password from response
        const partnerData = partner.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Delivery partner created successfully',
            data: partnerData
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating delivery partner:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create delivery partner'
        }, { status: 500 });
    }
}
