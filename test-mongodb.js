// MongoDB Connection Test Script
// Run this to verify your MongoDB Atlas connection works

const mongoose = require('mongoose');
const fs = require('fs');

// Read MongoDB URI from .env.local
let MONGODB_URI;
try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const match = envContent.match(/MONGODB_URI=(.+)/);
    MONGODB_URI = match ? match[1].trim() : null;
} catch (error) {
    console.error('Error reading .env.local file');
    process.exit(1);
}

console.log('🔍 Testing MongoDB Connection...');
console.log('📍 Connection URI:', MONGODB_URI?.substring(0, 30) + '...');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB!');
        console.log('📊 Database name:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);

        // Test creating a simple document
        const TestSchema = new mongoose.Schema({
            test: String,
            timestamp: Date
        });

        const TestModel = mongoose.model('Test', TestSchema);

        return TestModel.create({
            test: 'Connection successful!',
            timestamp: new Date()
        });
    })
    .then((doc) => {
        console.log('✅ Test document created:', doc._id);
        console.log('\n🎉 MongoDB is working perfectly!\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:');
        console.error(error.message);

        if (error.message.includes('authentication')) {
            console.log('\n💡 Fix: Check your username and password in the connection string');
        } else if (error.message.includes('network')) {
            console.log('\n💡 Fix: Check your IP whitelist in MongoDB Atlas Network Access');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('\n💡 Fix: Check your cluster URL in the connection string');
        }

        process.exit(1);
    });
