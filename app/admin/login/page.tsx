'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            router.push('/admin/projects');
            router.refresh();
        } catch (err: any) {
            setErrorMsg(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4 select-none">

            {/* BACKGROUND DESIGN ELEMENTS: Glowing Orb Accents */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

            {/* Subtle Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

            {/* CARD LAYER: Glassmorphism layout structure */}
            <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.7)] space-y-8 relative z-10 transition-all duration-300 hover:border-slate-700/50">

                {/* Core Identity Branding Block */}
                <div className="text-center space-y-2">
                    <div className="relative inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-slate-700/50 items-center justify-center text-2xl shadow-inner group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        🔐
                    </div>
                    <h1 className="text-3xl font-mono font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        System Terminal
                    </h1>
                    <p className="text-xs font-medium uppercase tracking-widest text-emerald-500/80 font-mono">
                        Secure Administrator Mode
                    </p>
                </div>

                {/* Dynamic Exception Indicator */}
                {errorMsg && (
                    <div className="p-4 text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/40 rounded-xl flex items-center gap-3 animate-headShake">
                        <span className="flex-shrink-0 text-sm">⚠️</span>
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Access Form Core */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Identity String Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono pl-1">
                            Identity Operator
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/80 text-sm text-white placeholder-slate-600 placeholder:font-mono transition-all font-sans"
                                placeholder="operator@system.com"
                            />
                        </div>
                    </div>

                    {/* Access Token Cryptographic Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono pl-1">
                            Passkey Sequence
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/80 text-sm text-white placeholder-slate-600 transition-all tracking-widest"
                            placeholder="••••••••••••"
                        />
                    </div>

                    {/* Core Submission Trigger */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative group overflow-hidden py-3 mt-4 bg-slate-100 text-slate-950 text-sm font-bold rounded-xl shadow-lg hover:bg-white active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                    >
                        <div className="flex items-center justify-center cursor-pointer gap-2">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Verifying Signature...</span>
                                </>
                            ) : (
                                <span className="font-mono">Initialize Session</span>
                            )}
                        </div>
                    </button>
                </form>

            </div>
        </div>
    );
}