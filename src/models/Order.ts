import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface IOrder extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    orderNumber: string;
    items: IOrderItem[];
    shippingAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        pincode: string;
    };
    paymentMethod: 'cod' | 'razorpay' | 'upi';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    discountAmount: number;
    totalPrice: number;
    couponCode?: string;
    orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
    deliveryDate?: Date;
    deliverySlot?: string;
    specialInstructions?: string;
    trackingNumber?: string;
    cancelReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: false }, // Optional for demo products
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
});


const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderNumber: {
            type: String,
            unique: true,
        },

        items: [OrderItemSchema],
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['cod', 'razorpay', 'upi'],
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending',
        },
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        itemsPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        discountAmount: {
            type: Number,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        couponCode: { type: String },
        orderStatus: {
            type: String,
            required: true,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
            default: 'pending',
        },
        deliveryDate: { type: Date },
        deliverySlot: { type: String },
        specialInstructions: { type: String },
        trackingNumber: { type: String },
        cancelReason: { type: String },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries (orderNumber index already created by unique: true)
OrderSchema.index({ user: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.orderNumber = `TC${year}${month}${random}`;
    }
    next();
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
