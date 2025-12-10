import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

// GET - Fetch dashboard stats
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Get total revenue
        const revenueResult = await Order.aggregate([
            { $match: { status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] } } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        // Get total orders
        const totalOrders = await Order.countDocuments();

        // Get total products
        const totalProducts = await Product.countDocuments();

        // Get total users
        const totalUsers = await User.countDocuments();

        // Get orders by status
        const ordersByStatus = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        // Get recent orders
        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({
            success: true,
            stats: {
                totalRevenue,
                totalOrders,
                totalProducts,
                totalUsers
            },
            ordersByStatus,
            recentOrders
        });
    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
