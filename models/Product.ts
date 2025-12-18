import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discountPrice: {
        type: Number,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    images: [{
        type: String,
        required: true,
    }],
    category: {
        type: String,
        required: true,
        index: true,
    },
    weight: {
        type: String,
    },
    isBestseller: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    tags: [{
        type: String,
    }],
}, {
    timestamps: true,
});

// Prevent model recompilation error in Next.js hot reload
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
