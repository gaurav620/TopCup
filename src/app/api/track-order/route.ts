import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

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

        // Dynamically import Order model to avoid issues
        const Order = (await import('@/models/Order')).default;

        // Find order by orderId (this is the field name in Order.js)
        const order = await Order.findOne({ orderId: orderNumber }).lean();

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found. Please check your order number.' },
                { status: 404 }
            );
        }

        // Map order status to tracking steps
        const statusSteps: Record<string, number> = {
            pending: 1,
            confirmed: 2,
            processing: 3,
            shipped: 4,
            delivered: 5,
            cancelled: 0
        };

        const currentStep = statusSteps[order.status] || 1;
        const createdDate = new Date(order.createdAt);
        const formatTime = (date: Date) => date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        // Build tracking timeline with actual timestamps
        const steps = [
            {
                title: 'Order Placed',
                time: formatTime(createdDate),
                completed: currentStep >= 1
            },
            {
                title: 'Order Confirmed',
                time: currentStep >= 2 ? formatTime(createdDate) : 'Waiting for confirmation',
                completed: currentStep >= 2
            },
            {
                title: 'Preparing Your Order',
                time: currentStep >= 3 ? 'Your order is being prepared' : 'Not started yet',
                completed: currentStep >= 3
            },
            {
                title: 'Out for Delivery',
                time: currentStep >= 4 ? 'On the way to you' : 'Not shipped yet',
                completed: currentStep >= 4
            },
            {
                title: 'Delivered',
                time: currentStep >= 5 ? 'Delivered successfully' : currentStep === 4 ? 'Arriving soon' : 'Pending',
                completed: currentStep >= 5
            }
        ];

        // Handle cancelled orders with detailed timeline
        if (order.status === 'cancelled') {
            return NextResponse.json({
                success: true,
                order: {
                    number: order.orderId,
                    status: 'Order Cancelled',
                    cancelled: true,
                    steps: [
                        {
                            title: 'Order Placed',
                            time: formatTime(createdDate),
                            completed: true
                        },
                        {
                            title: 'Order Cancelled',
                            time: formatTime(createdDate),
                            completed: true
                        }
                    ],
                    cancellationMessage: 'Your order has been cancelled. If you did not request this cancellation, please contact our support team.'
                }
            });
        }

        // Map status to display name
        const statusDisplay: Record<string, string> = {
            pending: 'Order Placed',
            confirmed: 'Order Confirmed',
            processing: 'Preparing Your Order',
            shipped: 'Out for Delivery',
            delivered: 'Delivered'
        };

        return NextResponse.json({
            success: true,
            order: {
                number: order.orderId,
                status: statusDisplay[order.status] || 'Processing',
                cancelled: false,
                steps
            }
        });
    } catch (error: any) {
        console.error('Error tracking order:', error);
        return NextResponse.json(
            { error: 'Failed to track order. Please try again.' },
            { status: 500 }
        );
    }
}
