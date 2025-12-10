const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Define Admin schema inline to avoid path issues
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date,
    passwordChangedAt: Date
}, {
    timestamps: true
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

const createInitialAdmin = async () => {
    try {
        // Get MongoDB URI from environment or use default
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ role: 'super-admin' });

        if (existingAdmin) {
            console.log('✅ Super admin already exists:', existingAdmin.email);
            console.log('\nLogin credentials:');
            console.log('Email:', existingAdmin.email);
            console.log('Password: (use the password you set when creating this admin)');
            process.exit(0);
        }

        // Get credentials from environment or use defaults
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@topcup.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        const adminName = process.env.ADMIN_NAME || 'Super Admin';

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create admin
        const admin = await Admin.create({
            email: adminEmail,
            password: hashedPassword,
            name: adminName,
            role: 'super-admin'
        });

        console.log('✅ Super admin created successfully!');
        console.log('\n📧 Login Credentials:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('\n⚠️  IMPORTANT: Change your password after first login!');
        console.log('\nYou can now login at: http://localhost:5001');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

createInitialAdmin();
