import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
    product: mongoose.Types.ObjectId;
    productName: string;
    quantity: number;
    price: number;
}

interface IShippingAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
}

export interface IOrder extends Document {
    orderNumber: string;
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentId?: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        orderNumber: {
            type: String,
            unique: true,
            index: true // Add index for order lookups
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true // Add index for user orders
        },
        items: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            productName: { type: String, required: true },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            },
            price: {
                type: Number,
                required: true,
                min: [0, 'Price cannot be negative']
            }
        }],
        totalPrice: {
            type: Number,
            required: true,
            min: [0, 'Total price cannot be negative'],
            index: true // Add index for revenue queries
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true }
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['COD', 'razorpay']
        },
        paymentId: String,
        status: {
            type: String,
            required: true,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
            index: true // Add index for status filtering
        }
    },
    {
        timestamps: true
    }
);

// Compound indexes for common queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 }); // For latest orders

// Auto-generate order number
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ORD${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
