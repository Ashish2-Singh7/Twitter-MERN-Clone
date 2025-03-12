import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

import connectMongoDb from './db/connectMongoDb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
    connectMongoDb();
})