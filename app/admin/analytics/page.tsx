import React from 'react';
import { getAnalyticsData } from '@/app/actions/analytics';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export const revalidate = 0; // Ensure data is completely fresh on every visit

export default async function AdminAnalyticsPage() {
    const data = await getAnalyticsData();

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
            <div className="border-b border-slate-800 pb-5">
                <h1 className="text-3xl font-bold tracking-tight">Traffic Analytics</h1>
                <p className="text-sm text-slate-400 mt-1">
                    A rolling 30-day view of your portfolio&#39;s reach, engagement, and audience metrics.
                </p>
            </div>

            <AnalyticsDashboard data={data} />
        </div>
    );
}