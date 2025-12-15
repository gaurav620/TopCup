const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define DeliveryPartner schema inline
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

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliveryPartnerSchema);

const createDeliveryPartner = async () => {
    try {
        // Get MongoDB URI from environment or use default
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Partner credentials
        const partnerEmail = 'delivery@topcup.com';
        const partnerPassword = 'delivery123';
        const partnerName = 'Test Delivery Partner';
        const partnerPhone = '+919876543210';

        // Check if partner already exists
        let partner = await DeliveryPartner.findOne({ email: partnerEmail });

        if (partner) {
            console.log('📝 Delivery partner already exists. Updating password...');
            // Hash new password
            const hashedPassword = await bcrypt.hash(partnerPassword, 10);

            // Update password
            partner.password = hashedPassword;
            await partner.save();

            console.log('✅ Delivery partner password updated successfully!');
        } else {
            console.log('📝 Creating new delivery partner...');
            // Hash password
            const hashedPassword = await bcrypt.hash(partnerPassword, 10);

            // Create delivery partner
            partner = await DeliveryPartner.create({
                name: partnerName,
                email: partnerEmail,
                password: hashedPassword,
                phone: partnerPhone,
                vehicleType: 'Bike',
                vehicleNumber: 'DL01AB1234',
                status: 'active',
                workingArea: 'Gurgaon'
            });

            console.log('✅ Delivery partner created successfully!');
        }

        console.log('\n📧 Delivery Partner Login Credentials:');
        console.log('Email:', partnerEmail);
        console.log('Password:', partnerPassword);
        console.log('Partner ID:', partner.partnerId);
        console.log('\nYou can now login at: http://localhost:5002');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating delivery partner:', error.message);
        process.exit(1);
    }
};

createDeliveryPartner();
