import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// Mark as dynamic route
export const dynamic = 'force-dynamic';

// GET - Track order by order number
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderNumber = searchParams.get('orderNumber');

        if (!orderNumber) {
            return NextResponse.json(
                { error: 'Order number is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find order by orderNumber or orderId (fallback)
        const order = await Order.findOne({
            $or: [
                { orderNumber: orderNumber },
                { orderId: orderNumber }
            ]
        }).lean();

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        // Map order status to tracking steps
        const statusSteps = {
            pending: 1,
            confirmed: 2,
            processing: 3,
            shipped: 4,
            delivered: 5,
            cancelled: 0
        };

        const currentStep = statusSteps[order.status as keyof typeof statusSteps] || 1;

        // Build tracking timeline
        const steps = [
            {
                title: 'Order Placed',
                time: new Date(order.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }),
                completed: currentStep >= 1
            },
            {
                title: 'Order Confirmed',
                time: currentStep >= 2 ? new Date(order.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }) : 'Pending',
                completed: currentStep >= 2
            },
            {
                title: 'Processing',
                time: currentStep >= 3 ? 'In Progress' : 'Pending',
                completed: currentStep >= 3
            },
            {
                title: 'Shipped',
                time: currentStep >= 4 ? 'Out for Delivery' : 'Pending',
                completed: currentStep >= 4
            },
            {
                title: 'Delivered',
                time: currentStep >= 5 ? 'Delivered' : order.status === 'shipped' ? 'Expected Soon' : 'Pending',
                completed: currentStep >= 5
            }
        ];

        // Handle cancelled orders
        if (order.status === 'cancelled') {
            return NextResponse.json({
                success: true,
                order: {
                    number: order.orderNumber || order.orderId,
                    status: 'Cancelled',
                    cancelled: true,
                    steps: [{
                        title: 'Order Cancelled',
                        time: new Date(order.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        }),
                        completed: true
                    }]
                }
            });
        }

        // Map status to display name
        const statusDisplay = {
            pending: 'Order Placed',
            confirmed: 'Order Confirmed',
            processing: 'Preparing Your Order',
            shipped: 'Out for Delivery',
            delivered: 'Delivered'
        };

        return NextResponse.json({
            success: true,
            order: {
                number: order.orderNumber || order.orderId,
                status: statusDisplay[order.status as keyof typeof statusDisplay] || 'Processing',
                cancelled: false,
                steps
            }
        });
    } catch (error: any) {
        console.error('Error tracking order:', error);
        return NextResponse.json(
            { error: 'Failed to track order' },
            { status: 500 }
        );
    }
}
