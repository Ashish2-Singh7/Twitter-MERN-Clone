import express, { urlencoded } from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

import connectMongoDb from './db/connectMongoDb.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true })) // more convinient than json. FORM DATA(urlencoded) parsing
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
    connectMongoDb();
})