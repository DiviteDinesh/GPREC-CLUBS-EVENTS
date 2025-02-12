import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/events.routes.js';
import clubRoutes from './routes/club.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import redisClient from './services/redis.service.js';
import upload from './middleware/multer.middleware.js';
import aiRoutes from './routes/ai.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRouter from "./routes/upload.routes.js";

dotenv.config();  

connect();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static("public/images"));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/clubs', clubRoutes);
app.use('/admin', adminRoutes);
app.use("/", aiRoutes);
app.use(uploadRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
