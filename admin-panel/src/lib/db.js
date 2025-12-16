const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

// Global cache for connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // Return cached connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // If no promise, create one
    if (!cached.promise) {
        console.log('🔄 Connecting to MongoDB (Admin Panel)...');
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            console.log('✅ MongoDB connected (Admin Panel)');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

module.exports = connectDB;

