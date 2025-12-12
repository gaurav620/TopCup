import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// Mark as dynamic route
export const dynamic = 'force-dynamic';

// GET all products with filters
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'createdAt';
        const order = searchParams.get('order') === 'asc' ? 1 : -1;
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const featured = searchParams.get('featured');
        const bestseller = searchParams.get('bestseller');

        // Build query
        const query: any = { isAvailable: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        if (featured === 'true') {
            query.isFeatured = true;
        }

        if (bestseller === 'true') {
            query.isBestseller = true;
        }

        // Sort options
        const sortOptions: any = {};
        if (sort === 'price') {
            sortOptions.discountPrice = order;
            sortOptions.price = order;
        } else if (sort === 'rating') {
            sortOptions.averageRating = order;
        } else if (sort === 'popularity') {
            sortOptions.totalReviews = order;
        } else {
            sortOptions.createdAt = order;
        }

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .select('-reviews'),
            Product.countDocuments(query),
        ]);

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Get products error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST create new product (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        // Generate slug from name
        const slug = body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Check if slug already exists
        const existingProduct = await Product.findOne({ slug });
        if (existingProduct) {
            body.slug = `${slug}-${Date.now()}`;
        } else {
            body.slug = slug;
        }

        const product = await Product.create(body);

        return NextResponse.json(
            { message: 'Product created successfully', product },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create product' },
            { status: 500 }
        );
    }
}
