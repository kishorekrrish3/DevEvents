import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global interface to include our mongoose cache
// This prevents TypeScript errors when accessing global.mongoose
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache;
}

// Initialize the cached variable.
// In development mode, Next.js clears Node.js modules on file changes.
// To prevent creating multiple connections, we store the connection in the global scope.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database.
 * 
 * This function implements a caching strategy to reuse the database connection
 * across multiple invocations, which is critical in serverless environments
 * and during hot-reloading in development.
 * 
 * @returns {Promise<Mongoose>} The Mongoose connection instance.
 */
export const connectToDatabase = async (): Promise<Mongoose> => {
    // If a cached connection exists, return it immediately
    if (cached.conn) {
        return cached.conn;
    }

    // If no connection promise exists, create a new one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        // Await the promise to establish the connection
        cached.conn = await cached.promise;
    } catch (e) {
        // If connection fails, reset the promise so we can try again
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};
