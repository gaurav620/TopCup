import mongoose from 'mongoose';

// Default to local MongoDB if not specified
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/topcup';

interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        console.log('✅ Using cached MongoDB connection (Delivery Dashboard)');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            minPoolSize: 2,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 10000,
        };

        console.log('🔄 Connecting to MongoDB (Delivery Dashboard)...');

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB connected successfully (Delivery Dashboard)');
            return mongoose;
        }).catch((error) => {
            console.error('❌ MongoDB connection failed (Delivery Dashboard):', error.message);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
