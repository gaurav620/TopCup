import mongoose from 'mongoose';

// DeliveryPartner Schema
const deliveryPartnerSchema = new mongoose.Schema({
    partnerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    vehicleType: { type: String, enum: ['Bike', 'Scooter', 'Car', 'Bicycle'] },
    vehicleNumber: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'on-break'], default: 'active' },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    totalDeliveries: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    workingArea: { type: String, default: 'Gurgaon' },
    currentActiveOrders: { type: Number, default: 0 }
}, { timestamps: true });

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliveryPartnerSchema);

export default DeliveryPartner;
