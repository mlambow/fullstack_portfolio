'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface AdminLayoutShellProps {
    children: React.ReactNode;
}

export default function AdminLayoutShell({ children }: AdminLayoutShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // 1. Definition for admin section links
    const navItems = [
        { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
        { name: 'Projects', href: '/admin/projects', icon: '📁' },
        { name: 'Inbox Messages', href: '/admin/messages', icon: '📬' },
    ];

    // 2. Action to clear the session and log out
    const handleLogout = async () => {
        if (!window.confirm('Are you sure you want to log out of the workspace?')) return;

        try {
            // Call a lightweight native logout fetch routine
            await fetch('/api/auth/logout', { method: 'POST' });

            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout operation failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">

            {/* MOBILE HEADER TOPBAR */}
            <header className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-5 py-4 w-full sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <span className="text-xl">🛠️</span>
                    <span className="font-bold tracking-tight text-white">Admin Workspace</span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    {isMobileOpen ? '✕' : '☰'}
                </button>
            </header>

            {/* SIDEBAR CONTAINER (Desktop permanent / Mobile toggle drawer) */}
            <aside className={`
        fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 flex flex-col justify-between z-40 p-5 pt-20 md:pt-6 bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:block'}
      `}>
                <div className="space-y-6">
                    <div className="hidden md:flex items-center space-x-2 pb-4 border-b border-slate-200 dark:border-slate-800/60">
                        <span className="text-xl">🛠️</span>
                        <span className="font-bold tracking-tight text-slate-900 dark:text-white text-lg">Admin Workspace</span>
                    </div>

                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                                        isActive
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950/50 text-slate-800 dark:hover:text-slate-200'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Area with Theme Toggle Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-2">
                    <button
                        type="button"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950/40 rounded-lg transition-colors"
                    >
                        <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                        Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                        <span>🚪</span> Log Out
                    </button>
                </div>
            </aside>

            {/* Background overlay when mobile sidebar drawer is pulled open */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* PRIMARY DASHBOARD WORKSPACE VIEW */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden min-w-0">
                {children}
            </main>

        </div>
    );
}