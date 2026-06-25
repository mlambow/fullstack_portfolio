import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pagePath, country, deviceType, referrer } = body;

        // Connect to the database
        await connectDB();

        // Create the log document
        await Analytics.create({
            pagePath,
            country,
            deviceType,
            referrer,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Error saving analytics log:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}