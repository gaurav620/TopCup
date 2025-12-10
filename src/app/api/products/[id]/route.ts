import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        // Find by slug or _id
        const product = await Product.findOne({
            $or: [{ slug: params.id }, { _id: params.id }],
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ product });
    } catch (error: any) {
        console.error('Get product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

// PUT update product (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();

        const product = await Product.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product updated successfully', product });
    } catch (error: any) {
        console.error('Update product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE product (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error('Delete product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete product' },
            { status: 500 }
        );
    }
}
