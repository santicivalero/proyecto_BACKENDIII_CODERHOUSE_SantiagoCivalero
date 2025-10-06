import express from 'express';
import cookieParser from 'cookie-parser';

import { connectMongo } from "./config/db.js";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";

import errorHandler from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT||8080;
connectMongo();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.use(errorHandler);

app.listen(PORT,()=> logger.info(`Servidor escuchando en el puerto ${PORT}`));
