'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/app/actions/projects';

interface ProjectFormProps {
    initialData?: {
        _id: string;
        title: string;
        description: string;
        liveUrl?: string;
        githubUrl?: string;
        tags: string[];
        imageUrl: string;
        isPublished: boolean;
    };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;

    // 1. Unified Form State
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        liveUrl: initialData?.liveUrl || '',
        githubUrl: initialData?.githubUrl || '',
        imageUrl: initialData?.imageUrl || '',
        isPublished: initialData?.isPublished || false,
    });

    // 2. Dynamic Field Management (Tags Array)
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [currentTag, setCurrentTag] = useState('');

    // 3. UX State Management
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle simple input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a tag to the array block list
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag('');
        }
    };

    // Remove a tag from the array block list
    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    // 4. Form Submission Router Execution
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        const completePayload = {
            ...formData,
            tags,
        };

        let result;
        if (isEditMode && initialData?._id) {
            result = await updateProject(initialData._id, completePayload);
        } else {
            result = await createProject(completePayload);
        }

        setIsSubmitting(false);

        if (result.success) {
            router.push('/admin/projects'); // Redirect to listing page after success
            router.refresh();
        } else {
            setErrorMessage(result.error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto space-y-6 p-6 rounded-xl border transition-colors shadow-xl bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
        >
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {isEditMode ? 'Edit Project Details' : 'Publish a New Project'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fill out the metadata to showcase your work effectively.</p>
            </div>

            {/* Update your text field containers similarly */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    placeholder="e.g., FlowState Workflow System"
                />
            </div>

            {/* Update description textareas */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-300">Detailed Description *</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors resize-y bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                />
            </div>

            {/* Interactive Tag Block Update */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="tagsInput" className="text-sm font-medium text-slate-700 dark:text-slate-300">Tech Stack Tags</label>
                <input
                    type="text"
                    id="tagsInput"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-emerald-700 border border-slate-200 dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-700">
            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="text-slate-400 hover:text-red-500 font-bold ml-0.5">×</button>
          </span>
                    ))}
                </div>
            </div>

            {/* Visibility Checkbox Box */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800">
                <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 rounded text-emerald-500 bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-800 focus:ring-emerald-500/50"
                />
                <div className="flex flex-col">
                    <label htmlFor="isPublished" className="text-sm font-medium select-none text-slate-800 dark:text-slate-200">Publish immediately</label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">If unchecked, this project will remain saved as a private draft.</span>
                </div>
            </div>

            {/* Buttons Footer View */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => router.back()} className="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 rounded-lg shadow-lg disabled:opacity-50 transition-colors">
                    {isSubmitting ? 'Saving Framework...' : isEditMode ? 'Update Project' : 'Save & Publish'}
                </button>
            </div>
        </form>
    );
}