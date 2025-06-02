import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { authRouter } from "./src/routes/auth.route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
// testing
app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(process.env.PORT, () => {
    console.log(`Connected to server on port ${process.env.PORT}`);
});
