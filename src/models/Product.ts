import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview {
    user: mongoose.Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    discountPrice?: number;
    category: 'cakes' | 'gifts' | 'snacks' | 'combos';
    subcategory?: string;
    images: string[];
    stock: number;
    isAvailable: boolean;
    isFeatured: boolean;
    isBestseller: boolean;
    weight?: string;
    servings?: string;
    ingredients?: string[];
    tags: string[];
    reviews: IReview[];
    averageRating: number;
    totalReviews: number;
    deliveryInfo?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            maxlength: [2000, 'Description cannot be more than 2000 characters'],
        },
        shortDescription: {
            type: String,
            maxlength: [200, 'Short description cannot be more than 200 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        discountPrice: {
            type: Number,
            min: [0, 'Discount price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['cakes', 'gifts', 'snacks', 'combos'],
        },
        subcategory: {
            type: String,
            trim: true,
        },
        images: [{
            type: String,
            required: true,
        }],
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Stock cannot be negative'],
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isBestseller: {
            type: Boolean,
            default: false,
        },
        weight: { type: String },
        servings: { type: String },
        ingredients: [{ type: String }],
        tags: [{ type: String }],
        reviews: [ReviewSchema],
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
        deliveryInfo: { type: String },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries (slug index already created by unique: true)
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isBestseller: 1 });
ProductSchema.index({ price: 1 });

// Pre-save hook to update average rating
ProductSchema.pre('save', function (next) {
    if (this.reviews && this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
        this.totalReviews = this.reviews.length;
    }
    next();
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
