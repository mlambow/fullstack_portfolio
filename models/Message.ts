import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. The interface for the Message document properties
export interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

// 2. The Schema definition
const MessageSchema: Schema<IMessage> = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// 3. Applying 'Model<IMessage>' to explicitly type the exported model
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;