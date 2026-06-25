'use server';

import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

// 1. Reusing your explicit union type pattern for network safety
type ActionResponse =
    | {
    success: true;
}
    | {
    success: false;
    error: string;
};

// 2. Safe TypeScript error parsing utility
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Unexpected server error';
}

/**
 * Action to handle public contact form submissions safely
 */
export async function submitContactMessage(formData: {
    name: string;
    email: string;
    message: string;
}): Promise<ActionResponse> {
    try {
        await connectDB();

        // 3. Sanitizing inputs to prevent whitespace bloat or empty submissions
        const name = formData.name?.trim();
        const email = formData.email?.trim();
        const message = formData.message?.trim();

        if (!name || !email || !message) {
            return {
                success: false,
                error: 'All fields (name, email, message) are required.',
            };
        }

        // 4. Basic runtime email format validation before touching the DB
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: 'Please provide a valid email address.',
            };
        }

        // 5. Save the structured message document to MongoDB
        await Message.create({
            name,
            email,
            message,
        });

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error('Failed to submit message:', error);
        return {
            success: false,
            error: getErrorMessage(error),
        };
    }
}

export async function toggleMessageReadStatus(id: string, isRead: boolean): Promise<ActionResponse> {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { success: false, error: 'Invalid message ID.' };
        }

        const updated = await Message.findByIdAndUpdate(id, { isRead }, { new: true });
        if (!updated) return { success: false, error: 'Message not found.' };

        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error: unknown) {
        console.error('Failed to update message status:', error);
        return { success: false, error: getErrorMessage(error) };
    }
}

/**
 * Action to permanently delete a message
 */
export async function deleteContactMessage(id: string): Promise<ActionResponse> {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { success: false, error: 'Invalid message ID.' };
        }

        const deleted = await Message.findByIdAndDelete(id);
        if (!deleted) return { success: false, error: 'Message not found.' };

        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error: unknown) {
        console.error('Failed to delete message:', error);
        return { success: false, error: getErrorMessage(error) };
    }
}