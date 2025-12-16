import mongoose from 'mongoose';

// Order Schema for Admin Panel
const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    orderNumber: { type: String },
    customer: {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String
        }
    },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered'],
        default: 'pending'
    },
    deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    paymentMethod: { type: String, enum: ['cod', 'online', 'upi'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
