var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from "./src/routes/auth.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { dbClient } from "./src/db/db.js";
import { globalErrorHandler } from "./src/utils/globalErrorHandler.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// testing
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use(globalErrorHandler);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbClient.connect();
            app.listen(process.env.PORT, () => {
                console.log(`Connected to server on port ${process.env.PORT}`);
            });
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Shutting down...');
                yield dbClient.disconnect();
                process.exit(0);
            }));
        }
        catch (error) {
            console.error(' Failed to start server:', error);
            process.exit(1);
        }
    });
}
startServer();
