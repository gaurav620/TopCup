import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

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
    // Check if MongoDB URI is configured
    if (!MONGODB_URI) {
        console.warn('⚠️ MONGODB_URI not configured. Using demo mode.');
        // In demo mode, throw a helpful error
        throw new Error('Database not configured. Please set MONGODB_URI in .env.local');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            connectTimeoutMS: 10000, // Connection timeout
        };

        console.log('🔄 Connecting to MongoDB...');

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB connected successfully');
            return mongoose;
        }).catch((error) => {
            console.error('❌ MongoDB connection failed:', error.message);
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
