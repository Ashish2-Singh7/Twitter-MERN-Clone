import express, { urlencoded } from 'express';
import path from 'path';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import messageRoutes from './routes/message.routes.js';
import aiRoutes from './routes/gemini.routes.js';

import connectMongoDb from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import { app, server } from './socket/socket.js';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // to parse req.body
// default limit is 100kb 
// limit should not be too high to prevent DOS attack (Denial of service)
app.use(urlencoded({ extended: true })) // more convinient than json. FORM DATA(urlencoded) parsing
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ai", aiRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
    connectMongoDb();
})