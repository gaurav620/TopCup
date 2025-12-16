import mongoose from 'mongoose';

// Product Schema for Admin Panel
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    images: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive', 'out-of-stock'], default: 'active' },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

// Prevent model recompilation
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
