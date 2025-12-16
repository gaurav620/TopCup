import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// DeliveryPartner schema defined inline to ensure same mongoose instance
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
    rating: { type: Number, default: 5.0 },
    totalDeliveries: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    workingArea: { type: String, default: 'Gurgaon' },
    currentActiveOrders: { type: Number, default: 0 }
}, { timestamps: true });

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliveryPartnerSchema);

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    console.log('[Delivery Login] 🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Delivery Login] ✅ Connected to MongoDB');
}

// Login delivery partner
export async function POST(request: NextRequest) {
    try {
        console.log('[Delivery Login] Starting login attempt...');
        await connectDB();

        const body = await request.json();
        const { email, password } = body;
        console.log('[Delivery Login] Attempt for email:', email);

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                error: 'Please provide email and password'
            }, { status: 400 });
        }

        // Find delivery partner
        const partner = await DeliveryPartner.findOne({ email: email.toLowerCase() });
        console.log('[Delivery Login] Partner found:', partner ? 'Yes' : 'No');

        if (!partner) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, partner.password);
        console.log('[Delivery Login] Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Return partner data (exclude password)
        const partnerData = {
            _id: partner._id,
            partnerId: partner.partnerId,
            name: partner.name,
            email: partner.email,
            phone: partner.phone,
            vehicleType: partner.vehicleType,
            status: partner.status,
            rating: partner.rating,
            totalDeliveries: partner.totalDeliveries,
            totalEarnings: partner.totalEarnings
        };

        console.log('[Delivery Login] Login successful!');
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: partnerData
        });
    } catch (error: any) {
        console.error('[Delivery Login] Error:', error.message);
        return NextResponse.json({
            success: false,
            error: 'Login failed'
        }, { status: 500 });
    }
}

