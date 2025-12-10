import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// Check if we're in demo mode (no database)
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body;

        // Demo Mode - simulate successful payment verification
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Simulating payment verification');
            return NextResponse.json({
                message: 'Payment verified successfully (Demo Mode)',
                order: {
                    id: orderId || 'demo-order-' + Date.now(),
                    orderNumber: 'DEMO-' + Date.now(),
                    status: 'confirmed',
                },
                demoMode: true,
            });
        }


        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Update order
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                paymentStatus: 'paid',
                orderStatus: 'confirmed',
            },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Payment verified successfully',
            order: {
                id: order._id.toString(),
                orderNumber: order.orderNumber,
                status: order.orderStatus,
            },
        });
    } catch (error: any) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: error.message || 'Payment verification failed' },
            { status: 500 }
        );
    }
}
