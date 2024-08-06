import { Schema, model as createModel, Document } from 'mongoose';

interface IConversation extends Document {
    modelName: string;
    question: string;
    response: string;
    createdAt: Date;
}

const conversationSchema = new Schema<IConversation>({
    modelName: { type: String, required: true },
    question: { type: String, required: true },
    response: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Conversation = createModel<IConversation>('Conversation', conversationSchema);
export { Conversation, IConversation };
