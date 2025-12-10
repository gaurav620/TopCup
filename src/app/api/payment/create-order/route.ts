import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Check if we're in demo mode (no database)
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { amount, items, address } = body;

        // Calculate prices
        const itemsPrice = items.reduce((total: number, item: any) => {
            return total + (item.discountPrice || item.price) * item.quantity;
        }, 0);
        const shippingPrice = itemsPrice >= 499 ? 0 : 49;
        const totalPrice = itemsPrice + shippingPrice;

        // Demo Mode - simulate successful order
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Creating simulated payment order');
            const demoOrderId = 'DEMO-' + Date.now();
            return NextResponse.json({
                orderId: demoOrderId,
                orderNumber: demoOrderId,
                razorpayOrderId: 'demo_order_' + Date.now(),
                amount: totalPrice * 100,
                currency: 'INR',
                key: 'demo_key',
                demoMode: true,
                message: 'Demo order created - no actual payment needed',
            });
        }

        // Production Mode - use database and Razorpay
        const dbConnect = (await import('@/lib/mongodb')).default;
        const Order = (await import('@/models/Order')).default;
        const Razorpay = (await import('razorpay')).default;
        const mongoose = (await import('mongoose')).default;

        await dbConnect();

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create order in database
        const order = await Order.create({
            user: session.user.id,
            items: items.map((item: any) => {
                // Only include product field if it's a valid ObjectId
                const orderItem: any = {
                    name: item.name,
                    image: item.image,
                    price: item.discountPrice || item.price,
                    quantity: item.quantity,
                };

                // Try to use product ID if it's a valid ObjectId
                if (item.id && mongoose.Types.ObjectId.isValid(item.id)) {
                    orderItem.product = item.id;
                }

                return orderItem;
            }),
            shippingAddress: address,
            paymentMethod: 'razorpay',
            paymentStatus: 'pending',
            itemsPrice,
            shippingPrice,
            totalPrice,
            orderStatus: 'pending',
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalPrice * 100, // Amount in paise
            currency: 'INR',
            receipt: order.orderNumber,
            notes: {
                orderId: order._id.toString(),
            },
        });

        // Update order with Razorpay order ID
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return NextResponse.json({
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        console.error('Create payment order error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}

