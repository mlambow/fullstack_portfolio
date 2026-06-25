import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define the interface for the traffic log
export interface IAnalytics extends Document {
    pagePath: string;    // e.g., "/", "/projects", "/projects/flowstate"
    country: string;     // e.g., "South Africa", "United States"
    deviceType: string;  // e.g., "desktop", "mobile", "tablet"
    referrer: string;    // Where the user came from (e.g., "LinkedIn", "Direct")
    createdAt: Date;
}

// 2. Create the Schema
const AnalyticsSchema: Schema<IAnalytics> = new Schema({
    pagePath: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        default: 'Unknown'
    },
    deviceType: {
        type: String,
        default: 'desktop'
    },
    referrer: {
        type: String,
        default: 'Direct'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true // Production habit: Indexing dates makes time-based dashboard queries blazing fast
    },
});

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;