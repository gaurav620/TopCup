import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DeliveryPartner from '@/models/DeliveryPartner';
import bcrypt from 'bcryptjs';

// GET single delivery partner
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const partner = await DeliveryPartner.findById(params.id).select('-password');

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: partner
        });
    } catch (error) {
        console.error('Error fetching delivery partner:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch delivery partner'
        }, { status: 500 });
    }
}

// PUT update delivery partner
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, phone, password, vehicleType, vehicleNumber, workingArea, status, isAvailable } = body;

        const partner = await DeliveryPartner.findById(params.id);

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner not found'
            }, { status: 404 });
        }

        // Update fields
        if (name) partner.name = name;
        if (email) partner.email = email;
        if (phone) partner.phone = phone;
        if (vehicleType) partner.vehicleType = vehicleType;
        if (vehicleNumber) partner.vehicleNumber = vehicleNumber;
        if (workingArea) partner.workingArea = workingArea;
        if (status) partner.status = status;
        if (typeof isAvailable === 'boolean') partner.isAvailable = isAvailable;

        // Update password if provided
        if (password) {
            partner.password = await bcrypt.hash(password, 10);
        }

        await partner.save();

        const updatedPartner = partner.toJSON();

        return NextResponse.json({
            success: true,
            message: 'Delivery partner updated successfully',
            data: updatedPartner
        });
    } catch (error) {
        console.error('Error updating delivery partner:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to update delivery partner'
        }, { status: 500 });
    }
}

// DELETE delivery partner
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const partner = await DeliveryPartner.findById(params.id);

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner not found'
            }, { status: 404 });
        }

        await DeliveryPartner.findByIdAndDelete(params.id);

        return NextResponse.json({
            success: true,
            message: 'Delivery partner deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting delivery partner:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to delete delivery partner'
        }, { status: 500 });
    }
}
