import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import ProjectListClient from '@/components/admin/ProjectListClient';

// Force Next.js to fetch the latest data instead of serving a stale static build
export const revalidate = 0;

export default async function AdminProjectsPage() {
    await connectDB();

    // Fetch all projects from the database, sorted by newest first
    const rawProjects = await Project.find({}).sort({ createdAt: -1 });

    // Serialize MongoDB data cleanly so it can be passed to the Client Component safely
    const projects = rawProjects.map((doc) => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        liveUrl: doc.liveUrl,
        githubUrl: doc.githubUrl,
        tags: doc.tags,
        imageUrl: doc.imageUrl,
        isPublished: doc.isPublished,
    }));

    return (
        <div className="space-y-6 p-6 max-w-6xl mx-auto text-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio Projects</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage, edit, or draft the work you showcase to potential employers.
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow transition-colors"
                >
                    + Add New Project
                </Link>
            </div>

            {/* Render the interactive listing client */}
            <ProjectListClient initialProjects={projects} />
        </div>
    );
}