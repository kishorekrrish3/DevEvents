import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Interface for the cached Mongoose connection.
 * This ensures we have proper typing for the global cache object.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the NodeJS Global interface to include our mongoose cache.
 * This prevents TypeScript errors when accessing global.mongoose.
 */
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached Mongoose connection to MongoDB.
 *
 * Reuses an in-process cache so subsequent calls return the existing connection. If a connection attempt fails the cached promise is cleared so a future call can retry.
 *
 * @returns The connected Mongoose instance.
 */
async function connectToDatabase(): Promise<typeof mongoose> {
    // If a cached connection exists, return it immediately.
    if (cached!.conn) {
        return cached!.conn;
    }

    // If no connection promise exists, create a new one.
    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    try {
        // Await the promise to get the connection.
        cached!.conn = await cached!.promise;
    } catch (e) {
        // If connection fails, reset the promise so we can try again.
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default connectToDatabase;