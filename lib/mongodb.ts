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
    var mongooseCache: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using Mongoose.
 * 
 * This function implements a caching strategy to reuse the database connection
 * across multiple invocations, which is critical in a serverless/Next.js environment.
 * 
 * @returns {Promise<typeof mongoose>} A promise that resolves to the Mongoose instance.
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
