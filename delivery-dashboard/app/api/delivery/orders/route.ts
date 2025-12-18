import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// Order schema inline
const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, sparse: true },
    orderNumber: { type: String },
    customer: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { street: String, city: String, state: String, pincode: String }
    },
    items: [{ name: String, price: Number, quantity: Number, image: String }],
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    deliveryStatus: { type: String, enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered'], default: 'pending' },
    deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    assignedAt: { type: Date },
    paymentMethod: { type: String, enum: ['cod', 'online', 'upi'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    console.log('[Delivery Orders] 🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Delivery Orders] ✅ Connected to MongoDB');
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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

        // Convert partnerId string to ObjectId if valid
        let query: any = { deliveryPartner: new mongoose.Types.ObjectId(partnerId) };

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

        console.log('[Delivery Orders] Query:', JSON.stringify(query));
        const orders = await Order.find(query).sort({ createdAt: -1 });
        console.log('[Delivery Orders] Found:', orders.length, 'orders');

        return NextResponse.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error: any) {
        console.error('[Delivery Orders] Error:', error.message);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch orders'
        }, { status: 500 });
    }
}

