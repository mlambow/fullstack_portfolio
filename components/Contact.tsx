'use client';

import React, {useState} from 'react';

export const Contact = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle'); // Clear any previous statuses

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({name: '', email: '', message: ''});
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Network dispatch error:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-6 lg:py-26 bg-background text-foreground transition-colors duration-200"
        >
            <div
                className="w-full lg:max-w-6xl mx-auto px-4 flex flex-col lg:grid lg:grid-cols-12 gap-16">

                {/* LEFT PANEL: Structural Contexts */}
                <div className="w-full lg:col-span-5 space-y-6">
                    <div>
                        <div
                            className="inline-flex items-center gap-2 mb-6 text-[9px] sm:text-xs font-mono tracking-widest uppercase text-muted-foreground">
                            <span className="relative flex h-2 w-2">
                              <span
                                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 transition-colors ease-in-out duration-300 ${
                                      status === 'success' ? 'bg-emerald-400' :
                                          status === 'error' ? 'bg-rose-400' :
                                              status === 'idle' ? 'bg-amber-400' : ""
                                  }`}
                              />
                              <span
                                  className={`relative inline-flex rounded-full h-2 w-2 transition-colors ease-in-out duration-300 ${
                                      isSubmitting ? 'bg-neutral-500' :
                                          status === 'success' ? 'bg-emerald-500' :
                                              status === 'error' ? 'bg-rose-500' :
                                                  status === 'idle' ? 'bg-amber-400' : ""
                                  }`}
                              />
                            </span>
                            {"// Connection Gateway"}
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-normal tracking-tight text-foreground">
                            Get In Touch
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-foreground font-light mt-4 leading-relaxed w-full lg:max-w-sm">
                            Let&#39;s discuss architecture, production systems, or contract opportunities. Drop a
                            message or reach out via professional secure networks.
                        </p>
                    </div>

                    {/* Clean Directory Links */}
                    <div className="flex lg:flex-col space-y-3 pt-6 text-sm font-mono">
                        <div className="flex flex-col">
                            <span
                                className="text-[10px] uppercase text-muted-foreground tracking-wider">{"// secure_email"}</span>
                            <a href="mailto:wandile.mlambo@yahoo.com"
                               className="text-foreground hover:text-muted-foreground transition-colors mt-0.5">
                                wandile.mlambo@yahoo.com
                            </a>
                        </div>
                        <div className="flex flex-col md:pt-2 ml-10 lg:ml-0">
                            <span
                                className="text-[10px] uppercase text-muted-foreground tracking-wider"
                            >
                                {"// network_nodes"}
                            </span>
                            <div className="flex gap-4 mt-0.5 text-xs">
                                <a href="https://github.com/mlambow?tab=repositories" target="_blank"
                                   rel="noopener noreferrer"
                                   className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                                >
                                    github ↗
                                </a>
                                {/*<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"*/}
                                {/*   className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"*/}
                                {/*>*/}
                                {/*    linkedin ↗*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Dynamic Underline Form or Status Screen Wrapper */}
                <div className="lg:col-span-7 min-h-[350px] flex flex-col justify-center">

                    {status === 'idle' || isSubmitting ? (
                        /* ====================================================================
                           STATE A: ACTIVE INPUT FIELDS (Visible during filling and dispatching)
                           ==================================================================== */
                        <form onSubmit={handleSubmit} className="space-y-10 animate-[fadeIn_0.3s_ease-out]">
                            {/* Identity Field */}
                            <div className="relative group flex flex-col space-y-1">
                                <label htmlFor="name"
                                       className="text-[10px] font-mono uppercase tracking-widest text-foreground">
                                    01 / Your Identity
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    disabled={isSubmitting}
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="e.g., Alexander Wright"
                                    className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-sm placeholder-foreground/50 text-foreground transition-colors disabled:opacity-40"
                                />
                            </div>

                            {/* Routing Point Field */}
                            <div className="relative group flex flex-col space-y-1">
                                <label htmlFor="email"
                                       className="text-[10px] font-mono uppercase tracking-widest text-foreground">
                                    02 / Return Address <span className='text-foreground/50'>[Email]</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    disabled={isSubmitting}
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="e.g., alex@company.com"
                                    className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-sm placeholder-foreground/50 text-foreground transition-colors disabled:opacity-40"
                                />
                            </div>

                            {/* Payload Field */}
                            <div className="relative group flex flex-col space-y-1">
                                <label htmlFor="message"
                                       className="text-[10px] font-mono uppercase tracking-widest text-foreground">
                                    03 / Message Payload
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    disabled={isSubmitting}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    placeholder="Describe your architecture requirements or workflow parameters..."
                                    className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-sm placeholder-foreground/50 text-foreground transition-colors resize-none disabled:opacity-40"
                                />
                            </div>

                            {/* Submission Trigger */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 cursor-pointer font-light bg-foreground text-background rounded-full hover:bg-muted-foreground transition-all duration-200 text-xs md:text-sm tracking-tight disabled:opacity-40"
                                >
                                    {isSubmitting ? 'dispatching_payload...' : 'Transmit Message'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* ====================================================================
                           STATE B: STATUS FEEDBACK VIEW (Swaps in completely upon API response)
                           ==================================================================== */
                        <div
                            className="flex flex-col items-center justify-center text-center space-y-6 py-12 rounded-2xl bg-muted/5 animate-[scaleUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">

                            {status === 'success' ? (
                                <>
                                    {/* Emerald Check Circle */}
                                    <div
                                        className="w-18 h-18 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={2} stroke="currentColor" className="w-16 h-16">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-500">
                                            {"// TRANSMITTED_SUCCESSFULLY"}
                                        </h3>
                                        <p className="text-foreground text-sm max-w-xs font-normal">
                                            Your message pipeline request cleared successfully. I will review the
                                            message and get back to you shortly.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Rose X Circle */}
                                    <div
                                        className="w-18 h-18 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={2} stroke="currentColor" className="w-16 h-16">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-mono text-xs uppercase tracking-widest text-rose-500">
                                            {"// DISPATCH_FAILED"}
                                        </h3>
                                        <p className="text-foreground text-sm max-w-xs font-normal">
                                            The network packet drop failed to reach the server handler endpoint safely.
                                            Please try again.
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Reset Form Trigger */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-2 cursor-pointer font-mono border border-border hover:border-foreground rounded-full text-[11px] uppercase tracking-widest text-foreground transition-all duration-200"
                                >
                                    [ Return to Form ]
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};