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

io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);
    console.log("a user connected");

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
    });
});

export { app, server, io };