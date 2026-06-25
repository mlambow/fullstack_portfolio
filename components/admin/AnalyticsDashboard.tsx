'use client';

import React from 'react';
import { AnalyticsSummary } from '@/app/actions/analytics';

interface AnalyticsDashboardProps {
    data: AnalyticsSummary;
}

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
    const { totalViews, topPages, topCountries, devices } = data;

    // Utility to find percentages safely to draw custom CSS charts
    const getPercentage = (count: number, total: number) => {
        if (!total) return '0%';
        return `${Math.round((count / total) * 100)}%`;
    };

    return (
        <div className="space-y-6">
            {/* KPI Metric Card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Views (Last 30 Days)</p>
                    <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">
                        {totalViews.toLocaleString()}
                    </h3>
                </div>
                <div className="h-12 w-12 rounded-lg bg-emerald-950/50 border border-emerald-800 flex items-center justify-center text-emerald-400 text-xl font-bold">
                    📈
                </div>
            </div>

            {/* Grid Layout for Analytics Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Top Pages Box */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col justify-between">
                    <h4 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">Most Visited Pages</h4>
                    <div className="space-y-4 flex-1">
                        {topPages.map((page) => (
                            <div key={page._id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-mono text-emerald-400 truncate max-w-[70%]">{page._id}</span>
                                    <span className="text-slate-400 font-medium">{page.count} views</span>
                                </div>
                                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: getPercentage(page.count, totalViews) }}
                                    />
                                </div>
                            </div>
                        ))}
                        {topPages.length === 0 && <p className="text-sm text-slate-500 py-4">Waiting for traffic data...</p>}
                    </div>
                </div>

                {/* Top Countries Box */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col justify-between">
                    <h4 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">Audience Location</h4>
                    <div className="space-y-4 flex-1">
                        {topCountries.map((country) => (
                            <div key={country._id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300 font-medium">{country._id}</span>
                                    <span className="text-slate-400">{country.count} visits</span>
                                </div>
                                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: getPercentage(country.count, totalViews) }}
                                    />
                                </div>
                            </div>
                        ))}
                        {topCountries.length === 0 && <p className="text-sm text-slate-500 py-4">Waiting for traffic data...</p>}
                    </div>
                </div>

                {/* Device Breakdown Box */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-1">
                    <h4 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">Device Breakdown</h4>
                    <div className="space-y-4 flex-1">
                        {devices.map((device) => (
                            <div key={device._id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300 capitalize font-medium">{device._id}</span>
                                    <span className="text-slate-400">{getPercentage(device.count, totalViews)}</span>
                                </div>
                                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-purple-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: getPercentage(device.count, totalViews) }}
                                    />
                                </div>
                            </div>
                        ))}
                        {devices.length === 0 && <p className="text-sm text-slate-500 py-4">Waiting for traffic data...</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}