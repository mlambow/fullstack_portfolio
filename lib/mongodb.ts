import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Access the globally cached connection safely
let cached = global.mongoose;

// If it doesn't exist yet, initialize it
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    console.log('MONGODB_URI exists:', !!MONGODB_URI);
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default connectDB;

import bcrypt from 'bcryptjs';
import User from '@/models/User';

export async function bootstrapAdmin() {
    await connectDB();

    // Check if any admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) return;

    // Read secure fallback credentials from your local environment variables
    const email = process.env.INITIAL_ADMIN_EMAIL;
    const password = process.env.INITIAL_ADMIN_PASSWORD;

    if (!email || !password) {
        console.warn('⚠️ Initialization skipped: INITIAL_ADMIN_EMAIL or PASSWORD missing in .env');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
        name: 'Wandile Mlambo',
        email,
        passwordHash: hashedPassword,
        role: 'admin',
    });

    console.log('✅ System bootstrapped: Initial admin account deployed successfully.');
}