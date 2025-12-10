import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET - Fetch all products with pagination
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = (page - 1) * limit;

        let query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        // Execute query with pagination and select only needed fields
        const [products, total] = await Promise.all([
            Product.find(query)
                .select('name category price stock images description')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(), // Use lean() for better performance
            Product.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            products,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', details: error.message },
            { status: 500 }
        );
    }
}

// POST - Create new product with validation
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, category, price, stock, images, description } = body;

        // Enhanced validation
        if (!name || name.trim().length < 3) {
            return NextResponse.json(
                { error: 'Product name must be at least 3 characters' },
                { status: 400 }
            );
        }

        if (!category) {
            return NextResponse.json(
                { error: 'Category is required' },
                { status: 400 }
            );
        }

        if (!price || price <= 0) {
            return NextResponse.json(
                { error: 'Price must be greater than 0' },
                { status: 400 }
            );
        }

        if (stock < 0) {
            return NextResponse.json(
                { error: 'Stock cannot be negative' },
                { status: 400 }
            );
        }

        const product = await Product.create({
            name: name.trim(),
            category,
            price,
            stock: stock || 0,
            images: images || [],
            description: description?.trim() || '',
            status: stock > 0 ? 'active' : 'out-of-stock'
        });

        return NextResponse.json({
            success: true,
            message: 'Product created successfully',
            product
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product', details: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update product with validation
export async function PUT(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        // Validate update data
        if (updateData.name && updateData.name.trim().length < 3) {
            return NextResponse.json(
                { error: 'Product name must be at least 3 characters' },
                { status: 400 }
            );
        }

        if (updateData.price !== undefined && updateData.price <= 0) {
            return NextResponse.json(
                { error: 'Price must be greater than 0' },
                { status: 400 }
            );
        }

        if (updateData.stock !== undefined && updateData.stock < 0) {
            return NextResponse.json(
                { error: 'Stock cannot be negative' },
                { status: 400 }
            );
        }

        // Trim string fields
        if (updateData.name) updateData.name = updateData.name.trim();
        if (updateData.description) updateData.description = updateData.description.trim();

        // Update status based on stock
        if (updateData.stock !== undefined) {
            updateData.status = updateData.stock > 0 ? 'active' : 'out-of-stock';
        }

        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error: any) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete product
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product', details: error.message },
            { status: 500 }
        );
    }
}
