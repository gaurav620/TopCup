import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// GET - Fetch all orders
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status') || '';
        const search = searchParams.get('search') || '';

        let query: any = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.orderNumber = { $regex: search, $options: 'i' };
        }

        // Note: Order model uses 'customer' field with embedded data, not 'user' reference
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            orders: orders.map((order: any) => ({
                ...order,
                _id: String(order._id),
                // Map customer to user format for frontend compatibility
                user: order.customer || { name: 'Guest', email: 'N/A' },
                orderNumber: (order as any).orderNumber || (order as any).orderId,
                totalPrice: (order as any).totalAmount || (order as any).totalPrice
            })),
            count: orders.length
        });
    } catch (error: any) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// PUT - Update order status
export async function PUT(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { error: 'Order ID and status are required' },
                { status: 400 }
            );
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).lean();

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Order status updated successfully',
            order: {
                ...(order as any),
                _id: String((order as any)._id),
            }
        });
    } catch (error: any) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

// DELETE - Delete order
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting order:', error);
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
