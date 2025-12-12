const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gauravkumar495m122:njN8DGgdwwimSPdt@topcup.ugzk7vp.mongodb.net/topcup?retryWrites=true&w=majority&appName=TopCup';

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Admin credentials
        const adminEmail = 'admin@topcup.in';
        const adminPassword = 'Admin@123';
        const adminName = 'TopCup Admin';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email:', adminEmail);

            // Update the password
            const hashedPassword = await bcrypt.hash(adminPassword, 12);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = 'admin';
            await existingAdmin.save();

            console.log('✅ Admin password updated successfully!');
            console.log('\n🔐 Login Credentials:');
            console.log('Email:', adminEmail);
            console.log('Password:', adminPassword);
        } else {
            // Hash password
            const hashedPassword = await bcrypt.hash(adminPassword, 12);

            // Create admin user
            const admin = new User({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                isActive: true
            });

            await admin.save();
            console.log('✅ Admin user created successfully!');
            console.log('\n🔐 Login Credentials:');
            console.log('Email:', adminEmail);
            console.log('Password:', adminPassword);
        }

        console.log('\n📍 Admin Panel URL: http://localhost:5001');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
        process.exit(0);
    }
}

createAdmin();
