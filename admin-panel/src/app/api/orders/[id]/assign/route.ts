import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import DeliveryPartner from '@/models/DeliveryPartner';

// Assign order to delivery partner
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const body = await request.json();
        const { deliveryPartnerId } = body;

        const order = await Order.findById(params.id);
        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
        }

        const partner = await DeliveryPartner.findById(deliveryPartnerId);
        if (!partner) {
            return NextResponse.json({ success: false, error: 'Delivery partner not found' }, { status: 404 });
        }

        // Update order
        order.deliveryPartner = partner._id;
        order.deliveryPartnerName = partner.name;
        order.deliveryStatus = 'assigned';
        order.assignedAt = new Date();
        order.statusHistory.push({
            status: 'assigned',
            timestamp: new Date(),
            updatedBy: 'admin',
            note: `Assigned to ${partner.name}`
        });

        await order.save();

        // Update partner's active orders count
        partner.currentActiveOrders = (partner.currentActiveOrders || 0) + 1;
        await partner.save();

        return NextResponse.json({
            success: true,
            message: 'Order assigned successfully',
            data: order
        });
    } catch (error) {
        console.error('Error assigning order:', error);
        return NextResponse.json({ success: false, error: 'Failed to assign order' }, { status: 500 });
    }
}
