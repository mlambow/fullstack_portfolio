'use client';

import React, { useState } from 'react';
import { toggleMessageReadStatus, deleteContactMessage } from '@/app/actions/messages';

interface MessageItem {
    _id: string;
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface MessageListClientProps {
    initialMessages: MessageItem[];
}

export default function MessageListClient({ initialMessages }: MessageListClientProps) {
    const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
        setProcessingId(id);
        const newStatus = !currentReadStatus;
        const result = await toggleMessageReadStatus(id, newStatus);

        if (result.success) {
            setMessages((prev) =>
                prev.map((msg) => (msg._id === id ? { ...msg, isRead: newStatus } : msg))
            );
        } else {
            alert(`Error updating message: ${result.error}`);
        }
        setProcessingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        setProcessingId(id);
        const result = await deleteContactMessage(id);

        if (result.success) {
            setMessages((prev) => prev.filter((msg) => msg._id !== id));
        } else {
            alert(`Error deleting message: ${result.error}`);
        }
        setProcessingId(null);
    };

    if (messages.length === 0) {
        return (
            <div className="text-center py-16 bg-slate-900 border border-slate-800 border-dashed rounded-xl">
                <p className="text-slate-400 text-sm">Your inbox is completely clear. No messages yet!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {messages.map((msg) => (
                <div
                    key={msg._id}
                    className={`border rounded-xl p-5 transition-all shadow-md ${
                        msg.isRead
                            ? 'bg-slate-900/60 border-slate-800/80 opacity-80'
                            : 'bg-slate-900 border-emerald-900/40 ring-1 ring-emerald-500/10'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h4 className="font-bold text-lg text-white">{msg.name}</h4>
                                {!msg.isRead && (
                                    <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wide uppercase bg-emerald-500 text-slate-950 rounded-md">
                    New
                  </span>
                                )}
                            </div>
                            <a
                                href={`mailto:${msg.email}`}
                                className="text-sm font-mono text-emerald-400 hover:underline inline-block mt-0.5"
                            >
                                {msg.email}
                            </a>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
              {new Date(msg.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
              })}
            </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/50 whitespace-pre-wrap font-sans">
                        {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-800/60">
                        <button
                            type="button"
                            disabled={processingId === msg._id}
                            onClick={() => handleToggleRead(msg._id, msg.isRead)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors ${
                                msg.isRead
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                    : 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 hover:bg-emerald-900/30'
                            }`}
                        >
                            {msg.isRead ? 'Mark Unread' : 'Mark as Read'}
                        </button>
                        <button
                            type="button"
                            disabled={processingId === msg._id}
                            onClick={() => handleDelete(msg._id)}
                            className="text-xs font-semibold px-3 py-1.5 bg-red-950/40 border border-red-900/40 hover:bg-red-900/40 text-red-400 rounded transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}