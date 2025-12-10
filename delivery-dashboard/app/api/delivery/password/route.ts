import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DeliveryPartner from '@/models/DeliveryPartner';
import bcrypt from 'bcryptjs';

// Change delivery partner password
export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { partnerId, currentPassword, newPassword } = body;

        // Validation
        if (!partnerId || !currentPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                error: 'All fields are required'
            }, { status: 400 });
        }

        // Password strength validation
        if (newPassword.length < 8) {
            return NextResponse.json({
                success: false,
                error: 'Password must be at least 8 characters long'
            }, { status: 400 });
        }

        // Find delivery partner
        const partner = await DeliveryPartner.findById(partnerId);

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner not found'
            }, { status: 404 });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, partner.password);

        if (!isCurrentPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Current password is incorrect'
            }, { status: 401 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        partner.password = hashedPassword;
        await partner.save();

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to change password'
        }, { status: 500 });
    }
}
