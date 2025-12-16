import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import DeliveryPartner from '@/models/DeliveryPartner';

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

// GET delivery partner statistics
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const partnerId = searchParams.get('partnerId');

        if (!partnerId) {
            return NextResponse.json({
                success: false,
                error: 'Partner ID is required'
            }, { status: 400 });
        }

        const partner = await DeliveryPartner.findById(partnerId).select('-password');

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Delivery partner not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                totalDeliveries: partner.totalDeliveries || 0,
                totalEarnings: partner.totalEarnings || 0,
                rating: partner.rating || 5.0,
                currentActiveOrders: partner.currentActiveOrders || 0
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch statistics'
        }, { status: 500 });
    }
}
