import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// GET assigned orders for delivery partner
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const partnerId = searchParams.get('partnerId');
        const status = searchParams.get('status');

        if (!partnerId) {
            return NextResponse.json({
                success: false,
                error: 'Partner ID is required'
            }, { status: 400 });
        }

        let query: any = { deliveryPartner: partnerId };

        // Filter by delivery status
        if (status && status !== 'all') {
            if (status === 'ready') {
                query.deliveryStatus = 'assigned';
            } else if (status === 'in-transit') {
                query.deliveryStatus = { $in: ['picked-up', 'in-transit'] };
            }
        } else {
            // Active orders only (not delivered or cancelled)
            query.deliveryStatus = { $in: ['assigned', 'picked-up', 'in-transit'] };
        }

        const orders = await Order.find(query)
            .sort({ assignedAt: -1 })
            .select('-__v');

        return NextResponse.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch orders'
        }, { status: 500 });
    }
}
