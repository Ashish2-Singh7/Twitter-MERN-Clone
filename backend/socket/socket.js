import http from 'http';
import express from "express";

import { Server } from "socket.io";

import { getAiResults } from '../services/gemini.service.js';

const app = express();

const server = http.createServer(app);
// socket server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {}; // {userId: socketId};

io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);
    console.log("a user connected");

    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('ai-chat-message', async (data) => {
        socket.emit("aiMessageLoading", true);
        const prompt = data.message;

        const result = await getAiResults(prompt);
        socket.emit('ai-chat-message', {
            message: result,
            sender: {
                _id: 'ai',
                email: 'AI'
            }
        });
        socket.emit("aiMessageLoading", false);
        return;
    })

    socket.on('disconnect', () => {
        console.log("a user disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };