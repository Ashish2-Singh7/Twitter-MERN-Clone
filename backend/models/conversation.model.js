import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    messages: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Message',
        }
    ]
});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;