import React from 'react';

interface Project {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    isHot?: boolean; // A flag to showcase our single-color highlight
}

interface ProjectGridProps {
    projects: Project[];
}

export const Projects = ({projects}: ProjectGridProps) => {
    return (
        <section id="projects" className="max-w-6xl mx-auto px-4 py-6">
            {/* Structural Header with stark contrast */}
            <div className="pb-1">
                <span
                    className="text-xs font-mono font-normal uppercase tracking-widest text-muted-foreground block mb-2">
                    {"// Selected Repositories"}
                </span>
                <h2 className="text-xl md:text-3xl font-normal tracking-tight text-foreground">
                    Production Architecture
                </h2>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <article
                        key={project._id}
                        className="group flex flex-col justify-between pb-4 border-b border-border/60 hover:border-foreground transition-colors duration-300"
                    >
                        <div className="space-y-2">
                            <div className="flex items-baseline justify-between gap-4">
                                <h3 className="text-lg md:text-xl font-light tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-200">
                                    {project.title}
                                </h3>

                                {/* SPARING COLOR UTILITY: A single tiny dot to draw attention cleanly */}
                                {project.isHot && (
                                    <span
                                        className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-medium">
                                        <span className="relative flex h-1.5 w-1.5">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span
                                            className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                        </span>
                                        Active Node
                                    </span>
                                )}
                            </div>

                            {/* Lightweight body copy */}
                            <p className="text-sm text-muted-foreground font-thin leading-relaxed max-w-xl">
                                {project.description}
                            </p>

                            {/* Minimal structural tags */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-mono text-muted-foreground/80 lowercase"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Clean structural action links */}
                        <div className="flex items-center gap-6 mt-8 text-xs font-mono tracking-tight">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    source_code ↗
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground underline underline-offset-4 decoration-border/80 hover:decoration-foreground transition-colors duration-200"
                                >
                                    production_node ↗
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};