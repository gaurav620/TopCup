const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
    partnerId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return 'DP' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['Bike', 'Scooter', 'Car', 'Bicycle']
    },
    vehicleNumber: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on-break'],
        default: 'active'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 5.0,
        min: 0,
        max: 5
    },
    totalDeliveries: {
        type: Number,
        default: 0,
        min: 0
    },
    totalEarnings: {
        type: Number,
        default: 0,
        min: 0
    },
    workingArea: {
        type: String,
        default: 'Gurgaon'
    },
    currentActiveOrders: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
deliveryPartnerSchema.index({ email: 1 });
deliveryPartnerSchema.index({ status: 1, isAvailable: 1 });
deliveryPartnerSchema.index({ partnerId: 1 });

// Don't return password in queries
deliveryPartnerSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliveryPartnerSchema);

module.exports = DeliveryPartner;
