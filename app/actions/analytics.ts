'use server';

import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export interface AnalyticsSummary {
    totalViews: number;
    topPages: { _id: string; count: number }[];
    topCountries: { _id: string; count: number }[];
    devices: { _id: string; count: number }[];
}

export async function getAnalyticsData(): Promise<AnalyticsSummary> {
    try {
        await connectDB();

        // Limit queries to the last 30 days to keep performance lightning fast
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const matchStage = { $match: { createdAt: { $gte: thirtyDaysAgo } } };

        // 1. Total Page Views
        const totalViews = await Analytics.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        // 2. Top Pages Aggregate
        const topPages = await Analytics.aggregate([
            matchStage,
            { $group: { _id: '$pagePath', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // 3. Top Countries Aggregate
        const topCountries = await Analytics.aggregate([
            matchStage,
            { $group: { _id: '$country', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // 4. Device Breakdown Aggregate
        const devices = await Analytics.aggregate([
            matchStage,
            { $group: { _id: '$deviceType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        return {
            totalViews,
            topPages,
            topCountries,
            devices,
        };
    } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        return {
            totalViews: 0,
            topPages: [],
            topCountries: [],
            devices: [],
        };
    }
}