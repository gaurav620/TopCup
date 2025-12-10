import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// GET delivery history (completed orders)
export async function GET(request) {
    try {
        await connectDB();

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
