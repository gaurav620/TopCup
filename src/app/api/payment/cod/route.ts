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
        const { items, address, total } = body;

        // Calculate prices
        const itemsPrice = items.reduce((sum: number, item: any) => {
            return sum + (item.discountPrice || item.price) * item.quantity;
        }, 0);
        const shippingPrice = itemsPrice >= 499 ? 0 : 49;
        const totalPrice = itemsPrice + shippingPrice;

        // Demo Mode - simulate successful COD order
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Creating simulated COD order');
            const demoOrderId = 'COD-DEMO-' + Date.now();
            return NextResponse.json({
                message: 'Order placed successfully (Demo Mode)',
                orderId: demoOrderId,
                orderNumber: demoOrderId,
                demoMode: true,
            });
        }

        // Production Mode - use database
        const dbConnect = (await import('@/lib/mongodb')).default;
        const Order = (await import('@/models/Order')).default;
        const mongoose = (await import('mongoose')).default;

        await dbConnect();

        // Create COD order
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
            paymentMethod: 'cod',
            paymentStatus: 'pending',
            itemsPrice,
            shippingPrice,
            totalPrice,
            orderStatus: 'confirmed',
        });


        return NextResponse.json({
            message: 'Order placed successfully',
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
        });
    } catch (error: any) {
        console.error('COD order error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to place order' },
            { status: 500 }
        );
    }
}

