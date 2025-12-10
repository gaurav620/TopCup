import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    featured: boolean;
    rating: number;
    reviews: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minlength: [3, 'Product name must be at least 3 characters'],
            maxlength: [100, 'Product name cannot exceed 100 characters'],
            index: true // Add index for faster queries
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
            index: true // Add index for sorting
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            index: true // Add index for filtering
        },
        images: {
            type: [String],
            default: []
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Stock cannot be negative'],
            index: true // Add index for stock queries
        },
        featured: {
            type: Boolean,
            default: false,
            index: true // Add index for featured products
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Compound indexes for common queries
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ featured: 1, createdAt: -1 });
ProductSchema.index({ name: 'text', description: 'text' }); // Text search index

// Virtual for status
ProductSchema.virtual('status').get(function () {
    return this.stock > 0 ? 'active' : 'out-of-stock';
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
