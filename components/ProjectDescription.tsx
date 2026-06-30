'use client'

import {useState, useEffect, useRef} from 'react';

interface ProjectDescriptionProps {
    description: string;
    title: string;
}

export function ProjectDescription({description, title}: ProjectDescriptionProps) {
    const [isClamped, setIsClamped] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    // Detect if the text is genuinely truncated by line-clamp
    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const {scrollHeight, clientHeight} = textRef.current;
                // If the scrollable content is taller than the visible content, it's clamped
                setIsClamped(scrollHeight > clientHeight);
            }
        };

        checkTruncation();
        // Re-check if the browser window resizes
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [description]);

    return (
        <>
            {/* 1. THE TRIGGER PARAGRAPH */}
            <p
                ref={textRef}
                onClick={() => isClamped && setIsOpen(true)}
                className={`text-[10px] md:text-xs lg:text-sm text-muted-foreground font-extralight leading-relaxed max-w-xl line-clamp-3 ${
                    isClamped ? 'cursor-pointer hover:text-foreground transition-colors' : ''
                }`}
                title={isClamped ? "Click to view full description" : undefined}
            >
                {description}
            </p>

            {/* 2. THE MINIMALIST EDITORIAL MODAL SCREEN */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]"
                >
                    {/* Modal Card Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background border border-border/60 rounded-2xl max-w-2xl w-full p-8 md:p-10 space-y-6 shadow-2xl animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
                    >
                        {/* Minimal Terminal Label Header */}
                        <div className="flex items-center justify-between border-b border-border/40 pb-4">
                              <span
                                  className="font-mono text-[7.5px] md:text-[10px] uppercase tracking-widest text-muted-foreground">
                                {`// ${title}: Full Description`}
                              </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-foreground hover:text-rose-600 hover:bg-rose-600/20 py-2 px-3 rounded-2xl transition-all duration-200 font-mono text-[7.5px] md:text-xs cursor-pointer"
                            >
                                [ CLOSE ]
                            </button>
                        </div>

                        {/* Complete Unclamped Text Payload */}
                        <p className="text-xs md:text-sm text-foreground font-extralight leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}