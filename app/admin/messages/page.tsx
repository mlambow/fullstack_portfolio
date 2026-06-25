import React from 'react';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import MessageListClient from '@/components/admin/MessageListClient';

export const revalidate = 0; // Keep message box completely real-time

export default async function AdminMessagesPage() {
    await connectDB();

    // Fetch all messages from newest to oldest
    const rawMessages = await Message.find({}).sort({ createdAt: -1 });

    // Clean serialization for Client Component boundary hand-off
    const messages = rawMessages.map((doc) => ({
        _id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        message: doc.message,
        isRead: doc.isRead,
        createdAt: doc.createdAt.toISOString(),
    }));

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-100">
            <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inbox Messages</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Review submissions, connection requests, and inquiries submitted through your contact form.
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300">
                    Total Received: <span className="text-emerald-400 font-mono">{messages.length}</span>
                </div>
            </div>

            <MessageListClient initialMessages={messages} />
        </div>
    );
}