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
import { postRouter } from "./src/routes/post.route.js";
import { accommodationRouter } from "./src/routes/accommodation.route.js";
import { placeRouter } from "./src/routes/place.route.js";
import { transportRouter } from "./src/routes/transport.route.js";
import { resrestaurantRouter } from "./src/routes/restaurant.route.js";
import { wishlistRouter } from "./src/routes/wishlist.route.js";
import { dbClient } from "./src/db/db.js";
import { globalErrorHandler } from "./src/utils/globalErrorHandler.js";
import { swaggerUi, swaggerDocument } from "./src/utils/swagger.js";
import dotenv from 'dotenv';
import { travelPlan } from "./src/routes/travelplan.route.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/accommodations', accommodationRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/transports', transportRouter);
app.use('/api/v1/restaurants', resrestaurantRouter);
app.use('/api/v1/wishlists', wishlistRouter);
app.use('/api/v1/travelplans', travelPlan);
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
                console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`);
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
