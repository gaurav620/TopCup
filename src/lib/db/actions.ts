'use server';

import connectDB from '@/lib/db/connect';
import Product from '@/models/Product';
import { Product as ProductType } from '@/types';

export async function getProductsByCategory(category: string): Promise<ProductType[]> {
    try {
        await connectDB();

        const products = await Product.find({ category }).lean();

        return products.map((product) => ({
            ...product,
            _id: (product._id as unknown as string).toString(),
        })) as unknown as ProductType[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getAllProducts(): Promise<ProductType[]> {
    try {
        await connectDB();
        const products = await Product.find({}).lean();
        return products.map((product) => ({
            ...product,
            _id: (product._id as unknown as string).toString(),
        })) as unknown as ProductType[];
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
    try {
        await connectDB();
        const product = await Product.findOne({ slug }).lean();
        if (!product) return null;

        return {
            ...product,
            _id: (product._id as unknown as string).toString(),
        } as unknown as ProductType;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }
}
