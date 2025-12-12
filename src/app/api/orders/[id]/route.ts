import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const dbConnect = (await import('@/lib/mongodb')).default;
        const Order = (await import('@/models/Order')).default;
        const mongoose = (await import('mongoose')).default;

        await dbConnect();

        // Fetch the order
        const order = await Order.findById(params.id).lean() as any;

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Security: Check if the order belongs to the current user
        if (order.customer?.userId?.toString() !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        return NextResponse.json({
            order: {
                ...order,
                _id: order._id.toString(),
                orderNumber: order.orderNumber || (order as any).orderId,
                totalPrice: (order as any).totalAmount || order.totalPrice,
            },
        });
    } catch (error: any) {
        console.error('Fetch order error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch order' },
            { status: 500 }
        );
    }
}
