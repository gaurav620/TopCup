const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config({ path: '.env.local' });

const createInitialAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ role: 'super-admin' });

        if (existingAdmin) {
            console.log('Super admin already exists:', existingAdmin.email);
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
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createInitialAdmin();
