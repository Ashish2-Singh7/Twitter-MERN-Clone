import mongoose from "mongoose";

const messsageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',
    },
    recieverId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Message = mongoose.model('Message', messsageSchema);

export default Message;