import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Check if we're in demo mode (no database)
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

// Demo orders for testing
const DEMO_ORDERS = [
    {
        _id: 'demo-order-1',
        orderNumber: 'TC24120001',
        createdAt: new Date('2024-12-07'),
        orderStatus: 'delivered',
        totalPrice: 1249,
        paymentMethod: 'razorpay',
        paymentStatus: 'paid',
        items: [
            {
                name: 'Chocolate Truffle Cake',
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
                quantity: 1,
                price: 899
            },
            {
                name: 'Red Velvet Cupcakes (6)',
                image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
                quantity: 1,
                price: 350
            },
        ],
        shippingAddress: {
            fullName: 'Demo User',
            phone: '9876543210',
            addressLine1: '123 Demo Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
        },
    },
    {
        _id: 'demo-order-2',
        orderNumber: 'TC24120002',
        createdAt: new Date('2024-12-05'),
        orderStatus: 'processing',
        totalPrice: 1599,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        items: [
            {
                name: 'Black Forest Cake',
                image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400',
                quantity: 1,
                price: 999
            },
            {
                name: 'Butterscotch Pastry',
                image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400',
                quantity: 2,
                price: 300
            },
        ],
        shippingAddress: {
            fullName: 'Demo User',
            phone: '9876543210',
            addressLine1: '123 Demo Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
        },
    },
    {
        _id: 'demo-order-3',
        orderNumber: 'TC24120003',
        createdAt: new Date('2024-12-01'),
        orderStatus: 'shipped',
        totalPrice: 749,
        paymentMethod: 'razorpay',
        paymentStatus: 'paid',
        items: [
            {
                name: 'Vanilla Bean Cake',
                image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
                quantity: 1,
                price: 749
            },
        ],
        shippingAddress: {
            fullName: 'Demo User',
            phone: '9876543210',
            addressLine1: '123 Demo Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
        },
    },
];

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Demo Mode - return sample orders
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Returning sample orders');
            return NextResponse.json({
                orders: DEMO_ORDERS,
                demoMode: true,
            });
        }

        // Production Mode - fetch from database
        const dbConnect = (await import('@/lib/mongodb')).default;
        const Order = (await import('@/models/Order')).default;

        await dbConnect();

        // Fetch user's orders, sorted by creation date (newest first)
        const orders = await Order.find({ user: session.user.id })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            orders: orders.map(order => ({
                ...order,
                _id: order._id.toString(),
                user: order.user.toString(),
            })),
            demoMode: false,
        });
    } catch (error: any) {
        console.error('Fetch orders error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
