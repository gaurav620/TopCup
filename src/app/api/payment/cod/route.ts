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
            customer: {
                name: session.user.name || address.fullName,
                email: session.user.email,
                phone: address.phone,
                userId: session.user.id,
            },
            items: items.map((item: any) => ({
                productId: item.id && mongoose.Types.ObjectId.isValid(item.id) ? item.id : new mongoose.Types.ObjectId(),
                name: item.name,
                price: item.discountPrice || item.price,
                quantity: item.quantity,
                image: item.image,
                total: (item.discountPrice || item.price) * item.quantity,
            })),
            deliveryAddress: {
                street: address.addressLine1,
                city: address.city,
                state: address.state,
                zipCode: address.pincode,
                landmark: address.addressLine2 || '',
                fullAddress: `${address.addressLine1}, ${address.addressLine2 ? address.addressLine2 + ', ' : ''}${address.city}, ${address.state} - ${address.pincode}`,
            },
            paymentMethod: 'cash', // COD = cash
            paymentStatus: 'pending',
            subtotal: itemsPrice,
            deliveryFee: shippingPrice,
            discount: 0,
            totalAmount: totalPrice,
            status: 'confirmed', // COD orders are confirmed immediately
            orderId: 'ORD-' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
            orderNumber: 'ORD-' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
        });


        return NextResponse.json({
            message: 'Order placed successfully',
            orderId: order._id.toString(),
            orderNumber: (order as any).orderNumber, // Return orderNumber
        });
    } catch (error: any) {
        console.error('COD order error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to place order' },
            { status: 500 }
        );
    }
}

