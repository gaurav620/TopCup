const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return 'ORD-' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
        }
    },
    // Customer Information
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    // Order Items
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: String,
        total: { type: Number, required: true }
    }],
    // Pricing
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 50 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    // Delivery Address
    deliveryAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: String,
        zipCode: String,
        landmark: String,
        fullAddress: { type: String, required: true }
    },
    // Order Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    // Payment Information
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'upi', 'wallet'],
        default: 'cash'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    // DELIVERY PARTNER FIELDS
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
        default: null
    },
    deliveryPartnerName: {
        type: String,
        default: null
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'assigned', 'picked-up', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending'
    },
    // Delivery Timestamps
    assignedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
    // Delivery Notes
    deliveryNotes: String,
    customerNotes: String,
    // Status History
    statusHistory: [{
        status: String,
        timestamp: { type: Date, default: Date.now },
        updatedBy: String,
        note: String
    }],
    // Timestamps
    orderDate: {
        type: Date,
        default: Date.now
    },
    estimatedDeliveryTime: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 45 * 60000); // 45 minutes from now
        }
    }
}, {
    timestamps: true
});

// Indexes for performance (orderId already indexed via unique:true)
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ deliveryPartner: 1 });
orderSchema.index({ deliveryStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Add to status history before saving
orderSchema.pre('save', function (next) {
    if (this.isModified('status') || this.isModified('deliveryStatus')) {
        this.statusHistory.push({
            status: this.deliveryStatus || this.status,
            timestamp: new Date(),
            updatedBy: 'system'
        });
    }
    next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
