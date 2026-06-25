import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define an interface representing a Project document in MongoDB
export interface IProject extends Document {
    title: string;
    description: string;
    liveUrl?: string;
    githubUrl?: string;
    tags: string[];
    imageUrl: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Create the Mongoose Schema matching the interface
const ProjectSchema: Schema<IProject> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'A project title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'A project description is required']
        },
        liveUrl: {
            type: String,
            trim: true
        },
        githubUrl: {
            type: String,
            trim: true
        },
        tags: {
            type: [String],
            default: []
        },
        imageUrl: {
            type: String,
            required: [true, 'An image URL is required']
        },
        isPublished: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

// 3. Export the model, preventing Mongoose from creating duplicate models on Next.js hot-reloads
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;