import express, { urlencoded } from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

import connectMongoDb from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true })) // more convinient than json. FORM DATA(urlencoded) parsing
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
    connectMongoDb();
})