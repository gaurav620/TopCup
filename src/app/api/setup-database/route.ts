import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const mongoose = (await import('mongoose')).default;
        const db = mongoose.connection.db;

        if (!db) {
            return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
        }

        // 1. Delete orders with null orderNumber
        const deleteResult = await db.collection('orders').deleteMany({
            orderNumber: null
        });

        // 2. Drop old orderNumber index if it exists
        try {
            await db.collection('orders').dropIndex('orderNumber_1');
        } catch (e) {
            // Index might not exist, that's okay
        }

        // 3. Create new sparse unique index (allows null but makes non-null unique)
        await db.collection('orders').createIndex(
            { orderNumber: 1 },
            { unique: true, sparse: true, background: true }
        );

        // 4. Get collection stats
        const orderCount = await db.collection('orders').countDocuments();
        const indexes = await db.collection('orders').indexes();

        return NextResponse.json({
            success: true,
            message: 'Database setup completed successfully',
            details: {
                deletedOrders: deleteResult.deletedCount,
                totalOrders: orderCount,
                indexes: indexes.map((idx: any) => idx.name),
            },
        });
    } catch (error: any) {
        console.error('Database setup error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to setup database' },
            { status: 500 }
        );
    }
}
