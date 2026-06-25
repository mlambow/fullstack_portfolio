'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { deleteProject } from '@/app/actions/projects';

interface ProjectItem {
    _id: string;
    title: string;
    description: string;
    liveUrl?: string;
    githubUrl?: string;
    tags: string[];
    imageUrl: string;
    isPublished: boolean;
}

interface ProjectListClientProps {
    initialProjects: ProjectItem[];
}

export default function ProjectListClient({ initialProjects }: ProjectListClientProps) {
    const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you absolutely sure you want to delete this project?')) {
            return;
        }

        setDeletingId(id);

        const result = await deleteProject(id);

        if (result.success) {
            // Cleanly filter out the deleted project from local state instantly
            setProjects((prev) => prev.filter((project) => project._id !== id));
        } else {
            alert(`Error: ${result.error}`);
        }

        setDeletingId(null);
    };

    if (projects.length === 0) {
        return (
            <div className="text-center py-16 bg-slate-900 border border-slate-800 border-dashed rounded-xl">
                <p className="text-slate-400">No projects found. Create your first one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
                <div
                    key={project._id}
                    className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-slate-700 transition-colors"
                >
                    <div className="p-5 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                project.isPublished
                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                {project.isPublished ? 'Live' : 'Draft'}
              </span>
                        </div>

                        <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-slate-950 border border-slate-800 rounded text-slate-300">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                            {project.githubUrl && <span className="hover:text-white">GitHub Linked</span>}
                            {project.liveUrl && <span className="hover:text-white">Live URL Linked</span>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Link
                                href={`/admin/projects/edit/${project._id}`}
                                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                disabled={deletingId === project._id}
                                onClick={() => handleDelete(project._id)}
                                className="px-3 py-1.5 text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 rounded disabled:opacity-50 transition-colors"
                            >
                                {deletingId === project._id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}