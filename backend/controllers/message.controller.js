import User from "../models/user.model.js";
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessages = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Nothing to send" });
        }

        const sendUser = await User.findById(senderId);
        const recieveUser = await User.findById(recieverId);

        if (!sendUser || !recieveUser) {
            return res.status(400).json({ error: "User not found" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            text
        });

        if (newMessage) {
            conversation.messages.push(newMessage);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            // io.on(<socket_id>).emit() used to send events to specific client
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessages controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: recieverId } = req.params;
        const userId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [recieverId, userId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found !" });
        }

        let messages = conversation.messages;

        return res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}