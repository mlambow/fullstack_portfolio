'use client';

import React, {useState} from 'react';

export const Contact = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send the payload straight to our local Next.js API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Success: Clear the form inputs
                setFormData({name: '', email: '', message: ''});
                alert('Message transmitted successfully.');
            } else {
                const data = await response.json();
                alert(`Transmission failed: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Network dispatch error:', error);
            alert('Could not establish contact connection route.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 bg-background text-foreground transition-colors duration-200"
        >
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT PANEL: Structural Contexts */}
                <div className="lg:col-span-5 space-y-6">
                    <div>
                        <span
                            className="text-xs font-mono font-normal uppercase tracking-widest text-muted-foreground block mb-2">
                          {"// Connection Gateway"}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-foreground">
                            Get In Touch
                        </h2>
                        <p className="text-sm md:text-base text-foreground font-light mt-4 leading-relaxed max-w-sm">
                            Let&#39;s discuss architecture, production systems, or contract opportunities. Drop a
                            message or reach out via professional secure networks.
                        </p>
                    </div>

                    {/* Clean Directory Links */}
                    <div className="space-y-3 pt-6 text-sm font-mono">
                        <div className="flex flex-col">
                            <span
                                className="text-[10px] uppercase text-muted-foreground tracking-wider">{"// secure_email"}</span>
                            <a href="mailto:wandile.mlambo@yahoo.com"
                               className="text-foreground hover:text-muted-foreground transition-colors mt-0.5">
                                wandile.mlambo@yahoo.com
                            </a>
                        </div>
                        <div className="flex flex-col pt-2">
                            <span
                                className="text-[10px] uppercase text-muted-foreground tracking-wider">{"// network_nodes"}</span>
                            <div className="flex gap-4 mt-0.5 text-xs">
                                <a href="https://github.com/mlambow" target="_blank" rel="noopener noreferrer"
                                   className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">github
                                    ↗</a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                   className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">linkedin
                                    ↗</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Modern Underline Form Layout */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">

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
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g., Alexander Wright"
                            className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-base placeholder-foreground/50 text-foreground transition-colors"
                        />
                    </div>

                    {/* Routing Point Field */}
                    <div className="relative group flex flex-col space-y-1">
                        <label htmlFor="email"
                               className="text-[10px] font-mono uppercase tracking-widest text-foreground">
                            02 / Return Address Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="e.g., alex@company.com"
                            className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-base placeholder-foreground/50 text-foreground transition-colors"
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
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Describe your architecture requirements or workflow parameters..."
                            className="w-full py-2 bg-transparent border-b border-border/80 focus:border-foreground focus:outline-none font-light text-base placeholder-foreground/50 text-foreground transition-colors resize-none"
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
            </div>
        </section>
    );
};