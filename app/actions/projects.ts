'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Project, { IProject } from '@/models/Project';

// Explicit union type pattern for network safety
type ActionResponse =
    | {
    success: true;
    projectId?: string;
}
    | {
    success: false;
    error: string;
};

// DRYS up page cache revalidation
function revalidateProjectPages(): void {
    revalidatePath('/');
    revalidatePath('/projects');
}

// Safe TypeScript error parsing utility
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Unexpected server error';
}

/**
 * Action to handle creating a new project from the Admin form
 */
export async function createProject(formData: {
    title: string;
    description: string;
    liveUrl?: string;
    githubUrl?: string;
    tags: string[];
    imageUrl: string;
    isPublished: boolean;
}): Promise<ActionResponse> {
    try {
        await connectDB();

        const title = formData.title?.trim();
        const description = formData.description?.trim();
        const imageUrl = formData.imageUrl?.trim();

        if (!title || !description || !imageUrl) {
            return {
                success: false,
                error: 'Title, description and image are required.',
            };
        }

        const project = await Project.create({
            ...formData,
            title,
            description,
            imageUrl,
        });

        revalidateProjectPages();

        return {
            success: true,
            projectId: project._id.toString(),
        };
    } catch (error: unknown) {
        console.error('Failed to create project:', error);
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

/**
 * Action to handle updating an existing project from the Admin dashboard
 */
export async function updateProject(
    id: string,
    updatedData: Partial<IProject>
): Promise<ActionResponse> {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                success: false,
                error: 'Invalid project ID.',
            };
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProject) {
            return {
                success: false,
                error: 'Project not found.',
            };
        }

        revalidateProjectPages();

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error('Failed to update project:', error);
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

/**
 * Action to permanently delete a project from the database
 */
export async function deleteProject(id: string): Promise<ActionResponse> {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                success: false,
                error: 'Invalid project ID.',
            };
        }

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return {
                success: false,
                error: 'Project not found.',
            };
        }

        revalidateProjectPages();

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error('Failed to delete project:', error);
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}