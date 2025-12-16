import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// Force dynamic rendering since we use request.url
export const dynamic = 'force-dynamic';

// GET delivery history (completed orders)
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

        const orders = await Order.find({
            deliveryPartner: partnerId,
            deliveryStatus: 'delivered'
        })
            .sort({ deliveredAt: -1 })
            .limit(50);

        return NextResponse.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch delivery history'
        }, { status: 500 });
    }
}
