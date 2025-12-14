import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import DeliveryPartner from '@/models/DeliveryPartner';

// Update order delivery status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const body = await request.json();
        const { status, partnerId } = body;

        const order = await Order.findById(params.id);

        if (!order) {
            return NextResponse.json({
                success: false,
                error: 'Order not found'
            }, { status: 404 });
        }

        // Update delivery status
        order.deliveryStatus = status;

        if (status === 'picked-up') {
            order.pickedUpAt = new Date();
            order.statusHistory.push({
                status: 'picked-up',
                timestamp: new Date(),
                updatedBy: 'delivery-partner',
                note: 'Order picked up from restaurant'
            });
        } else if (status === 'delivered') {
            order.deliveredAt = new Date();
            order.status = 'delivered';
            order.statusHistory.push({
                status: 'delivered',
                timestamp: new Date(),
                updatedBy: 'delivery-partner',
                note: 'Order delivered to customer'
            });

            // Update delivery partner stats
            if (partnerId) {
                const partner = await DeliveryPartner.findById(partnerId);
                if (partner) {
                    partner.totalDeliveries += 1;
                    partner.totalEarnings += (order.deliveryFee || 50);
                    partner.currentActiveOrders = Math.max(0, (partner.currentActiveOrders || 1) - 1);
                    await partner.save();
                }
            }
        }

        await order.save();

        return NextResponse.json({
            success: true,
            message: 'Order status updated',
            data: order
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to update order status'
        }, { status: 500 });
    }
}
