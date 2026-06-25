import mongoose from 'mongoose';

declare global {
    // This tells TypeScript that the global object might contain a mongoose cache
    var mongoose: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    } | undefined;
}